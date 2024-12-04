import { defineConfig, AliasOptions } from "vite";
import react from "@vitejs/plugin-react-swc";
//@ts-expect-error import
import path from "path";

//@ts-expect-error import
const root = path.resolve(__dirname, "src");

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": root
    } as AliasOptions
  },
  server: {
    port: 3000,
    proxy : {
      '/api/' : {
        target: 'http://localhost:8000/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    cors: {
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      preflightContinue: false,
      optionsSuccessStatus: 204
    }
  }
});
