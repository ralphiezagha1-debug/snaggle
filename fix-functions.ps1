$ErrorActionPreference = "Stop"
$ts = Get-Date -Format "yyyyMMdd-HHmmss"
$log = "C:\dev\snaggle\fix-log-$ts.txt"

function Log($m){ $line = "[$(Get-Date -Format HH:mm:ss)] $m"; $line | Tee-Object -FilePath $log -Append }

try {
  Log "Starting functions quick-fix…"
  Set-Location C:\dev\snaggle\functions

  $idx = ".\src\index.ts"
  $wl  = ".\src\waitlist.ts"

  if (!(Test-Path $idx)) { throw "Missing $idx" }
  if (!(Test-Path $wl))  { throw "Missing $wl"  }

  # Backups
  Copy-Item $idx "$idx.bak.$ts" -Force
  Copy-Item $wl  "$wl.bak.$ts"  -Force
  Log "Backed up index.ts and waitlist.ts"

  # --- Fix index.ts: remove 'return res.*(' so handlers return void/Promise<void>
  $idxContent = Get-Content $idx -Raw
  $idxContent = $idxContent -replace 'return\s+res\.(status|json|send)\s*\(', 'res.$1('
  Set-Content $idx $idxContent -NoNewline
  Log "Patched index.ts"

  # --- Fix waitlist.ts: normalize EMAIL_RE to a safe, single-line regex literal
  $wlContent = Get-Content $wl -Raw
  $wlContent = [regex]::Replace(
      $wlContent,
      '(?s)const\s+EMAIL_RE\s*=.*?;',
      'const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;'
  )
  Set-Content $wl $wlContent -NoNewline
  Log "Patched waitlist.ts EMAIL_RE"

  # Sanity echo of the changed lines
  Log "--- index.ts matches ---"
  (Select-String -Path $idx -Pattern 'res\.(status|json|send)\(' -AllMatches | ForEach-Object { $_.Line }) | Tee-Object -FilePath $log -Append
  Log "--- waitlist.ts EMAIL_RE ---"
  (Select-String -Path $wl -Pattern 'const\s+EMAIL_RE' | ForEach-Object { "$($_.LineNumber): $($_.Line)" }) | Tee-Object -FilePath $log -Append

  # Typecheck
  Log "Running npm run typecheck…"
  npm run typecheck
  if ($LASTEXITCODE -ne 0) {
    Log "Typecheck FAILED. Restoring backups."
    Copy-Item "$idx.bak.$ts" $idx -Force
    Copy-Item "$wl.bak.$ts"  $wl  -Force
    throw "Typecheck failed; backups restored. See $log"
  }

  # Commit & push
  git add $idx $wl
  git commit -m "fix(functions): remove Response returns and normalize EMAIL_RE regex literal"
  git push origin feature/lovable-ui-restoration
  Log "Pushed to feature/lovable-ui-restoration"

  Log "DONE ✔  See log: $log"
}
catch {
  Log "ERROR: $($_.Exception.Message)"
}
finally {
  # Always return to repo root and pause so window stays open
  Set-Location C:\dev\snaggle
  Log "At repo root: $(Get-Location)"
  Write-Host "`nLog saved to: $log" -ForegroundColor Cyan
  Read-Host "`nPress ENTER to close this window"
}
