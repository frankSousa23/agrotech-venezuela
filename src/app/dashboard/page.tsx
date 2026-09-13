'use client';

import { useState, useEffect } from 'react';
import MapBiomasWrapper from '@/components/gis/MapBiomasWrapper';
import Link from 'next/link';
import styles from './page.module.css';
import AgroTooltip from '@/components/ui/AgroTooltip';
import QuickStartWizard from '@/components/ui/QuickStartWizard';
import FarmerHomeDoors from '@/components/agronomy/FarmerHomeDoors';
import IntentionsModal from '@/components/layout/IntentionsModal';
import { useUIMode } from '@/lib/context/UIModeContext';
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
  const [showWizard, setShowWizard] = useState(false);
  const [showIntentions, setShowIntentions] = useState(false);
  const [parcelsCount, setParcelsCount] = useState(1);
  const { isFarmerMode } = useUIMode();

  useEffect(() => {
    fetch('/api/parcels')
      .then(res => res.json())
      .then(data => {
        const isDismissed = localStorage.getItem('agrotech-quickstart-dismissed') === 'true';
        if (Array.isArray(data)) {
          setParcelsCount(data.length);
          if (data.length === 0 && !isDismissed) {
            setShowWizard(true);
          }
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className={styles.dashboardOverview}>
      {/* Welcome Quick-Start Wizard Modal */}
      <QuickStartWizard 
        isOpen={showWizard} 
        onClose={() => setShowWizard(false)} 
      />

      {/* Intentions Guide Modal ("¿Qué necesitas hacer hoy?") */}
      <IntentionsModal
        isOpen={showIntentions}
        onClose={() => setShowIntentions(false)}
      />

      {isFarmerMode ? (
        <FarmerHomeDoors 
          onOpenIntentions={() => setShowIntentions(true)} 
          parcelsCount={parcelsCount}
        />
      ) : (
        <>
          {/* Overview Header */}
          <header className={styles.header}>
            <div>
              <div className={styles.topBadgeRow}>
                <span className="badge-pill badge-emerald">
                  <span className={styles.pulseDot}></span> MapBiomas Colección 3 Activa
                </span>
                <span className="badge-pill badge-cyan">NASA POWER Agro-Climatología</span>
                <span className="badge-pill badge-cyan" style={{ border: '1px solid rgba(56, 189, 248, 0.4)' }}>
                  📡 Radar SAR Sentinel-1 (Sin Nubes)
                </span>
              </div>
              <h1 className={styles.title}>Panel de Inteligencia Agro-Territorial</h1>
              <p className={styles.subtitle}>
                Monitoreo agronómico integral, cruzamiento edafológico multitemporal y prescripción regenerativa para Venezuela.
              </p>
            </div>
            <div className={styles.headerActions} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => setShowIntentions(true)}
                className="btn-secondary"
                style={{ borderColor: 'rgba(74, 222, 128, 0.5)', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '6px' }}
                aria-label="¿Qué necesitas hacer hoy?"
              >
                <Sparkles size={16} />
                <span>¿Qué necesitas hacer?</span>
              </button>
              <Link href="/dashboard/mapa" className="btn-primary">
                <Compass size={18} />
                <span>Visor WebGIS (3 Niveles)</span>
              </Link>
          <Link href="/dashboard/tierras" className="btn-secondary" style={{ borderColor: 'rgba(34, 197, 94, 0.4)', color: '#4ade80' }}>
            <span>🚜</span> Mis Tierras
          </Link>
          <Link href="/dashboard/bitacora" className="btn-secondary" style={{ borderColor: 'rgba(56, 189, 248, 0.4)', color: '#38bdf8' }}>
            <span>📖</span> Cuaderno de Campo
          </Link>
          <Link href="/dashboard/recomendaciones" className="btn-secondary">
            <Sparkles size={18} style={{ color: '#7c3aed' }} />
            <span>Simulador & IA</span>
          </Link>
          <Link href="/dashboard/iot" className="btn-secondary" style={{ borderColor: 'rgba(56, 189, 248, 0.4)', color: '#38bdf8' }}>
            <span>🔬</span> Lab IoT (Pruebas)
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
            <div className={styles.statLabel}>
              Estados Agro-Mapeados
              <AgroTooltip 
                title="Cobertura Nacional"
                text="24 entidades federales con análisis edafológico, radar SAR y clima histórico."
              />
            </div>
            <div className={styles.statNumber} style={{ color: '#059669' }}>24</div>
            <div className={styles.statMeta}>100% Territorio Continental</div>
          </div>
        </div>

        <div className={`${styles.statCard} glass-panel`}>
          <div className={styles.statIconContainer} style={{ background: 'rgba(140, 88, 54, 0.12)', color: '#8c5836' }}>
            <FlaskConical size={22} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>
              Muestras Edafológicas GPS
              <AgroTooltip 
                title="Fertilidad del Suelo"
                text="Muestreos georreferenciados con pH, texturas, fósforo y Materia Orgánica."
              />
            </div>
            <div className={styles.statNumber} style={{ color: '#8c5836' }}>1,245</div>
            <div className={styles.statMeta}>Sur del Lago, Llanos, Andes, Oriente</div>
          </div>
        </div>

        <div className={`${styles.statCard} glass-panel`}>
          <div className={styles.statIconContainer} style={{ background: 'rgba(2, 132, 199, 0.12)', color: '#0284c7' }}>
            <Sprout size={22} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>
              Aptitud de Cultivos
              <AgroTooltip 
                title="Algoritmo AHP"
                text="Cálculo multicriterio de compatibilidad hídrica, térmica y edafológica."
              />
            </div>
            <div className={styles.statNumber} style={{ color: '#0284c7' }}>42</div>
            <div className={styles.statMeta}>Algoritmo Multicriterio AHP Activo</div>
          </div>
        </div>

        <div className={`${styles.statCard} glass-panel`}>
          <div className={styles.statIconContainer} style={{ background: 'rgba(124, 58, 237, 0.12)', color: '#7c3aed' }}>
            <Layers size={22} />
          </div>
          <div className={styles.statContent}>
            <div className={styles.statLabel}>
              Serie Histórica Satelital
              <AgroTooltip 
                title="MapBiomas Colección 3"
                text="40 años de trayectoria de uso del suelo para entender la vocación de tu lote."
              />
            </div>
            <div className={styles.statNumber} style={{ color: '#7c3aed' }}>40 Años</div>
            <div className={styles.statMeta}>1985 – 2024 (Colección 3)</div>
          </div>
        </div>
      </div>

      {/* Guía de Orientación Rápida */}
      <section className={styles.onboardingSection}>
        <div className={styles.onboardingHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
          <div>
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
          <button 
            type="button"
            onClick={() => setShowWizard(true)}
            className="btn-secondary"
            style={{ fontSize: '0.8rem', padding: '8px 14px', borderColor: 'rgba(34, 197, 94, 0.5)', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Sparkles size={15} />
            <span>⚡ Asistente de Inicio (30s)</span>
          </button>
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
            <Link href="/dashboard/mapa?mode=multilevel&intent=draw" className={styles.tipLink}>
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
              Ajusta los sliders de pH y Materia Orgánica para recalcular dosis de cal (CaCO₃) y fertilización N-P-K.
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

        {/* Callout: Laboratorio Agro-IoT en Ambiente Controlado */}
        <div style={{
          marginTop: '1.25rem',
          padding: '1rem 1.25rem',
          borderRadius: '12px',
          background: 'rgba(56, 189, 248, 0.08)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 300px' }}>
            <span style={{ fontSize: '1.6rem' }}>🔬</span>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#38bdf8' }}>
                Laboratorio Agro-IoT: Investigación en Ambiente Controlado
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4 }}>
                Valida sensores de bajo costo (&lt;$35 BYOD) y ensaya el algoritmo de microrriego predictivo acoplado al clima NASA POWER en un micro-bancal o huerto de prueba antes de escalar a campo abierto.
              </div>
            </div>
          </div>
          <Link href="/dashboard/iot" className="btn-secondary" style={{ fontSize: '0.8rem', padding: '7px 14px', borderColor: 'rgba(56, 189, 248, 0.5)', color: '#38bdf8', whiteSpace: 'nowrap' }}>
            <span>Abrir Laboratorio IoT</span> <ArrowRight size={14} />
          </Link>
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
        </>
      )}
    </div>
  );
}
