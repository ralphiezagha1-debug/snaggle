import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="container-xl flex h-16 items-center justify-between">
        <Link to="/" className="font-extrabold tracking-tight text-primary text-xl">
          Snaggle
        </Link>
        <nav className="flex items-center gap-6 overflow-x-hidden">
          <Link to="/auctions" className="text-sm text-foreground/80 hover:text-primary">Auctions</Link>
          <Link to="/how-it-works" className="text-sm text-foreground/80 hover:text-primary">How it Works</Link>
          <Link to="/account" className="text-sm text-foreground/80 hover:text-primary">Account</Link>
        </nav>
      </div>
    </header>
  );
}
