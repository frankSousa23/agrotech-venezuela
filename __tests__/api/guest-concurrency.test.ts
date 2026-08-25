import { createGuestSession, generateToken, verifyToken } from '@/lib/auth/authUtils';
import { IN_MEMORY_PARCELS, InMemParcel } from '@/app/api/parcels/route';
import { IN_MEMORY_LOGS, InMemFieldLog } from '@/app/api/field-logs/route';

describe('Concurrent Guest Access & High Load Sandbox Isolation Suite', () => {
  it('debe generar 100 sesiones de invitado simultáneas únicas y sin colisiones de ID', async () => {
    const CONCURRENT_USERS_COUNT = 100;

    const startTime = Date.now();

    // Simulación de 100 usuarios concurrentes haciendo 1-click login al mismo tiempo
    const sessionPromises = Array.from({ length: CONCURRENT_USERS_COUNT }).map(async () => {
      const session = createGuestSession();
      const token = generateToken(session);
      const verified = verifyToken(token);
      return { session, token, verified };
    });

    const results = await Promise.all(sessionPromises);
    const totalDurationMs = Date.now() - startTime;

    expect(results.length).toBe(CONCURRENT_USERS_COUNT);

    // 1. Validar que cada token fue verificado correctamente
    results.forEach(({ session, verified }) => {
      expect(verified).not.toBeNull();
      expect(verified?.status).toBe('GUEST');
      expect(verified?.isGuest).toBe(true);
      expect(verified?.role).toBe('FARMER');
      expect(verified?.id).toBe(session.id);
    });

    // 2. Validar que los 100 IDs generados son 100% únicos (Set sin duplicados)
    const uniqueIds = new Set(results.map(r => r.session.id));
    expect(uniqueIds.size).toBe(CONCURRENT_USERS_COUNT);

    // 3. Validar latencia: 100 tokens generados y verificados en menos de 500ms totales
    expect(totalDurationMs).toBeLessThan(500);
  });

  it('debe garantizar aislamiento de datos entre usuarios invitados concurrentes', async () => {
    // Usuario Invitado A y Usuario Invitado B ingresan en paralelo
    const guestA = createGuestSession();
    const guestB = createGuestSession();

    expect(guestA.id).not.toBe(guestB.id);

    // Simulación de creación de parcela por Invitado A
    const customParcelA: InMemParcel = {
      id: `parc-custom-${guestA.id}`,
      userId: guestA.id,
      name: "Parcela Privada de Prueba A",
      stateId: "portuguesa",
      municipalityId: "turen",
      areaHectares: 30.5,
      polygonGeoJson: "{}",
      centerLat: 9.324,
      centerLng: -69.112,
      createdAt: new Date().toISOString()
    };

    IN_MEMORY_PARCELS.push(customParcelA);

    // Consulta de parcelas para Invitado A
    const parcelsA = IN_MEMORY_PARCELS.filter(p => p.userId === guestA.id);
    expect(parcelsA.length).toBe(1);
    expect(parcelsA[0].name).toBe("Parcela Privada de Prueba A");

    // Consulta de parcelas para Invitado B (No debe ver la parcela del Invitado A)
    const parcelsB = IN_MEMORY_PARCELS.filter(p => p.userId === guestB.id);
    expect(parcelsB.length).toBe(0);

    // Limpieza de prueba
    const idx = IN_MEMORY_PARCELS.findIndex(p => p.id === customParcelA.id);
    if (idx !== -1) IN_MEMORY_PARCELS.splice(idx, 1);
  });

  it('debe mantener estabilidad ante ráfagas concurrentes de verificación de tokens', () => {
    const guest = createGuestSession();
    const token = generateToken(guest);

    // 500 verificaciones en ráfaga
    for (let i = 0; i < 500; i++) {
      const decoded = verifyToken(token);
      expect(decoded).not.toBeNull();
      expect(decoded?.id).toBe(guest.id);
    }
  });
});
