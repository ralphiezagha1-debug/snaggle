import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <div className="min-h-[calc(100vh-64px)]">
      {/* HERO */}
      <section className="relative mx-auto max-w-6xl px-6 py-16">
        {/* Subtle green glow using CSS vars (CI-safe) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(1200px 400px at 0% 0%, hsl(var(--primary) / 0.12), transparent 60%)",
          }}
        />
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
          Welcome to <span className="text-primary">Snaggle</span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
          The ultimate penny auction experience. Bid smart, save big, and win
          amazing products at unbelievable prices. Every bid counts!
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          {/* PRIMARY CTA — brand green */}
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <Link to="/live">Start Bidding Now</Link>
          </Button>

          {/* SECONDARY CTA — outline */}
          <Button
            variant="outline"
            size="lg"
            className="border-border text-foreground hover:bg-muted"
            asChild
          >
            <Link to="/how-it-works">How It Works</Link>
          </Button>
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-6xl px-6 pb-20 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-6">
          <div className="text-4xl font-bold">2,847</div>
          <div className="mt-2 text-sm text-muted-foreground">
            Winners This Month
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <div className="text-4xl font-bold">12,394</div>
          <div className="mt-2 text-sm text-muted-foreground">
            Active Bidders
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <div className="text-4xl font-bold">$2.4M</div>
          <div className="mt-2 text-sm text-muted-foreground">
            Total Savings
          </div>
        </div>
      </section>
    </div>
  );
}
