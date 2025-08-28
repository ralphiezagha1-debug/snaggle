import React, { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppShell from "@/components/layout/AppShell";
import "./index.css";

// Lazy pages
const Index = lazy(() => import("@/pages/Index"));
const Credits = lazy(() => import("@/pages/Credits"));
const MyAuctions = lazy(() => import("@/pages/MyAuctions"));
const AuctionRoom = lazy(() => import("@/pages/AuctionRoom"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// ErrorBoundary with typed children
type EBProps = React.PropsWithChildren<{}>;
type EBState = { hasError: boolean };
class ErrorBoundary extends React.Component<EBProps, EBState> {
  state: EBState = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(err: unknown, info: unknown) {
    console.error("[Snaggle] root error", err, info);
  }
  render() {
    if (this.state.hasError) {
      return <div className="p-6">App failed to load.</div>;
    }
    return this.props.children ?? null;
  }
}

const queryClient = new QueryClient();

// Boot
console.log("[Snaggle] boot start");
const rootEl = document.getElementById("root");
if (!rootEl) {
  document.body.innerHTML = "<div style='padding:16px;font-family:sans-serif'>Missing #root element</div>";
  throw new Error("Missing #root element");
}

createRoot(rootEl).render(
  <StrictMode>
    <ErrorBoundary>
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
    </ErrorBoundary>
  </StrictMode>
);

console.log("[Snaggle] boot mounted");
