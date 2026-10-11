"use client";

import { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';
import SoilModal from '@/components/forms/SoilModal';
import SoilRetentionCurveCanvas from '@/components/soils/SoilRetentionCurveCanvas';
import SoilSimulationSliders, { SoilSimulationParams } from '@/components/soils/SoilSimulationSliders';
import MapBiomasExportHub from '@/components/soils/MapBiomasExportHub';
import { REGIONAL_SOIL_HYDRAULICS, calculatePAW, normalizeSoilTexture, SoilTextureType } from '@/lib/agronomy/pedotransferEngine';
import { calculateRegionalLimingNeed } from '@/lib/geo/spatialUtils';
import { 
  FlaskConical, 
  Search, 
  Plus, 
  Download, 
  FileSpreadsheet, 
  MapPin, 
  Filter,
  Activity,
  Layers,
  Code
} from 'lucide-react';

function SuelosContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const initialTab = (tabParam === 'simulator' || tabParam === 'export_hub' || tabParam === 'catalog')
    ? tabParam
    : 'catalog';

  const [activeTab, setActiveTab] = useState<'catalog' | 'simulator' | 'export_hub'>(initialTab);
  const [soils, setSoils] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [phFilter, setPhFilter] = useState('all');

  // Estado del simulador interactivo Saxton-Rawls con lectura de query params
  const [simParams, setSimParams] = useState<SoilSimulationParams>(() => {
    const rawTexture = searchParams.get('texture') || '';
    const normTexture: SoilTextureType = rawTexture ? normalizeSoilTexture(rawTexture) : 'franco';
    const phVal = searchParams.get('ph') ? parseFloat(searchParams.get('ph')!) : 6.2;
    const omVal = searchParams.get('om') ? parseFloat(searchParams.get('om')!) : 3.2;
    const alVal = searchParams.get('al') ? parseFloat(searchParams.get('al')!) : 0.1;
    const sandVal = searchParams.get('sand') ? parseFloat(searchParams.get('sand')!) : (normTexture === 'arenoso' ? 82 : normTexture === 'arcilloso' ? 15 : 40);
    const clayVal = searchParams.get('clay') ? parseFloat(searchParams.get('clay')!) : (normTexture === 'arenoso' ? 8 : normTexture === 'arcilloso' ? 55 : 20);
    const moistureVal = normTexture === 'arenoso' ? 10 : normTexture === 'arcilloso' ? 38 : 24;

    return {
      sandPct: isNaN(sandVal) ? 40 : sandVal,
      clayPct: isNaN(clayVal) ? 20 : clayVal,
      ph: isNaN(phVal) ? 6.2 : phVal,
      organicMatterPct: isNaN(omVal) ? 3.2 : omVal,
      exchangeableAlMe: isNaN(alVal) ? 0.1 : alVal,
      currentMoisturePct: moistureVal,
      texture: normTexture
    };
  });

  const fetchSoils = () => {
    setLoading(true);
    fetch('/api/soils')
      .then(res => res.json())
      .then(data => {
        setSoils(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchSoils();
  }, []);

  const handleExport = (format: string) => {
    window.location.href = `/api/export/stats?format=${format}`;
  };

  const filteredSoils = useMemo(() => {
    return soils.filter(s => {
      const matchesSearch = 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (s.description && s.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (s.region && s.region.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (s.texture && s.texture.toLowerCase().includes(searchQuery.toLowerCase()));

      let matchesPh = true;
      if (phFilter === 'acid') matchesPh = s.ph && s.ph < 5.5;
      else if (phFilter === 'moderate') matchesPh = s.ph && s.ph >= 5.5 && s.ph <= 6.5;
      else if (phFilter === 'optimal') matchesPh = s.ph && s.ph > 6.5;

      return matchesSearch && matchesPh;
    });
  }, [soils, searchQuery, phFilter]);

  // Cálculos reactivos de física de suelos Saxton-Rawls para la pestaña Simulador
  const hydProps = REGIONAL_SOIL_HYDRAULICS[simParams.texture];
  const currentPaw = calculatePAW(simParams.currentMoisturePct, hydProps.fieldCapacityTheta, hydProps.wiltingPointTheta);
  const limingCalc = calculateRegionalLimingNeed(
    simParams.ph,
    simParams.organicMatterPct,
    simParams.texture === 'arenoso' ? 'Anzoátegui' : 'Portuguesa',
    100.0,
    { exchangeableAlMe: simParams.exchangeableAlMe }
  );

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
            <span className="badge-pill badge-amber">Agrotech Edafología Nacional</span>
            <span className="badge-pill badge-emerald">1,245 Perfiles Georreferenciados</span>
            <span className="badge-pill badge-cyan">Capa Base • Módulo de Suelos MapBiomas</span>
          </div>
          <h1 className={styles.title}>Perfiles Edafológicos & Muestras de Suelo</h1>
          <p className={styles.subtitle}>
            Catálogo edafológico de fertilidad química, pH, textura, curvas Saxton-Rawls y Materia Orgánica en Venezuela; prediseñado además como la base de datos para el Módulo de Suelos de MapBiomas.
          </p>
        </div>

        <div className={styles.headerActions}>
          <button className="btn-secondary" onClick={() => handleExport('csv')} title="Descargar como CSV">
            <Download size={16} />
            <span>CSV</span>
          </button>
          <button className="btn-secondary" onClick={() => handleExport('geojson')} title="Descargar como GeoJSON">
            <Download size={16} />
            <span>GeoJSON</span>
          </button>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={16} />
            <span>Añadir Muestra</span>
          </button>
        </div>
      </header>

      {/* Selector de Pestañas de la Estación de Trabajo Tri-Modal */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px', flexWrap: 'wrap' }}>
        <button
          type="button"
          className={activeTab === 'catalog' ? 'btn-primary' : 'btn-secondary'}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem' }}
          onClick={() => setActiveTab('catalog')}
        >
          <Layers size={16} />
          <span>1. Catálogo Edafológico Territorial ({filteredSoils.length})</span>
        </button>

        <button
          type="button"
          className={activeTab === 'simulator' ? 'btn-primary' : 'btn-secondary'}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem' }}
          onClick={() => setActiveTab('simulator')}
        >
          <Activity size={16} />
          <span>2. Simulador Saxton-Rawls & Kamprath (pF)</span>
        </button>

        <button
          type="button"
          className={activeTab === 'export_hub' ? 'btn-primary' : 'btn-secondary'}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem' }}
          onClick={() => setActiveTab('export_hub')}
        >
          <Code size={16} />
          <span>3. Hub de Federación & Exportación MapBiomas</span>
        </button>
      </div>

      {/* PESTAÑA 1: CATÁLOGO TERRITORIAL (Vista existente mejorada) */}
      {activeTab === 'catalog' && (
        <>
          {/* Barra de Filtros y Búsqueda */}
          <div className={`${styles.filterBar} glass-panel`}>
            <div className={styles.searchBox}>
              <Search size={18} className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Buscar por nombre, estado, región o textura..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.filterControls}>
              <Filter size={16} color="var(--text-muted)" />
              <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Rango de pH:</span>
              <select 
                value={phFilter} 
                onChange={(e) => setPhFilter(e.target.value)}
                className={styles.selectInput}
              >
                <option value="all">Todos los Rangos</option>
                <option value="acid">Muy Ácido (&lt; 5.5)</option>
                <option value="moderate">Moderadamente Ácido (5.5 - 6.5)</option>
                <option value="optimal">Óptimo / Neutro (&gt; 6.5)</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
              <div className={styles.spinner}></div>
              <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Cargando datos edafológicos...</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {filteredSoils.length === 0 ? (
                <div className="glass-panel" style={{ gridColumn: '1 / -1', padding: '3.5rem 2rem', textAlign: 'center' }}>
                  <FlaskConical size={48} color="#8c5836" style={{ margin: '0 auto 1rem auto' }} />
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-dark)', marginBottom: '6px' }}>
                    No se encontraron perfiles de suelo
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                    No hay muestras que coincidan con los filtros actuales. Prueba modificando los parámetros.
                  </p>
                </div>
              ) : (
                filteredSoils.map((soil: any) => {
                  const isAcid = soil.ph && soil.ph < 5.5;
                  const isModerate = soil.ph && soil.ph >= 5.5 && soil.ph <= 6.5;

                  return (
                    <div key={soil.id} className={`${styles.card} glass-panel`}>
                      <div className={styles.cardHeader}>
                        <div>
                          <h2 className={styles.soilName}>{soil.name}</h2>
                          {soil.region && (
                            <div className={styles.regionBadge}>
                              <MapPin size={12} />
                              <span>{soil.region.name}</span>
                            </div>
                          )}
                        </div>

                        <div className={styles.phBadge} style={{
                          background: isAcid ? 'rgba(239, 68, 68, 0.12)' : isModerate ? 'rgba(245, 158, 11, 0.12)' : 'rgba(16, 185, 129, 0.12)',
                          color: isAcid ? '#ef4444' : isModerate ? '#f59e0b' : '#059669',
                          border: `1px solid ${isAcid ? 'rgba(239, 68, 68, 0.3)' : isModerate ? 'rgba(245, 158, 11, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`
                        }}>
                          pH {soil.ph || '-'}
                        </div>
                      </div>
                      
                      <p className={styles.description}>{soil.description || 'Sin descripción técnica registrada.'}</p>
                      
                      <div className={styles.statsGrid}>
                        <div className={styles.statBox}>
                          <span className={styles.statLabel}>M. Orgánica</span>
                          <span className={styles.statValue}>{soil.organicMatter ? `${soil.organicMatter}%` : '-'}</span>
                        </div>
                        <div className={styles.statBox}>
                          <span className={styles.statLabel}>Nitrógeno (N)</span>
                          <span className={styles.statValue}>{soil.nitrogen || '-'}</span>
                        </div>
                        <div className={styles.statBox}>
                          <span className={styles.statLabel}>Fósforo (P)</span>
                          <span className={styles.statValue}>{soil.phosphorus || '-'}</span>
                        </div>
                        <div className={styles.statBox}>
                          <span className={styles.statLabel}>Potasio (K)</span>
                          <span className={styles.statValue}>{soil.potassium || '-'}</span>
                        </div>
                      </div>
                      
                      {soil.texture && (
                        <div className={styles.textureInfo}>
                          <span className={styles.textureLabel}>Textura edafológica:</span>
                          <strong className={styles.textureValue}>{soil.texture}</strong>
                        </div>
                      )}

                      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                        <a
                          href={`/dashboard/mapa?state=${soil.region?.name ? soil.region.name.toLowerCase() : 'portuguesa'}&level=2`}
                          style={{
                            fontSize: '0.78rem',
                            color: 'var(--primary-accent)',
                            textDecoration: 'none',
                            fontWeight: 600,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <MapPin size={13} /> Ver Mapa Regional WebGIS ➔
                        </a>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </>
      )}

      {/* PESTAÑA 2: SIMULADOR DE FÍSICA HÍDRICA pF (Saxton-Rawls & Kamprath) */}
      {activeTab === 'simulator' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {/* Columna Izquierda: Sliders y Parámetros */}
          <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px' }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} color="#06b6d4" />
              Controles de Simulación Física & Química
            </h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '0.82rem', color: '#94a3b8' }}>
              Ajusta las fracciones texturales y reactividad para recalcular en tiempo real la curva van Genuchten, el agua útil y la dosis de enmienda.
            </p>
            <SoilSimulationSliders params={simParams} onChange={setSimParams} />
          </div>

          {/* Columna Derecha: Gráfico de Curva pF y Diagnóstico */}
          <div className="glass-panel" style={{ padding: '20px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <h3 style={{ margin: '0 0 4px 0', fontSize: '1.1rem' }}>
                Curva de Retención Hídrica (pF / van Genuchten)
              </h3>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#94a3b8' }}>
                Relación entre humedad volumétrica (θ %) y potencial mátrico (pF).
              </p>
            </div>

            <SoilRetentionCurveCanvas
              texture={simParams.texture}
              moisturePct={simParams.currentMoisturePct}
              fieldCapacity={hydProps.fieldCapacityTheta}
              wiltingPoint={hydProps.wiltingPointTheta}
              criticalThreshold={hydProps.criticalMoistureTheta}
              saturationTheta={hydProps.saturationTheta}
            />

            {/* Tarjeta de Resumen Numérico */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              <div style={{ padding: '10px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block' }}>θ_FC (Campo)</span>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#10b981' }}>{hydProps.fieldCapacityTheta}%</span>
              </div>
              <div style={{ padding: '10px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block' }}>θ_PWP (Marchitez)</span>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: '#ef4444' }}>{hydProps.wiltingPointTheta}%</span>
              </div>
              <div style={{ padding: '10px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8', display: 'block' }}>Agua Útil (PAW)</span>
                <span style={{ fontSize: '1rem', fontWeight: 700, color: currentPaw >= 50 ? '#10b981' : '#f59e0b' }}>
                  {currentPaw.toFixed(1)}%
                </span>
              </div>
            </div>

            {/* Prescripción Kamprath Resultante */}
            <div style={{ padding: '12px 14px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '10px', fontSize: '0.85rem' }}>
              <b>Diagnóstico Edafológico Calculado:</b>
              <div style={{ marginTop: '4px', color: '#cbd5e1' }}>{limingCalc.regionalSoilNotes}</div>
              {limingCalc.limeTonsPerHa > 0 && (
                <div style={{ marginTop: '6px', fontWeight: 700, color: '#a7f3d0' }}>
                  Prescripción Kamprath: {limingCalc.limeTonsPerHa} t/ha ({limingCalc.totalLimeTons} t totales para 100 ha) de {limingCalc.limeType}.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA 3: HUB DE FEDERACIÓN & EXPORTACIÓN MAPBIOMAS */}
      {activeTab === 'export_hub' && (
        <MapBiomasExportHub />
      )}

      {showModal && (
        <SoilModal 
          onClose={() => setShowModal(false)} 
          onSuccess={() => fetchSoils()} 
        />
      )}
    </div>
  );
}

export default function SuelosPage() {
  return (
    <Suspense fallback={
      <div style={{ padding: '3rem', textAlign: 'center', color: '#10b981', background: '#0b1329', borderRadius: '16px' }}>
        🔬 Cargando Estación Edafológica y Módulo de Suelos...
      </div>
    }>
      <SuelosContent />
    </Suspense>
  );
}
