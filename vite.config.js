import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Pages from 'vite-plugin-pages';

export default defineConfig({
  plugins: [
    react(),
    Pages(),
  ],
  resolve: {
    alias: {
      util: "util/",
      process: "process/browser",
    },
  },
  define: {
    global: "window",
    process: {
      env: {},
    },
  },
  
});
