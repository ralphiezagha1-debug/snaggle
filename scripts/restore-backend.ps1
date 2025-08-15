param(
  [string]$ProjectId = "snaggle-fun",
  [switch]$ApplyDevRules = $false,
  [switch]$SkipDeploy = $false
)

$ErrorActionPreference = 'Stop'

function Write-Section($title) {
  Write-Host "`n==== $title ====" -ForegroundColor Cyan
}

Write-Section "Installing firebase-tools (if missing)"
if (-not (Get-Command firebase -ErrorAction SilentlyContinue)) {
  npm install -g firebase-tools | Out-Null
}

Write-Section "Backing up existing firebase.json (if present)"
if (Test-Path -LiteralPath "./firebase.json") {
  Copy-Item -LiteralPath "./firebase.json" -Destination "./firebase.backup.json" -Force
  Write-Host "Backed up to firebase.backup.json"
}

Write-Section "Writing firestore.rules and storage.rules"
@'
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function isSignedIn() {
      return request.auth != null;
    }
    function isAdmin() {
      return isSignedIn() && (request.auth.token.admin == true);
    }
    function isOwner(uid) {
      return isSignedIn() && request.auth.uid == uid;
    }
    function allowFieldsOnly(allowed) {
      return request.resource.data.keys().hasOnly(allowed);
    }
    function isPositiveNumber(field) {
      return (field in request.resource.data) &&
             (request.resource.data[field] is number) &&
             (request.resource.data[field] > 0);
    }

    match /auctions/{aid} {
      allow read: if true;

      allow create, update, delete: if isAdmin()
        && allowFieldsOnly(['title','description','images','startAt','endAt','startingPrice','increment','status','createdBy','category','tags'])
        && (request.resource.data.startAt <= request.resource.data.endAt);

      allow create: if isAdmin() && request.resource.data.createdBy == request.auth.uid;
    }

    match /auctions/{aid}/bids/{bidId} {
      allow read: if true;

      allow create: if isSignedIn()
        && request.resource.data.bidderId == request.auth.uid
        && isPositiveNumber(request.resource.data.amount)
        && allowFieldsOnly(['amount','bidderId','createdAt','displayName']);

      allow update, delete: if false;
    }

    match /users/{uid} {
      allow read: if true;

      allow create, update: if isOwner(uid)
        && allowFieldsOnly(['displayName','photoURL','email','createdAt','updatedAt']);

      allow update, delete: if isAdmin();
    }

    match /users/{uid}/wallet/{doc} {
      allow read: if isOwner(uid) || isAdmin();

      allow create, update, delete: if isAdmin()
        && allowFieldsOnly(['balance','updatedAt','expiresAt','notes']);
    }

    match /users/{uid}/orders/{orderId} {
      allow read: if isOwner(uid) || isAdmin();

      allow create, update, delete: if isAdmin()
        && allowFieldsOnly(['auctionId','finalPrice','status','shipping','createdAt','updatedAt']);
    }

    match /{document=**} {
      allow read: if false;
      allow write: if false;
    }
  }
}
'@ | Set-Content -LiteralPath "./firestore.rules" -Encoding utf8

@'
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    function isSignedIn() { return request.auth != null; }
    function isAdmin() { return isSignedIn() && (request.auth.token.admin == true); }
    function isOwner(uid) { return isSignedIn() && request.auth.uid == uid; }

    match /public/{allPaths=**} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /users/{uid}/{allPaths=**} {
      allow read: if isOwner(uid) || isAdmin();
      allow write: if isOwner(uid)
        && request.resource.size < 5 * 1024 * 1024
        && request.resource.contentType.matches('image/.*|application/pdf');
    }

    match /{allPaths=**} {
      allow read, write: if false;
    }
  }
}
'@ | Set-Content -LiteralPath "./storage.rules" -Encoding utf8

Write-Section "Creating/patching firebase.json"
$firebaseObj = @{
  firestore = @{ rules = "firestore.rules" }
  storage   = @{ rules = "storage.rules" }
  hosting   = @{
    public = "dist"
    ignore = @("firebase.json", "**/.*", "**/node_modules/**")
    cleanUrls = $true
    rewrites = @(@{ source = "**"; destination = "/index.html" })
  }
}
$firebaseObj | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath "./firebase.json" -Encoding utf8

Write-Section "Scaffolding minimal Cloud Functions (for admin claims)"
if (-not (Test-Path -LiteralPath "./functions")) {
  New-Item -ItemType Directory -Path "./functions/src" -Force | Out-Null
} else {
  if (-not (Test-Path -LiteralPath "./functions/src")) {
    New-Item -ItemType Directory -Path "./functions/src" -Force | Out-Null
  }
}

@'
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Initialize admin SDK once
try {
  admin.initializeApp();
} catch (e) {
  // ignore if already initialized
}

/**
 * Callable to set or clear an admin claim on a user.
 * Restrict invocation to existing admins (defense-in-depth via rules and code).
 *
 * Usage from client (admin only):
 *   const fn = httpsCallable(functions, 'setAdminClaim');
 *   await fn({ uid: 'TARGET_UID', admin: true });
 */
export const setAdminClaim = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "Must be signed in.");
  }
  const callerUid = context.auth.uid;
  const callerToken = context.auth.token as any;
  if (!callerToken.admin) {
    throw new functions.https.HttpsError("permission-denied", "Admin only.");
  }

  const targetUid = data?.uid as string;
  const makeAdmin = !!data?.admin;
  if (!targetUid) {
    throw new functions.https.HttpsError("invalid-argument", "Expected { uid, admin }.");
  }

  await admin.auth().setCustomUserClaims(targetUid, { admin: makeAdmin });
  return { ok: true, uid: targetUid, admin: makeAdmin };
});

/**
 * Helper callable to fetch the caller's token claims (for debugging).
 */
export const whoAmI = functions.https.onCall(async (_data, context) => {
  if (!context.auth) {
    return { signedIn: false };
  }
  return {
    signedIn: true,
    uid: context.auth.uid,
    claims: context.auth.token,
  };
});
'@ | Set-Content -LiteralPath "./functions/src/index.ts" -Encoding utf8

@'
{
  "name": "snaggle-functions",
  "private": true,
  "type": "module",
  "engines": {
    "node": "20"
  },
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "deploy": "npm run build && firebase deploy --only functions",
    "serve": "npm run build && firebase emulators:start --only functions"
  },
  "dependencies": {
    "firebase-admin": "^12.6.0",
    "firebase-functions": "^5.0.1"
  },
  "devDependencies": {
    "typescript": "^5.5.4"
  }
}
'@ | Set-Content -LiteralPath "./functions/package.json" -Encoding utf8

@'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "Bundler",
    "outDir": "lib",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": [
    "src"
  ]
}
'@ | Set-Content -LiteralPath "./functions/tsconfig.json" -Encoding utf8

if (-not $SkipDeploy) {
  Write-Section "Deploying rules"
  try { firebase use $ProjectId --add } catch { firebase use $ProjectId }
  if ($ApplyDevRules) {
    Write-Host "ApplyDevRules flag is set; (DEV mode would normally point emulators to a dev ruleset)."
  }
  firebase deploy --project $ProjectId --only firestore:rules,storage:rules
  Write-Host "Rules deployed."
} else {
  Write-Host "SkipDeploy set: not deploying rules."
}

Write-Section "Done"
