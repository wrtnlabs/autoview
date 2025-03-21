import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      outDir: "dist",
    }),
  ],
  build: {
    sourcemap: true,
    rollupOptions: {
      input: "./src/index.ts",
      external: ["react", "react/jsx-runtime", "react/jsx-dev-runtime"],
      output: {
        globals: {
          react: "React",
          "react/jsx-runtime": "ReactJsxRuntime",
          "react/jsx-dev-runtime": "ReactJsxDevRuntime",
        },
        dir: "dist",
      },
    },
    lib: {
      entry: "./src/index.ts",
      name: "AutoViewUI",
      fileName: "index",
    },
  },
});
