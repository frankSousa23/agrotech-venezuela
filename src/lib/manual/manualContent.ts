/**
 * ============================================================================
 * AGROTECH VENEZUELA — MANUAL DE USUARIO & GUÍA AGRONÓMICA INTEGRADA
 * ============================================================================
 * 
 * Repositorio de contenidos estructurados para /dashboard/manual:
 * - Clasificación por capítulos y roles operativos (FARMER, AGRONOMIST, ADMIN, GUEST).
 * - Fórmulas científicas y factores de conversión vernaculares campesinos.
 * - Procedimientos de calibración de maquinaria, drones VRA y radar SAR.
 */

export type TargetRole = 'ALL' | 'FARMER' | 'AGRONOMIST' | 'ADMIN' | 'GUEST';

export interface ManualSection {
  id: string;
  title: string;
  summary: string;
  steps?: string[];
  formulaOrCode?: string;
  practicalTip?: string;
  badge?: string;
}

export interface ManualChapter {
  id: string;
  title: string;
  shortTitle: string;
  icon: string;
  category: 'CAMPO' | 'CIENCIA' | 'TECNOLOGIA' | 'GOBERNANZA';
  targetRoles: TargetRole[];
  summary: string;
  estimatedReadMinutes: number;
  sections: ManualSection[];
}

export const MANUAL_CHAPTERS: ManualChapter[] = [
  {
    id: 'productor-facil',
    title: 'Operaciones de Campo & Modo Productor Fácil',
    shortTitle: 'Modo Productor',
    icon: '🚜',
    category: 'CAMPO',
    targetRoles: ['ALL', 'FARMER', 'GUEST'],
    summary: 'Guía práctica para pequeños y medianos productores venezolanos. Cómo usar las 4 Puertas táctiles, registrar labores por voz y operar sin conexión a internet.',
    estimatedReadMinutes: 4,
    sections: [
      {
        id: 'cuatro-puertas',
        title: '1. Las 4 Puertas Táctiles de Acción Rápida',
        summary: 'En el Modo Productor Fácil, la pantalla inicial elimina menús complejos y presenta cuatro puertas grandes diseñadas para dedos en el campo y pantallas con luz solar.',
        steps: [
          'Puerta 1 (Ver mi Parcela): Abre el mapa centrado en tu lote con botones táctiles grandes de más de 48px.',
          'Puerta 2 (Agregar Labores): Permite registrar siembras, fertilizaciones o riegos dictando por voz o con 1 solo toque.',
          'Puerta 3 (¿Cuánto y Cómo Abonar?): Muestra la dosis exacta de cal y abono calculada en sacos de 50 kg.',
          'Puerta 4 (Clima y Lluvias NASA): Consulta el pronóstico agrometeorológico de lluvia acumulada para planificar la siembra.'
        ],
        practicalTip: 'Puedes alternar en cualquier momento entre el Modo Productor Fácil y el Modo Técnico usando el interruptor superior 🌱/🔬.'
      },
      {
        id: 'dictado-voz',
        title: '2. Dictado Vernacular por Voz (Web Speech API)',
        summary: 'No necesitas escribir en un teclado pequeño mientras trabajas la tierra. Pulsa el micrófono y habla de manera natural con los términos campesinos tradicionales.',
        steps: [
          'Abre el Cuaderno de Campo o pulsa el botón flotante del micrófono.',
          'Di por ejemplo: "Hoy apliqué 30 sacos de cal dolomítica en el tablón 2 por el canal norte".',
          'El sistema normaliza automáticamente "sacos" a 50 kg (1,500 kg) y "tablón" a 1.0 hectárea, registrando 1.5 t/ha en la base de datos sin errores de cálculo.'
        ],
        formulaOrCode: '1 Saco = 50.0 kg | 1 Tablón = 1.0 ha (10,000 m²) | 1 Tambor = 200 L | 1 Caneca = 20 L',
        practicalTip: 'El reconocedor es insensible a acentos regionales y funciona con modismos de Portuguesa, Guárico, Barinas y Zulia.'
      },
      {
        id: 'modo-offline',
        title: '3. Resiliencia y Funcionamiento Offline en Finca',
        summary: 'El sistema almacena automáticamente tus parcelas y mapas en el almacenamiento local del dispositivo mediante IndexedDB y SQLite WAL geodésico.',
        steps: [
          'Si la señal celular se pierde en el lote, el indicador superior cambia a "Modo Rural (Offline)".',
          'Puedes continuar trazando tablones y anotando labores en la bitácora con normalidad.',
          'Al recuperar conectividad (al llegar a la casa o pueblo), la cola de cambios se sincroniza automáticamente con el servidor central.'
        ],
        badge: 'Resiliencia Rural PWA'
      }
    ]
  },
  {
    id: 'radar-sar',
    title: 'Teledetección Satelital & Radar SAR Sentinel-1',
    shortTitle: 'Radar SAR & Satélites',
    icon: '🛰️',
    category: 'CIENCIA',
    targetRoles: ['ALL', 'AGRONOMIST'],
    summary: 'Monitoreo territorial continuo sin interferencia de nubes mediante radar de apertura sintética en Banda C y series históricas multiespectrales.',
    estimatedReadMinutes: 6,
    sections: [
      {
        id: 'penetracion-nubes',
        title: '1. Penetración de Cobertura Nubosa con Banda C',
        summary: 'En regiones tropicales como el Sur del Lago de Maracaibo o los llanos occidentales, la nubosidad cubre hasta 8 meses del año. Los satélites ópticos tradicionales (Sentinel-2, Landsat) quedan ciegos; el radar SAR de Sentinel-1 emite microondas activas de ~5.6 cm que traspasan la lluvia y las nubes.',
        steps: [
          'Activa la capa "📡 Radar SAR (Humedad Suelo)" en el visor WebGIS.',
          'El sistema procesa la retrodispersión polarizada dual VV (Vertical-Vertical) y VH (Vertical-Horizontal).',
          'Los valores de retrodispersión en decibelios (dB) se traducen en el índice volumétrico de humedad sin esperar que se despeje el cielo.'
        ],
        formulaOrCode: 'σ°_dB = 10 · log10(Digital_Number) + Calibration_Factor',
        practicalTip: 'Utiliza la capa SAR especialmente durante los meses de mayo a noviembre para confirmar humedad antes de la siembra de maíz.'
      },
      {
        id: 'gdd-termico',
        title: '2. Grados Día de Crecimiento (GDD) y Balance Hídrico',
        summary: 'Motor hidrotérmico para predecir fenología del cultivo cruzando temperatura diurna/nocturna y evapotranspiración de cultivo (ETc) con NASA POWER.',
        steps: [
          'Calcula la acumulación térmica diaria con base 10.0°C y techo 30.0°C.',
          'Calcula el balance mensual P - ETc (Precipitación menos Evapotranspiración).',
          'Identifica ventanas óptimas de cosecha y periodos de estrés de polinización.'
        ],
        formulaOrCode: 'GDD = max(0, ((T_max + T_min) / 2) - T_base)  [T_base = 10.0°C]',
        badge: 'NASA POWER + FAO-56'
      }
    ]
  },
  {
    id: 'edafologia-suelos',
    title: 'Calibración Edafológica & Encalado Regional',
    shortTitle: 'Suelos & Encalado',
    icon: '🧪',
    category: 'CIENCIA',
    targetRoles: ['ALL', 'AGRONOMIST', 'FARMER'],
    summary: 'Formulaciones científicas de neutralización de acidez y balance de bases regionalizadas para suelos venezolanos.',
    estimatedReadMinutes: 5,
    sections: [
      {
        id: 'kamprath-modificado',
        title: '1. Modelo Kamprath de Encalado',
        summary: 'Ecuación adaptada para sabanas ácidas orientales y llaneras con presencia de aluminio intercambiable fitotóxico (Al³⁺). Neutraliza la acidez sin inducir deficiencias de micronutrientes por sobreencalado.',
        formulaOrCode: 'Dosis Cal (t/ha) = (1.5 × Al³⁺ [meq/100g] × 100) / PRNT',
        steps: [
          'Introduce los miliequivalentes de Al³⁺ del análisis de laboratorio o selecciona tu estado.',
          'Introduce el Poder Relativo de Neutralización Total (PRNT) de la cal comercial (ej: 80%).',
          'El sistema emite la dosis exacta en toneladas métricas por hectárea y el número de sacos de 50 kg.'
        ],
        practicalTip: 'Para cal con PRNT 85% y Al³⁺ de 1.2 meq/100g: Dosis = (1.5 × 1.2 × 100) / 85 = 2.11 t/ha (~42 sacos/ha).'
      },
      {
        id: 'balance-camg',
        title: '2. Balance de Bases Ca:Mg en el Sur del Lago',
        summary: 'En los suelos aluviales del Sur del Lago de Maracaibo, el desbalance calcio:magnesio provoca problemas de absorción en plátano y palma aceitera. Se recomienda una relación Ca:Mg de 3:1 a 4:1 aplicando cal dolomítica (rica en magnesio).',
        practicalTip: 'Si el análisis reporta magnesio < 0.8 meq/100g, prioriza cal dolomítica sobre cal calcítica pura.'
      },
      {
        id: 'yeso-agricola-quibor',
        title: '3. Corrección de Suelos Alcalinos y Salino-Sódicos (Quíbor, Lara)',
        summary: 'En el Valle de Quíbor y zonas semiáridas de Lara con pH ≥ 7.4 y alta conductividad eléctrica, NO se debe aplicar cal. Se prescribe Yeso Agrícola (CaSO₄·2H₂O) a 2.5 t/ha para que el calcio desplace al sodio tóxico del complejo de intercambio.',
        formulaOrCode: 'Reacción: Suelo-2Na⁺ + CaSO₄ → Suelo-Ca²⁺ + Na₂SO₄ (lixiviable con riego)',
        badge: 'Específico Valle de Quíbor'
      }
    ]
  },
  {
    id: 'maquinaria-drones',
    title: 'Prescripciones para Maquinaria GPS & Drones VRA',
    shortTitle: 'Maquinaria & VRA',
    icon: '🚜',
    category: 'TECNOLOGIA',
    targetRoles: ['ALL', 'AGRONOMIST', 'FARMER'],
    summary: 'Exportación de mapas de tasa variable para tractores con piloto GPS, misiones de vuelo para drones agrícolas y fichas de cabina.',
    estimatedReadMinutes: 5,
    sections: [
      {
        id: 'shapefile-gps',
        title: '1. Paquetes ESRI Shapefile para Tractores con GPS',
        summary: 'Generación directa de archivos vectoriales listos para cargar en monitores de siembra y abonado John Deere GreenStar, Trimble AgGPS o Raven.',
        steps: [
          'Navega al Asesor IA o a la ficha de tu parcela.',
          'Haz clic en "Descargar Paquete Shapefile VRA".',
          'El archivo .ZIP incluye los ficheros .shp, .shx, .dbf y .prj en coordenadas UTM Zona 19N WGS84 con los atributos RATE_LIME, RATE_NPK y AREA_HA.'
        ],
        formulaOrCode: 'Atributos DBF: ID_POL | AREA_HA | RATE_LIME (kg/ha) | RATE_NPK (kg/ha) | VEL_KMH',
        badge: 'UTM 19N WGS84'
      },
      {
        id: 'drones-kml',
        title: '2. Misiones de Vuelo KML para Drones Agrícolas',
        summary: 'Polígonos georreferenciados para drones aspersores (DJI Agras T30/T40, XAG P100).',
        steps: [
          'Descarga el archivo .KML desde la sección de Maquinaria.',
          'Cópialo en la tarjeta MicroSD o expórtalo a la aplicación DJI Agras.',
          'El dron delimita automáticamente la franja de aspersión y ajusta el flujo de boquillas según la zona de vigor.'
        ],
        practicalTip: 'Configura la altura de vuelo a 2.5 metros sobre el dosel para evitar deriva por vientos alisios.'
      },
      {
        id: 'cabina-analogica',
        title: '3. Ficha de Cabina para Tractores Convencionales',
        summary: 'Para productores sin computadoras de abordo ni GPS, el sistema genera una ficha de calibración mecánica de tolva.',
        steps: [
          'Fija la velocidad del tractor a 6.0 km/h (marcha 2da media a 1,800 RPM de motor).',
          'Ajusta la palanca dosificadora de la tolva al orificio calibrado según los sacos recomendados por tablón.',
          'Revisa el patrón de caída en los primeros 50 metros para asegurar distribución uniforme.'
        ],
        practicalTip: 'Puedes imprimir la Ficha de Cabina desde el botón superior de esta página.'
      }
    ]
  },
  {
    id: 'carbono-mrv',
    title: 'Créditos de Carbono SOC & Oráculo Satelital MRV',
    shortTitle: 'Carbono & MRV',
    icon: '🌿',
    category: 'CIENCIA',
    targetRoles: ['ALL', 'AGRONOMIST'],
    summary: 'Cuantificación de carbono orgánico del suelo (0-30 cm) y validación de adición bajo estándares internacionales Verra VCS / IPCC Tier 2.',
    estimatedReadMinutes: 5,
    sections: [
      {
        id: 'soc-stock',
        title: '1. Cálculo de Stock de Carbono Orgánico en Suelo (SOC)',
        summary: 'Determina las toneladas de carbono orgánico fijadas en el perfil arable (0 a 30 cm) utilizando el porcentaje de materia orgánica y la densidad aparente regionalizada.',
        formulaOrCode: 'Stock SOC (tC/ha) = (MO% / 1.724) × Densidad_Aparente (g/cm³) × Profundidad (30 cm) × (1 - Pedregosidad)',
        steps: [
          'Introduce los datos de materia orgánica del muestreo de suelo.',
          'El sistema aplica el factor de conversión estequiométrico 44/12 para expresar el stock en tCO₂e/ha.',
          'Calcula el secuestro anual generado por la transición a siembra directa, rotación con leguminosas y enmiendas bio-regenerativas.'
        ]
      },
      {
        id: 'oraculo-sar',
        title: '2. Oráculo Satelital Radar SAR para Verificación MRV',
        summary: 'Mecanismo de auditoría continua en /api/mrv/sar-oracle que cruza las anotaciones de la bitácora con la rugosidad superficial medida por Sentinel-1.',
        steps: [
          'Compara la relación polarimétrica VH/VV antes y después de la supuesta labor.',
          'Verifica si hubo labranza real o cobertura vegetal remanente (σ°_VH / σ°_VV > -12 dB).',
          'Reduce la penalización por incertidumbre del estándar Verra del 40% tradicional al 10%, aumentando el valor comercial del crédito.'
        ],
        badge: 'IPCC Tier 2 / Verra VCS'
      }
    ]
  },
  {
    id: 'iot-telemetria',
    title: 'Laboratorio IoT, Sondas de Suelo & Telemetría',
    shortTitle: 'Laboratorio IoT',
    icon: '📡',
    category: 'TECNOLOGIA',
    targetRoles: ['ALL', 'AGRONOMIST', 'ADMIN'],
    summary: 'Monitoreo en tiempo real con sondas de humedad volumétrica TDR (10, 20, 40 cm), conductividad eléctrica y activación de riego.',
    estimatedReadMinutes: 4,
    sections: [
      {
        id: 'saxton-rawls',
        title: '1. Curvas de Agua Disponible (PAW) con Modelo Saxton-Rawls',
        summary: 'Regionalización edafológica que define los umbrales críticos de marchitez permanente (PWP) y capacidad de campo (FC) según el tipo de suelo.',
        formulaOrCode: 'PAW% = ((Humedad_Actual - PWP) / (FC - PWP)) × 100',
        steps: [
          'Suelos Arenosos: Umbral crítico de sequía θ_crit = 9%.',
          'Suelos Francos: Umbral crítico de sequía θ_crit = 20%.',
          'Suelos Arcillosos: Umbral crítico de sequía θ_crit = 35%.',
          'Si el PAW cae por debajo del 50%, el sistema activa una alerta visual y la sugerencia de fertirriego.'
        ]
      },
      {
        id: 'ingestion-api',
        title: '2. Conexión de Estaciones Meteorológicas y Nodos ESP32',
        summary: 'Los productores e investigadores pueden transmitir telemetría desde sus propios dispositivos IoT mediante HTTP POST.',
        formulaOrCode: 'POST /api/iot/telemetry\nHeader: Authorization: Bearer <token>\nBody: { "nodeId": "ESP32-01", "soilMoisture10cm": 24.5, "temp": 28.2 }',
        practicalTip: 'El simulador en /dashboard/iot permite probar todos los escenarios sin necesidad de hardware físico.'
      }
    ]
  },
  {
    id: 'seguridad-roles',
    title: 'Gobernanza, Roles, Permisos & Modo Invitado',
    shortTitle: 'Roles & Seguridad',
    icon: '🛡️',
    category: 'GOBERNANZA',
    targetRoles: ['ALL', 'ADMIN', 'GUEST'],
    summary: 'Control de acceso basado en roles (RBAC), ciclo de vida de usuarios y el sandbox efímero para evaluadores y jurado.',
    estimatedReadMinutes: 4,
    sections: [
      {
        id: 'roles-sistema',
        title: '1. Matriz de Roles y Niveles de Acceso',
        summary: 'El sistema implementa cuatro perfiles con límites operativos claros:',
        steps: [
          'FARMER (Productor): Acceso al Modo Productor Fácil, gestión de parcelas propias, bitácora vernacular y consultas climáticas.',
          'AGRONOMIST (Ingeniero): Acceso a diagnósticos edafológicos, capas radar SAR, exportadores VRA de maquinaria y calculadora de carbono.',
          'ADMIN (Administrador): Gestión del panel /dashboard/admin, aprobación de cuentas de usuarios pendientes y telemetría global.',
          'GUEST (Invitado): Sesión sandbox efímera (usr-guest-*) con parcelas muestra pre-cargadas en Portuguesa y Guárico.'
        ]
      },
      {
        id: 'sandbox-invitado',
        title: '2. Seguridad del Modo Invitado',
        summary: 'Garantiza que jurados o evaluadores exploren todas las funciones del sistema sin poder alterar o filtrar datos de productores reales.',
        steps: [
          'Se activa en 1 clic pulsando "🚀 Demo" en el selector lateral.',
          'Crea un entorno aislado con muestras reales de maíz y arroz.',
          'Todas las mutaciones se aíslan localmente para no afectar la base de producción.'
        ],
        badge: 'Aislamiento Criptográfico'
      }
    ]
  }
];

export const VERNACULAR_FACTORS = [
  { unit: '1 Saco', metric: '50.0 kg (0.05 t)', useCase: 'Cal agrícola, fertilizante granulado NPK, urea, semilla de maíz.' },
  { unit: '1 Tambor', metric: '200 Litros (0.2 m³)', useCase: 'Biofertilizante líquido, almacenamiento de agua, caldos minerales.' },
  { unit: '1 Caneca / Pimpina', metric: '20 Litros (5 galones)', useCase: 'Pesticidas, foliares, micronutrientes, transporte manual.' },
  { unit: '1 Tablón', metric: '1.0 Hectárea (10,000 m²)', useCase: 'Lote delimitado por canales o guardarrayas en llanos y vegas.' },
  { unit: '1 Garrafa', metric: '5 Litros (1.32 gal)', useCase: 'Coadyuvantes, adherentes, reguladores de crecimiento.' },
];
