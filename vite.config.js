import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig({
  server: {
    port: 3000,
    open: true, // Opens browser automatically
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Allows importing from "@/..."
    },
  },
  build: {
    target: "esnext", // Use latest JS features for smaller bundles
    outDir: "dist",   // Output directory
    assetsDir: "assets", // Sub-directory for static assets
    sourcemap: false, // Disable source maps for production
    minify: "esbuild", // Fast minification (default)
    cssCodeSplit: true, // Separate CSS files per component
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor" // Bundle all node_modules into a separate file
          }
        },
      },
    },
  },
  plugins: [
    react({
      include: "**/*.jsx", // or `**/*.{jsx,tsx}` if you're using TypeScript
      fastRefresh: true,
    }),
  ],
})
