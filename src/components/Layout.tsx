import React from "react";
import Navbar from "./Navbar";
import { Footer } from "./Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="container-xl">{children}</main>
      <Footer />
    </div>
  );
}
