# error-sweep.ps1 — one‑shot diagnostics, keeps going on errors and logs everything
Set-StrictMode -Version Latest
$ErrorActionPreference = 'Continue'

$stamp  = Get-Date -Format 'yyyyMMdd-HHmmss'
$logDir = Join-Path (Get-Location) ".logs\error-sweep-$stamp"
New-Item -ItemType Directory -Force -Path $logDir | Out-Null

function Run-Step {
    param([Parameter(Mandatory)][string]$Name,[Parameter(Mandatory)][string]$Cmd)
    $log = Join-Path $logDir "$Name.log"
    Write-Host "`n=== $Name ==="
    cmd /c $Cmd 1> $log 2>&1
    [pscustomobject]@{ Name=$Name; ExitCode=$LASTEXITCODE; Log=$log }
}

$steps = @()
$steps += Run-Step "npm-install" 'npm ci || npm install'
$steps += Run-Step "eslint"      'npx eslint . --ext .ts,.tsx,.js,.jsx --max-warnings=0'
$steps += Run-Step "tsc"         'npx tsc -p tsconfig.json --noEmit'
$steps += Run-Step "vite-build"  'npx vite build'
$steps += Run-Step "depcheck"    'npx depcheck'

# Build summary
$summary = Join-Path $logDir "SUMMARY.md"
"## Error Sweep Summary ($stamp)`nLogs: $logDir`n" | Set-Content $summary
"| Step | Exit | Errors | Warnings | Log |`n|---|---:|---:|---:|---|" | Add-Content $summary
foreach($s in $steps){
  $e = (Select-String -Path $s.Log -Pattern 'error'   -SimpleMatch -EA SilentlyContinue | Measure).Count
  $w = (Select-String -Path $s.Log -Pattern 'warning' -SimpleMatch -EA SilentlyContinue | Measure).Count
  $rel = ".\" + (Resolve-Path $s.Log -Relative)
  "| $($s.Name) | $($s.ExitCode) | $e | $w | $rel |" | Add-Content $summary
}
Write-Host "`nDone. Open $summary"
