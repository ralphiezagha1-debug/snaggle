import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppShell from "@/components/layout/AppShell";

// Lazy pages
const Index = lazy(() => import("@/pages/Index"));
const Credits = lazy(() => import("@/pages/Credits"));
const MyAuctions = lazy(() => import("@/pages/MyAuctions"));
const AuctionRoom = lazy(() => import("@/pages/AuctionRoom"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Suspense fallback={<div className="p-6">Loading…</div>}>
            <Routes>
              {/* Layout route */}
              <Route path="/" element={<AppShell />}>
                <Route index element={<Index />} />
                <Route path="credits" element={<Credits />} />
                <Route path="my-auctions" element={<MyAuctions />} />
                <Route path="auction/:id" element={<AuctionRoom />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
