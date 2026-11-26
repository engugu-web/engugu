import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const carouselProxy = {
  '/carousel': {
    target: 'https://engugu-web.github.io',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/carousel/, '/orangeGlobalMedia-images'),
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: { proxy: carouselProxy },
  preview: { proxy: carouselProxy },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    outDir: "docs",
  },
});
