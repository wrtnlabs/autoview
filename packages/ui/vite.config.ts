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
      external: [
        "react",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "@emotion/react",
        "@emotion/styled",
        "@mui/material",
        "@fortawesome/react-fontawesome",
        "@fortawesome/fontawesome-svg-core",
        "@fortawesome/free-brands-svg-icons",
        "@fortawesome/free-solid-svg-icons",
        "embla-carousel",
        "embla-carousel-autoplay",
        "embla-carousel-fade",
        "embla-carousel-react",
      ],
      output: {
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
