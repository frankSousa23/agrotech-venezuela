/**
 * ============================================================================
 * AGROTECH VENEZUELA — CALCULADORA DE CRÉDITOS DE CARBONO & MRV (CarbonCreditsCalculator.tsx)
 * ============================================================================
 * 
 * Cuantificación de Carbono Orgánico del Suelo (SOC) y Certificación MRV:
 * - Stock de Carbono base según Textura, Materia Orgánica y Densidad Aparente.
 * - Secuestro de CO2e evitado bajo Manejo Regenerativo (Siembra Directa + Coberturas).
 * - Estimación económica de Bonos/Créditos de Carbono para el productor.
 */

'use client';

import React, { useState, useMemo } from 'react';
import { Leaf } from 'lucide-react';
import Tooltip from '@/components/layout/Tooltip';

interface CarbonCreditsCalculatorProps {
  initialAreaHa?: number;
  initialOrganicMatterPct?: number;
  initialTexture?: string;
  parcelName?: string;
}

export default function CarbonCreditsCalculator({
  initialAreaHa = 45.0,
  initialOrganicMatterPct = 2.6,
  initialTexture = 'Franco-arcilloso',
  parcelName = 'Lote Principal'
}: CarbonCreditsCalculatorProps) {
  const [areaHa, setAreaHa] = useState<number>(initialAreaHa);
  const [organicMatterPct, setOrganicMatterPct] = useState<number>(initialOrganicMatterPct);
  const [managementType, setManagementType] = useState<'regenerative' | 'agroforestry' | 'conventional'>('regenerative');
  const [mapbiomasTransition, setMapbiomasTransition] = useState<string>('pastura_agricultura');
  const [creditPriceUsd, setCreditPriceUsd] = useState<number>(18.5); // USD por tCO2e (Estándar Verra / Gold Standard)

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

  // Tasa anual de secuestro de carbono (tC/ha/año)
  const annualSequestrationTcHa = useMemo(() => {
    let baseRate = 0.05; // Convencional con labranza
    if (managementType === 'agroforestry') baseRate = 0.85; // Sistemas Agroforestales (SAF)
    else if (managementType === 'regenerative') baseRate = 0.55; // Siembra directa + Abonos verdes
    
    // Impacto según historial MapBiomas
    if (mapbiomasTransition === 'bosque_agricultura') baseRate -= 0.30;
    else if (mapbiomasTransition === 'agricultura_continua') baseRate -= 0.10;
    else if (mapbiomasTransition === 'pastura_agricultura') baseRate += 0.15;
    
    return Math.max(0, baseRate);
  }, [managementType, mapbiomasTransition]);

  // Conversión tC a tCO2e (Ratio 44/12 = 3.667)
  const annualCo2eHa = useMemo(() => {
    return parseFloat((annualSequestrationTcHa * 3.667).toFixed(2));
  }, [annualSequestrationTcHa]);

  // Total parcela anual
  const totalAnnualCo2eTons = useMemo(() => {
    return parseFloat((annualCo2eHa * areaHa).toFixed(1));
  }, [annualCo2eHa, areaHa]);

  // Ingreso anual estimado en USD
  const totalEstimatedRevenueUsd = useMemo(() => {
    return Math.round(totalAnnualCo2eTons * creditPriceUsd);
  }, [totalAnnualCo2eTons, creditPriceUsd]);

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
    }}>
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
        <span style={{ fontSize: '0.72rem', background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', padding: '3px 10px', borderRadius: '999px', border: '1px solid #22c55e', fontWeight: 600 }}>
          Metodología IPCC Tier 2 / Verra VCS
        </span>
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
            onChange={(e) => setAreaHa(Math.max(0.5, parseFloat(e.target.value) || 1))}
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
            <Tooltip content="Materia orgánica actual del suelo. Influye directamente en la base de carbono capturado (SOC). Un mayor % significa suelo más rico y sano.">
              Materia Orgánica (%):
            </Tooltip>
          </label>
          <input
            type="number"
            step="0.1"
            min="0.5"
            max="8.0"
            value={organicMatterPct}
            onChange={(e) => setOrganicMatterPct(Math.max(0.1, parseFloat(e.target.value) || 1))}
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

        {/* Manejo Agronómico */}
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <label style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
            <Tooltip content="El manejo regenerativo o agroforestal aumenta significativamente el secuestro anual de CO2 en comparación con la labranza convencional.">
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
            <option value="conventional">🚜 Labranza Convencional</option>
          </select>
        </div>

        {/* Historial MapBiomas */}
        <div style={{ background: 'rgba(30, 41, 59, 0.6)', padding: '10px 12px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <label style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
            <Tooltip content="Extraído automáticamente de MapBiomas 1985-2024. Los créditos penalizan áreas deforestadas recientemente y bonifican la recuperación de pasturas degradadas.">
              Transición Histórica (MapBiomas):
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

        {/* Secuestro Anual CO2e */}
        <div style={{ background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '12px', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Secuestro Anual Total</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8', marginTop: '2px' }}>
            {totalAnnualCo2eTons} <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>tCO₂e / año</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#cbd5e1', marginTop: '4px' }}>
            Equivale a {annualCo2eHa} tCO₂e/ha/año
          </div>
        </div>

        {/* Valor Económico en Créditos */}
        <div style={{ background: 'rgba(234, 179, 8, 0.08)', border: '1px solid rgba(234, 179, 8, 0.2)', padding: '12px', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Ingreso Bruto Estimado</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#facc15', marginTop: '2px' }}>
            ${totalEstimatedRevenueUsd.toLocaleString()} <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>USD / año</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#cbd5e1', marginTop: '4px' }}>
            A ${creditPriceUsd} USD por tCO₂e certificada
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
          <b>Barrera para el Pequeño Productor:</b> La certificación Verra VCS / Gold Standard individual exige auditorías de campo de más de <b>$45,000 USD</b>, haciendo inviable certificar predios menores a 500 ha de manera aislada. <b>Agrotech agrupa parcelas de 10 a 100 ha en un Portfolio Digital Regional</b> auditado con Sentinel-2 y MapBiomas, reduciendo el costo de entrada a cero para el productor.
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
              ${Math.round(annualCo2eHa * 5000 * creditPriceUsd).toLocaleString()} <span style={{ fontSize: '0.75rem', fontWeight: 400 }}>USD/año</span>
            </div>
            <div style={{ fontSize: '0.68rem', color: '#d8b4fe', marginTop: '4px' }}>
              ~{(annualCo2eHa * 5000).toFixed(0)} tCO₂e/año agrupadas
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
