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
});
