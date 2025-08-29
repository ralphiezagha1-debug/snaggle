import React from "react";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  title: string;
  image?: string;
  currentPrice?: string;
  endsIn?: string;
}

export default function ListingCard({ id, title, image, currentPrice, endsIn }: Props) {
  return (
    <Link to={`/listing/${id}`} className="group">
      <div className="rounded-2xl border shadow-soft overflow-hidden bg-card hover:translate-y-[-2px] transition">
        <div className="aspect-[16/10] bg-muted">
          {image ? <img src={image} alt={title} className="h-full w-full object-cover" /> : null}
        </div>
        <div className="p-4">
          <h3 className="font-semibold group-hover:text-primary">{title}</h3>
          <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
            <span>{currentPrice ?? "$0.00"}</span>
            <span>Ends in {endsIn ?? "—"}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
