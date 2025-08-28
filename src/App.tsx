import React from "react";

/**
 * Temporary bootstrap view to confirm the app mounts in production.
 * Once this renders live, we’ll re-enable routing/providers incrementally.
 */
export default function App() {
  console.log("[Snaggle] App render (bootstrap)");
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <main className="max-w-xl mx-auto space-y-3">
        <h1 className="text-2xl font-bold tracking-tight">Snaggle is live ✅</h1>
        <p className="text-muted-foreground">
          This is a temporary bootstrap screen. Routing and pages are disabled for now to avoid a blank page.
        </p>

        <section className="space-y-1">
          <p className="text-sm text-muted-foreground">
            Build: <code className="px-1 py-0.5 rounded bg-muted">{import.meta.env.MODE}</code>
          </p>
          <p className="text-sm text-muted-foreground">
            If you still see a blank page after deploy, check the console for <code>[Snaggle] App render (bootstrap)</code>.
          </p>
        </section>
      </main>
    </div>
  );
}
