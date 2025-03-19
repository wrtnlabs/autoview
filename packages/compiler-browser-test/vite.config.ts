import typia from "@ryoppippi/unplugin-typia/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [typia(), react()],
});
