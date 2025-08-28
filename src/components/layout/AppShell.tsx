import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

/** Basic site shell: header nav + outlet + toasts. Uses only semantic tokens. */
export default function AppShell() {
  const linkCls = (active: boolean) =>
    `px-3 py-2 rounded-md text-sm font-medium ${
      active ? "text-primary" : "text-foreground/80 hover:text-foreground"
    }`;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 font-bold">
            <span className="inline-block h-4 w-4 rounded-sm bg-primary" aria-hidden />
            <span>Snaggle</span>
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/my-auctions" className={({ isActive }) => linkCls(isActive)}>
              Live Auctions
            </NavLink>
            <NavLink to="/credits" className={({ isActive }) => linkCls(isActive)}>
              Buy Credits
            </NavLink>
            <NavLink to="/how-it-works" className={({ isActive }) => linkCls(isActive)}>
              How It Works
            </NavLink>
          </nav>

          {/* Right side — credits link (safe placeholder, no app-specific deps) */}
          <Link
            to="/credits"
            className="hidden md:inline-flex items-center rounded-full border px-3 py-1 text-sm
                       bg-primary/10 text-primary hover:bg-primary/15"
            aria-label="Credits"
            title="Credits"
          >
            75 credits
          </Link>
        </div>
      </header>

      {/* Page */}
      <main className="min-h-[calc(100vh-56px)]">
        <Outlet />
      </main>

      {/* Toasts */}
      <Toaster />
      <Sonner />
    </div>
  );
}
