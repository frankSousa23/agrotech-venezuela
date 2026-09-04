import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(self), geolocation=(self)',
          },
        ],
      },
    ];
  },
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
