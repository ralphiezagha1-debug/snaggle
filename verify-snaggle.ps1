# verify-snaggle.ps1
param(
  [string]$Repo = ".",
  [string]$Project = "snaggle-ed88d",
  [string]$Site = "snaggle-ed88d"
)

Write-Host "=== Verifying Snaggle Setup ===" -ForegroundColor Cyan

# Node & npm check
node -v
npm -v

# Lint/typecheck
Write-Host "`n=== Lint & Typecheck ===" -ForegroundColor Cyan
npm run lint --if-present
npm run typecheck --if-present

# Build check
Write-Host "`n=== Build ===" -ForegroundColor Cyan
npm run build

if (-Not (Test-Path "dist")) {
  Write-Host "FAIL: dist folder not found after build" -ForegroundColor Red
  exit 1
}

# Firebase files check
Write-Host "`n=== Firebase Files ===" -ForegroundColor Cyan
if (-Not (Test-Path ".firebaserc")) { Write-Host "FAIL: .firebaserc missing" -ForegroundColor Red; exit 1 }
if (-Not (Test-Path "firebase.json")) { Write-Host "FAIL: firebase.json missing" -ForegroundColor Red; exit 1 }

$rc = Get-Content .firebaserc -Raw | ConvertFrom-Json
if ($rc.projects.default -ne $Project) {
  Write-Host "FAIL: .firebaserc default must be $Project" -ForegroundColor Red
  exit 1
}

$fjson = Get-Content firebase.json -Raw | ConvertFrom-Json
if ($null -eq $fjson.hosting) { Write-Host "FAIL: firebase.json missing hosting block" -ForegroundColor Red; exit 1 }
if ($fjson.hosting.public -ne "dist") {
  Write-Host "FAIL: firebase.json hosting.public must be 'dist'" -ForegroundColor Red
  exit 1
}

Write-Host "`n=== Firebase CLI ===" -ForegroundColor Cyan
firebase --version
firebase target:apply hosting $Site $Project

Write-Host "`n=== GitHub Secrets Checklist ===" -ForegroundColor Cyan
Write-Host "  FIREBASE_PROJECT_ID = $Project"
Write-Host "  HOSTING_SITE       = $Site"
Write-Host "  FIREBASE_SERVICE_ACCOUNT = { ... full JSON ... }"

Write-Host "`n=== All checks passed ===" -ForegroundColor Green
