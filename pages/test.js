import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function TestPage() {
  const [data, setData] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This ensures data is fetched only on the client side
    setIsClient(true);

    async function fetchCollections() {
      const collections = ["auctions", "marketplace", "tokens", "users"];
      let results = {};

      try {
        for (const col of collections) {
          const snap = await getDocs(collection(db, col));
          results[col] = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        }
        setData(results);
        console.log("Firestore fetch result:", results); // Log inside the client-side effect
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    if (isClient) {
      fetchCollections();
    }
  }, [isClient]);

  // Render loading until we know we're on the client-side
  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Firestore Data Test</h1>
      <pre>{data ? JSON.stringify(data, null, 2) : "Loading..."}</pre>
    </div>
  );
}

console.log("Env check:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
