import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  env: {
    PUBLIC_API_URL: "http://localhost:5500/api/v1",
  },
};

export default nextConfig;
