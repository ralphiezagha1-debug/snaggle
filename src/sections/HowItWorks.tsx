import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function HowItWorks() {
  return (
    <section className="relative mx-auto max-w-6xl px-6 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(700px 300px at 20% 0%, hsl(var(--primary)/.15), transparent 70%)" }}
      />
      <h2 className="text-center text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
        How Snaggle Works
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-center text-lg text-muted-foreground">
        Simple, fair, and exciting. Here's how our penny auctions work.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[{n:1,t:"Buy Bid Credits",d:"Purchase bid packs to get started. Each bid typically costs between $0.50–$1.00."},
          {n:2,t:"Place Your Bids",d:"Each bid increases the price by $0.01 and resets the countdown timer."},
          {n:3,t:"Win & Save",d:"Be the last bidder when time runs out and win at the final price!"}]
          .map(({n,t,d}) => (
          <div key={n} className="rounded-2xl border border-border bg-card p-6 shadow">
            <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground text-xl font-bold">{n}</div>
            <h3 className="text-center text-2xl font-semibold text-foreground">{t}</h3>
            <p className="mt-3 text-center text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild size="lg" className="rounded-xl">
          <Link to="/buy-credits">Get Your First Bid Pack</Link>
        </Button>
      </div>
    </section>
  );
}
