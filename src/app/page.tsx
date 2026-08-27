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
  CheckCircle2
} from 'lucide-react';

export default function Home() {
  const [activeDemo, setActiveDemo] = useState<'turen' | 'sur_lago' | 'amazonas'>('turen');

  const DEMOS = {
    turen: {
      title: 'Lote Turén (Portuguesa) • Cerealero',
      coords: 'Lat 9.32° N, Lon -69.11° W',
      history: '38 años en agricultura continua (1986–2024)',
      ph: '6.4 (Óptimo / Neutro)',
      water: '72% Persistencia hídrica (NASA POWER 1,480 mm)',
      topCrop: 'Maíz Blanco Harinero & Soya',
      status: 'Apto para Alta Densidad'
    },
    sur_lago: {
      title: 'Sur del Lago (Zulia) • Agroforestal',
      coords: 'Lat 8.98° N, Lon -71.55° W',
      history: '25 años de pastura a policultivo',
      ph: '5.2 (Ácido • Requiere Cal Dolomítica)',
      water: '88% Persistencia hídrica (2,250 mm)',
      topCrop: 'Cacao Porcelana / Plátano Hartón',
      status: 'Enmienda Orgánica + Drenaje'
    },
    amazonas: {
      title: 'Alto Orinoco (Amazonas) • Escudo Conservación',
      coords: 'Lat 3.12° N, Lon -65.54° W',
      history: '40 años cobertura boscosa estable (1985–2024)',
      ph: '4.8 (Suelo Ácido Tropical)',
      water: '95% Régimen Permanente (3,100 mm)',
      topCrop: 'Sistemas Agroforestales (Açaí / Copoazú)',
      status: '🛡️ Escudo de Conservación Activo'
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
              <span className={styles.logoSubtitle}>MAPBIOMAS & NASA POWER</span>
            </div>
          </div>

          <nav className={styles.navLinks}>
            <Link href="/dashboard" className={styles.navLink}>
              Dashboard
            </Link>
            <Link href="/dashboard/mapa" className={styles.navLink}>
              Visor WebGIS (3 Niveles)
            </Link>
            <Link href="/dashboard/tierras" className={styles.navLink}>
              🚜 Mis Tierras
            </Link>
            <Link href="/dashboard/recomendaciones" className={styles.navLink}>
              Simulador Edafológico
            </Link>
            <Link href="/api-docs" className={styles.navLink}>
              <FileCode2 size={16} /> API Docs
            </Link>
          </nav>

          <div className={styles.navActions} style={{ display: 'flex', gap: '8px' }}>
            <Link href="/auth/login" className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
              <span>🚀</span> Modo Invitado / Login
            </Link>
            <Link href="/dashboard/mapa" className="btn-accent" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
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
              <span>Premio a la Innovación Tecnológica • MapBiomas Venezuela</span>
            </div>

            <h1 className={styles.heroTitle}>
              Inteligencia Edafo-Climática con <span className={styles.heroGradientText}>Memoria Territorial de 40 Años</span>
            </h1>

            <p className={styles.heroSubtitle}>
              Transformamos los datos abiertos de <strong>MapBiomas Venezuela (Colección 3 & MapBiomas Agua)</strong> y la climatología <strong>NASA POWER</strong> en diagnósticos agronómicos, prescripciones de encalado y recomendaciones con el Asistente <strong>Google Gemini</strong>.
            </p>

            <div className={styles.heroCtas}>
              <Link href="/dashboard/mapa" className="btn-primary" style={{ padding: '0.9rem 2.2rem', fontSize: '1rem' }}>
                <Compass size={20} />
                <span>Explorar Visor WebGIS</span>
                <ArrowRight size={18} />
              </Link>
              <Link href="/dashboard/recomendaciones" className="btn-secondary" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>
                <Sparkles size={20} style={{ color: '#7c3aed' }} />
                <span>Simulador & Prescriptor</span>
              </Link>
            </div>

            {/* Micro Stats Bar */}
            <div className={styles.heroMetrics}>
              <div className={styles.metricItem}>
                <span className={styles.metricNumber}>1985–2024</span>
                <span className={styles.metricDesc}>40 años de trayectoria territorial</span>
              </div>
              <div className={styles.metricDivider}></div>
              <div className={styles.metricItem}>
                <span className={styles.metricNumber}>24 Estados</span>
                <span className={styles.metricDesc}>Cobertura nacional completa</span>
              </div>
              <div className={styles.metricDivider}></div>
              <div className={styles.metricItem}>
                <span className={styles.metricNumber}>NASA POWER</span>
                <span className={styles.metricDesc}>Lluvia, radiación y temporadas</span>
              </div>
              <div className={styles.metricDivider}></div>
              <div className={styles.metricItem}>
                <span className={styles.metricNumber}>Gemini IA</span>
                <span className={styles.metricDesc}>Asesoría agronómica contextual</span>
              </div>
            </div>
          </div>

          {/* Interactive Interactive Preview Card */}
          <div className={styles.heroPreview}>
            <div className={styles.previewCard}>
              <div className={styles.previewHeader}>
                <div className={styles.previewHeaderLeft}>
                  <div className={styles.previewDot}></div>
                  <span className={styles.previewTitle}>Gemelo Digital Territorial</span>
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
                      <Layers size={14} /> Trayectoria 40 Años
                    </div>
                    <div className={styles.infoBoxValue}>{currentDemo.history}</div>
                  </div>

                  <div className={styles.previewInfoBox}>
                    <div className={styles.infoBoxLabel}>
                      <Droplets size={14} /> Persistencia Hídrica
                    </div>
                    <div className={styles.infoBoxValue}>{currentDemo.water}</div>
                  </div>

                  <div className={styles.previewInfoBox}>
                    <div className={styles.infoBoxLabel}>
                      <Sprout size={14} /> Cultivo Principal
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
                    <strong>💡 Dictamen Gemini:</strong> Suelo con pH {currentDemo.ph}. Se recomienda rotación con frijol bayo en salida de lluvias para restaurar nitrógeno.
                  </div>
                  <Link href="/dashboard/mapa" className={styles.previewActionBtn}>
                    Abrir en WebGIS →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Pillars Grid */}
        <section className={styles.featuresSection}>
          <div className={styles.sectionHeader}>
            <span className="badge-pill badge-emerald">4 PILARES TECNOLÓGICOS</span>
            <h2>Ingeniería Geoespacial para el Campo Venezolano</h2>
            <p>Arquitectura orientada a la toma de decisiones basada en evidencia satelital y agronómica.</p>
          </div>

          <div className={styles.featuresGrid}>
            <div className={`${styles.featureCard} glass-panel`}>
              <div className={styles.featureIconContainer} style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#059669' }}>
                <Layers size={28} />
              </div>
              <h3>MapBiomas Colección 3</h3>
              <p>
                Analiza 40 años continuos (1985–2024) de transiciones de cobertura vegetal, calculando el agotamiento acumulado de carbono orgánico y uso antrópico.
              </p>
              <ul className={styles.featureBullets}>
                <li><CheckCircle2 size={15} /> Clasificación de 24 coberturas LULC</li>
                <li><CheckCircle2 size={15} /> Estimación de pérdida de carbono (-12% a -42%)</li>
              </ul>
            </div>

            <div className={`${styles.featureCard} glass-panel`}>
              <div className={styles.featureIconContainer} style={{ background: 'rgba(2, 132, 199, 0.12)', color: '#0284c7' }}>
                <Droplets size={28} />
              </div>
              <h3>MapBiomas Agua & NASA</h3>
              <p>
                Cruza la persistencia hídrica de 25 años con la radiación solar y pluviometría de NASA POWER para definir fechas óptimas de siembra.
              </p>
              <ul className={styles.featureBullets}>
                <li><CheckCircle2 size={15} /> Identificación de regímenes hídricos</li>
                <li><CheckCircle2 size={15} /> Ventana óptima de siembra y balance de riego</li>
              </ul>
            </div>

            <div className={`${styles.featureCard} glass-panel`}>
              <div className={styles.featureIconContainer} style={{ background: 'rgba(217, 119, 6, 0.12)', color: '#d97706' }}>
                <ShieldCheck size={28} />
              </div>
              <h3>Escudo del Orinoco</h3>
              <p>
                Salvaguardas ambientales automáticas al sur del río Orinoco que restringen monocultivos intensivos y bonifican Sistemas Agroforestales (SAF).
              </p>
              <ul className={styles.featureBullets}>
                <li><CheckCircle2 size={15} /> Prioridad a Cacao Criollo, Açaí y Copoazú</li>
                <li><CheckCircle2 size={15} /> Protección de bosques primarios amazónicos</li>
              </ul>
            </div>

            <div className={`${styles.featureCard} glass-panel`}>
              <div className={styles.featureIconContainer} style={{ background: 'rgba(124, 58, 237, 0.12)', color: '#7c3aed' }}>
                <Sparkles size={28} />
              </div>
              <h3>Gemini con Memoria Territorial</h3>
              <p>
                Asistente de IA con acceso en tiempo real a las coordenadas del productor, resolviendo dudas de manejo edafológico en lenguaje sencillo.
              </p>
              <ul className={styles.featureBullets}>
                <li><CheckCircle2 size={15} /> Prescripción de encalado (CaCO₃)</li>
                <li><CheckCircle2 size={15} /> Formulación comercial N-P-K recomendada</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Quick CTA Banner */}
        <section className={styles.ctaBanner}>
          <div className={styles.ctaContent}>
            <h2>¿Listo para evaluar una parcela en Venezuela?</h2>
            <p>Delimita cualquier lote sobre el mapa satelital y obtén tu diagnóstico integral en segundos.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <Link href="/dashboard/mapa" className="btn-accent" style={{ padding: '0.9rem 2.2rem', fontSize: '1rem' }}>
                <span>🌱</span> Probar Visor Satelital
              </Link>
              <Link href="/dashboard/recomendaciones" className="btn-secondary" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>
                <span>🧪</span> Abrir Simulador de Suelos
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
              <span>Agrotech Venezuela</span>
            </div>
            <p className={styles.footerDesc}>
              Plataforma desarrollada para el Premio a la Innovación Tecnológica con Datos de MapBiomas Venezuela.
            </p>
          </div>

          <div className={styles.footerLinksGrid}>
            <div>
              <div className={styles.footerLinksTitle}>Módulos</div>
              <ul className={styles.footerLinksList}>
                <li><Link href="/dashboard/mapa">Visor WebGIS</Link></li>
                <li><Link href="/dashboard/estadisticas">Geoestadísticas</Link></li>
                <li><Link href="/dashboard/cultivos">Catálogo de Cultivos</Link></li>
                <li><Link href="/dashboard/recomendaciones">Simulador & IA</Link></li>
              </ul>
            </div>

            <div>
              <div className={styles.footerLinksTitle}>Fuentes Abiertas</div>
              <ul className={styles.footerLinksList}>
                <li><a href="https://venezuela.mapbiomas.org" target="_blank" rel="noopener noreferrer">MapBiomas Venezuela</a></li>
                <li><a href="https://power.larc.nasa.gov" target="_blank" rel="noopener noreferrer">NASA POWER Project</a></li>
                <li><Link href="/api-docs">OpenAPI / Swagger</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>© 2024–2026 Agrotech Venezuela • Ciencia Abierta & Inteligencia Territorial</span>
          <span>Desarrollado con Next.js 15, Leaflet, Google Gemini & NASA POWER</span>
        </div>
      </footer>
    </div>
  );
}
