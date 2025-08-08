import Header from "@/components/Header";
import CategoryTabs from "@/components/CategoryTabs";
import AuctionCard from "@/components/AuctionCard";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";

export default function BuyerHome() {
  // Specify a generic type for the auctions array. Without this, TypeScript
  // infers the initial empty array as `never[]`, which causes type errors
  // when assigning an array of auction objects later on. Using `any[]` here
  // is acceptable for prototyping; if your project has defined types for
  // auctions you can replace `any` with that interface.
  const [auctions, setAuctions] = useState<any[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "auctions"), (snapshot) => {
      setAuctions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <div className="bg-navy min-h-screen text-white">
      <Header />
      <CategoryTabs />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {auctions.map((auction: any) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </div>
    </div>
  );
}