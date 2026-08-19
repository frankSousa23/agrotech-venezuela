import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={`${styles.header} glass-panel`}>
        <div className={styles.logo}>
          <span>🌱</span>
          Agrotech Venezuela
        </div>
        <nav style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link href="/dashboard" className="btn-secondary">
            Ir al Dashboard
          </Link>
          <Link href="/api-docs" className="btn-secondary" style={{ background: 'rgba(255,255,255,0.1)' }}>
            API Docs
          </Link>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '4px 12px', borderRadius: '9999px', color: '#10b981', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1rem' }}>
            <span>🛰️</span> Plataforma WebGIS & Prescripción Edafológica para Venezuela
          </div>
          <h1>Inteligencia Edafo-Climática y Zonificación Agrícola</h1>
          <p>
            Plataforma científica abierta potenciada con la tecnología y clasificación de coberturas 
            <strong> MapBiomas Venezuela</strong>. Delimita parcelas, analiza perfiles de suelo, diagnostica 
            compatibilidad de cultivos y obtén prescripciones agronómicas precisas.
          </p>
          <div className={styles.heroButtons}>
            <Link href="/dashboard/mapa" className="btn-primary" style={{ fontSize: '1rem', padding: '0.9rem 2rem' }}>
              <span>🗺️</span> Explorar Visor WebGIS
            </Link>
            <Link href="/dashboard/recomendaciones" className={`btn-secondary ${styles.outlineBtn}`} style={{ fontSize: '1rem', padding: '0.9rem 2rem' }}>
              <span>🌾</span> Diagnóstico de Cultivos
            </Link>
          </div>
        </section>

        <section className={styles.grid}>
          <div className={`${styles.card} glass-panel`}>
            <div className={styles.cardIcon}>🛰️</div>
            <h2>Capas MapBiomas Venezuela</h2>
            <p>
              Visualiza en tiempo real series históricas de cobertura y uso del suelo (LULC), 
              expansión de pastos y fronteras agrícolas sobre los 24 estados del país.
            </p>
          </div>
          <div className={`${styles.card} glass-panel`}>
            <div className={styles.cardIcon}>🧪</div>
            <h2>Perfiles Edafológicos y pH</h2>
            <p>
              Cruza datos fisicoquímicos (pH, N-P-K, Materia Orgánica y textura) con curvas 
              de tolerancia de cultivos autóctonos y de alto rendimiento.
            </p>
          </div>
          <div className={`${styles.card} glass-panel`}>
            <div className={styles.cardIcon}>📊</div>
            <h2>Gemelo Digital y Prescripción</h2>
            <p>
              Genera recomendaciones de encalado, fertilización de precisión y fichas 
              agronómicas completas listas para exportación y toma de decisiones.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
