import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/test-app/",
  build:{
    emptyOutDir: true,
    // outDir: "./appticles-files/",
    //assetsDir: "test-app/", // default is assets
    rollupOptions: {
      output: {
        manualChunks: () => "app",
      },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
