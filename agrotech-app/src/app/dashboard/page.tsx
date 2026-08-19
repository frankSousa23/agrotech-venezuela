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
