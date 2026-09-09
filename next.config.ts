import type { NextConfig } from "next";

const pagesBasePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: pagesBasePath,
  assetPrefix: pagesBasePath || undefined,
  images: {
    loader: "custom",
    loaderFile: "./data/staticImageLoader.ts",
  },
};

export default nextConfig;
