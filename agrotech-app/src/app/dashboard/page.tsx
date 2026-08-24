import MapBiomasWrapper from '@/components/gis/MapBiomasWrapper';
import Link from 'next/link';
import styles from './page.module.css';

export default function DashboardOverview() {
  return (
    <div className={styles.dashboardOverview}>
      <header className={styles.header}>
        <div>
          <h1>Panel de Control Agro-Territorial</h1>
          <p className={styles.subtitle}>
            Monitoreo agronómico integral, cruzamiento edafológico y telemetría territorial inspirada en MapBiomas Venezuela.
          </p>
        </div>
        <div>
          <Link href="/dashboard/mapa" className="btn-primary">
            <span>🗺️</span> Abrir Visor WebGIS Completo
          </Link>
        </div>
      </header>

      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} glass-panel`}>
          <h3>Estados Agro-Mapeados</h3>
          <p className={styles.statNumber} style={{ color: 'var(--primary)' }}>24</p>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>100% Territorio Continental</span>
        </div>
        <div className={`${styles.statCard} glass-panel`}>
          <h3>Muestras Edafológicas GPS</h3>
          <p className={styles.statNumber} style={{ color: 'var(--secondary)' }}>1,245</p>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Sur del Lago, Llanos, Andes, Oriente</span>
        </div>
        <div className={`${styles.statCard} glass-panel`}>
          <h3>Aptitud de Cultivos</h3>
          <p className={styles.statNumber} style={{ color: 'var(--accent)' }}>42</p>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Algoritmo Multicriterio Activo</span>
        </div>
      </div>

      {/* GUÍA DE ORIENTACIÓN PARA NUEVOS USUARIOS */}
      <section className={styles.onboardingSection}>
        <div className={styles.onboardingHeader}>
          <div>
            <span className={styles.onboardingBadge}>💡 Guía de Orientación Rápida</span>
            <h2 style={{ fontSize: '1.3rem', margin: '0.35rem 0 0 0', color: 'var(--primary-dark)' }}>
              ¿Cómo comenzar a utilizar Agrotech Venezuela?
            </h2>
          </div>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
          Sigue estos 4 sencillos pasos para diagnosticar tu finca y obtener tu receta agronómica en menos de 2 minutos:
        </p>

        <div className={styles.tipsGrid}>
          <div className={styles.tipCard}>
            <span className={styles.tipIcon}>🗺️</span>
            <h4 className={styles.tipTitle}>1. Explora el WebGIS</h4>
            <p className={styles.tipDesc}>
              Accede a <b>Visor WebGIS</b> y superpón capas de cobertura MapBiomas (1985–2024), semáforo de pH y lluvia.
            </p>
            <Link href="/dashboard/mapa" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, marginTop: 'auto' }}>
              Ir al Mapa →
            </Link>
          </div>

          <div className={styles.tipCard}>
            <span className={styles.tipIcon}>📐</span>
            <h4 className={styles.tipTitle}>2. Delimita tu Parcela</h4>
            <p className={styles.tipDesc}>
              Haz clic en <b>"Delimitar Parcela"</b> sobre el satélite para trazar los linderos y calcular el área exacta en hectáreas.
            </p>
            <Link href="/dashboard/mapa" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, marginTop: 'auto' }}>
              Probar Trazo →
            </Link>
          </div>

          <div className={styles.tipCard}>
            <span className={styles.tipIcon}>🧪</span>
            <h4 className={styles.tipTitle}>3. Simula tu Suelo</h4>
            <p className={styles.tipDesc}>
              Ajusta los sliders de pH y Materia Orgánica en el <b>Simulador</b> para recalcular dosis de cal ($CaCO_3$) y fertilizantes.
            </p>
            <Link href="/dashboard/recomendaciones" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, marginTop: 'auto' }}>
              Abrir Simulador →
            </Link>
          </div>

          <div className={styles.tipCard}>
            <span className={styles.tipIcon}>🤖</span>
            <h4 className={styles.tipTitle}>4. Consulta a Gemini AI</h4>
            <p className={styles.tipDesc}>
              Genera tu dictamen técnico con Google Gemini y descarga tu Gemelo Digital en formato <b>GeoJSON estándar</b>.
            </p>
            <a href="http://localhost:8501" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, marginTop: 'auto' }}>
              Dashboard AI (:8501) →
            </a>
          </div>
        </div>
      </section>


      <section className={styles.mapSection}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2>Visor Satelital y Coberturas MapBiomas</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Selecciona un estado o haz clic en los marcadores para inspeccionar suelos
          </span>
        </div>
        <div className="glass-panel" style={{ padding: '0.75rem', overflow: 'hidden' }}>
          <MapBiomasWrapper />
        </div>
      </section>
    </div>
  );
}
