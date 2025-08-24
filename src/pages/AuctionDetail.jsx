import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { bidApi } from "../api/bidApi";
import { Button } from "@/components/ui/button";
import { useTicker } from "../lib/time";

export default function AuctionDetail() {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const now = useTicker();

  useEffect(() => {
    bidApi.getAuction(id).then(setAuction);
  }, [id]);

  if (!auction) {
    return <div>Loading...</div>;
  }

  const endsAt = new Date(auction.endsAt);
  const timeLeft = endsAt > now ? endsAt - now : 0;
  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div>
      <RouterLink to="/auctions" className="text-blue-500 hover:underline mb-8 block">&larr; Back to Auctions</RouterLink>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={auction.img} alt={auction.title} className="rounded-lg" />
        </div>
        <div>
          <h1 className="text-4xl font-bold">{auction.title}</h1>
          <p className="text-lg text-gray-500 mt-2">MSRP: ${auction.msrp.toFixed(2)}</p>
          <p className="text-4xl font-bold text-blue-600 mt-4">${auction.currentPrice.toFixed(2)}</p>
          <div className="mt-8">
            <p className="text-lg font-bold">Time Left:</p>
            <p className="text-2xl font-mono">
              {timeLeft > 0 ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}` : "Ended"}
            </p>
          </div>
          <Button disabled className="mt-8 w-full">Bid Now</Button>
        </div>
      </div>
    </div>
  );
}
