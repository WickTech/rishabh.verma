import type { NextConfig } from "next";

// Security headers. CSP is deliberately limited to frame-ancestors: a script/style
// CSP would break the inline pre-paint theme script and Vercel Analytics.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // Axion was formerly AI-Orc; keep old links working
      { source: "/projects/ai-orc", destination: "/projects/axion", permanent: true },
    ];
  },
};

export default nextConfig;
