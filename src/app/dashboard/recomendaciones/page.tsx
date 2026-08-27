"use client";

import { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';
import { VENEZUELA_STATES_DATA } from '@/lib/geo/venezuelaData';
import { evaluateCropSuitability, calculateSoilAmendments } from '@/lib/geo/spatialUtils';
import { 
  calculateMapBiomasTrajectory, 
  calculateMapBiomasAgua, 
  evaluateOrinocoConservationShield 
} from '@/lib/geo/mapbiomasTrajectory';
import { estimateVenezuelaAgroClimate } from '@/lib/geo/nasaPowerService';
import { calculateHydroThermalGdd } from '@/lib/geo/hydroThermalEngine';
import CarbonCreditsCalculator from '@/components/agronomy/CarbonCreditsCalculator';
import { 
  Sparkles, 
  FlaskConical, 
  Sprout, 
  Droplets, 
  Sun, 
  Calendar, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle,
  MapPin,
  Clock,
  Waves
} from 'lucide-react';

function RecomendacionesContent() {
  const searchParams = useSearchParams();
  const stateQuery = searchParams.get('state');
  const phQuery = searchParams.get('ph');

  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Parámetros del Simulador Edafo-Climático
  const [selectedStateId, setSelectedStateId] = useState<string>(stateQuery || 'portuguesa');
  const [simPh, setSimPh] = useState<number>(phQuery ? parseFloat(phQuery) : 6.4);
  const [simOM, setSimOM] = useState<number>(3.2);
  const [simTexture, setSimTexture] = useState<string>('Franco-limoso');
  const [simAreaHa, setSimAreaHa] = useState<number>(10);
  const [simYearsUse, setSimYearsUse] = useState<number>(20);

  // Gemini Live Advisor en simulador
  const [aiAdvice, setAiAdvice] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);

  // Al cambiar de estado, sincronizar con los valores edafológicos promedio del estado
  const handleStateChange = (stateId: string) => {
    setSelectedStateId(stateId);
    const stateData = VENEZUELA_STATES_DATA.find(s => s.id === stateId);
    if (stateData) {
      setSimPh(stateData.averagePh || stateData.avgPh || 6.2);
      setSimOM(stateData.organicMatterPct || 3.0);
      setSimTexture(stateData.soilTextureDominant || stateData.soilTexture || 'Franco');
      const [lat, lng] = stateData.center;
      const traj = calculateMapBiomasTrajectory(lat, lng);
      setSimYearsUse(traj.yearsInAnthropicUse);
      setAiAdvice(null);
    }
  };

  const selectedState = useMemo(() => {
    return VENEZUELA_STATES_DATA.find(s => s.id === selectedStateId) || VENEZUELA_STATES_DATA[0];
  }, [selectedStateId]);

  const [centerLat, centerLng] = selectedState.center;
  const trajectory = useMemo(() => calculateMapBiomasTrajectory(centerLat, centerLng), [centerLat, centerLng]);
  const agua = useMemo(() => calculateMapBiomasAgua(centerLat, centerLng), [centerLat, centerLng]);
  const orinocoShield = useMemo(() => evaluateOrinocoConservationShield(centerLat, centerLng, trajectory.currentClass2024), [centerLat, centerLng, trajectory.currentClass2024]);
  const nasaClimate = useMemo(() => estimateVenezuelaAgroClimate(centerLat, centerLng), [centerLat, centerLng]);

  // Ejecución en tiempo real del motor multicriterio AHP y calculadora de enmiendas
  const suitabilityResults = useMemo(() => {
    return evaluateCropSuitability(
      simPh, 
      simOM, 
      simTexture, 
      nasaClimate.annualPrecipitationMm,
      {
        lat: centerLat,
        lng: centerLng,
        anthropicYears: simYearsUse,
        isSouthOfOrinoco: orinocoShield.shieldActive,
        waterPersistence: agua.waterPersistenceScore,
      }
    );
  }, [simPh, simOM, simTexture, nasaClimate.annualPrecipitationMm, centerLat, centerLng, simYearsUse, orinocoShield.shieldActive, agua.waterPersistenceScore]);

  const amendmentPlan = useMemo(() => {
    return calculateSoilAmendments(
      simPh, 
      simOM, 
      simAreaHa, 
      suitabilityResults[0]?.cropName,
      simYearsUse
    );
  }, [simPh, simOM, simAreaHa, suitabilityResults, simYearsUse]);

  const handleRequestGeminiAdvice = async () => {
    setIsLoadingAi(true);
    try {
      const res = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `¿Cuál es el plan agronómico óptimo para una finca de ${simAreaHa} ha en ${selectedState.name} con pH ${simPh}, ${simOM}% de MO y ${simYearsUse} años de uso agrícola según MapBiomas?`,
          parcelContext: {
            coordinates: { lat: centerLat, lng: centerLng },
            stateName: selectedState.name,
            areaHectares: simAreaHa,
            ph: simPh,
            organicMatter: simOM,
            texture: simTexture,
            selectedCrop: suitabilityResults[0]?.cropName || 'Maíz Blanco',
            trajectory,
            mapbiomasAgua: agua,
            orinocoShield,
            nasaClimate,
          }
        })
      });
      if (res.ok) {
        const data = await res.json();
        setAiAdvice(data.reply);
      } else {
        setAiAdvice('Recomendación técnica: Mantener el encalado y la rotación con leguminosas como frijol bayo o mucuna para revitalizar la fertilidad de la parcela.');
      }
    } catch {
      setAiAdvice('Recomendación técnica: Se sugiere aplicar las enmiendas orgánicas recomendadas e instalar drenajes agrícolas para la temporada de lluvia.');
    } finally {
      setIsLoadingAi(false);
    }
  };

  useEffect(() => {
    fetch('/api/recomendaciones')
      .then(res => res.json())
      .then(data => {
        setRecommendations(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
            <span className="badge-pill badge-emerald">Algoritmo AHP Multicriterio</span>
            <span className="badge-pill badge-cyan">40 Años MapBiomas & NASA</span>
          </div>
          <h1 className={styles.title}>Simulador & Prescripción Edafo-Agronómica</h1>
          <p className={styles.subtitle}>
            Cálculo de compatibilidad botánica, dosificación de encalado (CaCO₃), fertilización N-P-K y dictamen de Gemini AI.
          </p>
        </div>
      </header>

      {/* Simulador Interactivo */}
      <section className={`${styles.simulatorCard} glass-panel`}>
        <div className={styles.simHeader}>
          <div className={styles.simTitleGroup}>
            <div className={styles.simBadge}>
              <Sparkles size={14} /> Simulador en Tiempo Real
            </div>
            <h3 className={styles.simHeading}>
              Configurar Condiciones de la Parcela
            </h3>
          </div>
          <div className={styles.stateMetaBadge}>
            Edo. {selectedState.name} ({selectedState.region}) • Lluvia: {selectedState.annualRainfallMm} mm/año
          </div>
        </div>

        {/* Controles Deslizantes */}
        <div className={styles.controlsGrid}>
          <div className={styles.controlGroup}>
            <label className={styles.controlLabel}>
              <span>Estado / Región</span>
            </label>
            <select 
              id="select_sim_state"
              className={styles.selectInput}
              value={selectedStateId}
              onChange={(e) => handleStateChange(e.target.value)}
            >
              {VENEZUELA_STATES_DATA.map(st => (
                <option key={st.id} value={st.id}>{st.name} ({st.region})</option>
              ))}
            </select>
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.controlLabel}>
              <span>Acidez del Suelo (pH)</span>
              <strong style={{ 
                color: simPh < 5.5 ? '#ef4444' : simPh <= 6.5 ? '#f59e0b' : '#059669' 
              }}>{simPh.toFixed(1)}</strong>
            </label>
            <input 
              id="range_sim_ph"
              type="range" 
              min="4.0" 
              max="8.5" 
              step="0.1"
              value={simPh}
              onChange={(e) => setSimPh(parseFloat(e.target.value))}
              className={styles.rangeInput}
            />
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.controlLabel}>
              <span>Materia Orgánica (%)</span>
              <strong style={{ color: '#8c5836' }}>{simOM.toFixed(1)}%</strong>
            </label>
            <input 
              id="range_sim_om"
              type="range" 
              min="0.5" 
              max="7.0" 
              step="0.1"
              value={simOM}
              onChange={(e) => setSimOM(parseFloat(e.target.value))}
              className={styles.rangeInput}
            />
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.controlLabel}>
              <span>Superficie de Parcela</span>
              <strong style={{ color: '#0284c7' }}>{simAreaHa} ha</strong>
            </label>
            <input 
              id="range_sim_area"
              type="range" 
              min="1" 
              max="500" 
              step="5"
              value={simAreaHa}
              onChange={(e) => setSimAreaHa(parseInt(e.target.value))}
              className={styles.rangeInput}
            />
          </div>

          <div className={styles.controlGroup}>
            <label className={styles.controlLabel}>
              <span>Uso Antrópico (MapBiomas)</span>
              <strong style={{ color: simYearsUse > 20 ? '#ef4444' : simYearsUse > 10 ? '#f59e0b' : '#059669' }}>
                {simYearsUse} años
              </strong>
            </label>
            <input 
              id="range_sim_years"
              type="range" 
              min="0" 
              max="40" 
              step="1"
              value={simYearsUse}
              onChange={(e) => setSimYearsUse(parseInt(e.target.value))}
              className={styles.rangeInput}
            />
          </div>
        </div>

        {/* Banner Escudo del Orinoco si aplica */}
        {orinocoShield.shieldActive && (
          <div className={styles.shieldBanner}>
            <ShieldCheck size={20} className={styles.shieldIcon} />
            <div>
              <strong>ESCUDO DE CONSERVACIÓN AMBIENTAL (SUR DEL ORINOCO):</strong> Prioridad estricta a Sistemas Agroforestales (SAF) y protección de cobertura boscosa continua.
            </div>
          </div>
        )}

        {/* Metadatos Clave MapBiomas Agua & Clima */}
        <div className={styles.metaRow}>
          <div className={styles.metaBox}>
            <span className={styles.metaLabel}><Droplets size={13} color="#0284c7" /> Persistencia de Agua:</span>
            <strong>{agua.waterPersistenceScore}% ({agua.hydrologicalRegime})</strong>
          </div>
          <div className={styles.metaBox}>
            <span className={styles.metaLabel}><Sun size={13} color="#f59e0b" /> Radiación NASA:</span>
            <strong>{nasaClimate.avgSolarRadiationMjM2Day} MJ/m²/día</strong>
          </div>
          <div className={styles.metaBox}>
            <span className={styles.metaLabel}><Calendar size={13} color="#10b981" /> Ventana Lluvias:</span>
            <strong>{nasaClimate.wetSeasonMonths.slice(0, 3).join(', ')}</strong>
          </div>
        </div>

        {/* Barra de Consejos Agronómicos */}
        <div className={styles.quickTipBanner}>
          <Sparkles size={18} color="#059669" />
          <div>
            <strong>Consejo para el Productor:</strong>{' '}
            {simPh < 5.5 ? (
              <span>Tu suelo presenta <b>acidez alta (pH &lt; 5.5)</b>. Se recomienda encalar con cal dolomítica para neutralizar el aluminio intercambiable (Al³⁺) y mejorar la fijación de fósforo.</span>
            ) : simPh <= 6.8 ? (
              <span>Tu suelo se encuentra en el <b>rango ideal de fertilidad (pH 5.5 - 6.8)</b>, altamente compatible con cereales y leguminosas tropicales.</span>
            ) : (
              <span>Tu suelo tiende a la <b>alcalinidad (pH &gt; 6.8)</b>. Prioriza fertilizantes de efecto acidificante como el sulfato de amonio.</span>
            )}
          </div>
        </div>

        {/* Resultados del Análisis */}
        <div className={styles.simResultsSection}>
          {/* Grilla de Cultivos Ordenados por Idoneidad */}
          <div>
            <div className={styles.resultsHeadingRow}>
              <Sprout size={18} color="#059669" />
              <h4 className={styles.resultsHeading}>
                Cultivos con Mayor Viabilidad Edafológica ({suitabilityResults.length})
              </h4>
            </div>
            <div className={styles.cropsResultsGrid}>
              {suitabilityResults.slice(0, 4).map((crop, i) => (
                <div key={i} className={styles.cropResultCard}>
                  <div className={styles.cropResultHeader}>
                    <div>
                      <div className={styles.cropName}>{crop.cropName}</div>
                      <div className={styles.cropScientific}>{crop.scientificName}</div>
                    </div>
                    <span className={styles.scoreBadge} style={{
                      background: crop.suitabilityScore >= 85 ? 'rgba(16, 185, 129, 0.15)' : 
                                  crop.suitabilityScore >= 65 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: crop.suitabilityScore >= 85 ? '#059669' : 
                             crop.suitabilityScore >= 65 ? '#d97706' : '#dc2626',
                      border: `1px solid ${
                        crop.suitabilityScore >= 85 ? 'rgba(16, 185, 129, 0.3)' : 
                        crop.suitabilityScore >= 65 ? 'rgba(245, 158, 11, 0.3)' : 'rgba(239, 68, 68, 0.3)'
                      }`
                    }}>
                      {crop.suitabilityScore}% Aptitud
                    </span>
                  </div>
                  <div className={styles.cropYieldRow}>
                    <span>Rendimiento Est:</span> <strong>~{(crop.estimatedYieldKgHa / 1000).toFixed(1)} Ton/ha</strong>
                  </div>
                  {crop.limitingFactor && (
                    <div className={styles.limitingFactor}>
                      <AlertTriangle size={12} /> {crop.limitingFactor}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Ficha de Enmiendas y Prescripción */}
          <div className={styles.prescriptionCard}>
            <div className={styles.prescriptionTitle}>
              <FlaskConical size={16} /> Prescripción de Enmiendas
            </div>
            {amendmentPlan.needsLiming ? (
              <div className={styles.limingBox}>
                <p className={styles.limingDose}>
                  <strong>Encalado Requerido:</strong> {amendmentPlan.limeTonsPerHa} Ton/ha
                </p>
                <p className={styles.limingTotal}>
                  Total finca ({simAreaHa} ha): <strong>{amendmentPlan.totalLimeTons} Toneladas</strong> de {amendmentPlan.limeType}.
                </p>
              </div>
            ) : (
              <div className={styles.optimalLiming}>
                <CheckCircle2 size={16} color="#059669" />
                <span>pH en rango óptimo. No requiere cal agrícola.</span>
              </div>
            )}

            <div className={styles.fertilizerSection}>
              <div className={styles.fertilizerLabel}>
                Fórmula Base N-P-K Recomendada:
              </div>
              <strong className={styles.fertilizerFormula}>
                {amendmentPlan.fertilizerPlan.commercialFormula}
              </strong>
            </div>

            <div className={styles.technicalNotes}>
              {amendmentPlan.technicalNotes[0]}
            </div>
          </div>
        </div>

        {/* Módulo Interactivo Gemini Territorial */}
        <div className={styles.aiAdvisorBox}>
          <div className={styles.aiAdvisorHeader}>
            <div>
              <div className={styles.aiBadge}>
                <Sparkles size={14} /> Asesoría Agronómica IA Territorial (40 Años MapBiomas)
              </div>
              <p className={styles.aiSubtitle}>
                Genera un dictamen técnico con Google Gemini cruzando el clima NASA POWER, el régimen hídrico y la trayectoria histórica de este lote.
              </p>
            </div>
            <button 
              id="btn_request_gemini_sim_advice"
              className="btn-primary" 
              onClick={handleRequestGeminiAdvice}
              disabled={isLoadingAi}
              style={{ 
                background: 'linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)', 
                border: 'none',
                padding: '10px 20px',
                whiteSpace: 'nowrap',
                borderRadius: '10px',
                fontWeight: 700,
                cursor: 'pointer',
                color: '#fff',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Sparkles size={16} />
              <span>{isLoadingAi ? 'Generando dictamen...' : 'Consultar Gemini Territorial'}</span>
            </button>
          </div>

          {aiAdvice && (
            <div className={styles.aiResponseBox}>
              <div className={styles.aiResponseHeader}>
                <Sparkles size={16} color="#7c3aed" />
                <strong>Dictamen Técnico de Gemini:</strong>
              </div>
              <p className={styles.aiResponseText}>{aiAdvice}</p>
            </div>
          )}
        </div>

        {/* 💧 Módulo de Balance Hídrico y Grados Día (GDD) */}
        <div style={{
          marginTop: '20px',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(56, 189, 248, 0.25)',
          borderRadius: '16px',
          padding: '20px',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
                <Waves size={16} /> Agroclimatología Predictiva
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '2px 0 0 0', color: '#f8fafc' }}>
                Balance Hídrico & Grados Día de Crecimiento ({suitabilityResults[0]?.cropName || 'Maíz'})
              </h3>
            </div>
            <span style={{ fontSize: '0.72rem', background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '3px 10px', borderRadius: '999px', border: '1px solid #38bdf8', fontWeight: 600 }}>
              GDD Base 10°C • Techo 30°C
            </span>
          </div>

          {/* KPI GDD */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
            <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Requerimiento Térmico Total</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#facc15', marginTop: '2px' }}>
                {calculateHydroThermalGdd(suitabilityResults[0]?.cropName, selectedState.averageTempC, nasaClimate.annualPrecipitationMm).totalGddRequired} <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>GDD</span>
              </div>
            </div>

            <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Acumulación Diaria Promedio</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', marginTop: '2px' }}>
                {calculateHydroThermalGdd(suitabilityResults[0]?.cropName, selectedState.averageTempC, nasaClimate.annualPrecipitationMm).dailyAvgGdd} <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>GDD/día</span>
              </div>
            </div>

            <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Ciclo Estimado a Cosecha</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#4ade80', marginTop: '2px' }}>
                {calculateHydroThermalGdd(suitabilityResults[0]?.cropName, selectedState.averageTempC, nasaClimate.annualPrecipitationMm).predictedCycleDays} <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>Días</span>
              </div>
            </div>
          </div>

          {/* Hitos Fenológicos */}
          <div style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#f8fafc', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={14} color="#38bdf8" /> Hitos Fenológicos Previstos:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {calculateHydroThermalGdd(suitabilityResults[0]?.cropName, selectedState.averageTempC, nasaClimate.annualPrecipitationMm).milestones.map((m, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', background: 'rgba(15, 23, 42, 0.6)', padding: '6px 10px', borderRadius: '6px' }}>
                  <span style={{ color: '#f8fafc', fontWeight: 600 }}>{m.stageName} (Día ~{m.estimatedDaysAfterSowing})</span>
                  <span style={{ color: '#94a3b8', fontSize: '0.72rem' }}>{m.accumulatedGdd} GDD</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 🌿 Módulo de Certificación de Créditos de Carbono */}
        <div style={{ marginTop: '20px' }}>
          <CarbonCreditsCalculator
            initialAreaHa={simAreaHa}
            initialOrganicMatterPct={simOM}
            initialTexture={simTexture}
            parcelName={`Finca en ${selectedState.name}`}
          />
        </div>
      </section>

      {/* Registro Histórico / Base de Datos */}
      <section className={styles.historySection}>
        <h2 className={styles.historyTitle}>
          Registros Específicos Almacenados en Base de Datos
        </h2>
        {loading ? (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
            <p>Cargando registros edafológicos...</p>
          </div>
        ) : recommendations.length === 0 ? (
          <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)' }}>No hay registros históricos almacenados en la base de datos.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {recommendations.map((rec: any) => (
              <div key={rec.id} className={`${styles.card} glass-panel`} style={{
                borderLeft: `4px solid ${
                  rec.suitability === 'Alta' ? '#10b981' : 
                  rec.suitability === 'Media' ? '#f59e0b' : '#ef4444'
                }`
              }}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardCropTitle}>
                    {rec.crop.name} <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>en</span> {rec.soil.name}
                  </h3>
                  <span className={styles.badge} style={{
                    background: rec.suitability === 'Alta' ? '#10b981' : 
                                rec.suitability === 'Media' ? '#f59e0b' : '#ef4444'
                  }}>
                    {rec.suitability}
                  </span>
                </div>
                
                <p className={styles.description}>
                  {rec.notes || 'Análisis de compatibilidad agronómica estándar.'}
                </p>

                <div className={styles.textureInfo}>
                  <p style={{ margin: '0 0 0.4rem 0', fontSize: '0.82rem' }}>
                    <strong>Requerimiento Hídrico:</strong> {rec.crop.waterReq || 'N/A'}
                  </p>
                  <p style={{ margin: 0, fontSize: '0.82rem' }}>
                    <strong>Región:</strong> {rec.soil.region?.name || 'Región Agrícola'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function RecomendacionesPage() {
  return (
    <Suspense fallback={
      <div style={{ padding: '4rem 2rem', textAlign: 'center', color: '#4ade80' }}>
        🧪 Cargando Simulador Edafo-Climático...
      </div>
    }>
      <RecomendacionesContent />
    </Suspense>
  );
}
