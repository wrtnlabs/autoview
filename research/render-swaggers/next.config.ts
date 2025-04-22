import unTypiaNext from "@ryoppippi/unplugin-typia/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
};

export default unTypiaNext(nextConfig);
