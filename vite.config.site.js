import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    {
      name: "transform-html",
      apply: "build",
      transformIndexHtml(html) {
        return html.replaceAll(/\/site\/main-/g, "main-");
      },
    },
  ],
  build: {
    assetsDir: "site",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "site/index.html"),
      },
    },
  },
});
