import { defineConfig } from "vite";            // helper that gives your editor autocomplete for the config
import react from "@vitejs/plugin-react";       // lets Vite understand JSX (keep the import line the template gave you if it's different)

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3044,         // the port you want; any free number works
    strictPort: true,   // fail with an error if it's taken, instead of quietly picking another one
    proxy: { "/api": "http://localhost:5020" },
  },
});