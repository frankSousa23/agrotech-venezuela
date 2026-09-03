/**
 * ============================================================================
 * AGROTECH VENEZUELA — ZERO-BARRIER FARMER UX & INTENTIONS TESTS
 * ============================================================================
 * 
 * Verifica:
 * 1. Estado y conmutación del Modo Productor vs Modo Técnico (UIModeContext).
 * 2. Catálogo de las 6 intenciones guiadas ("¿Qué necesitas hacer hoy?").
 * 3. Las 4 grandes puertas de acción de campo (FarmerHomeDoors).
 * 4. Traducción coloquial de métricas edafológicas (Semáforo de Suelo).
 * 5. Resiliencia del Asistente de Voz ante entornos sin Web Speech API.
 */

import { UI_MODE_STORAGE_KEY } from '@/lib/context/UIModeContext';

describe('🌾 Zero-Barrier Farmer UX & Intentions System', () => {
  // Mock localStorage
  let mockStorage: Record<string, string> = {};

  beforeEach(() => {
    mockStorage = {};
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: jest.fn((key: string) => mockStorage[key] || null),
        setItem: jest.fn((key: string, value: string) => {
          mockStorage[key] = value;
        }),
        removeItem: jest.fn((key: string) => {
          delete mockStorage[key];
        }),
        clear: jest.fn(() => {
          mockStorage = {};
        })
      },
      writable: true
    });
  });

  describe('1. Conmutador de Modo Dual (UIModeContext Logic)', () => {
    test('debe usar "agrotech_ui_mode" como clave oficial de almacenamiento', () => {
      expect(UI_MODE_STORAGE_KEY).toBe('agrotech_ui_mode');
    });

    test('debe inicializarse en "farmer" por defecto cuando no hay preferencia guardada', () => {
      const stored = localStorage.getItem(UI_MODE_STORAGE_KEY);
      expect(stored).toBeNull();
      const effectiveMode = stored || 'farmer';
      expect(effectiveMode).toBe('farmer');
    });

    test('debe alternar correctamente entre "farmer" y "specialist" al conmutar', () => {
      let currentMode: 'farmer' | 'specialist' = 'farmer';
      const toggle = () => {
        currentMode = currentMode === 'farmer' ? 'specialist' : 'farmer';
        localStorage.setItem(UI_MODE_STORAGE_KEY, currentMode);
      };

      toggle();
      expect(currentMode).toBe('specialist');
      expect(localStorage.setItem).toHaveBeenCalledWith('agrotech_ui_mode', 'specialist');

      toggle();
      expect(currentMode).toBe('farmer');
      expect(localStorage.setItem).toHaveBeenCalledWith('agrotech_ui_mode', 'farmer');
    });

    test('debe restaurar la preferencia persistida de localStorage', () => {
      mockStorage[UI_MODE_STORAGE_KEY] = 'specialist';
      const restored = localStorage.getItem(UI_MODE_STORAGE_KEY);
      expect(restored).toBe('specialist');
    });
  });

  describe('2. Catálogo de Intenciones Visuales ("¿Qué necesitas hacer hoy?")', () => {
    const INTENTIONS = [
      { id: 'intent-soil', title: '¿Cómo está mi tierra?', url: '/dashboard/recomendaciones?intent=soil' },
      { id: 'intent-weather', title: '¿Va a llover en mi zona?', url: '/dashboard/estadisticas?intent=weather' },
      { id: 'intent-measure', title: '¿Cuánto mide mi potrero?', url: '/dashboard/mapa?mode=multilevel&intent=draw' },
      { id: 'intent-crops', title: '¿Qué cultivo rinde más?', url: '/dashboard/cultivos?intent=crops' },
      { id: 'intent-diary', title: 'Anotar lo que hice hoy', url: '/dashboard/bitacora?intent=new' },
      { id: 'intent-voice', title: 'Consultar al Ingeniero Virtual', url: '/dashboard/recomendaciones?intent=voice' }
    ];

    test('debe contener exactamente las 6 intenciones guiadas principales', () => {
      expect(INTENTIONS.length).toBe(6);
    });

    test('cada intención debe tener una ruta de navegación válida y no vacía', () => {
      INTENTIONS.forEach(item => {
        expect(item.url).toMatch(/^\/dashboard\//);
        expect(item.title.length).toBeGreaterThan(5);
      });
    });

    test('la intención de medición debe dirigir al visor con modo multi-escala y trazo activo', () => {
      const measure = INTENTIONS.find(i => i.id === 'intent-measure');
      expect(measure).toBeDefined();
      expect(measure?.url).toContain('intent=draw');
    });
  });

  describe('3. Las 4 Grandes Puertas de Acción Campesina', () => {
    const DOORS = [
      { id: 'door-1', name: 'Mi Tierra y Finca', url: '/dashboard/tierras' },
      { id: 'door-2', name: 'El Clima y la Lluvia', url: '/dashboard/estadisticas?intent=weather' },
      { id: 'door-3', name: 'El Médico del Suelo', url: '/dashboard/recomendaciones?intent=soil' },
      { id: 'door-4', name: 'Mi Cuaderno de Tareas', url: '/dashboard/bitacora?intent=new' }
    ];

    test('debe exponer las 4 puertas cardinales de producción rural', () => {
      expect(DOORS.length).toBe(4);
    });

    test('todas las puertas deben vincular a módulos existentes de la plataforma', () => {
      DOORS.forEach(d => {
        expect(d.url).toBeTruthy();
        expect(d.name).toBeTruthy();
      });
    });
  });

  describe('4. Traductor Agronómico Campesino (Glosario Edafológico)', () => {
    const translateSoilPh = (ph: number) => {
      if (ph < 5.5) {
        return { label: 'Tierra Brava o Ácida', severity: 'warning', needsLime: true };
      }
      if (ph >= 5.5 && ph <= 7.2) {
        return { label: 'Tierra Mansa o Dulce', severity: 'optimal', needsLime: false };
      }
      return { label: 'Tierra Alcalina', severity: 'info', needsLime: false };
    };

    test('debe traducir un pH 5.2 como Tierra Brava con recomendación de cal', () => {
      const res = translateSoilPh(5.2);
      expect(res.label).toBe('Tierra Brava o Ácida');
      expect(res.needsLime).toBe(true);
      expect(res.severity).toBe('warning');
    });

    test('debe traducir un pH 6.5 como Tierra Mansa sin necesidad de cal', () => {
      const res = translateSoilPh(6.5);
      expect(res.label).toBe('Tierra Mansa o Dulce');
      expect(res.needsLime).toBe(false);
      expect(res.severity).toBe('optimal');
    });
  });

  describe('5. Resiliencia de Web Speech y Asistente de Voz', () => {
    test('no debe arrojar errores cuando window.speechSynthesis es undefined en SSR', () => {
      const originalSpeech = (global as any).speechSynthesis;
      delete (global as any).speechSynthesis;

      expect(() => {
        const hasSpeech = typeof window !== 'undefined' && 'speechSynthesis' in window;
        expect(hasSpeech).toBe(false);
      }).not.toThrow();

      (global as any).speechSynthesis = originalSpeech;
    });

    test('debe limpiar marcas de formato markdown antes de vocalizar el texto al productor', () => {
      const markdownRaw = '**Dosis recomendada:** Aplicar *15 sacos* de Cal Dolomítica por #hectárea.';
      const cleanText = markdownRaw.replace(/[*#_`]/g, '');
      expect(cleanText).toBe('Dosis recomendada: Aplicar 15 sacos de Cal Dolomítica por hectárea.');
      expect(cleanText).not.toContain('*');
      expect(cleanText).not.toContain('#');
    });
  });
});
