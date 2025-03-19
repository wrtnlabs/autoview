import typia from "@ryoppippi/unplugin-typia/vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    typia(),
    react(),
    {
      name: "wasm-middleware",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.endsWith(".wasm")) {
            const wasmPath = path.join(
              __dirname,
              "node_modules/@rollup/browser/dist",
              path.basename(req.url),
            );
            const wasmFile = fs.readFileSync(wasmPath);
            res.setHeader("Content-Type", "application/wasm");
            res.end(wasmFile);
            return;
          }
          next();
        });
      },
    },
  ],
});
