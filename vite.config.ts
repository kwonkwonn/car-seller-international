import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1", // Use 127.0.0.1 instead of localhost for better Naver Maps compatibility
    port: 5173,
    strictPort: true,
    // For HTTPS testing (may help with Naver Maps authentication):
    // https: true,
  },
});
