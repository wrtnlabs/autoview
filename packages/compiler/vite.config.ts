import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      outDir: "dist",
      module: "ES2020",
      target: "ES2020",
    }),
    terser({
      format: {
        comments: "some",
        beautify: true,
      },
      compress: false,
      mangle: false,
      module: true,
    }),
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      input: "./src/index.ts",
      output: {
        dir: "dist",
      },
    },
    lib: {
      entry: "./src/index.ts",
      name: "AutoViewCompiler",
      fileName: "index",
    },
  },
});
