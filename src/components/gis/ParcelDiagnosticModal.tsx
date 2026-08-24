"use client";

import { useState, useEffect, useId } from 'react';
import styles from './ParcelDiagnosticModal.module.css';
import { 
  ParcelGeometry, 
  evaluateCropSuitability, 
  calculateSoilAmendments,
} from '@/lib/geo/spatialUtils';
import { 
  calculateMapBiomasTrajectory, 
  calculateMapBiomasAgua, 
  evaluateOrinocoConservationShield 
} from '@/lib/geo/mapbiomasTrajectory';
import { estimateVenezuelaAgroClimate } from '@/lib/geo/nasaPowerService';

interface ParcelDiagnosticModalProps {
  parcel: ParcelGeometry;
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export default function ParcelDiagnosticModal({ parcel, onClose }: ParcelDiagnosticModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'crops' | 'prescriptions' | 'gemini'>('overview');
  const [selectedCrop, setSelectedCrop] = useState<string>('Maíz Blanco Harinero');
  
  // Chat con Gemini Territorial
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [msgCounter, setMsgCounter] = useState(1);

  const state = parcel.detectedState;
  const avgPh = state?.avgPh || 6.2;
  const organicMatter = state?.organicMatterPct || 2.8;
  const texture = state?.soilTexture || 'Franco-limoso';
  
  const [centroidLat, centroidLng] = parcel.centroid;

  // Motores de Inteligencia Espacial MapBiomas & NASA POWER
  const trajectory = calculateMapBiomasTrajectory(centroidLat, centroidLng);
  const agua = calculateMapBiomasAgua(centroidLat, centroidLng);
  const orinocoShield = evaluateOrinocoConservationShield(centroidLat, centroidLng, trajectory.currentClass2024);
  const nasaClimate = estimateVenezuelaAgroClimate(centroidLat, centroidLng);

  // Cálculos agronómicos adaptados con memoria territorial
  const suitabilityList = evaluateCropSuitability(
    avgPh, 
    organicMatter, 
    texture, 
    nasaClimate.annualPrecipitationMm,
    {
      lat: centroidLat,
      lng: centroidLng,
      anthropicYears: trajectory.yearsInAnthropicUse,
      isSouthOfOrinoco: orinocoShield.shieldActive,
      waterPersistence: agua.waterPersistenceScore,
    }
  );

  const amendments = calculateSoilAmendments(
    avgPh, 
    organicMatter, 
    parcel.areaHectares, 
    selectedCrop,
    trajectory.yearsInAnthropicUse
  );

  // Inicializar el saludo de Gemini con Memoria Territorial
  useEffect(() => {
    const initialGreeting = orinocoShield.shieldActive
      ? `🌲 **Hola, soy tu Asesor Agronómico con Memoria Territorial.**\n\nDetecto que tu parcela de **${parcel.areaHectares} ha** en **${state?.name || 'Guayana'}** está en zona de protección al sur del Orinoco con cobertura de bosque tropical estable.\n\n🛡️ Hemos activado el **Escudo de Conservación** para sugerirte Sistemas Agroforestales (SAF) de alto valor comercial como Cacao Criollo bajo sombra o Açaí silvestre. ¿En qué puedo orientarte hoy?`
      : `🌾 **Hola, soy tu Asesor Agronómico con Memoria Territorial.**\n\nHe consultado el registro histórico de **40 años de MapBiomas (1985-2024)** para tu parcela de **${parcel.areaHectares} ha** en **${state?.name || 'Venezuela'}**.\n\n📜 Tu lote registra **${trajectory.yearsInAnthropicUse} años de uso continuo** con riesgo de pérdida de carbono orgánico **${trajectory.carbonLossRisk}**. El balance hídrico es de régimen **${agua.hydrologicalRegime}** (${nasaClimate.annualPrecipitationMm} mm/año).\n\n¿Deseas consultar fechas óptimas de siembra, dosis de fertilización o rotación con leguminosas?`;

    setChatMessages([
      {
        id: 'msg-0',
        sender: 'assistant',
        text: initialGreeting,
        timestamp: 'Ahora',
      }
    ]);
  }, [parcel.areaHectares, state?.name, orinocoShield.shieldActive, trajectory.yearsInAnthropicUse, trajectory.carbonLossRisk, agua.hydrologicalRegime, nasaClimate.annualPrecipitationMm]);

  const handleSendMessage = async (queryText?: string) => {
    const text = queryText || inputQuery;
    if (!text.trim() || isLoadingChat) return;

    const nextId = msgCounter + 1;
    setMsgCounter(nextId + 1);

    const userMsg: ChatMessage = {
      id: `msg-${nextId}`,
      sender: 'user',
      text: text.trim(),
      timestamp: 'Ahora',
    };

    setChatMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoadingChat(true);

    try {
      const res = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          chatHistory: chatMessages.slice(-4),
          parcelContext: {
            coordinates: { lat: centroidLat, lng: centroidLng },
            stateName: state?.name || 'Venezuela',
            areaHectares: parcel.areaHectares,
            ph: avgPh,
            organicMatter,
            texture,
            selectedCrop,
            trajectory,
            mapbiomasAgua: agua,
            orinocoShield,
            nasaClimate,
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const assistantMsg: ChatMessage = {
          id: `msg-${nextId + 1}`,
          sender: 'assistant',
          text: data.reply || 'Diagnóstico generado satisfactoriamente.',
          timestamp: 'Ahora',
        };
        setChatMessages(prev => [...prev, assistantMsg]);
      } else {
        throw new Error('Respuesta fallida');
      }
    } catch {
      setChatMessages(prev => [
        ...prev,
        {
          id: `msg-${nextId + 1}`,
          sender: 'assistant',
          text: 'Estimado productor, le sugerimos revisar la acidez del lote y aplicar el plan de enmienda orgánica calculado en la pestaña de Prescripción.',
          timestamp: 'Ahora',
        }
      ]);
    } finally {
      setIsLoadingChat(false);
    }
  };

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
        mapbiomasTrajectory: trajectory.trajectoryType,
        anthropicYears: trajectory.yearsInAnthropicUse,
        waterPersistencePct: agua.waterPersistenceScore,
        orinocoShieldActive: orinocoShield.shieldActive,
        nasaAnnualRainMm: nasaClimate.annualPrecipitationMm,
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
    a.download = `${parcel.name.toLowerCase().replace(/\s+/g, '_')}_agrotech_mapbiomas.geojson`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const chatInputId = useId();

  return (
    <div className={styles.modalOverlay} id="parcel_diagnostic_modal_overlay" onClick={onClose}>
      <div className={styles.modalContent} id="parcel_diagnostic_modal_container" onClick={(e) => e.stopPropagation()}>
        {/* Encabezado */}
        <div className={styles.modalHeader}>
          <div className={styles.titleArea}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span className={styles.badgeTwin}>🌱 Gemelo Digital MapBiomas</span>
                {orinocoShield.shieldActive && (
                  <span className={styles.badgeOrinocoShield}>🛡️ Escudo Orinoco Activo</span>
                )}
              </div>
              <h2 className={styles.modalTitle} id="parcel_diagnostic_title">{parcel.name}</h2>
              <div className={styles.modalSubtitle}>
                Edo. {state?.name || 'Territorio Nacional'} • {state?.region || 'Zona Agropecuaria'} • Lat {centroidLat.toFixed(3)}°, Lon {centroidLng.toFixed(3)}°
              </div>
            </div>
          </div>
          <button className={styles.closeButton} id="btn_close_diagnostic_modal" onClick={onClose}>✕</button>
        </div>

        {/* Banner Escudo del Orinoco si aplica */}
        {orinocoShield.shieldActive && (
          <div className={styles.orinocoBanner}>
            <span style={{ fontSize: '1.4rem' }}>🛡️</span>
            <div>
              <strong style={{ fontSize: '0.85rem', color: '#e0f2fe' }}>ZONA DE CONSERVACIÓN ECOLÓGICA (SUR DEL ORINOCO)</strong>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem', color: '#bae6fd' }}>
                {orinocoShield.policyWarning}
              </p>
            </div>
          </div>
        )}

        {/* Barra de Estadísticas Clave */}
        <div className={styles.statsBar}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Superficie</span>
            <div className={styles.statValue}>{parcel.areaHectares} ha</div>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Uso Antrópico</span>
            <div className={styles.statValue}>{trajectory.yearsInAnthropicUse} años</div>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Agua MapBiomas</span>
            <div className={styles.statValue} style={{
              color: agua.waterPersistenceScore >= 70 ? '#38bdf8' : agua.waterPersistenceScore >= 45 ? '#f59e0b' : '#f87171'
            }}>
              {agua.waterPersistenceScore}%
            </div>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Clima NASA</span>
            <div className={styles.statValue} style={{ color: '#60a5fa' }}>
              {nasaClimate.annualPrecipitationMm} mm
            </div>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Aptitud Top</span>
            <div className={styles.statValue} style={{ color: '#10b981' }}>
              {suitabilityList[0]?.suitabilityScore}%
            </div>
          </div>
        </div>

        {/* Pestañas de Navegación */}
        <div className={styles.tabNavigation}>
          <button 
            id="tab_btn_overview"
            className={`${styles.tabButton} ${activeTab === 'overview' ? styles.tabButtonActive : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            📊 Trayectoria 40 Años & Clima
          </button>
          <button 
            id="tab_btn_crops"
            className={`${styles.tabButton} ${activeTab === 'crops' ? styles.tabButtonActive : ''}`}
            onClick={() => setActiveTab('crops')}
          >
            🌾 Idoneidad & SAF ({suitabilityList.length})
          </button>
          <button 
            id="tab_btn_prescriptions"
            className={`${styles.tabButton} ${activeTab === 'prescriptions' ? styles.tabButtonActive : ''}`}
            onClick={() => setActiveTab('prescriptions')}
          >
            🧪 Prescripción Edafológica
          </button>
          <button 
            id="tab_btn_gemini"
            className={`${styles.tabButton} ${activeTab === 'gemini' ? styles.tabButtonActive : ''}`}
            onClick={() => setActiveTab('gemini')}
            style={{ color: activeTab === 'gemini' ? '#c084fc' : '#d8b4fe', fontWeight: 700 }}
          >
            🤖 Asistente Gemini Territorial
          </button>
        </div>

        {/* Cuerpo del Modal */}
        <div className={styles.modalBody}>
          {/* TAB 1: OVERVIEW & TRAYECTORIA 40 AÑOS */}
          {activeTab === 'overview' && (
            <div className={styles.gridTwoCol}>
              {/* Trayectoria Histórica MapBiomas Colección 3 */}
              <div className={styles.cardSection}>
                <div className={styles.cardTitle}>
                  <span>📜</span> Trayectoria MapBiomas (1985–2024)
                </div>
                <div style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                  <p style={{ margin: '0 0 6px 0' }}>
                    <strong>Tipo de Trayectoria:</strong> <span style={{ color: '#34d399' }}>{trajectory.trajectoryType}</span>
                  </p>
                  <p style={{ margin: '0 0 6px 0' }}>
                    <strong>Cobertura Inicial (1985):</strong> {trajectory.initialClass1985}
                  </p>
                  <p style={{ margin: '0 0 6px 0' }}>
                    <strong>Cobertura Actual (2024):</strong> {trajectory.currentClass2024}
                  </p>
                  <p style={{ margin: '0 0 6px 0' }}>
                    <strong>Riesgo de Pérdida de Carbono:</strong>{' '}
                    <span style={{
                      color: trajectory.carbonLossRisk === 'Crítico' ? '#ef4444' : trajectory.carbonLossRisk === 'Alto' ? '#f59e0b' : '#34d399',
                      fontWeight: 700
                    }}>
                      {trajectory.carbonLossRisk} (-{trajectory.organicMatterDepletionPercent}% MO estimada)
                    </span>
                  </p>
                </div>

                {/* Línea de tiempo visual resumida */}
                <div className={styles.timelineTrack}>
                  <div className={styles.timelineStep}>
                    <div className={styles.timelineDot} style={{ background: '#129912' }} />
                    <span className={styles.timelineLabel}>1985</span>
                  </div>
                  <div className={styles.timelineStep}>
                    <div className={styles.timelineDot} style={{ background: '#d6bc73' }} />
                    <span className={styles.timelineLabel}>2000</span>
                  </div>
                  <div className={styles.timelineStep}>
                    <div className={styles.timelineDot} style={{ background: '#ffd966' }} />
                    <span className={styles.timelineLabel}>2015</span>
                  </div>
                  <div className={styles.timelineStep}>
                    <div className={styles.timelineDot} style={{ background: '#e974ed' }} />
                    <span className={styles.timelineLabel}>2024</span>
                  </div>
                </div>
              </div>

              {/* MapBiomas Agua & Clima NASA POWER */}
              <div className={styles.cardSection}>
                <div className={styles.cardTitle}>
                  <span>💧</span> MapBiomas Agua & Clima NASA POWER
                </div>
                <div className={styles.soilParamGrid}>
                  <div className={styles.soilParamBox}>
                    <span style={{ fontSize: '0.68rem', color: '#9ca3af' }}>Régimen Hídrico</span>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8' }}>{agua.hydrologicalRegime}</div>
                  </div>
                  <div className={styles.soilParamBox}>
                    <span style={{ fontSize: '0.68rem', color: '#9ca3af' }}>Persistencia</span>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{agua.waterPersistenceScore}%</div>
                  </div>
                  <div className={styles.soilParamBox}>
                    <span style={{ fontSize: '0.68rem', color: '#9ca3af' }}>Radiación Solar</span>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fbbf24' }}>{nasaClimate.avgSolarRadiationMjM2Day} MJ</div>
                  </div>
                </div>
                <div style={{ marginTop: '10px', fontSize: '0.78rem', color: '#cbd5e1' }}>
                  <p style={{ margin: '4px 0' }}><strong>Estrategia de Riego:</strong> {agua.recommendedIrrigationStrategy}</p>
                  <p style={{ margin: '4px 0' }}><strong>Meses Secos:</strong> {nasaClimate.drySeasonMonths.join(', ')}</p>
                  <p style={{ margin: '4px 0' }}><strong>Ventana de Lluvias:</strong> {nasaClimate.wetSeasonMonths.join(', ')}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CULTIVOS & SAF */}
          {activeTab === 'crops' && (
            <div className={styles.cropList}>
              {suitabilityList.map((item, idx) => (
                <div key={idx} className={styles.cropItem} style={{
                  borderLeft: item.isAgroforestry ? '4px solid #10b981' : undefined
                }}>
                  <div className={styles.cropInfo}>
                    <h4>
                      {item.cropName}
                      {item.isAgroforestry && <span className={styles.badgeSaf}>SAF Sostenible</span>}
                    </h4>
                    <p>{item.scientificName}</p>
                    {item.limitingFactor && (
                      <span style={{ fontSize: '0.74rem', color: '#f59e0b', display: 'block', marginTop: '4px' }}>
                        {item.limitingFactor}
                      </span>
                    )}
                  </div>

                  <div className={styles.cropScoreArea}>
                    <div style={{ textAlign: 'right' }}>
                      <span className={styles.badgeSuitability} style={{
                        background: item.suitabilityScore >= 85 ? 'rgba(16, 185, 129, 0.2)' : 
                                    item.suitabilityScore >= 60 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                        color: item.suitabilityScore >= 85 ? '#34d399' : 
                               item.suitabilityScore >= 60 ? '#fbbf24' : '#f87171',
                        border: `1px solid ${item.suitabilityScore >= 85 ? '#10b981' : item.suitabilityScore >= 60 ? '#f59e0b' : '#ef4444'}`
                      }}>
                        {item.suitabilityLevel}
                      </span>
                      <div style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: '3px' }}>
                        {item.estimatedYieldKgHa > 0 
                          ? `Rend: ~${(item.estimatedYieldKgHa / 1000).toFixed(1)} Ton/ha`
                          : 'No Apto / Restringido'}
                      </div>
                    </div>

                    <div className={styles.scoreCircle} style={{
                      background: item.suitabilityScore >= 85 ? '#059669' : 
                                  item.suitabilityScore >= 60 ? '#d97706' : '#dc2626'
                    }}>
                      {item.suitabilityScore}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: PRESCRIPCIONES & ENMIENDAS */}
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
                        ? `El suelo presenta un pH de ${avgPh}. Se requiere encalado previo para neutralizar aluminio tóxico y liberar fósforo.`
                        : `El suelo se encuentra en rango de pH óptimo (${avgPh}). No requiere cal.`}
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

              {/* Plan Nutricional Balanceado */}
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

              {/* Recomendaciones Técnicas */}
              <div className={styles.cardSection}>
                <div className={styles.cardTitle}>
                  <span>📋</span> Recomendaciones Técnicas Agronómicas & Memoria Histórica
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

          {/* TAB 4: ASISTENTE GEMINI CON MEMORIA TERRITORIAL */}
          {activeTab === 'gemini' && (
            <div className={styles.geminiChatContainer}>
              <div className={styles.geminiHeroBanner}>
                <div>
                  <strong style={{ fontSize: '0.9rem', color: '#f3e8ff' }}>Asistente Agronómico Gemini (Memoria Territorial)</strong>
                  <p style={{ margin: '2px 0 0 0', fontSize: '0.75rem', color: '#e9d5ff' }}>
                    Conectado en tiempo real a MapBiomas Col. 3, MapBiomas Agua y NASA POWER para responder sobre este lote.
                  </p>
                </div>
                <span style={{ fontSize: '1.3rem' }}>✨</span>
              </div>

              {/* Mensajes del Chat */}
              <div className={styles.chatMessagesArea}>
                {chatMessages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={msg.sender === 'user' ? styles.chatMessageUser : styles.chatMessageAssistant}
                  >
                    {msg.text}
                  </div>
                ))}
                {isLoadingChat && (
                  <div className={styles.chatMessageAssistant} style={{ color: '#a78bfa' }}>
                    ⏳ Gemini está analizando la serie temporal de 40 años y el clima de la parcela...
                  </div>
                )}
              </div>

              {/* Sugerencias Rápidas */}
              <div className={styles.chatSuggestions}>
                <button 
                  className={styles.suggestionChip} 
                  onClick={() => handleSendMessage('¿Cuál es el mejor mes para sembrar considerando la persistencia de agua y lluvia?')}
                >
                  📅 Fechas de Siembra
                </button>
                <button 
                  className={styles.suggestionChip} 
                  onClick={() => handleSendMessage('¿Cómo restauro la materia orgánica perdida por los 20 años de uso continuo?')}
                >
                  🌱 Restauración de Suelo
                </button>
                <button 
                  className={styles.suggestionChip} 
                  onClick={() => handleSendMessage('¿Qué opciones de Sistemas Agroforestales (SAF) y mercado son más rentables aquí?')}
                >
                  🌳 Sistemas Agroforestales
                </button>
              </div>

              {/* Caja de Entrada */}
              <div className={styles.chatInputRow}>
                <input
                  id={chatInputId}
                  name="gemini_prompt_input"
                  className={styles.chatInput}
                  placeholder="Pregúntale a Gemini sobre este lote (ej: ¿Qué rotación de cultivo me recomiendas?)..."
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button 
                  id="btn_send_gemini_query"
                  className={styles.btnSendChat} 
                  onClick={() => handleSendMessage()}
                  disabled={isLoadingChat || !inputQuery.trim()}
                >
                  Consultar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Pie de Página */}
        <div className={styles.modalFooter}>
          <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
            MapBiomas Venezuela Col. 3 • NASA POWER Agroclimatology
          </span>
          <div className={styles.footerButtons}>
            <button id="btn_download_parcel_geojson" className={styles.btnSecondary} onClick={downloadGeoJSON}>
              <span>⬇</span> Exportar GeoJSON
            </button>
            <button id="btn_print_parcel_sheet" className={styles.btnPrimary} onClick={() => window.print()}>
              <span>🖨️</span> Imprimir Dictamen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
