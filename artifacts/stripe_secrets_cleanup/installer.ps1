param(
    [string]$RepoPath = "C:\\dev\\snaggle"
)
$ErrorActionPreference = "Stop"

# Paths
$ArtifactsDir = Join-Path $RepoPath 'artifacts\stripe_secrets_cleanup'
$BackupRoot   = Join-Path $RepoPath "artifacts\backup"

# Verify SHA256
$shaFile = Join-Path $ArtifactsDir 'sha256.txt'
$zipFile = Join-Path $ArtifactsDir 'files.zip'
$patchFile = Join-Path $ArtifactsDir 'changes.patch'

function Get-FileHashHex($Path) {
    (Get-FileHash -Algorithm SHA256 -Path $Path).Hash.ToLower()
}

$expected = @{}
Get-Content $shaFile | ForEach-Object {
    $parts = $_.Split(':').ForEach({$_.Trim()})
    $expected[$parts[0]] = $parts[1]
}

$zipHash    = Get-FileHashHex $zipFile
$patchHash  = Get-FileHashHex $patchFile

if ($expected['files.zip'] -ne $zipHash) {
    Write-Error "files.zip hash mismatch. Expected $($expected['files.zip']), got $zipHash"
    exit 1
}
if ($expected['changes.patch'] -ne $patchHash) {
    Write-Error "changes.patch hash mismatch. Expected $($expected['changes.patch']), got $patchHash"
    exit 1
}

# Create backup
$timestamp = Get-Date -Format 'yyyyMMdd_HHmmss'
$backupDir = Join-Path $BackupRoot $timestamp
New-Item -ItemType Directory -Path $backupDir -Force | Out-Null

# List of files to backup (relative to repo)
$filesToChange = @('functions\src\index.ts')
foreach ($rel in $filesToChange) {
    $src = Join-Path $RepoPath $rel
    if (Test-Path $src) {
        $dest = Join-Path $backupDir $rel
        New-Item -ItemType Directory -Path (Split-Path $dest) -Force | Out-Null
        Copy-Item -Path $src -Destination $dest -Force
    }
}

# Extract and apply
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::ExtractToDirectory($zipFile, $RepoPath, $true)

# Log summary
$summaryPath = Join-Path $ArtifactsDir 'apply_summary.txt'
"Applied at $(Get-Date)" | Out-File $summaryPath -Append
"Backups stored in: $backupDir" | Out-File $summaryPath -Append
"Modified files:" | Out-File $summaryPath -Append
foreach ($rel in $filesToChange) {
    $full = Join-Path $RepoPath $rel
    "  - $full" | Out-File $summaryPath -Append
}

# Build and deploy
Push-Location (Join-Path $RepoPath 'functions')
npm ci
npm run build
Pop-Location
firebase deploy --only functions --project snaggle-ed88d

Write-Host "✅ Stripe secret cleanup applied and functions deployed"
