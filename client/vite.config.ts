import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@shared": path.resolve(import.meta.dirname, "..", "shared"),
      "zod": path.resolve(import.meta.dirname, "node_modules", "zod"),
      "drizzle-orm": path.resolve(import.meta.dirname, "node_modules", "drizzle-orm"),
      "drizzle-zod": path.resolve(import.meta.dirname, "node_modules", "drizzle-zod"),
    },
  },
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    commonjsOptions: {
      include: [/shared/, /node_modules/],
    },
    rollupOptions: {
      // external: [/^drizzle-orm/, /^drizzle-zod/],
    },
  },
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(),
        autoprefixer(),
      ],
    },
  },
});
