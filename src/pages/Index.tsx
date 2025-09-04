import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import EmailSignUp from "@/components/marketing/EmailSignUp";

export default function Index() {
  return (
    <div className="min-h-[calc(100vh-64px)] text-foreground">
      {/* GRADIENT OVERLAY */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, hsl(var(--primary)/.12), transparent 40%)",
        }}
      />

      {/* HERO */}
      <section className="container-xl text-center pt-24 pb-16 sm:pt-32 sm:pb-24">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary">
          The future of auctions is here.
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground">
          Snaggle is a penny auction platform where you can win brand-new
          products for a fraction of their retail price.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" className="font-semibold" asChild>
            <Link to="/live">View Live Auctions</Link>
          </Button>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container-xl text-center py-16 sm:py-24">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-primary">
          Get notified when we launch.
        </h2>
        <p className="mt-3 text-lg max-w-2xl mx-auto text-muted-foreground">
          Join our waitlist for exclusive access, a free credit pack on day one,
          and a chance to win a MacBook Pro.
        </p>
        <div className="mt-8 mx-auto max-w-lg">
          <EmailSignUp />
          <p className="mt-3 text-xs text-muted-foreground">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
}
