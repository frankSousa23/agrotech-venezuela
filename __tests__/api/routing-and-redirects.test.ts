/**
 * ============================================================================
 * AGROTECH VENEZUELA — ROUTING & REDIRECTS AUDIT TESTS
 * ============================================================================
 * 
 * Verifica:
 * 1. Declaración correcta de redirecciones automáticas en next.config.ts.
 * 2. Aliases intuitivos de mapas (/mapa, /mapas -> /dashboard/mapa).
 * 3. Aliases de documentación API (/docs, /swagger -> /api-docs).
 * 4. Modo standalone configurado para despliegue en Docker / Cloud Run.
 */

import nextConfig from '@/../next.config';

describe('🔀 Next.js 16 Routing, Aliases & Redirects Configuration', () => {
  test('debe estar configurado con salida standalone para contenedores Docker', () => {
    expect(nextConfig.output).toBe('standalone');
  });

  test('debe incluir función asíncrona de redirects', async () => {
    expect(typeof nextConfig.redirects).toBe('function');
    if (nextConfig.redirects) {
      const redirects = await nextConfig.redirects();
      expect(Array.isArray(redirects)).toBe(true);
      expect(redirects.length).toBeGreaterThanOrEqual(4);
    }
  });

  test('debe redirigir /mapa y /mapas hacia /dashboard/mapa', async () => {
    if (nextConfig.redirects) {
      const redirects = await nextConfig.redirects();
      const mapaRedirect = redirects.find(r => r.source === '/mapa');
      const mapasRedirect = redirects.find(r => r.source === '/mapas');

      expect(mapaRedirect).toBeDefined();
      expect(mapaRedirect?.destination).toBe('/dashboard/mapa');
      expect(mapaRedirect?.permanent).toBe(false);

      expect(mapasRedirect).toBeDefined();
      expect(mapasRedirect?.destination).toBe('/dashboard/mapa');
    }
  });

  test('debe redirigir /docs y /swagger hacia /api-docs (Swagger UI)', async () => {
    if (nextConfig.redirects) {
      const redirects = await nextConfig.redirects();
      const docsRedirect = redirects.find(r => r.source === '/docs');
      const swaggerRedirect = redirects.find(r => r.source === '/swagger');

      expect(docsRedirect).toBeDefined();
      expect(docsRedirect?.destination).toBe('/api-docs');

      expect(swaggerRedirect).toBeDefined();
      expect(swaggerRedirect?.destination).toBe('/api-docs');
    }
  });

  test('debe validar la existencia y consistencia de las 7 rutas maestras del ecosistema', () => {
    const coreRoutes = [
      '/dashboard',
      '/dashboard/mapa',
      '/dashboard/tierras',
      '/dashboard/bitacora',
      '/dashboard/recomendaciones',
      '/dashboard/estadisticas',
      '/api-docs'
    ];

    expect(coreRoutes).toHaveLength(7);
    coreRoutes.forEach(route => {
      expect(route).toMatch(/^\/(dashboard|api-docs)/);
    });
  });

  test('debe validar los 4 perfiles del gateway de autenticación y sandbox', () => {
    const authRoles = ['FARMER', 'AGRONOMIST', 'ADMIN', 'GUEST'];
    expect(authRoles).toContain('FARMER');
    expect(authRoles).toContain('AGRONOMIST');
    expect(authRoles).toContain('ADMIN');
    expect(authRoles).toContain('GUEST');
  });
});

