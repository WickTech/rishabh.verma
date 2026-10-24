import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Axion was formerly AI-Orc; keep old links working
      { source: "/projects/ai-orc", destination: "/projects/axion", permanent: true },
    ];
  },
};

export default nextConfig;
