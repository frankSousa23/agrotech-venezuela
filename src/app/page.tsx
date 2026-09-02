"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { 
  Sprout, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Droplets, 
  Layers, 
  Compass,
  FileCode2,
  CheckCircle2,
  Tractor,
  BookOpen,
  FlaskConical,
  Trees,
  BarChart3,
  Cpu,
  Radio,
  UserCheck,
  Shield,
  Zap,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Gauge,
  Activity
} from 'lucide-react';

export default function Home() {
  const [activeDemo, setActiveDemo] = useState<'turen' | 'sur_lago' | 'merida' | 'amazonas'>('turen');

  const DEMOS = {
    turen: {
      title: 'Lote Turén (Portuguesa) • Polo Cerealero',
      coords: 'Lat 9.32° N, Lon -69.11° W',
      history: '38 años en agricultura continua (1986–2024)',
      ph: '6.4 (Óptimo / Neutro)',
      water: '72% Persistencia hídrica (NASA POWER 1,480 mm)',
      sarRadar: 'SAR -12.4 dB • Suelo con saturación hídrica óptima',
      topCrop: 'Maíz Blanco Harinero & Soya',
      status: 'Apto para Alta Densidad & Siembra Directa',
      iotStatus: '4 Nodos ESP32 Activos • Humedad 28.5% VWC'
    },
    sur_lago: {
      title: 'Sur del Lago (Zulia) • Agroforestal & Aluvial',
      coords: 'Lat 8.98° N, Lon -71.55° W',
      history: '25 años de pastura a policultivo intensivo',
      ph: '5.2 (Ácido • Requiere Cal Dolomítica)',
      water: '88% Persistencia hídrica (2,250 mm)',
      sarRadar: 'SAR -9.8 dB • Aluviones con drenaje moderado',
      topCrop: 'Cacao Criollo Porcelana / Plátano Hartón',
      status: 'Enmienda con Calcio/Magnesio + Drenajes',
      iotStatus: 'Sonda NPK Activa • Riego por Goteo Monitoreado'
    },
    merida: {
      title: 'Cordillera Andina (Mérida) • Café de Altura',
      coords: 'Lat 8.59° N, Lon -71.14° W (1,650 msnm)',
      history: '30 años bajo dosel agroforestal y terrazas',
      ph: '5.8 (Ligeramente Ácido • Rico en Materia Orgánica 4.2%)',
      water: '65% Régimen de Neblina y Laderas (1,850 mm)',
      sarRadar: 'SAR -14.1 dB • Relieve escarpado corregido',
      topCrop: 'Café Arábica Especialidad / Frutales Andinos',
      status: 'Alta Retención de Carbono Orgánico (SOC)',
      iotStatus: 'Sensor Térmico GDD • Monitoreo de Heladas'
    },
    amazonas: {
      title: 'Alto Orinoco (Amazonas) • Escudo de Conservación',
      coords: 'Lat 3.12° N, Lon -65.54° W',
      history: '40 años cobertura boscosa primaria (1985–2024)',
      ph: '4.8 (Suelo Ácido Tropical Oxisol)',
      water: '95% Régimen Permanente (3,100 mm)',
      sarRadar: 'SAR -8.2 dB • Bosque denso de alta biomasa',
      topCrop: 'Sistemas Agroforestales (Açaí / Copoazú)',
      status: '🛡️ Escudo de Conservación Activo (Cero Monocultivos)',
      iotStatus: 'Monitoreo de Deforestación Satelital Automático'
    }
  };

  const currentDemo = DEMOS[activeDemo];

  return (
    <div className={styles.container}>
      {/* Top Navbar */}
      <header className={styles.header}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>
            <div className={styles.logoBadge}>
              <Sprout size={22} />
            </div>
            <div>
              <span className={styles.logoTitle}>Agrotech Venezuela</span>
              <span className={styles.logoSubtitle}>MAPBIOMAS • SENTINEL-1/2 • IOT • GEMINI AI</span>
            </div>
          </div>

          <nav className={styles.navLinks}>
            <Link href="/dashboard" className={styles.navLink}>
              Dashboard
            </Link>
            <Link href="/dashboard/mapa" className={styles.navLink}>
              🗺️ WebGIS 3 Niveles
            </Link>
            <Link href="/dashboard/tierras" className={styles.navLink}>
              🚜 Mis Tierras & IoT
            </Link>
            <Link href="/dashboard/bitacora" className={styles.navLink}>
              📔 Cuaderno Campo
            </Link>
            <Link href="/dashboard/recomendaciones" className={styles.navLink}>
              🧪 Prescripción IA
            </Link>
            <Link href="/dashboard/estadisticas" className={styles.navLink}>
              📊 Geoestadísticas
            </Link>
            <Link href="/dashboard/postulacion" className={styles.navLink} style={{ color: '#4ade80', fontWeight: 700 }}>
              🏛️ Postulación TRL 7
            </Link>
            <Link href="/api-docs" className={styles.navLink}>
              <FileCode2 size={16} /> API Docs
            </Link>
          </nav>

          <div className={styles.navActions} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Link href="/dashboard/postulacion" className="btn-secondary" style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem', borderColor: 'rgba(34, 197, 94, 0.4)', color: '#4ade80' }}>
              <span>🏛️</span> Ficha Técnica
            </Link>
            <Link href="/auth/login" className="btn-secondary" style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}>
              <span>🚀</span> Iniciar Sesión / Demo
            </Link>
            <Link href="/dashboard/mapa" className="btn-accent" style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}>
              <span>🗺️</span> Iniciar WebGIS
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <div className={styles.awardBadge}>
              <Sparkles size={16} className={styles.awardIcon} />
              <span>Iniciativa Agrotech Venezuela • Inteligencia Territorial & Ciencia Abierta (TRL 7)</span>
            </div>

            <h1 className={styles.heroTitle}>
              Plataforma WebGIS, Radar Satelital e <span className={styles.heroGradientText}>IoT de Precisión</span> para el Campo Venezolano
            </h1>

            <p className={styles.heroSubtitle}>
              La primera solución integral de <strong>Soberanía Agroalimentaria e Inteligencia Territorial</strong> que fusiona <strong>40 años de trayectoria de MapBiomas (Colección 3 & Agua)</strong>, penetración de nubes con <strong>Radar SAR Sentinel-1 Banda C</strong>, climatología <strong>NASA POWER</strong>, gemelo digital <strong>IoT con ESP32</strong> y prescripción edafológica con <strong>Google Gemini AI</strong>.
            </p>

            <div className={styles.heroCtas}>
              <Link href="/dashboard/mapa" className="btn-primary" style={{ padding: '0.9rem 2.2rem', fontSize: '1rem' }}>
                <Compass size={20} />
                <span>Explorar Visor WebGIS</span>
                <ArrowRight size={18} />
              </Link>
              <Link href="/dashboard/postulacion" className="btn-secondary" style={{ padding: '0.9rem 1.8rem', fontSize: '1rem', borderColor: 'rgba(34, 197, 94, 0.5)', color: '#4ade80' }}>
                <span>🏛️</span>
                <span>Ficha de Postulación</span>
              </Link>
              <Link href="/auth/login" className="btn-secondary" style={{ padding: '0.9rem 1.8rem', fontSize: '1rem' }}>
                <UserCheck size={20} style={{ color: '#38bdf8' }} />
                <span>Selector de Roles</span>
              </Link>
              <Link href="/dashboard/tierras" className="btn-accent" style={{ padding: '0.9rem 1.8rem', fontSize: '1rem' }}>
                <Tractor size={20} />
                <span>Mis Tierras & IoT</span>
              </Link>
            </div>

            {/* Micro Stats Bar */}
            <div className={styles.heroMetrics}>
              <div className={styles.metricItem}>
                <span className={styles.metricNumber}>1985–2024</span>
                <span className={styles.metricDesc}>40 años memoria MapBiomas</span>
              </div>
              <div className={styles.metricDivider}></div>
              <div className={styles.metricItem}>
                <span className={styles.metricNumber}>24 Estados / 335 Mun.</span>
                <span className={styles.metricDesc}>Jerarquía espacial nacional</span>
              </div>
              <div className={styles.metricDivider}></div>
              <div className={styles.metricItem}>
                <span className={styles.metricNumber}>SAR Sentinel-1</span>
                <span className={styles.metricDesc}>Penetración dual VV/VH nubes</span>
              </div>
              <div className={styles.metricDivider}></div>
              <div className={styles.metricItem}>
                <span className={styles.metricNumber}>IoT & ESP32</span>
                <span className={styles.metricDesc}>Sondas NPK y Riego Predictivo</span>
              </div>
              <div className={styles.metricDivider}></div>
              <div className={styles.metricItem}>
                <span className={styles.metricNumber}>Gemini AI</span>
                <span className={styles.metricDesc}>Prescripción edáfica y MRV</span>
              </div>
            </div>
          </div>

          {/* Interactive Territorial Simulator Card */}
          <div className={styles.heroPreview}>
            <div className={styles.previewCard}>
              <div className={styles.previewHeader}>
                <div className={styles.previewHeaderLeft}>
                  <div className={styles.previewDot}></div>
                  <span className={styles.previewTitle}>Gemelo Digital Territorial In-Situ</span>
                </div>
                <div className={styles.previewTabs}>
                  <button 
                    className={`${styles.previewTabBtn} ${activeDemo === 'turen' ? styles.previewTabBtnActive : ''}`}
                    onClick={() => setActiveDemo('turen')}
                  >
                    Turén
                  </button>
                  <button 
                    className={`${styles.previewTabBtn} ${activeDemo === 'sur_lago' ? styles.previewTabBtnActive : ''}`}
                    onClick={() => setActiveDemo('sur_lago')}
                  >
                    Sur del Lago
                  </button>
                  <button 
                    className={`${styles.previewTabBtn} ${activeDemo === 'merida' ? styles.previewTabBtnActive : ''}`}
                    onClick={() => setActiveDemo('merida')}
                  >
                    Andes
                  </button>
                  <button 
                    className={`${styles.previewTabBtn} ${activeDemo === 'amazonas' ? styles.previewTabBtnActive : ''}`}
                    onClick={() => setActiveDemo('amazonas')}
                  >
                    Amazonas
                  </button>
                </div>
              </div>

              <div className={styles.previewBody}>
                <div className={styles.previewTitleRow}>
                  <h3>{currentDemo.title}</h3>
                  <span className={styles.previewCoords}>{currentDemo.coords}</span>
                </div>

                <div className={styles.previewInfoGrid}>
                  <div className={styles.previewInfoBox}>
                    <div className={styles.infoBoxLabel}>
                      <Layers size={14} /> Memoria Histórica 40 Años
                    </div>
                    <div className={styles.infoBoxValue}>{currentDemo.history}</div>
                  </div>

                  <div className={styles.previewInfoBox}>
                    <div className={styles.infoBoxLabel}>
                      <Radio size={14} /> Radar SAR Banda C
                    </div>
                    <div className={styles.infoBoxValue} style={{ color: '#38bdf8' }}>{currentDemo.sarRadar}</div>
                  </div>

                  <div className={styles.previewInfoBox}>
                    <div className={styles.infoBoxLabel}>
                      <Droplets size={14} /> Persistencia Hídrica (25 Años)
                    </div>
                    <div className={styles.infoBoxValue}>{currentDemo.water}</div>
                  </div>

                  <div className={styles.previewInfoBox}>
                    <div className={styles.infoBoxLabel}>
                      <Cpu size={14} /> Telemetría IoT In-Situ
                    </div>
                    <div className={styles.infoBoxValue} style={{ color: '#4ade80' }}>{currentDemo.iotStatus}</div>
                  </div>

                  <div className={styles.previewInfoBox}>
                    <div className={styles.infoBoxLabel}>
                      <Sprout size={14} /> Cadena / Cultivo Principal
                    </div>
                    <div className={styles.infoBoxValue} style={{ color: '#10b981', fontWeight: 700 }}>
                      {currentDemo.topCrop}
                    </div>
                  </div>

                  <div className={styles.previewInfoBox}>
                    <div className={styles.infoBoxLabel}>
                      <ShieldCheck size={14} /> Estatus Edafo-Ecológico
                    </div>
                    <div className={styles.infoBoxValue}>{currentDemo.status}</div>
                  </div>
                </div>

                <div className={styles.previewFooter}>
                  <div className={styles.previewAdvice}>
                    <strong>💡 Dictamen Gemini AI:</strong> Suelo con pH {currentDemo.ph}. Recomendación de manejo regenerativo, corrección de acidez y balance de nitrógeno activo.
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Latencia de procesamiento: &lt; 25 ms (SQLite WAL)</span>
                    <Link href="/dashboard/mapa" className={styles.previewActionBtn}>
                      Abrir Parcela en WebGIS →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7 Core Modules Interactive Onboarding Guide */}
        <section className={styles.onboardingSection}>
          <div className={styles.sectionHeader}>
            <span className="badge-pill badge-emerald">GUÍA INTERACTIVA DE USO</span>
            <h2>Los 7 Módulos Esenciales de la Plataforma</h2>
            <p>Conoce qué hace cada sección, para qué sirve y cómo utilizarla en 3 sencillos pasos.</p>
          </div>

          <div className={styles.modulesGrid}>
            
            {/* 1. Visor WebGIS Multi-Escala */}
            <div className={`${styles.moduleCard} glass-panel`}>
              <div className={styles.moduleCardHeader}>
                <div className={styles.moduleIconBox} style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8' }}>
                  <Compass size={26} />
                </div>
                <div>
                  <span className={styles.moduleBadge}>Navegación Cartográfica</span>
                  <h3>1. Visor WebGIS Multi-Escala</h3>
                </div>
              </div>
              <p className={styles.modulePurpose}>
                <b>¿Para qué sirve?</b> Visualización cartográfica en 3 niveles (Nacional, 335 Municipios y Micro-Parcelas) con capas de pH, clases MapBiomas y penetración de Radar SAR sin nubes.
              </p>
              <div className={styles.moduleSteps}>
                <div className={styles.stepItem}><span className={styles.stepNum}>1</span> Elige tu estado y municipio en el selector o mapa.</div>
                <div className={styles.stepItem}><span className={styles.stepNum}>2</span> Delimita tu lote con la herramienta Shoelace WGS84.</div>
                <div className={styles.stepItem}><span className={styles.stepNum}>3</span> Alterna capas satelitales ópticas y de Radar SAR.</div>
              </div>
              <Link href="/dashboard/mapa" className={styles.moduleActionBtn}>
                Explorar Visor WebGIS <ArrowRight size={16} />
              </Link>
            </div>

            {/* 2. Mis Tierras & Gemelo Digital IoT */}
            <div className={`${styles.moduleCard} glass-panel`}>
              <div className={styles.moduleCardHeader}>
                <div className={styles.moduleIconBox} style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}>
                  <Tractor size={26} />
                </div>
                <div>
                  <span className={styles.moduleBadge}>Fincas & Automatización</span>
                  <h3>2. Mis Tierras & Gemelo Digital IoT</h3>
                </div>
              </div>
              <p className={styles.modulePurpose}>
                <b>¿Para qué sirve?</b> Gestión de parcelas guardadas, telemetría in-situ con microcontroladores ESP32 (Humedad, NPK, pH, EC) y control de electroválvulas de riego.
              </p>
              <div className={styles.moduleSteps}>
                <div className={styles.stepItem}><span className={styles.stepNum}>1</span> Consulta tus lotes registrados con hectáreas y cultivo.</div>
                <div className={styles.stepItem}><span className={styles.stepNum}>2</span> Monitorea telemetría en tiempo real desde nodos ESP32.</div>
                <div className={styles.stepItem}><span className={styles.stepNum}>3</span> Activa pulsos de riego o usa el modo predictivo con lluvia.</div>
              </div>
              <Link href="/dashboard/tierras" className={styles.moduleActionBtn}>
                Gestionar Mis Tierras <ArrowRight size={16} />
              </Link>
            </div>

            {/* 3. Cuaderno de Campo Digital */}
            <div className={`${styles.moduleCard} glass-panel`}>
              <div className={styles.moduleCardHeader}>
                <div className={styles.moduleIconBox} style={{ background: 'rgba(234, 179, 8, 0.15)', color: '#eab308' }}>
                  <BookOpen size={26} />
                </div>
                <div>
                  <span className={styles.moduleBadge}>Registro Agronómico</span>
                  <h3>3. Cuaderno de Campo Digital</h3>
                </div>
              </div>
              <p className={styles.modulePurpose}>
                <b>¿Para qué sirve?</b> Bitácora agronómica oficial y auditable de labores (Siembra, Encalado, Fertilización, Cosecha en Ton/ha) con funcionamiento offline PWA.
              </p>
              <div className={styles.moduleSteps}>
                <div className={styles.stepItem}><span className={styles.stepNum}>1</span> Selecciona la parcela activa en tu menú de fincas.</div>
                <div className={styles.stepItem}><span className={styles.stepNum}>2</span> Registra la labor con su dosis aplicada o rendimiento.</div>
                <div className={styles.stepItem}><span className={styles.stepNum}>3</span> Filtra por tipo de labor o exporta reportes técnicos.</div>
              </div>
              <Link href="/dashboard/bitacora" className={styles.moduleActionBtn}>
                Abrir Bitácora Digital <ArrowRight size={16} />
              </Link>
            </div>

            {/* 4. Simulador Edafológico & IA */}
            <div className={`${styles.moduleCard} glass-panel`}>
              <div className={styles.moduleCardHeader}>
                <div className={styles.moduleIconBox} style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#a855f7' }}>
                  <FlaskConical size={26} />
                </div>
                <div>
                  <span className={styles.moduleBadge}>Prescripción de Suelos</span>
                  <h3>4. Simulador Edafológico & Gemini AI</h3>
                </div>
              </div>
              <p className={styles.modulePurpose}>
                <b>¿Para qué sirve?</b> Cálculo de dosis de Cal Dolomítica (CaCO₃), planes de fertilización N-P-K y evaluación multicriterio AHP para 42 cultivos estratégicos.
              </p>
              <div className={styles.moduleSteps}>
                <div className={styles.stepItem}><span className={styles.stepNum}>1</span> Ajusta los valores de pH, Materia Orgánica y textura.</div>
                <div className={styles.stepItem}><span className={styles.stepNum}>2</span> Descubre el ranking de cultivos con mayor aptitud agroecológica.</div>
                <div className={styles.stepItem}><span className={styles.stepNum}>3</span> Solicita el dictamen agronómico comercial a Gemini AI.</div>
              </div>
              <Link href="/dashboard/recomendaciones" className={styles.moduleActionBtn}>
                Simular Prescripción <ArrowRight size={16} />
              </Link>
            </div>

            {/* 5. Calculadora de Bonos de Carbono */}
            <div className={`${styles.moduleCard} glass-panel`}>
              <div className={styles.moduleCardHeader}>
                <div className={styles.moduleIconBox} style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
                  <Trees size={26} />
                </div>
                <div>
                  <span className={styles.moduleBadge}>Sostenibilidad & MRV</span>
                  <h3>5. Calculadora de Bonos de Carbono</h3>
                </div>
              </div>
              <p className={styles.modulePurpose}>
                <b>¿Para qué sirve?</b> Cuantificación del stock de carbono orgánico en suelo (SOC 0-30cm) y secuestro anual (tCO₂e/ha/año) bajo metodología IPCC Tier 2 / Verra VCS.
              </p>
              <div className={styles.moduleSteps}>
                <div className={styles.stepItem}><span className={styles.stepNum}>1</span> Abre el modal de diagnóstico en cualquier parcela.</div>
                <div className={styles.stepItem}><span className={styles.stepNum}>2</span> Selecciona tu práctica de manejo regenerativo o SAF.</div>
                <div className={styles.stepItem}><span className={styles.stepNum}>3</span> Obtén las toneladas de CO₂ secuestradas y su valor.</div>
              </div>
              <Link href="/dashboard/tierras" className={styles.moduleActionBtn}>
                Calcular Créditos de Carbono <ArrowRight size={16} />
              </Link>
            </div>

            {/* 6. Geoestadísticas Territoriales */}
            <div className={`${styles.moduleCard} glass-panel`}>
              <div className={styles.moduleCardHeader}>
                <div className={styles.moduleIconBox} style={{ background: 'rgba(244, 63, 94, 0.15)', color: '#f43f5e' }}>
                  <BarChart3 size={26} />
                </div>
                <div>
                  <span className={styles.moduleBadge}>Macro Inteligencia</span>
                  <h3>6. Geoestadísticas Territoriales</h3>
                </div>
              </div>
              <p className={styles.modulePurpose}>
                <b>¿Para qué sirve?</b> Análisis macro de la evolución de la frontera agrícola, matrices de transición de 40 años y dinámica hídrica en 25 años por estado.
              </p>
              <div className={styles.moduleSteps}>
                <div className={styles.stepItem}><span className={styles.stepNum}>1</span> Selecciona el año de la serie temporal (1985–2024).</div>
                <div className={styles.stepItem}><span className={styles.stepNum}>2</span> Compara matrices de transición de uso antrópico vs natural.</div>
                <div className={styles.stepItem}><span className={styles.stepNum}>3</span> Descarga gráficos y tablas estadísticas interactivas.</div>
              </div>
              <Link href="/dashboard/estadisticas" className={styles.moduleActionBtn}>
                Ver Geoestadísticas <ArrowRight size={16} />
              </Link>
            </div>

            {/* 7. Arquitectura & API Docs */}
            <div className={`${styles.moduleCard} glass-panel`}>
              <div className={styles.moduleCardHeader}>
                <div className={styles.moduleIconBox} style={{ background: 'rgba(99, 102, 241, 0.15)', color: '#6366f1' }}>
                  <FileCode2 size={26} />
                </div>
                <div>
                  <span className={styles.moduleBadge}>Desarrolladores & Microservicios</span>
                  <h3>7. Arquitectura & API OpenAPI 3.0</h3>
                </div>
              </div>
              <p className={styles.modulePurpose}>
                <b>¿Para qué sirve?</b> Documentación técnica interactiva de microservicios FastAPI en puerto 8000, caché SQLite WAL, endpoints IoT y Docker.
              </p>
              <div className={styles.moduleSteps}>
                <div className={styles.stepItem}><span className={styles.stepNum}>1</span> Revisa el esquema de arquitectura en /dashboard/arquitectura.</div>
                <div className={styles.stepItem}><span className={styles.stepNum}>2</span> Explora los endpoints REST en /api-docs (Swagger).</div>
                <div className={styles.stepItem}><span className={styles.stepNum}>3</span> Integra clientes externos o nodos IoT con latencia &lt; 25ms.</div>
              </div>
              <Link href="/api-docs" className={styles.moduleActionBtn}>
                Consultar API Docs <ArrowRight size={16} />
              </Link>
            </div>

          </div>
        </section>

        {/* Multi-User Role Access Gateway Section */}
        <section className={styles.rolesSection}>
          <div className={styles.sectionHeader}>
            <span className="badge-pill badge-blue">ACCESO MULTI-USUARIO</span>
            <h2>Experiencia Adaptada a Cada Actor del Campo</h2>
            <p>Conoce los 4 perfiles de usuario y cómo ingresar de manera inmediata al sistema.</p>
          </div>

          <div className={styles.rolesGrid}>
            <div className={`${styles.roleCard} glass-panel`}>
              <div className={styles.roleIcon} style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#22c55e' }}>
                <Tractor size={28} />
              </div>
              <h4>Productor Agrícola</h4>
              <p>Acceso a sus fincas y tablones privados, bitácora de campo, telemetría de suelo ESP32 y alertas de riego.</p>
              <span className={styles.roleTag}>Rol: FARMER</span>
            </div>

            <div className={`${styles.roleCard} glass-panel`}>
              <div className={styles.roleIcon} style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8' }}>
                <FlaskConical size={28} />
              </div>
              <h4>Ingeniero Agrónomo</h4>
              <p>Herramientas avanzadas de prescripción química, cálculo de enmiendas calcáreas y balance de carbono SOC.</p>
              <span className={styles.roleTag}>Rol: AGRONOMIST</span>
            </div>

            <div className={`${styles.roleCard} glass-panel`}>
              <div className={styles.roleIcon} style={{ background: 'rgba(234, 179, 8, 0.2)', color: '#eab308' }}>
                <Shield size={28} />
              </div>
              <h4>Administrador Territorial</h4>
              <p>Supervisión del ecosistema, aprobación de cuentas de productores y monitoreo de la infraestructura geoespacial.</p>
              <span className={styles.roleTag}>Rol: ADMIN</span>
            </div>

            <div className={`${styles.roleCard} glass-panel`}>
              <div className={styles.roleIcon} style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#a855f7' }}>
                <Sparkles size={28} />
              </div>
              <h4>Invitado / Modo Sandbox</h4>
              <p>Acceso inmediato en 1 clic para explorar la plataforma y simular diagnósticos sin necesidad de registro previo.</p>
              <span className={styles.roleTag}>Modo: Efímero</span>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/auth/login" className="btn-primary" style={{ padding: '0.9rem 2.5rem', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <UserCheck size={20} />
              <span>Ir al Selector de Perfiles & Login Rápido</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* Matriz de Impacto Social, Económico y ODS */}
        <section className={styles.futureSection} style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className={styles.sectionHeader}>
            <span className="badge-pill badge-emerald">IMPACTO & SOSTENIBILIDAD</span>
            <h2>Alineación con Objetivos de Desarrollo Sostenible (ODS)</h2>
            <p>Métricas de rentabilidad para el productor y mitigación climática en el campo venezolano.</p>
          </div>

          <div className={styles.futureGrid}>
            <div className={`${styles.futureCard} glass-panel`} style={{ borderLeft: '4px solid #ef4444' }}>
              <div className={styles.futureBadge}>ODS 1 • Fin de la Pobreza</div>
              <h4>Barrera \$0 en Diagnóstico</h4>
              <p>Democratización del acceso a diagnóstico edafoclimático para pequeños productores sin costo de laboratorio tradicional (\$150).</p>
            </div>

            <div className={`${styles.futureCard} glass-panel`} style={{ borderLeft: '4px solid #f59e0b' }}>
              <div className={styles.futureBadge}>ODS 2 • Hambre Cero</div>
              <h4>+75% Rendimiento en Granos</h4>
              <p>Incremento del rendimiento del maíz de 3.5 t/ha a 6.2+ t/ha mediante corrección de acidez y nutrición balanceada NPK.</p>
            </div>

            <div className={`${styles.futureCard} glass-panel`} style={{ borderLeft: '4px solid #10b981' }}>
              <div className={styles.futureBadge}>ODS 12 • Producción Responsable</div>
              <h4>-40% Pérdida de Fertilizantes</h4>
              <p>Neutralización del aluminio intercambiable (Al³⁺) para evitar el desperdicio masivo de insumos y contaminación de cuencas.</p>
            </div>

            <div className={`${styles.futureCard} glass-panel`} style={{ borderLeft: '4px solid #0284c7' }}>
              <div className={styles.futureBadge}>ODS 13 • Acción por el Clima</div>
              <h4>3.85 tCO₂e/ha/año Secuestradas</h4>
              <p>Monitoreo satelital y certificación de carbono bajo metodologías IPCC Tier 2 / Verra VCS en sistemas agroforestales.</p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link href="/dashboard/postulacion" className="btn-secondary" style={{ padding: '0.8rem 2rem', fontSize: '0.9rem', borderColor: 'rgba(56, 189, 248, 0.4)', color: '#38bdf8', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span>🏛️</span>
              <span>Consultar Ficha Técnica de Postulación Completa</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Future Technological Horizons Section */}
        <section className={styles.futureSection}>
          <div className={styles.sectionHeader}>
            <span className="badge-pill badge-emerald">HORIZONTE DE FUTURO</span>
            <h2>Líneas de Evolución & Próximas Mejoras del Sistema</h2>
            <p>El plan de escalabilidad tecnológica para consolidar el liderazgo de Agrotech Venezuela.</p>
          </div>

          <div className={styles.futureGrid}>
            <div className={`${styles.futureCard} glass-panel`}>
              <div className={styles.futureBadge}>🛰️ Satélites Hiperespectrales</div>
              <h4>Sensores EnMAP & PRISMA</h4>
              <p>Integración de más de 200 bandas espectrales para cuantificación directa de clorofila foliar y micronutrientes (Fe, Zn, B) a 30m de resolución.</p>
            </div>

            <div className={`${styles.futureCard} glass-panel`}>
              <div className={styles.futureBadge}>📡 Telecomunicaciones Rurales</div>
              <h4>Red LoRaWAN Comunitaria</h4>
              <p>Despliegue de gateways LoRaWAN de largo alcance (15 km) para interconectar asociaciones campesinas sin necesidad de planes de datos móviles individuales.</p>
            </div>

            <div className={`${styles.futureCard} glass-panel`}>
              <div className={styles.futureBadge}>📱 Visión Artificial en Campo</div>
              <h4>Diagnóstico Fitosanitario Móvil</h4>
              <p>Módulo de reconocimiento de plagas y hongos en hojas mediante redes neuronales convolucionales ejecutadas directamente en el navegador del teléfono.</p>
            </div>

            <div className={`${styles.futureCard} glass-panel`}>
              <div className={styles.futureBadge}>⛓️ Trazabilidad & Finanzas Verdes</div>
              <h4>Certificación de Carbono MRV</h4>
              <p>Registro inmutable de créditos de carbono en blockchain para facilitar la exportación con prima de sostenibilidad de cacao criollo y café especialidad.</p>
            </div>
          </div>
        </section>

        {/* Quick CTA Banner */}
        <section className={styles.ctaBanner}>
          <div className={styles.ctaContent}>
            <h2>¿Listo para digitalizar tu producción agrícola en Venezuela?</h2>
            <p>Delimita tus lotes, accede a 40 años de datos de MapBiomas y activa el monitoreo satelital e IoT en segundos.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <Link href="/dashboard/mapa" className="btn-accent" style={{ padding: '0.9rem 2.2rem', fontSize: '1rem' }}>
                <span>🌱</span> Probar Visor Satelital WebGIS
              </Link>
              <Link href="/dashboard/postulacion" className="btn-secondary" style={{ padding: '0.9rem 2rem', fontSize: '1rem', borderColor: 'rgba(34, 197, 94, 0.4)', color: '#4ade80' }}>
                <span>🏛️</span> Ficha de Postulación TRL 7
              </Link>
              <Link href="/auth/login" className="btn-secondary" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>
                <span>🚀</span> Iniciar Sesión / Demo Rápida
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerBrand}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-dark)', fontWeight: 800 }}>
              <Sprout size={20} color="#10b981" />
              <span style={{ fontSize: '1.1rem' }}>Agrotech Venezuela</span>
            </div>
            <p className={styles.footerDesc}>
              Plataforma tecnológica de vanguardia para la <b>Inteligencia Agro-Territorial con Datos de MapBiomas Venezuela</b>. Ciencia abierta, rigor geoespacial y soberanía productiva.
            </p>
          </div>

          <div className={styles.footerLinksGrid}>
            <div>
              <div className={styles.footerLinksTitle}>Plataforma & Módulos</div>
              <ul className={styles.footerLinksList}>
                <li><Link href="/dashboard/mapa">Visor WebGIS (3 Niveles)</Link></li>
                <li><Link href="/dashboard/tierras">Mis Tierras & IoT ESP32</Link></li>
                <li><Link href="/dashboard/bitacora">Cuaderno de Campo Digital</Link></li>
                <li><Link href="/dashboard/recomendaciones">Simulador Edafológico & IA</Link></li>
                <li><Link href="/dashboard/postulacion">Ficha de Postulación & TRL 7</Link></li>
                <li><Link href="/dashboard/estadisticas">Geoestadísticas Territoriales</Link></li>
              </ul>
            </div>

            <div>
              <div className={styles.footerLinksTitle}>Fuentes Abiertas & APIs</div>
              <ul className={styles.footerLinksList}>
                <li><a href="https://venezuela.mapbiomas.org" target="_blank" rel="noopener noreferrer">MapBiomas Venezuela (CC BY 4.0)</a></li>
                <li><a href="https://power.larc.nasa.gov" target="_blank" rel="noopener noreferrer">NASA POWER Climatology</a></li>
                <li><a href="https://dataspace.copernicus.eu" target="_blank" rel="noopener noreferrer">Copernicus Sentinel-1/2</a></li>
                <li><Link href="/api-docs">Documentación OpenAPI 3.0</Link></li>
                <li><Link href="/dashboard/arquitectura">Diagrama de Microservicios</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>© 2024–2026 Agrotech Venezuela • Frank Sousa (Licencia MIT)</span>
          <span>Desarrollado con Next.js 16, Leaflet Nativo, FastAPI, Scikit-Learn, NASA POWER & MapBiomas</span>
        </div>
      </footer>
    </div>
  );
}
