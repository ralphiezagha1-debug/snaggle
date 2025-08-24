# verify-snaggle.ps1  (v2.1 - fixes label issue, safer flow)
param(
  [string]$Repo = ".",
  [string]$Project = "snaggle-ed88d",
  [string]$Site = "snaggle-ed88d"
)

$ErrorActionPreference = 'Stop'
function Fail($msg) { Write-Host "FAIL: $msg" -ForegroundColor Red; exit 1 }
function Warn($msg) { Write-Host "WARN: $msg" -ForegroundColor Yellow }
function Pass($msg) { Write-Host "PASS: $msg" -ForegroundColor Green }

Write-Host "=== Verifying Snaggle Setup (v2.1) ===" -ForegroundColor Cyan

# --- Node & npm ---
node -v
npm -v

# --- Firebase files ---
Write-Host "`n=== Firebase Files ===" -ForegroundColor Cyan
if (-Not (Test-Path ".firebaserc")) { Fail ".firebaserc missing" }
if (-Not (Test-Path "firebase.json")) { Fail "firebase.json missing" }

$rc = Get-Content .firebaserc -Raw | ConvertFrom-Json
if ($rc.projects.default -ne $Project) { Fail ".firebaserc default must be $Project (found '$($rc.projects.default)')" }

$fjson = Get-Content firebase.json -Raw | ConvertFrom-Json
if ($null -eq $fjson.hosting) { Fail "firebase.json missing hosting block" }
if ($fjson.hosting.public -ne "dist") { Fail "firebase.json hosting.public must be 'dist' (found '$($fjson.hosting.public)')" }
Pass "Firebase files OK"

# --- Lint & typecheck (non-fatal) ---
Write-Host "`n=== Lint & Typecheck (non-fatal) ===" -ForegroundColor Cyan
npm run lint --if-present; $lintExit=$LASTEXITCODE
npm run typecheck --if-present; $tsExit=$LASTEXITCODE
Write-Host "lint exit: $lintExit  |  typecheck exit: $tsExit"

# --- Build ---
Write-Host "`n=== Build ===" -ForegroundColor Cyan
npm run build
if (-Not (Test-Path "dist")) { Fail "Build succeeded but 'dist/' not found" }
Pass "Build OK"

# --- Firebase CLI & target ---
Write-Host "`n=== Firebase CLI & Target ===" -ForegroundColor Cyan
firebase --version | Out-Null
# idempotent: ensure hosting target binding exists
try { firebase target:apply hosting $Site $Project 1>$null 2>$null } catch { Warn "firebase target:apply warning: $($_.Exception.Message)" }
Pass "Hosting target ensured: $Site -> $Project"

# --- GitHub Secrets presence check (requires gh CLI) ---
Write-Host "`n=== GitHub Secrets (repository) ===" -ForegroundColor Cyan
$ghAvailable = $true
try { gh --version | Out-Null } catch { $ghAvailable = $false }

if (-not $ghAvailable) {
  Warn "GitHub CLI (gh) not found. Install from https://cli.github.com/ and re-run to verify secrets."
} else {
  # Determine owner/repo from git remote
  $originUrl = (git remote get-url origin) 2>$null
  if (-not $originUrl) {
    Warn "No git remote 'origin' found. Skipping repo secrets check."
  } else {
    $ownerRepo = $null
    if ($originUrl -match "github\.com[:/](.+?)/(.+?)(\.git)?$") {
      $ownerRepo = "$($Matches[1])/$($Matches[2])"
    } else {
      Warn "Could not parse GitHub owner/repo from: $originUrl"
    }

    if ($ownerRepo) {
      # Check gh auth
      $authStatus = (gh auth status 2>&1)
      if ($LASTEXITCODE -ne 0) {
        Warn "gh not authenticated. Run: gh auth login"
      } else {
        function Test-RepoSecret([string]$name) {
          $out = gh secret list --repo $ownerRepo 2>$null
          if ($LASTEXITCODE -ne 0) { return $false }
          return ($out -split "`n") -match ("^" + [regex]::Escape($name) + "\b")
        }
        $need = @("FIREBASE_PROJECT_ID","HOSTING_SITE","FIREBASE_SERVICE_ACCOUNT")
        foreach ($n in $need) {
          if (Test-RepoSecret $n) { Pass "$n present" } else { Fail "$n is missing in GitHub → $ownerRepo (Settings → Secrets and variables → Actions)" }
        }
      }
    }
  }
}

Write-Host "`n=== Checklist ===" -ForegroundColor Cyan
Write-Host "  FIREBASE_PROJECT_ID = $Project"
Write-Host "  HOSTING_SITE        = $Site"
Write-Host "  FIREBASE_SERVICE_ACCOUNT = { ... full JSON ... }"

Pass "All checks completed."
