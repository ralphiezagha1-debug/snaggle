import React from "react";
import { Link } from "react-router-dom";

type Props = {
  id: string | number;
  title: string;
  imageUrl?: string;
  currentBid?: string;
  endsIn?: string;
  badge?: string;
};

export default function AuctionCard({
  id, title, imageUrl,
  currentBid = "$0.17",
  endsIn = "02:15:43",
  badge = "Live",
}: Props) {
  return (
    <div className="border rounded-xl bg-white/50 dark:bg-neutral-900/40 overflow-hidden">
      <Link to={`/listing/${id}`} className="block">
        <div className="aspect-video w-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
          {imageUrl ? (
            <img src={imageUrl} alt={title} className="h-full w-full object-cover" />
          ) : (
            <div className="text-sm opacity-60">Image coming soon</div>
          )}
        </div>
      </Link>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between text-xs opacity-70">
          <span className="px-2 py-0.5 rounded-full border"> {badge} </span>
          <span>Ends in {endsIn}</span>
        </div>
        <Link to={`/listing/${id}`} className="block">
          <h3 className="font-semibold line-clamp-2">{title}</h3>
        </Link>
        <div className="flex items-center justify-between">
          <div className="text-sm opacity-70">Current bid</div>
          <div className="text-lg font-bold">$0.01</div>
        </div>
      </div>
    </div>
  );
}
