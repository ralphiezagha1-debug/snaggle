import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  // Optional: keeps dev server stable on Windows; safe to keep for local dev
  server: {
    port: 5173,
    host: true,
  },
  // Optional: cleaner build output
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
