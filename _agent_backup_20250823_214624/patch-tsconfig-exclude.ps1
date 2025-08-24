# patch-tsconfig-exclude.ps1  (adds excludes for backup UI patterns)
$ErrorActionPreference = 'Stop'
function Fail($m){ Write-Host "FAIL: $m" -ForegroundColor Red; exit 1 }
function Ok($m){ Write-Host "OK: $m" -ForegroundColor Green }

$ts = "tsconfig.json"
if (!(Test-Path $ts)) { Fail "tsconfig.json not found in current directory" }

$json = Get-Content $ts -Raw | ConvertFrom-Json

# Ensure 'exclude' exists and is an array
if ($null -eq $json.exclude) { $json | Add-Member -NotePropertyName exclude -NotePropertyValue @() }
if ($json.exclude.GetType().Name -ne "Object[]") { $json.exclude = @($json.exclude) }

$patterns = @("_backup_ui_*", "__archive_backup_ui__")
foreach ($p in $patterns) {
  if (-not ($json.exclude -contains $p)) {
    $json.exclude += $p
    Write-Host "Added exclude pattern: $p"
  }
}

# Save back
# ConvertFrom-Json -> PSCustomObject; use ConvertTo-Json with depth
$json | ConvertTo-Json -Depth 10 | Out-File $ts -Encoding UTF8

Ok "Patched $ts with excludes: $($patterns -join ', ')"
