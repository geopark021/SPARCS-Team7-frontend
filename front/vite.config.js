import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://clovastudio.stream.ntruss.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
      },
      "/ncloud": {
        // naver cloud bucket 접근
        target: "https://kr.object.ncloudstorage.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ncloud/, ""),
        secure: false,
      },
    },
  },
});
