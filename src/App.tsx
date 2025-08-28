import React, { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// If you want to re-enable more pages after homepage works, uncomment these:
// import Credits from "./pages/Credits";
// import MyAuctions from "./pages/MyAuctions";
// import AuctionRoom from "./pages/AuctionRoom";

const queryClient = new QueryClient();

export default function App() {
  console.log("[Snaggle] App render (router on, homepage enabled)");
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Suspense fallback={<div className="p-6">Loading…</div>}>
            <Routes>
              {/* Homepage */}
              <Route path="/" element={<Index />} />

              {/* Add these back in once “/” is confirmed good */}
              {/*
              <Route path="/credits" element={<Credits />} />
              <Route path="/my-auctions" element={<MyAuctions />} />
              <Route path="/auction/:id" element={<AuctionRoom />} />
              */}

              {/* Common helpers */}
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
