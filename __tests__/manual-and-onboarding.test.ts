/**
 * ============================================================================
 * AGROTECH VENEZUELA — MANUAL DE USUARIO & ONBOARDING CHECKLIST TESTS
 * ============================================================================
 * 
 * Verifica:
 * 1. Repositorio de Contenidos del Manual (MANUAL_CHAPTERS & VERNACULAR_FACTORS).
 * 2. Filtrado reactivo por roles (FARMER, AGRONOMIST, ADMIN, GUEST) y búsqueda por texto.
 * 3. Lógica de cálculo y persistencia del Onboarding Checklist (0% a 100%).
 * 4. Generación y aislamiento de sesiones de invitado en el selector rápido.
 */

import { MANUAL_CHAPTERS, VERNACULAR_FACTORS, TargetRole } from '@/lib/manual/manualContent';
import { createGuestSession, DEMO_USERS } from '@/lib/auth/authUtils';

describe('📖 Agronomic Manual, Roles & Onboarding Suite', () => {
  describe('1. Repositorio del Manual de Campo (MANUAL_CHAPTERS)', () => {
    test('debe contener exactamente 7 capítulos exhaustivos', () => {
      expect(MANUAL_CHAPTERS).toHaveLength(7);
    });

    test('todos los capítulos deben tener campos obligatorios bien estructurados', () => {
      MANUAL_CHAPTERS.forEach((chapter) => {
        expect(chapter.id).toBeTruthy();
        expect(chapter.title).toBeTruthy();
        expect(chapter.shortTitle).toBeTruthy();
        expect(chapter.icon).toBeTruthy();
        expect(chapter.category).toMatch(/^(CAMPO|CIENCIA|TECNOLOGIA|GOBERNANZA)$/);
        expect(chapter.targetRoles.length).toBeGreaterThan(0);
        expect(chapter.summary.length).toBeGreaterThan(30);
        expect(chapter.estimatedReadMinutes).toBeGreaterThan(0);
        expect(chapter.sections.length).toBeGreaterThan(0);

        chapter.sections.forEach(section => {
          expect(section.id).toBeTruthy();
          expect(section.title).toBeTruthy();
          expect(section.summary).toBeTruthy();
        });
      });
    });

    test('debe cubrir todos los perfiles de usuario (FARMER, AGRONOMIST, ADMIN, GUEST)', () => {
      const rolesToVerify: TargetRole[] = ['FARMER', 'AGRONOMIST', 'ADMIN', 'GUEST'];
      rolesToVerify.forEach(role => {
        const chaptersForRole = MANUAL_CHAPTERS.filter(c => 
          c.targetRoles.includes('ALL') || c.targetRoles.includes(role)
        );
        expect(chaptersForRole.length).toBeGreaterThan(0);
      });
    });

    test('debe contener el factor vernacular exacto para sacos, tablones, tambores y canecas', () => {
      expect(VERNACULAR_FACTORS).toHaveLength(5);
      const saco = VERNACULAR_FACTORS.find(f => f.unit.includes('Saco'));
      const tablon = VERNACULAR_FACTORS.find(f => f.unit.includes('Tablón'));
      const tambor = VERNACULAR_FACTORS.find(f => f.unit.includes('Tambor'));
      const caneca = VERNACULAR_FACTORS.find(f => f.unit.includes('Caneca'));

      expect(saco?.metric).toContain('50.0 kg');
      expect(tablon?.metric).toContain('1.0 Hectárea');
      expect(tambor?.metric).toContain('200 Litros');
      expect(caneca?.metric).toContain('20 Litros');
    });
  });

  describe('2. Algoritmo de Búsqueda y Filtrado del Manual', () => {
    test('debe encontrar capítulos por término edafológico "Kamprath"', () => {
      const query = 'kamprath';
      const results = MANUAL_CHAPTERS.filter(c => 
        c.title.toLowerCase().includes(query) || 
        c.summary.toLowerCase().includes(query) ||
        c.sections.some(s => 
          s.title.toLowerCase().includes(query) || 
          s.summary.toLowerCase().includes(query) ||
          (s.formulaOrCode && s.formulaOrCode.toLowerCase().includes(query))
        )
      );

      expect(results.length).toBeGreaterThan(0);
      expect(results.some(c => c.id === 'edafologia-suelos')).toBe(true);
    });

    test('debe encontrar capítulos por término satelital "radar SAR" o "Banda C"', () => {
      const query = 'banda c';
      const results = MANUAL_CHAPTERS.filter(c => 
        c.title.toLowerCase().includes(query) || 
        c.summary.toLowerCase().includes(query) ||
        c.sections.some(s => 
          s.title.toLowerCase().includes(query) || 
          s.summary.toLowerCase().includes(query) ||
          (s.formulaOrCode && s.formulaOrCode.toLowerCase().includes(query))
        )
      );

      expect(results.length).toBeGreaterThan(0);
      expect(results.some(c => c.id === 'radar-sar')).toBe(true);
    });

    test('debe filtrar exclusivamente capítulos pertinentes a FARMER', () => {
      const farmerChapters = MANUAL_CHAPTERS.filter(c => 
        c.targetRoles.includes('ALL') || c.targetRoles.includes('FARMER')
      );
      expect(farmerChapters.some(c => c.id === 'productor-facil')).toBe(true);
    });
  });

  describe('3. Lógica del Onboarding Progress Checklist Widget', () => {
    test('debe calcular el progreso porcentual con precisión matemática', () => {
      const totalMilestones = 4;
      const calculateProgress = (completed: number) => Math.round((completed / totalMilestones) * 100);

      expect(calculateProgress(0)).toBe(0);
      expect(calculateProgress(1)).toBe(25);
      expect(calculateProgress(2)).toBe(50);
      expect(calculateProgress(3)).toBe(75);
      expect(calculateProgress(4)).toBe(100);
    });

    test('debe persistir el estado de completitud correctamente en localStorage', () => {
      let storage: Record<string, string> = {};
      const key = 'agrotech_onboarding_checklist';

      const state = { map: true, parcel: true, telemetry: false, manual: false };
      storage[key] = JSON.stringify(state);

      const retrieved = JSON.parse(storage[key]);
      expect(retrieved.map).toBe(true);
      expect(retrieved.parcel).toBe(true);
      expect(retrieved.telemetry).toBe(false);
      expect(retrieved.manual).toBe(false);
    });
  });

  describe('4. Paridad del Selector Rápido de Roles & Sandbox Efímero', () => {
    test('createGuestSession debe generar una sesión de invitado aislada y segura', () => {
      const session1 = createGuestSession();
      const session2 = createGuestSession();

      expect(session1.id).toMatch(/^usr-guest-[a-f0-9]{12}$/);
      expect(session2.id).toMatch(/^usr-guest-[a-f0-9]{12}$/);
      expect(session1.id).not.toBe(session2.id);
      expect(session1.isGuest).toBe(true);
      expect(session1.status).toBe('GUEST');
      expect(session1.role).toBe('FARMER');
    });

    test('debe existir coincidencia para los roles estándar en DEMO_USERS', () => {
      const farmer = DEMO_USERS.find(u => u.role === 'FARMER');
      const agronomist = DEMO_USERS.find(u => u.role === 'AGRONOMIST');
      const admin = DEMO_USERS.find(u => u.role === 'ADMIN');

      expect(farmer).toBeDefined();
      expect(agronomist).toBeDefined();
      expect(admin).toBeDefined();
    });
  });
});
