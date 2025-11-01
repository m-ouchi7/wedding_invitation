import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// ここではフロントとバックが docker-compose 上で別サービスとして動く前提
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',         // コンテナ外（ホスト）からもアクセス可能に
    port: 5173,              // Reactのデフォルトポート
    strictPort: true,
    watch: {
      usePolling: true,      // Docker環境でファイル変更を検知させる設定
    },
    proxy: {
      "/api": {
        target: "http://backend:3000", // docker-compose.yml のサービス名に一致
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // /api → Railsルートに変換
      },
    },
  },
});
