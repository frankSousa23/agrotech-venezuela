"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';
import { evaluatePointSoil, SoilPointAnalysisResult } from '@/lib/soil-module/spatialSoilIndex';
import { normalizeSoilTexture } from '@/lib/agronomy/pedotransferEngine';
import SoilModeSwitcher, { SoilDisplayMode } from '@/components/soils/SoilModeSwitcher';
import SoilPedagogicalWaterBar from '@/components/soils/SoilPedagogicalWaterBar';
import { Sprout, MapPin, Droplets, ShieldCheck, RefreshCw, ExternalLink } from 'lucide-react';

function EmbedSoilModuleContent() {
  const searchParams = useSearchParams();

  // Coordenadas iniciales por defecto (Polo Agrícola de Turén, Portuguesa)
  const defaultLat = 9.324;
  const defaultLon = -69.112;

  const [lat, setLat] = useState<number>(() => {
    const p = searchParams.get('lat');
    return p ? parseFloat(p) : defaultLat;
  });

  const [lon, setLon] = useState<number>(() => {
    const p = searchParams.get('lon') || searchParams.get('lng');
    return p ? parseFloat(p) : defaultLon;
  });

  const themeParam = searchParams.get('theme') || 'dark';
  const isDark = themeParam !== 'light';
  const [displayMode, setDisplayMode] = useState<SoilDisplayMode>('didactic');

  const [analysis, setAnalysis] = useState<SoilPointAnalysisResult>(() => {
    return evaluatePointSoil(lat, lon);
  });

  // Re-evaluar cuando cambian las coordenadas
  useEffect(() => {
    const res = evaluatePointSoil(lat, lon);
    setAnalysis(res);

    // Enviar notificación postMessage al portal anfitrión (ej. MapBiomas)
    if (typeof window !== 'undefined' && window.parent && window.parent !== window) {
      window.parent.postMessage(
        {
          source: 'AGROTECH_SOIL_MODULE',
          type: 'SOIL_DIAGNOSIS_COMPLETED',
          timestamp: new Date().toISOString(),
          data: res
        },
        '*'
      );
    }
  }, [lat, lon]);

  // Escuchar mensajes entrantes del portal anfitrión
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.data || typeof event.data !== 'object') return;

      if (event.data.type === 'SET_LOCATION' && event.data.coords) {
        const { lat: newLat, lon: newLon, lng: newLng } = event.data.coords;
        const targetLat = typeof newLat === 'number' ? newLat : parseFloat(newLat);
        const targetLon = typeof newLon === 'number' ? newLon : typeof newLng === 'number' ? newLng : parseFloat(newLon || newLng);

        if (!isNaN(targetLat) && !isNaN(targetLon)) {
          setLat(targetLat);
          setLon(targetLon);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const paw = analysis.hydraulics.plantAvailableWaterPct;
  const pawColor = paw >= 50 ? '#10b981' : paw >= 25 ? '#f59e0b' : '#ef4444';

  const limingBags = analysis.recommendations.limeTonsPerHa > 0 
    ? Math.round(analysis.recommendations.limeTonsPerHa * 20) 
    : 0;

  return (
    <div className={`${styles.container} ${isDark ? styles.darkTheme : styles.lightTheme}`}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.titleArea}>
            <h1>
              <Sprout size={20} color="#10b981" />
              Módulo de Suelos • MapBiomas Venezuela
            </h1>
            <p className={styles.subtitle}>
              Calibración Edafológica Saxton-Rawls & Modelo Kamprath (TRL 4)
            </p>
          </div>
          <div className={styles.badges}>
            <span className={`${styles.badge} ${styles.badgeCyan}`}>TRL 4 Operacional</span>
            <span className={`${styles.badge} ${styles.badgeEmerald}`}>MapBiomas Col 3.0</span>
          </div>
        </div>

        {/* Conmutador Didáctico / Técnico */}
        <div style={{ marginBottom: '6px' }}>
          <SoilModeSwitcher currentMode={displayMode} onChangeMode={setDisplayMode} />
        </div>

        {/* Barra de Coordenadas y Punto Georreferenciado */}
        <div className={styles.coordBar}>
          <MapPin size={16} color="#06b6d4" />
          <span>
            <b>Ubicación:</b> {lat.toFixed(4)}°N, {lon.toFixed(4)}°W ({analysis.closestRecord.state}) — <i>{analysis.closestRecord.name}</i>
          </span>
        </div>

        {displayMode === 'didactic' ? (
          /* Vista Didáctica MapBiomas: Barra de Confort Hídrico */
          <SoilPedagogicalWaterBar
            texture={normalizeSoilTexture(analysis.interpolated.texture)}
            moisturePct={26}
            fieldCapacity={analysis.hydraulics.fieldCapacityTheta}
            wiltingPoint={analysis.hydraulics.wiltingPointTheta}
            criticalThreshold={analysis.hydraulics.criticalMoistureTheta}
            saturationTheta={analysis.hydraulics.saturationTheta}
          />
        ) : (
          /* Vista Técnica: Métricas Físico-Químicas y Barra PAW */
          <>
            <div className={styles.grid}>
              <div className={styles.metricBox}>
                <span className={styles.metricLabel}>Textura de Suelo</span>
                <span className={styles.metricValue}>{analysis.interpolated.texture}</span>
              </div>

              <div className={styles.metricBox}>
                <span className={styles.metricLabel}>pH Actual</span>
                <span className={styles.metricValue} style={{ color: analysis.interpolated.ph < 5.5 ? '#f59e0b' : '#10b981' }}>
                  {analysis.interpolated.ph.toFixed(2)}
                </span>
              </div>

              <div className={styles.metricBox}>
                <span className={styles.metricLabel}>Materia Orgánica</span>
                <span className={styles.metricValue}>{analysis.interpolated.organicMatter.toFixed(1)}%</span>
              </div>

              <div className={styles.metricBox}>
                <span className={styles.metricLabel}>Capacidad de Campo</span>
                <span className={styles.metricValue}>{analysis.hydraulics.fieldCapacityTheta.toFixed(1)}%</span>
              </div>
            </div>

            <div className={styles.pawContainer}>
              <div className={styles.pawHeader}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Droplets size={14} color="#06b6d4" />
                  Agua Disponible para la Planta (PAW):
                </span>
                <span style={{ color: pawColor }}>{paw.toFixed(1)}% ({paw >= 50 ? 'Óptimo' : 'Estrés'})</span>
              </div>
              <div className={styles.pawBarTrack}>
                <div
                  className={styles.pawBarFill}
                  style={{ width: `${Math.min(100, paw)}%`, backgroundColor: pawColor }}
                />
              </div>
            </div>
          </>
        )}

        {/* Caja de Prescripción Química */}
        <div className={styles.prescriptionBox}>
          <b>Prescripción Edafológica Regional:</b>
          <br />
          {analysis.recommendations.notes}
          {analysis.recommendations.limeTonsPerHa > 0 && (
            <div style={{ marginTop: '6px', fontWeight: 600 }}>
              Dosis Sugerida: {analysis.recommendations.limeTonsPerHa} t/ha ({limingBags} sacos de 50 kg/ha) de {analysis.recommendations.limeType}
            </div>
          )}
          {(analysis.recommendations.gypsumTonsPerHa ?? 0) > 0 && (
            <div style={{ marginTop: '6px', fontWeight: 600 }}>
              Dosis Sugerida: {analysis.recommendations.gypsumTonsPerHa} t/ha de Yeso Agrícola
            </div>
          )}
        </div>

        {/* Botón CTA Institucional para MapBiomas */}
        <div style={{ marginTop: '4px' }}>
          <a 
            href={`/dashboard/suelos?tab=simulator&lat=${lat}&lon=${lon}&texture=${analysis.interpolated.texture}&ph=${analysis.interpolated.ph}&from=mapbiomas`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#ffffff',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
              boxSizing: 'border-box'
            }}
            id="btn_open_agrotech_full"
          >
            <ExternalLink size={15} />
            <span>Abrir en Agrotech Completo (Simulador & Fincas)</span>
          </a>
        </div>

        {/* Pie de Firma y Atribución */}
        <div className={styles.footer}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={14} color="#10b981" />
            Agrotech Venezuela (Frank Sousa) • Código Abierto MIT
          </span>
          <span>Actualizado en tiempo real</span>
        </div>
      </div>
    </div>
  );
}

export default function EmbedSoilModulePage() {
  return (
    <Suspense fallback={<div style={{ padding: 20, color: '#94a3b8' }}>Cargando Módulo de Suelos...</div>}>
      <EmbedSoilModuleContent />
    </Suspense>
  );
}
