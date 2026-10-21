import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base "./" makes the built site work from any folder, including when opened directly.
export default defineConfig({
  base: "./",
  plugins: [react()],
});
