import fs from "node:fs";
import path from "path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";

/** Keep `dist/cyberpunk-bookmarks.html` for direct static URLs / CDN mirrors. */
function copyCyberpunkBookmarksPlugin(): Plugin {
  return {
    name: "copy-cyberpunk-bookmarks",
    closeBundle() {
      const src = path.resolve(__dirname, "src/assets/cyberpunk-bookmarks.html");
      const dest = path.resolve(__dirname, "dist/cyberpunk-bookmarks.html");
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    copyCyberpunkBookmarksPlugin(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
