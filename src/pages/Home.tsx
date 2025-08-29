import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuctionCard from "@/components/AuctionCard";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-background text-foreground">
      {/* HERO */}
      <section className="relative mx-auto max-w-6xl px-6 py-16 md:py-20 brand-gradient">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="text-primary">Welcome</span> to Snaggle
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Penny auctions, reimagined. Bid smart, save big, and win amazing
              products at unbelievable prices.
            </p>
            <div className="mt-6 flex gap-3">
              <Button asChild size="lg">
                <Link to="/auctions">Browse auctions</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/how-it-works">How it works</Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-[420px]">
            <div className="brand-card p-4">
              <div className="text-sm text-muted-foreground">Average savings</div>
              <div className="mt-2 text-3xl font-bold text-primary">68%</div>
            </div>
            <div className="brand-card p-4">
              <div className="text-sm text-muted-foreground">Daily auctions</div>
              <div className="mt-2 text-3xl font-bold">25+</div>
            </div>
            <div className="brand-card p-4">
              <div className="text-sm text-muted-foreground">Registered users</div>
              <div className="mt-2 text-3xl font-bold">12k</div>
            </div>
            <div className="brand-card p-4">
              <div className="text-sm text-muted-foreground">Bid fee</div>
              <div className="mt-2 text-3xl font-bold">$0.01</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl md:text-3xl font-bold">Featured Auctions</h2>
          <Button asChild variant="ghost">
            <Link to="/auctions">See all</Link>
          </Button>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AuctionCard id={1} title="Apple AirPods Pro (2nd Gen) with MagSafe Charging Case" />
          <AuctionCard id={2} title="Samsung 27” 4K UHD Monitor (IPS, 60Hz) - 2024 Model" />
          <AuctionCard id={3} title="Nintendo Switch OLED - White Joy-Con" />
        </div>
      </section>

      <Footer />
    </div>
  );
}
