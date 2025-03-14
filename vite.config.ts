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
  build:{
    outDir: './dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'utils-vendor': [
            'axios',
            'browser-image-compression', 
            'react-dropzone',
            '@tanstack/react-query',
            '@formkit/tempo'
          ]
        },
        chunkFileNames: "assets/[name].[hash].js",
        entryFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    }
  },
  server: {
    port: 3000,
  }
});
