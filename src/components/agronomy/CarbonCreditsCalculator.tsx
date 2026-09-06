/**
 * ============================================================================
 * AGROTECH VENEZUELA — CALCULADORA DE CRÉDITOS DE CARBONO & MRV (CarbonCreditsCalculator.tsx)
 * ============================================================================
 * 
 * Cuantificación de Carbono Orgánico del Suelo (SOC) y Certificación MRV:
 * - Stock de Carbono base según Textura, Materia Orgánica y Densidad Aparente.
 * - Secuestro de CO2e evitado bajo Manejo Regenerativo.
 * - Acoplamiento con Verdad de Campo (Ground Truth) de la Bitácora de Labores.
 * - Oráculo de verificación con radar Sentinel-1 SAR (colapso de incertidumbre de 40% a 10%).
 * - Estimación económica neta de Bonos de Carbono bajo estándar Verra VCS / IPCC Tier 2.
 */

'use client';

import React, { useState, useMemo } from 'react';
import { Leaf, ShieldCheck, CheckCircle2, Radar, BookOpen, AlertCircle, TrendingUp } from 'lucide-react';
import Tooltip from '@/components/layout/Tooltip';
import { getParcelVerifiedDiaryPractices, calculateEmpiricalSocAdjustment } from '@/lib/diary/fieldDiaryStorage';
import { verifySarMrvOracle } from '@/lib/geo/sarRadarService';

interface CarbonCreditsCalculatorProps {
  initialAreaHa?: number;
  initialOrganicMatterPct?: number;
  initialTexture?: string;
  parcelName?: string;
  parcelId?: string;
}

export default function CarbonCreditsCalculator({
  initialAreaHa = 45.0,
  initialOrganicMatterPct = 2.6,
  initialTexture = 'Franco-arcilloso',
  parcelName = 'Lote Principal',
  parcelId = 'parc-001'
}: CarbonCreditsCalculatorProps) {
  const [areaHa, setAreaHa] = useState<number>(initialAreaHa);
  const [organicMatterPct, setOrganicMatterPct] = useState<number>(initialOrganicMatterPct);
  const [managementType, setManagementType] = useState<'regenerative' | 'agroforestry' | 'conventional'>('regenerative');
  const [mapbiomasTransition, setMapbiomasTransition] = useState<string>('pastura_agricultura');
  const [creditPriceUsd, setCreditPriceUsd] = useState<number>(18.5); // USD por tCO2e (Estándar Verra / Gold Standard)
  
  // Estados de Verificación MRV & Ground-Truth
  const [enableGroundTruth, setEnableGroundTruth] = useState<boolean>(true);
  const [sarRadarVerified, setSarRadarVerified] = useState<boolean>(true);

  // 1. Acoplamiento de Verdad de Campo (Bitácora de Labores)
  const verifiedPractices = useMemo(() => {
    return getParcelVerifiedDiaryPractices(parcelId);
  }, [parcelId]);

  const empiricalAdjustment = useMemo(() => {
    return calculateEmpiricalSocAdjustment(verifiedPractices);
  }, [verifiedPractices]);

  // 2. Oráculo Sentinel-1 SAR Radar
  const sarOracle = useMemo(() => {
    return verifySarMrvOracle(9.324, -69.112);
  }, []);

  // Densidad aparente estimada por textura (g/cm3)
  const bulkDensity = useMemo(() => {
    const t = initialTexture.toLowerCase();
    if (t.includes('arenoso')) return 1.55;
    if (t.includes('arcilloso')) return 1.25;
    return 1.35; // Franco / Franco-limoso
  }, [initialTexture]);

  // Stock de Carbono Orgánico en Suelo (SOC) en los primeros 30cm:
  // SOC (tC/ha) = MO% * 0.58 * Densidad * 30cm
  const baselineSocStockTcHa = useMemo(() => {
    const soc = organicMatterPct * 0.58 * bulkDensity * 30;
    return parseFloat(soc.toFixed(1));
  }, [organicMatterPct, bulkDensity]);

  // Tasa anual de secuestro de carbono base + bonus empírico de bitácora
  const annualSequestrationTcHa = useMemo(() => {
    let baseRate = 0.05; // Convencional con labranza
    if (managementType === 'agroforestry') baseRate = 0.85; // Sistemas Agroforestales (SAF)
    else if (managementType === 'regenerative') baseRate = 0.55; // Siembra directa + Abonos verdes
    
    // Impacto según historial MapBiomas
    if (mapbiomasTransition === 'bosque_agricultura') baseRate -= 0.30;
    else if (mapbiomasTransition === 'agricultura_continua') baseRate -= 0.10;
    else if (mapbiomasTransition === 'pastura_agricultura') baseRate += 0.15;

    // Bonus empírico por prácticas registradas en la bitácora de campo
    if (enableGroundTruth && verifiedPractices.length > 0) {
      baseRate += empiricalAdjustment.totalSocBonusTcHaYr;
    }
    
    return Math.max(0, parseFloat(baseRate.toFixed(2)));
  }, [managementType, mapbiomasTransition, enableGroundTruth, verifiedPractices, empiricalAdjustment]);

  // Conversión tC a tCO2e (Ratio 44/12 = 3.667)
  const annualCo2eHa = useMemo(() => {
    return parseFloat((annualSequestrationTcHa * 3.667).toFixed(2));
  }, [annualSequestrationTcHa]);

  // Total parcela anual bruto
  const totalAnnualCo2eTons = useMemo(() => {
    return parseFloat((annualCo2eHa * areaHa).toFixed(1));
  }, [annualCo2eHa, areaHa]);

  // 3. Cálculo de Castigo por Incertidumbre (Uncertainty Discount Verra VCS)
  const uncertaintyPenaltyPct = useMemo(() => {
    let penalty = 40.0; // Tier 1 sin verificar (estándar internacional)
    if (enableGroundTruth && verifiedPractices.length > 0) penalty -= 15.0; // Bitácora auditada
    if (sarRadarVerified && sarOracle.biomassRoughnessVerified) penalty -= 15.0; // Radar SAR verificado
    return Math.max(10.0, penalty);
  }, [enableGroundTruth, verifiedPractices, sarRadarVerified, sarOracle]);

  const netIssuanceFactor = useMemo(() => {
    return (100.0 - uncertaintyPenaltyPct) / 100.0;
  }, [uncertaintyPenaltyPct]);

  // Emisión Neta Certificable de Créditos de Carbono
  const netCertifiableCo2eTons = useMemo(() => {
    return parseFloat((totalAnnualCo2eTons * netIssuanceFactor).toFixed(1));
  }, [totalAnnualCo2eTons, netIssuanceFactor]);

  // Ingreso anual neto estimado en USD
  const totalEstimatedRevenueUsd = useMemo(() => {
    return Math.round(netCertifiableCo2eTons * creditPriceUsd);
  }, [netCertifiableCo2eTons, creditPriceUsd]);

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(16px)',
      border: '1px solid rgba(34, 197, 94, 0.25)',
      borderRadius: '16px',
      padding: '20px',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }} data-testid="carbon-mrv-calculator">
      {/* Encabezado */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#4ade80', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
            <Leaf size={16} /> Módulo MRV • Certificación de Carbono
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '2px 0 0 0', color: '#f8fafc' }}>
            Calculadora de Créditos de Carbono ({parcelName})
          </h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.72rem', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', padding: '3px 10px', borderRadius: '999px', border: '1px solid #22c55e', fontWeight: 600 }}>
            IPCC Tier 2 / Verra VCS
          </span>
          <span style={{ fontSize: '0.72rem', background: uncertaintyPenaltyPct <= 15 ? 'rgba(56, 189, 248, 0.2)' : 'rgba(234, 179, 8, 0.2)', color: uncertaintyPenaltyPct <= 15 ? '#38bdf8' : '#facc15', padding: '3px 10px', borderRadius: '999px', border: `1px solid ${uncertaintyPenaltyPct <= 15 ? '#38bdf8' : '#facc15'}`, fontWeight: 700 }}>
            {uncertaintyPenaltyPct <= 15 ? '🛡️ Certificación Tier 2 Gold' : '⚠️ Tier 1 (Incertidumbre Alta)'}
          </span>
        </div>
      </div>

      {/* Controles de Entrada */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
        {/* Superficie */}
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <label style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
            <Tooltip content="El área en hectáreas de la parcela delimitada. Se usa para multiplicar el total de toneladas de carbono secuestradas.">
              Superficie (ha):
            </Tooltip>
          </label>
          <input
            type="number"
            min="1"
            max="5000"
            value={areaHa}
            onChange={(e) => setAreaHa(Math.max(1, parseFloat(e.target.value) || 1))}
            style={{
              width: '100%',
              background: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '6px',
              color: '#fff',
              padding: '6px 8px',
              fontSize: '0.9rem',
              fontWeight: 700
            }}
          />
        </div>

        {/* Materia Orgánica */}
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <label style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
            <Tooltip content="Porcentaje de materia orgánica en suelo determinado en laboratorio o estimado vía satélite/gemelo digital.">
              Materia Orgánica (%):
            </Tooltip>
          </label>
          <input
            type="number"
            step="0.1"
            min="0.5"
            max="15"
            value={organicMatterPct}
            onChange={(e) => setOrganicMatterPct(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
            style={{
              width: '100%',
              background: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '6px',
              color: '#fff',
              padding: '6px 8px',
              fontSize: '0.9rem',
              fontWeight: 700
            }}
          />
        </div>

        {/* Tipo de Manejo Regenerativo */}
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <label style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
            <Tooltip content="Práctica agronómica aplicada en el lote. La siembra directa y agroforestería maximizan la captura de carbono edáfico.">
              Manejo del Suelo:
            </Tooltip>
          </label>
          <select
            value={managementType}
            onChange={(e) => setManagementType(e.target.value as any)}
            style={{
              width: '100%',
              background: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '6px',
              color: '#fff',
              padding: '6px 8px',
              fontSize: '0.82rem',
              fontWeight: 600
            }}
          >
            <option value="regenerative">🌱 Siembra Directa + Coberturas</option>
            <option value="agroforestry">🌳 Sistema Agroforestal (SAF)</option>
            <option value="conventional">🚜 Labranza Convencional (Control)</option>
          </select>
        </div>

        {/* Transición MapBiomas */}
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <label style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
            <Tooltip content="Historial de uso de suelo derivado de MapBiomas Venezuela Colección 1.0 (1985-2024).">
              Transición MapBiomas:
            </Tooltip>
          </label>
          <select
            value={mapbiomasTransition}
            onChange={(e) => setMapbiomasTransition(e.target.value)}
            style={{
              width: '100%',
              background: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '6px',
              color: '#fff',
              padding: '6px 8px',
              fontSize: '0.82rem',
              fontWeight: 600
            }}
          >
            <option value="bosque_agricultura">🌳 Bosque ➔ Agricultura (Riesgo Emisión)</option>
            <option value="sabana_agricultura">🌾 Sabana ➔ Agricultura</option>
            <option value="pastura_agricultura">🐄 Pastura ➔ Agricultura (Regenerable)</option>
            <option value="agricultura_continua">🚜 Agricultura Continua (Degradación)</option>
          </select>
        </div>
      </div>

      {/* SECCIÓN MRV: AUDITORÍA DE VERDAD DE CAMPO & ORÁCULO SENTINEL-1 SAR */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(6, 95, 70, 0.15))',
        border: '1px solid rgba(16, 185, 129, 0.3)',
        borderRadius: '12px',
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} color="#34d399" />
            <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#ecfdf5' }}>
              Validación MRV: Verdad de Campo & Oráculo Radar Sentinel-1 SAR
            </span>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#a7f3d0' }}>
            Incertidumbre Deductiva Verra: <b style={{ color: uncertaintyPenaltyPct <= 15 ? '#4ade80' : '#facc15' }}>{uncertaintyPenaltyPct}%</b> (Factor de emisión: {(netIssuanceFactor * 100).toFixed(0)}%)
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
          {/* Tarjeta 1: Verdad de Campo (Bitácora) */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <BookOpen size={14} /> Bitácora Cuaderno de Campo
              </span>
              <label style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={enableGroundTruth} 
                  onChange={e => setEnableGroundTruth(e.target.checked)} 
                />
                Acoplar
              </label>
            </div>
            {verifiedPractices.length > 0 ? (
              <div>
                <div style={{ fontSize: '0.8rem', color: '#4ade80', fontWeight: 700 }}>
                  ✓ {verifiedPractices.length} labor(es) empírica(s) confirmada(s)
                </div>
                <div style={{ fontSize: '0.7rem', color: '#cbd5e1', marginTop: '2px' }}>
                  Bonus SOC: <b>+{empiricalAdjustment.totalSocBonusTcHaYr} tC/ha/año</b> (+{empiricalAdjustment.totalCo2eBonusTonHaYr} tCO₂e)
                </div>
                <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '4px' }}>
                  Labores: {verifiedPractices.map(p => p.practiceKey.replace('_', ' ')).join(', ')}
                </div>
              </div>
            ) : (
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Sin labores regenerativas registradas en la bitácora aún.
              </div>
            )}
          </div>

          {/* Tarjeta 2: Oráculo Radar Sentinel-1 SAR */}
          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#a855f7', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Radar size={14} /> Oráculo Radar Sentinel-1 SAR
              </span>
              <label style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={sarRadarVerified} 
                  onChange={e => setSarRadarVerified(e.target.checked)} 
                />
                Verificar
              </label>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#c084fc', fontWeight: 700 }}>
                {sarOracle.biomassRoughnessVerified ? '✓ Rugosidad de Dosel Confirmada' : '⚠️ Rugosidad Insuficiente'}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#cbd5e1', marginTop: '2px' }}>
                Relación VH/VV: <b>{sarOracle.crossRatio_dB} dB</b> (Umbral: {sarOracle.roughnessThreshold_dB} dB)
              </div>
              <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '4px', fontFamily: 'monospace' }}>
                Audit Hash: {sarOracle.cryptographicAuditProof}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Métricas y Resultados de Secuestro */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
        {/* Stock Base */}
        <div style={{ background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.2)', padding: '12px', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Stock de Carbono Suelo (0-30cm)</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#4ade80', marginTop: '2px' }}>
            {baselineSocStockTcHa} <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>tC/ha</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#cbd5e1', marginTop: '4px' }}>
            Densidad aparente: {bulkDensity} g/cm³
          </div>
        </div>

        {/* Secuestro Anual CO2e Certificable */}
        <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '12px', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Secuestro Neto Certificable</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8', marginTop: '2px' }}>
            {netCertifiableCo2eTons} <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>tCO₂e / año</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#cbd5e1', marginTop: '4px' }}>
            Bruto: {totalAnnualCo2eTons} tCO₂e (-{uncertaintyPenaltyPct}% MRV)
          </div>
        </div>

        {/* Valor Económico en Créditos */}
        <div style={{ background: 'rgba(234, 179, 8, 0.08)', border: '1px solid rgba(234, 179, 8, 0.2)', padding: '12px', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Ingreso Neto Certificado</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#facc15', marginTop: '2px' }}>
            ${totalEstimatedRevenueUsd.toLocaleString()} <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>USD / año</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#cbd5e1', marginTop: '4px' }}>
            A ${creditPriceUsd} USD por tCO₂e neta
          </div>
        </div>
      </div>

      {/* Modelo Comercial: Agregación Regional de Carbono (Carbon Pooling) */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.9))',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              background: 'rgba(56, 189, 248, 0.15)',
              color: '#38bdf8',
              padding: '2px 8px',
              borderRadius: '6px',
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase'
            }}>
              Fintech Climática B2B / Cooperativas
            </span>
            <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>
              Modelo de Agregación Comercial • Agrotech Carbon Pooling
            </h4>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
            Partición Transparente: <b>85% Productor / 15% Plataforma</b>
          </span>
        </div>

        <p style={{ fontSize: '0.78rem', color: '#cbd5e1', margin: 0, lineHeight: 1.5 }}>
          <b>Barrera para el Pequeño Productor:</b> La certificación Verra VCS individual exige auditorías de campo de más de <b>$45,000 USD</b>. Con <b>Agrotech Carbon Pooling</b> y validación cruzada con Sentinel-1 SAR y Bitácora, agrupamos predios de 10 a 100 ha en un portfolio regional, colapsando el descuento por incertidumbre del 40% al 10% y eliminando los costos de auditoría individual.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
          {/* Ingreso Neto del Productor (85%) */}
          <div style={{ background: 'rgba(34, 197, 94, 0.12)', border: '1px solid rgba(34, 197, 94, 0.3)', borderRadius: '10px', padding: '10px' }}>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>
              Ingreso Neto del Productor (85%)
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#4ade80', marginTop: '2px' }}>
              ${Math.round(totalEstimatedRevenueUsd * 0.85).toLocaleString()} <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>USD/año</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: '#86efac', marginTop: '4px' }}>
              Retorno líquido directo sin costo de auditoría
            </div>
          </div>

          {/* Comisión de Plataforma Agrotech (15%) */}
          <div style={{ background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '10px', padding: '10px' }}>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>
              Originación & Monitoreo Agrotech (15%)
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8', marginTop: '2px' }}>
              ${Math.round(totalEstimatedRevenueUsd * 0.15).toLocaleString()} <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>USD/año</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: '#93c5fd', marginTop: '4px' }}>
              Por telemetría satelital MRV y gestión Verra
            </div>
          </div>

          {/* Escala del Pool Regional */}
          <div style={{ background: 'rgba(168, 85, 247, 0.12)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '10px', padding: '10px' }}>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>
              Escalabilidad del Pool (5,000 ha)
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#c084fc', marginTop: '2px' }}>
              ${Math.round(annualCo2eHa * netIssuanceFactor * 5000 * creditPriceUsd).toLocaleString()} <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>USD/año</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: '#d8b4fe', marginTop: '4px' }}>
              ~{(annualCo2eHa * netIssuanceFactor * 5000).toFixed(0)} tCO₂e/año netas agrupadas
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
