import { useEffect, useState } from "react";
import { bidApi } from "../api/bidApi";
import { AuctionCard } from "../components/AuctionCard";

export default function AuctionCatalog() {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    bidApi.listAuctions().then(setAuctions);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Auction Catalog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {auctions.map((auction) => (
          <AuctionCard key={auction.id} auction={auction} />
        ))}
      </div>
    </div>
  );
}
