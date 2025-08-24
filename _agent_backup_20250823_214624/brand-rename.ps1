<# 
.SYNOPSIS
  Project-wide rename for tab title & branding + optional favicon swap.

.EXAMPLE
  # Basic: rename "snaggle-bid" to "Snaggle"
  .\brand-rename.ps1 -ProjectPath "C:\dev\snaggle" -OldName "snaggle-bid" -NewName "Snaggle"

.EXAMPLE
  # Also replace favicon and auto-commit
  .\brand-rename.ps1 -ProjectPath "C:\dev\snaggle" -OldName "snaggle-bid" -NewName "Snaggle" `
                     -NewFaviconPath "C:\dev\snaggle\assets\snaggle.ico" -Commit
#>

param(
  [string]$ProjectPath = ".",
  [string]$OldName = "snaggle-bid",
  [string]$NewName = "Snaggle",
  [string]$NewFaviconPath = "",
  [switch]$Commit,
  [switch]$DryRun
)

$ErrorActionPreference = "Stop"

# --- Setup ---------------------------------------------------------------------------------------
$ProjectPath = (Resolve-Path $ProjectPath).Path
Set-Location $ProjectPath

$excludeDirs = @('.git','node_modules','dist','out','build','.next','.vercel','.turbo','.cache')
$textExts    = @('.html','.htm','.js','.jsx','.ts','.tsx','.json','.md','.xml','.yml','.yaml','.css','.scss','.svg')
$logDir      = Join-Path $ProjectPath ".brand-rename"
$logFile     = Join-Path $logDir ("changes_" + (Get-Date -Format "yyyyMMdd_HHmmss") + ".log")
$changed     = New-Object System.Collections.Generic.List[string]

New-Item -ItemType Directory -Force -Path $logDir | Out-Null

function In-ExcludedPath($path) {
  foreach ($d in $excludeDirs) {
    if ($path -match [regex]::Escape(('\'+$d+'\'))) { return $true }
    if ($path -match [regex]::Escape(('/'+$d+'/'))) { return $true }
  }
  return $false
}

function Write-Change($msg) {
  $msg | Tee-Object -FilePath $logFile -Append
}

Write-Change "=== Brand Rename Started: $(Get-Date) ==="
Write-Change "Project: $ProjectPath"
Write-Change "OldName: $OldName"
Write-Change "NewName: $NewName"
if ($NewFaviconPath) { Write-Change "NewFaviconPath: $NewFaviconPath" }
if ($DryRun) { Write-Change "MODE: DRY RUN (no files will be modified)" }

# --- 1) Update <title> in any index.html ---------------------------------------------------------
$indexCandidates = Get-ChildItem -Recurse -File -Filter "index.html" |
  Where-Object { -not (In-ExcludedPath $_.FullName) }

foreach ($file in $indexCandidates) {
  try {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8

    $hadTitle = $false
    $newContent = $content

    if ($content -match '<title>.*?</title>') {
      $hadTitle = $true
      $newContent = [regex]::Replace($content, '<title>.*?</title>', "<title>$NewName</title>", 'IgnoreCase')
    } elseif ($content -match '<head.*?>') {
      # Insert a title inside <head> if missing
      $newContent = [regex]::Replace($content, '(<head.*?>)', "`$1`r`n    <title>$NewName</title>", 'IgnoreCase')
    }

    if ($newContent -ne $content) {
      Write-Change "TITLE: $($file.FullName) -> " + ($(if ($hadTitle) {"replaced"} else {"inserted"}))
      $changed.Add($file.FullName) | Out-Null
      if (-not $DryRun) { $newContent | Set-Content -Encoding UTF8 $file.FullName }
    }
  } catch {
    Write-Change "ERROR (title): $($file.FullName) :: $($_.Exception.Message)"
  }
}

# --- 2) Update manifest files (name/short_name) --------------------------------------------------
$manifestFiles = Get-ChildItem -Recurse -File -Include "manifest*.json","*.webmanifest" |
  Where-Object { -not (In-ExcludedPath $_.FullName) }

foreach ($file in $manifestFiles) {
  try {
    $raw = Get-Content $file.FullName -Raw -Encoding UTF8
    $json = $null
    try { $json = $raw | ConvertFrom-Json -ErrorAction Stop } catch {}
    if ($null -ne $json) {
      $modified = $false

      if ($json.PSObject.Properties.Name -contains 'name' -and $json.name -is [string] -and $json.name -match [regex]::Escape($OldName)) {
        $json.name = $json.name -replace [regex]::Escape($OldName), $NewName
        $modified = $true
      }
      if ($json.PSObject.Properties.Name -contains 'short_name' -and $json.short_name -is [string] -and $json.short_name -match [regex]::Escape($OldName)) {
        $json.short_name = $json.short_name -replace [regex]::Escape($OldName), $NewName
        $modified = $true
      }

      if ($modified) {
        Write-Change "MANIFEST: $($file.FullName) -> name/short_name updated"
        $changed.Add($file.FullName) | Out-Null
        if (-not $DryRun) {
          $json | ConvertTo-Json -Depth 20 | Set-Content -Encoding UTF8 $file.FullName
        }
      }
    } else {
      # Fallback: do a plain text replace if JSON parse fails
      if ($raw -match [regex]::Escape($OldName)) {
        Write-Change "MANIFEST(text): $($file.FullName) -> replaced occurrences"
        $changed.Add($file.FullName) | Out-Null
        if (-not $DryRun) {
          ($raw -replace [regex]::Escape($OldName), $NewName) | Set-Content -Encoding UTF8 $file.FullName
        }
      }
    }
  } catch {
    Write-Change "ERROR (manifest): $($file.FullName) :: $($_.Exception.Message)"
  }
}

# --- 3) Project-wide safe text replace for OldName -> NewName ------------------------------------
$allTextFiles = Get-ChildItem -Recurse -File |
  Where-Object { 
    $textExts -contains ([System.IO.Path]::GetExtension($_.FullName).ToLower()) -and
    -not (In-ExcludedPath $_.FullName)
  }

foreach ($file in $allTextFiles) {
  try {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    if ($content -match [regex]::Escape($OldName)) {
      Write-Change "REPLACE: $($file.FullName)"
      $changed.Add($file.FullName) | Out-Null
      if (-not $DryRun) {
        ($content -replace [regex]::Escape($OldName), $NewName) | Set-Content -Encoding UTF8 $file.FullName
      }
    }
  } catch {
    Write-Change "ERROR (replace): $($file.FullName) :: $($_.Exception.Message)"
  }
}

# --- 4) Optional favicon swap --------------------------------------------------------------------
if ($NewFaviconPath) {
  try {
    if (-not (Test-Path $NewFaviconPath)) {
      Write-Change "FAVICON: NewFaviconPath not found -> $NewFaviconPath"
    } else {
      $publicDir = Join-Path $ProjectPath "public"
      if (-not (Test-Path $publicDir)) { New-Item -ItemType Directory -Force -Path $publicDir | Out-Null }

      $dest = Join-Path $publicDir "favicon.ico"
      $backup = Join-Path $publicDir ("favicon.ico.bak_" + (Get-Date -Format "yyyyMMdd_HHmmss"))
      if (Test-Path $dest -and -not $DryRun) { Copy-Item $dest $backup -Force }
      if (-not $DryRun) { Copy-Item $NewFaviconPath $dest -Force }
      Write-Change "FAVICON: copied -> $dest (backup: $(Split-Path $backup -Leaf))"
      $changed.Add($dest) | Out-Null
    }
  } catch {
    Write-Change "ERROR (favicon): $($_.Exception.Message)"
  }
}

# --- 5) Optional Git commit ----------------------------------------------------------------------
if ($Commit) {
  try {
    if (Test-Path (Join-Path $ProjectPath ".git")) {
      if (-not $DryRun) {
        git add -A | Out-Null
        git commit -m "chore(brand): rename '$OldName' -> '$NewName', update titles/manifests/favicon" | Out-Null
      }
      Write-Change "GIT: committed changes"
    } else {
      Write-Change "GIT: repo not found (.git missing) — skipping commit"
    }
  } catch {
    Write-Change "ERROR (git): $($_.Exception.Message)"
  }
}

Write-Change "=== Completed: $(Get-Date) ==="
Write-Change "Changed files count: $($changed.Count)"
Write-Change "Log: $logFile"
Write-Host "`nDone. Log saved to:`n$logFile`n"
if (-not $DryRun) { Write-Host "Next: rebuild & redeploy (npm run build && firebase deploy or push to main)." }
