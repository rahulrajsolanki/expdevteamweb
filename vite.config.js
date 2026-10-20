import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Production server port (used by `npm start` / `npm run preview`)
  preview: {
    host: "0.0.0.0",
    port: 3200,
    strictPort: true,
  },
});
