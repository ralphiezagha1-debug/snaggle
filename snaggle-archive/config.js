export const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "snaggle.fun",
  projectId: "snaggle-prod",
  storageBucket: "snaggle-prod.appspot.com",
  messagingSenderId: "XXXXXX",
  appId: "XXXXXX"
};

export const stripeConfig = {
  publicKey: "pk_test_xxx",  // Replace with pk_live_xxx to switch
  secretKey: "sk_test_xxx"   // Never expose live secret on frontend
};
