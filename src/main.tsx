import React, { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // Tailwind entrypoint

// Error boundary
type EBProps = React.PropsWithChildren<{}>;
type EBState = { hasError: boolean };

class ErrorBoundary extends React.Component<EBProps, EBState> {
  state: EBState = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
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

console.log("[Snaggle] boot start");

const rootEl = document.getElementById("root");
if (!rootEl) {
  document.body.innerHTML =
    "<div style='padding:16px;font-family:sans-serif'>Missing #root element</div>";
  throw new Error("Missing #root element");
}

createRoot(rootEl).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<div className="p-6">Loading Snaggle…</div>}>
        <App />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>
);

console.log("[Snaggle] boot mounted");
