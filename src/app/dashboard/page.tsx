import MapBiomasWrapper from '@/components/gis/MapBiomasWrapper';
import Link from 'next/link';
import styles from './page.module.css';
import { 
  Compass, 
  MapPin, 
  FlaskConical, 
  Sprout, 
  Sparkles, 
  Layers, 
  ArrowRight
} from 'lucide-react';

export default function DashboardOverview() {
  return (
    <div className={styles.dashboardOverview}>
      {/* Overview Header */}
      <header className={styles.header}>
        <div>
          <div className={styles.topBadgeRow}>
            <span className="badge-pill badge-emerald">
              <span className={styles.pulseDot}></span> MapBiomas Colección 3 Activa
            </span>
            <span className="badge-pill badge-cyan">NASA POWER Agro-Climatología</span>
          </div>
          <h1 className={styles.title}>Panel de Inteligencia Agro-Territorial</h1>
          <p className={styles.subtitle}>
            Monitoreo agronómico integral, cruzamiento edafológico multitemporal y prescripción regenerativa para Venezuela.
          </p>
        </div>
        <div className={styles.headerActions}>
          <Link href="/dashboard/mapa" className="btn-primary">
            <Compass size={18} />
            <span>Abrir Visor WebGIS</span>
          </Link>
          <Link href="/dashboard/recomendaciones" className="btn-secondary">
            <Sparkles size={18} style={{ color: '#7c3aed' }} />
            <span>Simulador de Suelos</span>
          </Link>
        </div>
      </header>

      {/* Primary KPI Grid */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} glass-panel`}>
          <div className={styles.statIconContainer} style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#059669' }}>
            <MapPin size={22} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>Estados Agro-Mapeados</div>
            <div className={styles.statNumber} style={{ color: '#059669' }}>24</div>
            <div className={styles.statMeta}>100% Territorio Continental</div>
          </div>
        </div>

        <div className={`${styles.statCard} glass-panel`}>
          <div className={styles.statIconContainer} style={{ background: 'rgba(140, 88, 54, 0.12)', color: '#8c5836' }}>
            <FlaskConical size={22} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>Muestras Edafológicas GPS</div>
            <div className={styles.statNumber} style={{ color: '#8c5836' }}>1,245</div>
            <div className={styles.statMeta}>Sur del Lago, Llanos, Andes, Oriente</div>
          </div>
        </div>

        <div className={`${styles.statCard} glass-panel`}>
          <div className={styles.statIconContainer} style={{ background: 'rgba(2, 132, 199, 0.12)', color: '#0284c7' }}>
            <Sprout size={22} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>Aptitud de Cultivos Evaluados</div>
            <div className={styles.statNumber} style={{ color: '#0284c7' }}>42</div>
            <div className={styles.statMeta}>Algoritmo Multicriterio AHP Activo</div>
          </div>
        </div>

        <div className={`${styles.statCard} glass-panel`}>
          <div className={styles.statIconContainer} style={{ background: 'rgba(124, 58, 237, 0.12)', color: '#7c3aed' }}>
            <Layers size={22} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>Serie Histórica Satelital</div>
            <div className={styles.statNumber} style={{ color: '#7c3aed' }}>40 Años</div>
            <div className={styles.statMeta}>1985 – 2024 (Colección 3)</div>
          </div>
        </div>
      </div>

      {/* Guía de Orientación Rápida */}
      <section className={styles.onboardingSection}>
        <div className={styles.onboardingHeader}>
          <div className={styles.onboardingBadge}>
            <Sparkles size={14} /> Flujo de Trabajo Agro-Territorial
          </div>
          <h2 className={styles.onboardingTitle}>
            ¿Cómo diagnosticar una parcela y generar su prescripción técnica?
          </h2>
          <p className={styles.onboardingSubtitle}>
            Sigue estos 4 pasos guiados para generar el Gemelo Digital de tu lote agrícola:
          </p>
        </div>

        <div className={styles.tipsGrid}>
          <div className={styles.tipCard}>
            <div className={styles.tipStepBadge}>Paso 1</div>
            <div className={styles.tipIconContainer}>
              <Compass size={22} color="#059669" />
            </div>
            <h4 className={styles.tipTitle}>Explora el WebGIS</h4>
            <p className={styles.tipDesc}>
              Superpón capas de cobertura MapBiomas (1985–2024), semáforo de pH del suelo y lluvia acumulada.
            </p>
            <Link href="/dashboard/mapa" className={styles.tipLink}>
              <span>Ir al Visor</span> <ArrowRight size={14} />
            </Link>
          </div>

          <div className={styles.tipCard}>
            <div className={styles.tipStepBadge}>Paso 2</div>
            <div className={styles.tipIconContainer}>
              <MapPin size={22} color="#0284c7" />
            </div>
            <h4 className={styles.tipTitle}>Delimita tu Parcela</h4>
            <p className={styles.tipDesc}>
              Haz clic en &quot;Delimitar Parcela&quot; sobre la imagen satelital para trazar linderos y calcular el área en hectáreas.
            </p>
            <Link href="/dashboard/mapa" className={styles.tipLink}>
              <span>Probar Trazo</span> <ArrowRight size={14} />
            </Link>
          </div>

          <div className={styles.tipCard}>
            <div className={styles.tipStepBadge}>Paso 3</div>
            <div className={styles.tipIconContainer}>
              <FlaskConical size={22} color="#8c5836" />
            </div>
            <h4 className={styles.tipTitle}>Simula el Perfil de Suelo</h4>
            <p className={styles.tipDesc}>
              Ajusta los sliders de pH y Materia Orgánica para recalcular dosis de cal ($CaCO_3$) y fertilización N-P-K.
            </p>
            <Link href="/dashboard/recomendaciones" className={styles.tipLink}>
              <span>Abrir Simulador</span> <ArrowRight size={14} />
            </Link>
          </div>

          <div className={styles.tipCard}>
            <div className={styles.tipStepBadge}>Paso 4</div>
            <div className={styles.tipIconContainer}>
              <Sparkles size={22} color="#7c3aed" />
            </div>
            <h4 className={styles.tipTitle}>Consulta a Gemini AI</h4>
            <p className={styles.tipDesc}>
              Genera tu dictamen agronómico con IA y descarga el Gemelo Digital en formato GeoJSON estandarizado.
            </p>
            <Link href="/dashboard/recomendaciones" className={styles.tipLink}>
              <span>Consultar IA</span> <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Embedded Quick WebGIS View */}
      <section className={styles.mapSection}>
        <div className={styles.mapSectionHeader}>
          <div>
            <h2 className={styles.mapSectionTitle}>Visor Satelital Integrado</h2>
            <p className={styles.mapSectionSubtitle}>
              Selecciona un estado o haz clic en cualquier punto del territorio para calcular su vector espacial instantáneo.
            </p>
          </div>
          <Link href="/dashboard/mapa" className="btn-secondary" style={{ fontSize: '0.85rem' }}>
            <span>🔍</span> Modo Pantalla Completa
          </Link>
        </div>
        <div className="glass-panel" style={{ padding: '0.75rem', overflow: 'hidden' }}>
          <MapBiomasWrapper />
        </div>
      </section>
    </div>
  );
}
