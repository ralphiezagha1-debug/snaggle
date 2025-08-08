// Firebase client initialization
//
// This module initializes the Firebase client SDKs for use in the browser.  The
// configuration values are loaded from environment variables prefixed with
// NEXT_PUBLIC_.  When deploying your application you should set these
// variables in your Firebase Hosting environment or build pipeline.  See
// https://firebase.google.com/docs/web/setup for details on obtaining your
// project's configuration.

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Only initialize Firebase if it hasn't been initialized yet.  Next.js's
// hot-reloading can cause this module to be loaded multiple times in
// development, so we guard against re-initialization.
let app;
if (!getApps().length) {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Export the Firestore instance.  We intentionally do not initialize or
// export the Auth SDK during the build because a missing or invalid API key
// causes Firebase to throw an `auth/invalid-api-key` error at build time.
// If authentication is needed in the future, consider lazy-loading the
// Auth module in client-only code after environment variables are set.
export const db = getFirestore(app);
// Export the default Cloud Storage instance so components/pages can upload files
export const storage = getStorage(app);