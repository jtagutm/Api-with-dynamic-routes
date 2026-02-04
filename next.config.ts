import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dragonball-api.com',
      },
    ],
  },
};

export default nextConfig;