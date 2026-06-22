import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Workaround for Windows/OneDrive file locking causing EPERM unlink during builds.
  // Disable incremental compilation so Next rewrites less aggressively under `.next`.
  // Intentionally left minimal.
};



export default nextConfig;
