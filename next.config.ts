import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Linting is run separately in CI; don't block Vercel builds on lint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
