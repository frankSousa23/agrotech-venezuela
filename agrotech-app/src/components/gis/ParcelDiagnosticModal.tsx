"use client";

import { useState } from 'react';
import styles from './ParcelDiagnosticModal.module.css';
import { 
  ParcelGeometry, 
  evaluateCropSuitability, 
  calculateSoilAmendments,
  CropSuitabilityResult 
} from '@/lib/geo/spatialUtils';

interface ParcelDiagnosticModalProps {
  parcel: ParcelGeometry;
  onClose: () => void;
}

export default function ParcelDiagnosticModal({ parcel, onClose }: ParcelDiagnosticModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'crops' | 'prescriptions'>('overview');
  const [selectedCrop, setSelectedCrop] = useState<string>('Maíz Blanco Harinero');

  const state = parcel.detectedState;
  const avgPh = state?.avgPh || 6.2;
  const organicMatter = state?.organicMatterPct || 3.0;
  const texture = state?.soilTexture || 'Franco-limoso';
  const rainfall = state?.annualRainfallMm || 1400;

  // Cálculos agronómicos de precisión
  const suitabilityList = evaluateCropSuitability(avgPh, organicMatter, texture, rainfall);
  const amendments = calculateSoilAmendments(avgPh, organicMatter, parcel.areaHectares, selectedCrop);

  const downloadGeoJSON = () => {
    const geojson = {
      type: "Feature",
      properties: {
        name: parcel.name,
        areaHa: parcel.areaHectares,
        perimeterM: parcel.perimeterMeters,
        state: state?.name || "Venezuela",
        region: state?.region || "Región Agrícola",
        avgPh: avgPh,
        organicMatterPct: organicMatter,
        dominantSoil: state?.dominantSoil,
        topRecommendedCrop: suitabilityList[0]?.cropName,
        createdAt: new Date().toISOString()
      },
      geometry: {
        type: "Polygon",
        coordinates: [parcel.coordinates.map(([lat, lng]) => [lng, lat])]
      }
    };

    const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${parcel.name.toLowerCase().replace(/\s+/g, '_')}_agrotech.geojson`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Encabezado */}
        <div className={styles.modalHeader}>
          <div className={styles.titleArea}>
            <div>
              <span className={styles.badgeTwin}>🌱 Gemelo Digital de Parcela</span>
              <h2 className={styles.modalTitle}>{parcel.name}</h2>
              <div className={styles.modalSubtitle}>
                Edo. {state?.name || 'Territorio Nacional'} • {state?.region || 'Zona Agropecuaria'}
              </div>
            </div>
          </div>
          <button className={styles.closeButton} onClick={onClose}>✕</button>
        </div>

        {/* Barra de Estadísticas Clave */}
        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Superficie</span>
            <div className={styles.statValue}>{parcel.areaHectares} ha</div>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Perímetro</span>
            <div className={styles.statValue}>{(parcel.perimeterMeters / 1000).toFixed(2)} km</div>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>pH Estimado</span>
            <div className={styles.statValue} style={{
              color: avgPh < 5.5 ? '#ef4444' : avgPh <= 6.5 ? '#f59e0b' : '#10b981'
            }}>
              {avgPh}
            </div>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Aptitud Dominante</span>
            <div className={styles.statValue} style={{ color: '#10b981' }}>
              {suitabilityList[0]?.suitabilityScore}%
            </div>
          </div>
        </div>

        {/* Pestañas */}
        <div className={styles.tabNavigation}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'overview' ? styles.tabButtonActive : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Perfil Edafo-Territorial
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'crops' ? styles.tabButtonActive : ''}`}
            onClick={() => setActiveTab('crops')}
          >
            🌾 Idoneidad de Cultivos ({suitabilityList.length})
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'prescriptions' ? styles.tabButtonActive : ''}`}
            onClick={() => setActiveTab('prescriptions')}
          >
            🧪 Prescripción y Enmiendas
          </button>
        </div>

        {/* Contenido de la Pestaña */}
        <div className={styles.modalBody}>
          {activeTab === 'overview' && (
            <div className={styles.gridTwoCol}>
              {/* Cobertura MapBiomas Estimada */}
              <div className={styles.cardSection}>
                <div className={styles.cardTitle}>
                  <span>🛰️</span> Cobertura de Suelo MapBiomas
                </div>
                {state?.mapbiomasCover ? (
                  <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                        <span>🌿 Formaciones Boscosas</span>
                        <strong>{state.mapbiomasCover.forest}%</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                        <span>🌾 Pasturas y Ganadería</span>
                        <strong>{state.mapbiomasCover.pasture}%</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                        <span>🚜 Agricultura Intensiva</span>
                        <strong>{state.mapbiomasCover.agriculture}%</strong>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                        <span>💧 Cuerpos de Agua</span>
                        <strong>{state.mapbiomasCover.water}%</strong>
                      </div>
                    </div>
                  </>
                ) : (
                  <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>Cálculo de cobertura en proceso...</p>
                )}
              </div>

              {/* Parámetros Fisicoquímicos */}
              <div className={styles.cardSection}>
                <div className={styles.cardTitle}>
                  <span>🧪</span> Propiedades Edafológicas
                </div>
                <div className={styles.soilParamGrid}>
                  <div className={styles.soilParamBox}>
                    <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>M. Orgánica</span>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{organicMatter}%</div>
                  </div>
                  <div className={styles.soilParamBox}>
                    <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Lluvia Anual</span>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{rainfall} mm</div>
                  </div>
                  <div className={styles.soilParamBox}>
                    <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Fertilidad</span>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#10b981' }}>{state?.fertilityLevel || 'Media'}</div>
                  </div>
                </div>
                <div style={{ marginTop: '12px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                  <p style={{ margin: '4px 0' }}><strong>Orden Taxonómico:</strong> {state?.dominantSoil}</p>
                  <p style={{ margin: '4px 0' }}><strong>Textura de Suelo:</strong> {texture}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'crops' && (
            <div className={styles.cropList}>
              {suitabilityList.map((item, idx) => (
                <div key={idx} className={styles.cropItem}>
                  <div className={styles.cropInfo}>
                    <h4>{item.cropName}</h4>
                    <p>{item.scientificName}</p>
                    {item.limitingFactor && (
                      <span style={{ fontSize: '0.72rem', color: '#f59e0b', display: 'block', marginTop: '4px' }}>
                        ⚠️ Factor limitante: {item.limitingFactor}
                      </span>
                    )}
                  </div>

                  <div className={styles.cropScoreArea}>
                    <div style={{ textAlign: 'right' }}>
                      <span className={styles.badgeSuitability} style={{
                        background: item.suitabilityScore >= 85 ? 'rgba(16, 185, 129, 0.2)' : 
                                    item.suitabilityScore >= 65 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        color: item.suitabilityScore >= 85 ? '#34d399' : 
                               item.suitabilityScore >= 65 ? '#fbbf24' : '#f87171',
                        border: `1px solid ${item.suitabilityScore >= 85 ? '#10b981' : item.suitabilityScore >= 65 ? '#f59e0b' : '#ef4444'}`
                      }}>
                        {item.suitabilityLevel}
                      </span>
                      <div style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: '3px' }}>
                        Rend: ~{(item.estimatedYieldKgHa / 1000).toFixed(1)} Ton/ha
                      </div>
                    </div>

                    <div className={styles.scoreCircle} style={{
                      background: item.suitabilityScore >= 85 ? '#059669' : 
                                  item.suitabilityScore >= 65 ? '#d97706' : '#dc2626'
                    }}>
                      {item.suitabilityScore}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'prescriptions' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Alerta de Corrección de Suelos / Encalado */}
              <div className={styles.prescriptionHero}>
                <div className={styles.limeAlert}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#a7f3d0', textTransform: 'uppercase' }}>
                      Requerimiento de Encalado ({amendments.limeType})
                    </span>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#f0fdf4' }}>
                      {amendments.needsLiming 
                        ? `El suelo presenta un pH de ${avgPh}. Se requiere encalado previo para optimizar la asimilación de fósforo y micronutrientes.`
                        : `El suelo se encuentra en rango de pH óptimo (${avgPh}). No requiere aplicación de cal.`}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className={styles.limeNumber}>
                      {amendments.totalLimeTons} <span style={{ fontSize: '1rem', fontWeight: 500 }}>Ton Totales</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>({amendments.limeTonsPerHa} Ton/ha)</span>
                  </div>
                </div>
              </div>

              {/* Plan de Fertilización N-P-K */}
              <div className={styles.cardSection}>
                <div className={styles.cardTitle}>
                  <span>🧪</span> Plan Nutricional Balanceado (N - P₂O₅ - K₂O)
                </div>
                <div className={styles.soilParamGrid}>
                  <div className={styles.soilParamBox}>
                    <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Nitrógeno (N)</span>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#34d399' }}>
                      {amendments.fertilizerPlan.nitrogenKgHa} kg/ha
                    </div>
                  </div>
                  <div className={styles.soilParamBox}>
                    <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Fósforo (P₂O₅)</span>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#60a5fa' }}>
                      {amendments.fertilizerPlan.phosphorusKgHa} kg/ha
                    </div>
                  </div>
                  <div className={styles.soilParamBox}>
                    <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>Potasio (K₂O)</span>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#f59e0b' }}>
                      {amendments.fertilizerPlan.potassiumKgHa} kg/ha
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '10px', fontSize: '0.8rem', color: '#cbd5e1' }}>
                  <strong>Fórmula Comercial Sugerida:</strong> {amendments.fertilizerPlan.commercialFormula}
                </div>
              </div>

              {/* Recomendaciones Técnicas Agronómicas */}
              <div className={styles.cardSection}>
                <div className={styles.cardTitle}>
                  <span>📋</span> Recomendaciones de Manejo Agronómico
                </div>
                <ul className={styles.notesList}>
                  {amendments.technicalNotes.map((note, i) => (
                    <li key={i} className={styles.notesItem}>
                      <span style={{ color: '#34d399' }}>✔</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Pie de Página */}
        <div className={styles.modalFooter}>
          <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
            Centroide: Lat {parcel.centroid[0].toFixed(4)}°, Lng {parcel.centroid[1].toFixed(4)}°
          </span>
          <div className={styles.footerButtons}>
            <button className={styles.btnSecondary} onClick={downloadGeoJSON}>
              <span>⬇</span> Descargar GeoJSON
            </button>
            <button className={styles.btnPrimary} onClick={() => window.print()}>
              <span>🖨️</span> Imprimir Ficha
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
