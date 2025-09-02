import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";

// PAGES (keep Home/ListingDetail so nothing breaks)
import Home from "@/pages/Home";
import ListingDetail from "@/pages/ListingDetail";
import Index from "@/pages/Index";

// FRAME (header + footer)
// Footer is a NAMED export; Navbar is a DEFAULT export (match your project)
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";

function Frame() {
  return (
    <div
      className="min-h-screen flex flex-col text-foreground"
      style={{
        background:
          "radial-gradient(1000px 600px at 30% 0%, hsl(var(--primary)/0.15), transparent 70%), black",
      }}
    >
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      {/* App shell with header/footer */}
      <Route element={<Frame />}>
        {/* Landing page as home */}
        <Route index element={<Index />} />

        {/* Keep your existing routes so nothing regresses */}
        <Route path="/live" element={<Home />} />
        <Route path="/listing/:id" element={<ListingDetail />} />

        {/* Optional: map "/" old home if you ever want it reachable */}
        {/* <Route path="/home" element={<Home />} /> */}
      </Route>
    </Routes>
  );
}
