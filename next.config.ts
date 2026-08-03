import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root; without it Turbopack walks up and picks up an
  // unrelated lockfile living in the user's home directory.
  turbopack: {
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
