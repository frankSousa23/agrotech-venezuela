"use client";

import { useEffect, useState, useMemo } from 'react';
import styles from './page.module.css';
import { VENEZUELA_STATES_DATA } from '@/lib/geo/venezuelaData';
import { evaluateCropSuitability, calculateSoilAmendments } from '@/lib/geo/spatialUtils';

export default function RecomendacionesPage() {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Parámetros del Simulador Edafo-Climático
  const [selectedStateId, setSelectedStateId] = useState<string>('portuguesa');
  const [simPh, setSimPh] = useState<number>(6.4);
  const [simOM, setSimOM] = useState<number>(3.2);
  const [simTexture, setSimTexture] = useState<string>('Franco-limoso');
  const [simAreaHa, setSimAreaHa] = useState<number>(10);

  // Al cambiar de estado, sincronizar con los valores edafológicos promedio del estado
  const handleStateChange = (stateId: string) => {
    setSelectedStateId(stateId);
    const stateData = VENEZUELA_STATES_DATA.find(s => s.id === stateId);
    if (stateData) {
      setSimPh(stateData.avgPh);
      setSimOM(stateData.organicMatterPct);
      setSimTexture(stateData.soilTexture);
    }
  };

  const selectedState = useMemo(() => {
    return VENEZUELA_STATES_DATA.find(s => s.id === selectedStateId) || VENEZUELA_STATES_DATA[0];
  }, [selectedStateId]);

  // Ejecución en tiempo real del motor multicriterio AHP y calculadora de enmiendas
  const suitabilityResults = useMemo(() => {
    return evaluateCropSuitability(simPh, simOM, simTexture, selectedState.annualRainfallMm);
  }, [simPh, simOM, simTexture, selectedState]);

  const amendmentPlan = useMemo(() => {
    return calculateSoilAmendments(simPh, simOM, simAreaHa, suitabilityResults[0]?.cropName);
  }, [simPh, simOM, simAreaHa, suitabilityResults]);

  useEffect(() => {
    fetch('/api/recomendaciones')
      .then(res => res.json())
      .then(data => {
        setRecommendations(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Motor de Prescripción Edafo-Agronómica</h1>
          <p className={styles.subtitle}>
            Algoritmo multicriterio (AHP) que cruza la química del suelo con los requerimientos de cultivos venezolanos y prescripción de enmiendas.
          </p>
        </div>
      </header>

      {/* Simulador Interactivo */}
      <section className={styles.simulatorCard}>
        <div className={styles.simHeader}>
          <div>
            <span className={styles.simBadge}>⚡ Simulador Inteligente en Tiempo Real</span>
            <h3 style={{ margin: '6px 0 0 0', fontSize: '1.15rem' }}>
              Configurar Condiciones de Parcela
            </h3>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Edo. {selectedState.name} ({selectedState.region}) • Lluvia: {selectedState.annualRainfallMm} mm/año
          </span>
        </div>

        {/* Controles Deslizantes */}
        <div className={styles.controlsGrid}>
          <div className={styles.controlGroup}>
            <label className={styles.controlLabel}>
              <span>Estado / Región:</span>
            </label>
            <select 
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
              <span>Acidez del Suelo (pH):</span>
              <strong style={{ 
                color: simPh < 5.5 ? '#ef4444' : simPh <= 6.5 ? '#f59e0b' : '#10b981' 
              }}>{simPh.toFixed(1)}</strong>
            </label>
            <input 
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
              <span>Materia Orgánica (%):</span>
              <strong>{simOM.toFixed(1)}%</strong>
            </label>
            <input 
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
              <span>Superficie de Parcela:</span>
              <strong>{simAreaHa} ha</strong>
            </label>
            <input 
              type="range" 
              min="1" 
              max="500" 
              step="5"
              value={simAreaHa}
              onChange={(e) => setSimAreaHa(parseInt(e.target.value))}
              className={styles.rangeInput}
            />
          </div>
        </div>

        {/* Resultados del Análisis */}
        <div className={styles.simResultsSection}>
          {/* Grilla de Cultivos Ordenados por Idoneidad */}
          <div>
            <h4 style={{ fontSize: '0.9rem', marginBottom: '10px', textTransform: 'uppercase', color: 'var(--primary)' }}>
              🏆 Cultivos con Mayor Viabilidad Edafológica ({suitabilityResults.length})
            </h4>
            <div className={styles.cropsResultsGrid}>
              {suitabilityResults.slice(0, 4).map((crop, i) => (
                <div key={i} className={styles.cropResultCard}>
                  <div className={styles.cropResultHeader}>
                    <div>
                      <div className={styles.cropName}>{crop.cropName}</div>
                      <div className={styles.cropScientific}>{crop.scientificName}</div>
                    </div>
                    <span className={styles.scoreBadge} style={{
                      background: crop.suitabilityScore >= 85 ? '#10b981' : 
                                  crop.suitabilityScore >= 65 ? '#f59e0b' : '#ef4444',
                      color: 'white'
                    }}>
                      {crop.suitabilityScore}%
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Rendimiento Est: ~<strong>{(crop.estimatedYieldKgHa / 1000).toFixed(1)} Ton/ha</strong>
                  </div>
                  {crop.limitingFactor && (
                    <span style={{ fontSize: '0.72rem', color: '#f59e0b' }}>
                      ⚠️ {crop.limitingFactor}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Ficha de Enmiendas y Prescripción */}
          <div className={styles.prescriptionCard}>
            <div className={styles.prescriptionTitle}>
              🧪 Prescripción de Enmiendas
            </div>
            {amendmentPlan.needsLiming ? (
              <div>
                <p style={{ margin: 0, fontSize: '0.85rem' }}>
                  <strong>Encalado Requerido:</strong> {amendmentPlan.limeTonsPerHa} Ton/ha
                </p>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Total finca ({simAreaHa} ha): <strong>{amendmentPlan.totalLimeTons} Toneladas</strong> de {amendmentPlan.limeType}.
                </p>
              </div>
            ) : (
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#10b981' }}>
                ✔ pH en rango óptimo. No requiere cal agrícola.
              </p>
            )}

            <div style={{ borderTop: '1px solid rgba(0,0,0,0.08)', paddingTop: '8px' }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Fórmula Base N-P-K:
              </div>
              <strong style={{ fontSize: '0.85rem', color: 'var(--primary)' }}>
                {amendmentPlan.fertilizerPlan.commercialFormula}
              </strong>
            </div>

            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
              {amendmentPlan.technicalNotes[0]}
            </div>
          </div>
        </div>
      </section>

      {/* Registro Histórico / Base de Datos */}
      <section>
        <h2 style={{ fontSize: '1.3rem', margin: '16px 0 12px 0' }}>
          Registros Específicos Almacenados en Base de Datos
        </h2>
        {loading ? (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center' }}>
            <p>Cargando registros edafológicos...</p>
          </div>
        ) : recommendations.length === 0 ? (
          <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
            <p>No hay registros históricos almacenados.</p>
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
                  <h3 style={{ fontSize: '1.05rem', margin: 0 }}>
                    {rec.crop.name} <span style={{ fontSize: '0.85rem', fontWeight: 'normal', color: 'var(--text-muted)' }}>en</span> {rec.soil.name}
                  </h3>
                  <span className={styles.badge} style={{
                    background: rec.suitability === 'Alta' ? '#10b981' : 
                                rec.suitability === 'Media' ? '#f59e0b' : '#ef4444'
                  }}>
                    {rec.suitability}
                  </span>
                </div>
                
                <p className={styles.description} style={{ marginTop: '0.5rem' }}>
                  {rec.notes || 'Análisis de compatibilidad agronómica estándar.'}
                </p>

                <div className={styles.textureInfo}>
                  <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.82rem' }}>
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
