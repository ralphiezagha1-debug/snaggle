import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="relative">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-pink-50" />
        <div className="mx-auto max-w-6xl px-4 py-20 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Win the things you love. <span className="text-fuchsia-600">Spend less.</span>
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Snaggle is a penny‑auction inspired marketplace with transparent rules,
              real inventory, and instant payouts.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <Link to="/auctions">
                <Button size="lg" className="rounded-2xl">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Browse Auctions
                </Button>
              </Link>
              <Link to="/credits">
                <Button variant="outline" size="lg" className="rounded-2xl">
                  Get Credits
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
