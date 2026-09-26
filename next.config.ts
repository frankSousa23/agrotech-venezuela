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
      // Map & Visor aliases
      { source: '/mapa', destination: '/dashboard/mapa', permanent: false },
      { source: '/mapas', destination: '/dashboard/mapa', permanent: false },
      { source: '/visor', destination: '/dashboard/mapa', permanent: false },
      { source: '/dashboard/visor', destination: '/dashboard/mapa', permanent: false },

      // Costos / Tierras aliases
      { source: '/costos', destination: '/dashboard/tierras', permanent: false },
      { source: '/dashboard/costos', destination: '/dashboard/tierras', permanent: false },

      // Documentation & Swagger aliases
      { source: '/docs', destination: '/api-docs', permanent: false },
      { source: '/swagger', destination: '/api-docs', permanent: false },

      // Auth aliases
      { source: '/registro', destination: '/auth/register', permanent: false },
      { source: '/register', destination: '/auth/register', permanent: false },
      { source: '/login', destination: '/auth/login', permanent: false },

      // Root shortcuts to dashboard modules
      { source: '/tierras', destination: '/dashboard/tierras', permanent: false },
      { source: '/bitacora', destination: '/dashboard/bitacora', permanent: false },
      { source: '/recomendaciones', destination: '/dashboard/recomendaciones', permanent: false },
      { source: '/suelos', destination: '/dashboard/suelos', permanent: false },
      { source: '/cultivos', destination: '/dashboard/cultivos', permanent: false },
      { source: '/iot', destination: '/dashboard/iot', permanent: false },
      { source: '/estadisticas', destination: '/dashboard/estadisticas', permanent: false },
      { source: '/admin', destination: '/dashboard/admin', permanent: false },
      { source: '/manual', destination: '/dashboard/manual', permanent: false },
      { source: '/postulacion', destination: '/dashboard/postulacion', permanent: false },
      { source: '/arquitectura', destination: '/dashboard/arquitectura', permanent: false },
    ];
  },
};

export default nextConfig;
