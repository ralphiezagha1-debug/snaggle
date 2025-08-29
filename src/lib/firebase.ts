This landing page expects a Firestore instance exported as:

  export const db = getFirestore(app);

in: src/lib/firebase.ts

If your project already has this file (it likely does), you're all set.
If not, here is a minimal example you can paste into src/lib/firebase.ts:

  import { initializeApp } from "firebase/app";
  import { getFirestore } from "firebase/firestore";

  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };

  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);

Make sure your .env has these VITE_ variables configured for the Firebase project "snaggle-ed88d".
