import * as React from "react";
import { Link } from "react-router-dom";

export type AuctionCardProps = {
  id: string;
  title: string;
  image?: string;
  msrp?: number | string;
  currentPrice?: number | string;
  endTime?: number | string | Date;
  bids?: number | string;
  watchers?: number | string;
  to?: string;
  className?: string;
};

export function AuctionCard({
  id,
  title,
  image = "/placeholder.svg",
  msrp = 0,
  currentPrice = 0,
  endTime,
  bids = 0,
  watchers = 0,
  to = `/auction/${id}`,
  className,
}: AuctionCardProps) {
  const endLabel =
    endTime instanceof Date
      ? endTime.toLocaleString()
      : typeof endTime === "number"
      ? new Date(endTime).toLocaleString()
      : (endTime ?? "");

  return (
    <Link to={to} className={`block rounded-2xl border p-4 hover:shadow ${className ?? ""}`}>
      <div className="aspect-square overflow-hidden rounded-xl bg-muted">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="font-semibold leading-tight line-clamp-2">{title}</h3>
        <div className="text-sm text-muted-foreground">MSRP: {String(msrp)}</div>
        <div className="text-sm">
          Current: <span className="font-bold">{String(currentPrice)}</span>
        </div>
        {endLabel && (
          <div className="text-xs text-muted-foreground">Ends: {endLabel}</div>
        )}
        <div className="text-xs text-muted-foreground">
          Bids: {String(bids)} · Watchers: {String(watchers)}
        </div>
      </div>
    </Link>
  );
}
