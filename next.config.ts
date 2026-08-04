import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root; without it Turbopack walks up and picks up an
  // unrelated lockfile living in the user's home directory.
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  // The whole site is static (no route handlers, server actions, cookies, or
  // dynamic routes), so it exports to plain HTML/CSS/JS in `out/` — which is
  // also what a Render "Static Site" service expects as its publish
  // directory. Without this, `next build` only produces `.next` for a Node
  // server, and Render's static-site deploy has nothing to publish.
  output: "export",
  images: {
    // Static export can't run the Image Optimization API (no server to host
    // it). Every <Image> in this project already points at local SVGs, which
    // Next treats as unoptimized automatically — this just makes that
    // explicit and keeps it true if a raster image is ever added.
    unoptimized: true,
  },
};

export default nextConfig;
