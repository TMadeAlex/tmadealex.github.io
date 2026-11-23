import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The whole site is written out as plain files (the out/ folder) for GitHub Pages.
  output: "export",

  // An organisation site is served at the root of its address, so there is no base path.
  basePath: "",

  // Pictures are served as they are: a static export has no image server.
  images: {
    unoptimized: true,
  },

  // Every page is a folder with an index.html, which is how GitHub Pages likes its addresses.
  trailingSlash: true,
};

export default nextConfig;
