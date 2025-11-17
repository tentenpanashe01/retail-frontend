import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: base MUST be "/" 
export default defineConfig({
  plugins: [react()],
  base: "/",            // ensures correct asset paths on Netlify
  server: {
    port: 5173,         // Vite dev server port
    open: true,         // auto-open browser
  },
  build: {
    outDir: "dist",      // Vite default (Netlify expects this)
    emptyOutDir: true,
  },
});

