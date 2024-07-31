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
        target: "https://kr.object.ncloudstorage.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ncloud/, ""),
        secure: false,
        configure: (proxy, _options) => {
          proxy.on("proxyReq", (proxyReq, req, res) => {
            Object.keys(req.headers).forEach((key) => {
              proxyReq.setHeader(key, req.headers[key]);
            });
          });
          proxy.on("proxyRes", (proxyRes, req, res) => {
            proxyRes.headers["Access-Control-Allow-Origin"] = "*";
            proxyRes.headers["Access-Control-Allow-Methods"] =
              "GET,PUT,POST,DELETE,OPTIONS";
            proxyRes.headers["Access-Control-Allow-Headers"] =
              "Content-Type, Authorization, Content-Length, X-Requested-With";
          });
        },
      },
      "/object-storage": {
        target: "https://kr.object.ncloudstorage.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/object-storage/, ""),
        secure: false,
        configure: (proxy, _options) => {
          proxy.on("proxyReq", (proxyReq, req, res) => {
            Object.keys(req.headers).forEach((key) => {
              proxyReq.setHeader(key, req.headers[key]);
            });
          });
          proxy.on("proxyRes", (proxyRes, req, res) => {
            proxyRes.headers["Access-Control-Allow-Origin"] = "*";
            proxyRes.headers["Access-Control-Allow-Methods"] =
              "GET,PUT,POST,DELETE,OPTIONS";
            proxyRes.headers["Access-Control-Allow-Headers"] =
              "Content-Type, Authorization, Content-Length, X-Requested-With";
          });
        },
      },
    },
  },
});
