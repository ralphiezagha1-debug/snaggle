import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-background text-foreground">
      {/* HERO */}
      <section className="relative mx-auto max-w-6xl px-6 py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(800px 400px at 20% 0%, hsl(var(--primary)/.16), transparent 70%)",
          }}
        />
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-primary">
          Welcome to Snaggle
        </h1>
        <p className="mt-4 text-lg max-w-3xl text-muted-foreground">
          The ultimate penny auction experience. Bid smart, save big, and win
          amazing products at unbelievable prices. Every bid counts!
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <Link to="/live">Start Bidding Now</Link>
          </Button>
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
      <section className="mx-auto max-w-6xl px-6 pb-16 grid gap-6 md:grid-cols-3">
        {[
          { label: "Winners This Month", value: "2,847" },
          { label: "Active Bidders", value: "12,394" },
          { label: "Total Savings", value: "$2.4M" },
        ].map((s) => (
          <div key={s.label} className="soft-card p-6 text-center border">
            <div className="text-4xl font-bold text-primary">{s.value}</div>
            <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </section>

      {/* FEATURES (no navbar/footer required) */}
      <section className="mx-auto max-w-6xl px-6 pb-24 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Real-Time Auctions",
            body:
              "Lightning-fast bidding with transparent timers and fair-play rules.",
          },
          {
            title: "Credits & Rewards",
            body:
              "Earn perks as you play—daily streaks, bonus credits, and VIP status.",
          },
          {
            title: "Secure & Verified",
            body:
              "Built on modern infrastructure with strong auth and anti-bot protection.",
          },
        ].map((f) => (
          <div key={f.title} className="soft-card p-6 border">
            <h3 className="text-xl font-semibold text-primary">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
