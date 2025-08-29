import React from "react";
import Layout from "@/components/Layout";
import ListingCard from "@/components/ListingCard";
import { gradientBg } from "@/lib/theme";

export default function Home() {
  return (
    <Layout>
      <section className="relative py-16">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" style={{ background: gradientBg }} />
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-primary">
            Welcome to Snaggle
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Penny auctions, reimagined. Bid smart, save big, and win amazing products at unbelievable prices.
          </p>
        </div>
      </section>

      <section className="py-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Featured Auctions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ListingCard key={i} id={String(i+1)} title={`Hot Item #${i+1}`} currentPrice="$0.01" endsIn="02:13:54" />
          ))}
        </div>
      </section>
    </Layout>
  );
}
