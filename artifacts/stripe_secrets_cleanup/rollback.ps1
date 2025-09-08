param(
    [string]$RepoPath = "C:\\dev\\snaggle",
    [string]$BackupFolder = $(Get-ChildItem -Path (Join-Path $RepoPath 'artifacts\backup') -Directory | Sort-Object Name -Descending | Select-Object -First 1).FullName
)
$ErrorActionPreference = "Stop"

if (-not (Test-Path $BackupFolder)) {
    Write-Error "Backup folder not found: $BackupFolder"
    exit 1
}

# Restore files
Get-ChildItem -Path $BackupFolder -Recurse -File | ForEach-Object {
    $relPath = $_.FullName.Substring($BackupFolder.Length + 1)
    $destPath = Join-Path $RepoPath $relPath
    Copy-Item -Path $_.FullName -Destination $destPath -Force
}

# Log rollback
$logPath = Join-Path $RepoPath 'artifacts\stripe_secrets_cleanup\rollback_summary.txt'
"Rolled back at $(Get-Date)" | Out-File $logPath
"Restored from: $BackupFolder" | Out-File $logPath -Append

# Optional rebuild and redeploy
Push-Location (Join-Path $RepoPath 'functions')
npm ci
npm run build
Pop-Location
Write-Host "Rollback completed. Run 'firebase deploy --only functions --project snaggle-ed88d' if necessary."
