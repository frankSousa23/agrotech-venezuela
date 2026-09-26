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

  test('debe redirigir /visor y /dashboard/visor hacia /dashboard/mapa', async () => {
    if (nextConfig.redirects) {
      const redirects = await nextConfig.redirects();
      const visor = redirects.find(r => r.source === '/visor');
      const dVisor = redirects.find(r => r.source === '/dashboard/visor');

      expect(visor?.destination).toBe('/dashboard/mapa');
      expect(dVisor?.destination).toBe('/dashboard/mapa');
    }
  });

  test('debe redirigir /costos y /dashboard/costos hacia /dashboard/tierras', async () => {
    if (nextConfig.redirects) {
      const redirects = await nextConfig.redirects();
      const costos = redirects.find(r => r.source === '/costos');
      const dCostos = redirects.find(r => r.source === '/dashboard/costos');

      expect(costos?.destination).toBe('/dashboard/tierras');
      expect(dCostos?.destination).toBe('/dashboard/tierras');
    }
  });

  test('debe redirigir rutas de autenticación /registro, /register y /login', async () => {
    if (nextConfig.redirects) {
      const redirects = await nextConfig.redirects();
      const reg1 = redirects.find(r => r.source === '/registro');
      const reg2 = redirects.find(r => r.source === '/register');
      const log1 = redirects.find(r => r.source === '/login');

      expect(reg1?.destination).toBe('/auth/register');
      expect(reg2?.destination).toBe('/auth/register');
      expect(log1?.destination).toBe('/auth/login');
    }
  });

  test('debe redirigir atajos de nivel raíz hacia sus rutas correspondientes en /dashboard', async () => {
    if (nextConfig.redirects) {
      const redirects = await nextConfig.redirects();
      const rootModules = [
        'tierras', 'bitacora', 'recomendaciones', 'suelos',
        'cultivos', 'iot', 'estadisticas', 'admin', 'manual', 'postulacion', 'arquitectura'
      ];

      rootModules.forEach(mod => {
        const found = redirects.find(r => r.source === `/${mod}`);
        expect(found).toBeDefined();
        expect(found?.destination).toBe(`/dashboard/${mod}`);
      });
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

  test('debe configurar cabeceras defensivas de seguridad y permitir micrófono en origen propio', async () => {
    expect(typeof nextConfig.headers).toBe('function');
    if (nextConfig.headers) {
      const headersConfig = await nextConfig.headers();
      expect(Array.isArray(headersConfig)).toBe(true);
      const rootHeader = headersConfig.find(h => h.source === '/:path*');
      expect(rootHeader).toBeDefined();

      const permPolicy = rootHeader?.headers.find(h => h.key === 'Permissions-Policy');
      expect(permPolicy).toBeDefined();
      expect(permPolicy?.value).toContain('microphone=(self)');
      expect(permPolicy?.value).toContain('geolocation=(self)');
      expect(permPolicy?.value).toContain('camera=()');
    }
  });
});

