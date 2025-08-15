<# ===========================
 setup-guardrails.ps1
 Creates/updates Firebase guardrail files (rules + config) and sets the default project.
 Usage:
   Set-ExecutionPolicy -Scope Process Bypass -Force
   .\setup-guardrails.ps1 -ProjectId snaggle-ed88d [-Force] [-Root C:\dev\snaggle]
 ============================#>

[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string]$ProjectId,

  # Overwrite existing files if present
  [switch]$Force,

  # Root of your repo (defaults to current folder)
  [string]$Root = (Get-Location).Path
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Write-Info([string]$msg)  { Write-Host "[INFO]  $msg" -ForegroundColor Cyan }
function Write-Warn([string]$msg)  { Write-Host "[WARN]  $msg" -ForegroundColor Yellow }
function Write-Good([string]$msg)  { Write-Host "[OK]    $msg" -ForegroundColor Green }
function Write-Bad ([string]$msg)  { Write-Host "[ERROR] $msg" -ForegroundColor Red }

function New-OrOverwriteFile {
  [CmdletBinding()]
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path,

    [Parameter(Mandatory = $true)]
    [string]$Content,

    [switch]$Force
  )

  $dir = Split-Path -Path $Path -Parent
  if (-not (Test-Path -LiteralPath $dir)) {
    Write-Info "Creating directory: $dir"
    New-Item -ItemType Directory -Path $dir -Force | Out-Null
  }

  if ((Test-Path -LiteralPath $Path) -and -not $Force) {
    Write-Warn "File exists, skipping (use -Force to overwrite): $Path"
    return
  }

  $Content | Set-Content -Path $Path -Encoding UTF8
  Write-Good "Wrote: $Path"
}

# --- Verify firebase CLI is available ---
try {
  $null = (firebase --version)
  Write-Info "firebase-tools detected."
} catch {
  Write-Bad "Firebase CLI not found. Install with: npm i -g firebase-tools"
  throw
}

# --- Compose file contents ---
$firebaseJson = @'
{
  "projects": { "default": "__PROJECT_ID__" },
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json","**/.*","**/node_modules/**"],
    "cleanUrls": true,
    "rewrites": [{ "source": "**", "destination": "/index.html" }]
  },
  "firestore": { "rules": "firestore.rules", "indexes": "firestore.indexes.json" },
  "storage":   { "rules": "storage.rules" },
  "database":  { "rules": "database.rules.json" }
}
'@.Replace('__PROJECT_ID__', $ProjectId)

$firestoreRules = @'
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Public read-only content
    match /public/{document=**} {
      allow read: if true;
      allow write: if false;
    }

    // Per-user documents: users/{uid}/...
    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }

    // Default lockdown
    match /{document=**} {
      allow read: if request.auth != null;
      allow write: if false; // prefer writes via trusted backends/Cloud Functions
    }
  }
}
'@

$firestoreIndexes = @'
{
  "indexes": [],
  "fieldOverrides": []
}
'@

$storageRules = @'
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    // Public readable assets (read-only)
    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if false;
    }

    // Per-user private files
    match /user/{uid}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }

    // Default lockdown
    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
'@

$rtdbRules = @'
{
  "rules": {
    ".read": "auth != null",
    ".write": false,
    "users": {
      "$uid": {
        ".read":  "auth != null && auth.uid === $uid",
        ".write": "auth != null && auth.uid === $uid"
      }
    }
  }
}
'@

$firebaserc = @"
{
  "projects": {
    "default": "$ProjectId",
    "snaggle": "$ProjectId"
  }
}
"@

# --- Write files (safe unless -Force) ---
New-OrOverwriteFile -Path (Join-Path $Root 'firebase.json')            -Content $firebaseJson     -Force:$Force
New-OrOverwriteFile -Path (Join-Path $Root 'firestore.rules')          -Content $firestoreRules   -Force:$Force
New-OrOverwriteFile -Path (Join-Path $Root 'firestore.indexes.json')   -Content $firestoreIndexes -Force:$Force
New-OrOverwriteFile -Path (Join-Path $Root 'storage.rules')            -Content $storageRules     -Force:$Force
New-OrOverwriteFile -Path (Join-Path $Root 'database.rules.json')      -Content $rtdbRules        -Force:$Force
New-OrOverwriteFile -Path (Join-Path $Root '.firebaserc')              -Content $firebaserc       -Force:$Force

Write-Good "Default project set via .firebaserc."

# --- Helpful next steps (non-blocking) ---
Write-Info "Validate rules:"
Write-Host "  firebase emulators:start --only firestore,storage,database" -ForegroundColor Gray
Write-Info "Deploy rules (if ready):"
Write-Host "  firebase deploy --only firestore:rules,firestore:indexes,storage,storage:rules,database" -ForegroundColor Gray

Write-Good "Guardrails setup complete."
