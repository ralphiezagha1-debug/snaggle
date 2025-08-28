import React from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

/** Lightweight credits pill that reads from localStorage (no external deps). */
function CreditsBadge() {
  const [credits, setCredits] = React.useState<number>(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem("credits") : "0";
    const n = Number(raw ?? "0");
    return Number.isFinite(n) ? n : 0;
  });

  // keep in sync if some other part of the app updates it
  React.useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "credits") {
        const n = Number(e.newValue ?? "0");
        setCredits(Number.isFinite(n) ? n : 0);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <div
      className="rounded-full px-3 py-1 text-sm"
      style={{
        background: "hsl(var(--secondary))",
        color: "hsl(var(--foreground))",
        border: "1px solid hsl(var(--border))",
      }}
      aria-label="Credits balance"
      title={`${credits} credits`}
    >
      {credits} credits
    </div>
  );
}

const linkBase =
  "inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors";
const linkActive = "text-primary";
const linkIdle = "text-foreground/80 hover:text-foreground";

export default function AppShell() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAVBAR */}
      <header
        className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/80"
        style={{ borderBottom: "1px solid hsl(var(--border))" }}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="font-extrabold tracking-tight text-primary text-xl">
            Snaggle
          </Link>

          <nav className="flex items-center gap-1">
            <NavLink
              to="/live"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkIdle}`
              }
            >
              Live Auctions
            </NavLink>
            <NavLink
              to="/credits"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkIdle}`
              }
            >
              Buy Credits
            </NavLink>
            <NavLink
              to="/how-it-works"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkIdle}`
              }
            >
              How It Works
            </NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <CreditsBadge />
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link to="/live">Start Bidding</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer
        className="mt-auto w-full"
        style={{
          borderTop: "1px solid hsl(var(--border))",
          background: "hsl(var(--background))",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 text-sm text-foreground/70">
          <span>© {new Date().getFullYear()} Snaggle</span>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link to="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
