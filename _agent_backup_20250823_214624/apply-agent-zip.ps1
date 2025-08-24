param(
  [Parameter(Mandatory=$true)] [string]$ZipPath,
  [Parameter(Mandatory=$true)] [string]$RepoPath
)
$ErrorActionPreference = "Stop"
if (!(Test-Path $ZipPath)) { throw "Zip not found: $ZipPath" }
if (!(Test-Path $RepoPath)) { throw "Repo folder not found: $RepoPath" }
if (!(Test-Path (Join-Path $RepoPath ".git"))) { throw "Not a git repo: $RepoPath" }

$stamp = Get-Date -Format "yyyyMMdd_HHmmss"
$bkDir = Join-Path $RepoPath "_agent_backup_$stamp"
robocopy $RepoPath $bkDir /E /NFL /NDL /NJH /NJS /NP /XD ".git" "node_modules" "dist" ".firebase" "_agent_backup_*" | Out-Null

$temp = Join-Path $env:TEMP "snaggle_agent_$stamp"
if (Test-Path $temp) { Remove-Item -Recurse -Force $temp }
New-Item -ItemType Directory -Path $temp | Out-Null
Expand-Archive -Path $ZipPath -DestinationPath $temp -Force

$roots = Get-ChildItem -Path $temp
$srcRoot = if ($roots.Count -eq 1 -and $roots[0].PSIsContainer) { $roots[0].FullName } else { $temp }

$null = robocopy $srcRoot $RepoPath /E /NFL /NDL /NJH /NJS /NP `
  /XD ".git" "node_modules" "dist" ".firebase" "_agent_backup_*" `
  /XF ".env" ".env.local" ".env.production" "firebase-debug.log"

Push-Location $RepoPath
try {
  if (Test-Path (Join-Path $RepoPath "package-lock.json")) { npm ci } else { npm install }
  try { npm run lint } catch {}
  try { npm run typecheck } catch {}
  try { npm run build } catch {}
} finally { Pop-Location }

$branch = "agent-sync-$stamp"
Push-Location $RepoPath
git checkout -b $branch
git add -A
git commit -m "Apply Agent snapshot ($stamp)"
git push -u origin $branch
Pop-Location

Write-Host "Done. Open a PR from $branch -> main."
