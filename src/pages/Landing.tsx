import { EmailCapture } from "../components/EmailCapture";
import { CheckCircle } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
      <header className="w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-emerald-500"></div>
          <span className="text-xl font-semibold">Snaggle</span>
        </div>
      </header>

      <main className="flex-1 w-full">
        {/* Hero */}
        <section className="px-6">
          <div className="max-w-6xl mx-auto py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                Win Big, <span className="text-emerald-400">Spend Small.</span>
              </h1>
              <p className="mt-4 text-lg text-neutral-300">
                Auctions where every bid counts and the deals are too good to miss.
              </p>
              <div className="mt-8">
                <EmailCapture />
                <p className="mt-3 text-sm text-neutral-400">
                  Join the waitlist for early access, bonus credits, and VIP perks.
                </p>
              </div>
              <ul className="mt-8 space-y-2 text-neutral-300">
                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-emerald-400"/> Buy credits (low entry)</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-emerald-400"/> Each bid raises price by $0.01</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-emerald-400"/> Timer resets with each bid</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-emerald-400"/> Last bidder wins</li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-3xl"></div>
              <div className="relative rounded-3xl border border-neutral-800 bg-neutral-900 p-6">
                <div className="aspect-video rounded-2xl bg-neutral-800 grid place-items-center text-neutral-400">
                  <span>Promo slot (image/video)</span>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="rounded-xl bg-neutral-800 h-16"></div>
                  <div className="rounded-xl bg-neutral-800 h-16"></div>
                  <div className="rounded-xl bg-neutral-800 h-16"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why join now */}
        <section className="px-6">
          <div className="max-w-6xl mx-auto py-12 md:py-16">
            <h2 className="text-2xl md:text-3xl font-bold">Early Members Get Rewards</h2>
            <div className="mt-6 grid sm:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-neutral-800 p-5 bg-neutral-900/50">
                <div className="text-emerald-400 font-semibold">Bonus Credits</div>
                <p className="text-neutral-300 mt-2">Free credits on launch for early supporters.</p>
              </div>
              <div className="rounded-2xl border border-neutral-800 p-5 bg-neutral-900/50">
                <div className="text-emerald-400 font-semibold">VIP First Access</div>
                <p className="text-neutral-300 mt-2">Be first in line for day‑one auctions.</p>
              </div>
              <div className="rounded-2xl border border-neutral-800 p-5 bg-neutral-900/50">
                <div className="text-emerald-400 font-semibold">Lifetime Perks</div>
                <p className="text-neutral-300 mt-2">Ongoing surprises for founding members.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6">
          <div className="max-w-3xl mx-auto py-14 md:py-20 text-center border-t border-neutral-900">
            <h3 className="text-3xl md:text-4xl font-extrabold">Ready to snag a deal?</h3>
            <p className="mt-3 text-neutral-300">Join the waitlist today and get notified at launch.</p>
            <div className="mt-6 max-w-xl mx-auto">
              <EmailCapture />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-900 py-6 text-center text-neutral-500 text-sm">
        © {new Date().getFullYear()} Snaggle. All rights reserved.
      </footer>
    </div>
  );
}
