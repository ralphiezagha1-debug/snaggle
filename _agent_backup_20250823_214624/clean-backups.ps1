# clean-backups.ps1  (safely archives noisy backup UI files that break tsc)
Param(
  [string]$Pattern = "_backup_ui_*",
  [string]$ArchiveDir = "__archive_backup_ui__"
)
$ErrorActionPreference = 'Stop'
function Info($m){ Write-Host $m -ForegroundColor Cyan }
function Done($m){ Write-Host $m -ForegroundColor Green }

Info "Scanning for backup UI files matching '$Pattern'..."
$matches = Get-ChildItem -Recurse -Force -File | Where-Object { $_.FullName -match [regex]::Escape($Pattern) }
$dirs = Get-ChildItem -Recurse -Force -Directory | Where-Object { $_.Name -like $Pattern }

if (-not (Test-Path $ArchiveDir)) { New-Item -ItemType Directory -Path $ArchiveDir | Out-Null }

foreach ($d in $dirs) {
  $dest = Join-Path $ArchiveDir $d.Name
  Move-Item -Force $d.FullName $dest
  Info "Archived folder: $($d.FullName) -> $dest"
}
foreach ($f in $matches) {
  $rel = $f.FullName.Substring((Get-Location).Path.Length + 1)
  $dest = Join-Path $ArchiveDir $rel.Replace("\","__")
  Move-Item -Force $f.FullName $dest
  Info "Archived file: $rel -> $dest"
}

# Add to .gitignore
$gi = ".gitignore"
$line = "__archive_backup_ui__/"
if (Test-Path $gi) {
  $content = Get-Content $gi -Raw
  if ($content -notmatch [regex]::Escape($line)) {
    Add-Content $gi "`n$line`n"
  }
} else {
  Set-Content $gi "$line`n"
}

Done "Backup UI files archived to '$ArchiveDir'. Commit if you want them preserved but excluded from builds."
