import MapBiomasWrapper from '@/components/gis/MapBiomasWrapper';
import styles from './page.module.css';

export const metadata = {
  title: 'Visor WebGIS MapBiomas & Edafología | Agrotech Venezuela',
  description: 'Plataforma interactiva de monitoreo territorial, coberturas MapBiomas y perfiles de suelo de Venezuela.'
};

export default function MapaPage() {
  return (
    <div className={styles.mapPageContainer}>
      <header className={styles.header}>
        <div>
          <div className={styles.badgeContainer}>
            <span className={styles.badgeLive}>● TIEMPO REAL</span>
            <span className={styles.badgeDataset}>Colección MapBiomas Venezuela & Edafología</span>
          </div>
          <h1 className={styles.title}>Visor WebGIS Agro-Territorial</h1>
          <p className={styles.subtitle}>
            Monitoreo satelital multicapa de coberturas de suelo, perfiles fisicoquímicos, pH edafológico y aptitud agronómica en Venezuela.
          </p>
        </div>

        <div className={styles.quickMetrics}>
          <div className={`${styles.metricCard} glass-panel`}>
            <span className={styles.metricVal}>916.445 km²</span>
            <span className={styles.metricLbl}>Territorio Nacional</span>
          </div>
          <div className={`${styles.metricCard} glass-panel`}>
            <span className={styles.metricVal}>24</span>
            <span className={styles.metricLbl}>Estados Edafo-Mapeados</span>
          </div>
          <div className={`${styles.metricCard} glass-panel`}>
            <span className={styles.metricVal}>100%</span>
            <span className={styles.metricLbl}>Acceso Abierto (Open GIS)</span>
          </div>
        </div>
      </header>

      <section className={styles.mapSection}>
        <MapBiomasWrapper />
      </section>
    </div>
  );
}
