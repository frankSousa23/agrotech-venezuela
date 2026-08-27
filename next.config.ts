import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      { source: '/mapa', destination: '/dashboard/mapa', permanent: false },
      { source: '/mapas', destination: '/dashboard/mapa', permanent: false },
      { source: '/docs', destination: '/api-docs', permanent: false },
      { source: '/swagger', destination: '/api-docs', permanent: false },
    ];
  },
};

export default nextConfig;
