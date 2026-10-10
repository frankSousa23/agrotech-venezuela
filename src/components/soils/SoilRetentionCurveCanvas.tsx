"use client";

import React, { useMemo } from 'react';
import { SoilTextureType } from '@/lib/agronomy/pedotransferEngine';

interface SoilRetentionCurveProps {
  texture: SoilTextureType;
  moisturePct: number;
  fieldCapacity: number;
  wiltingPoint: number;
  criticalThreshold: number;
  saturationTheta: number;
}

export default function SoilRetentionCurveCanvas({
  texture,
  moisturePct,
  fieldCapacity,
  wiltingPoint,
  criticalThreshold,
  saturationTheta
}: SoilRetentionCurveProps) {
  // Dimensiones del gráfico SVG
  const width = 500;
  const height = 260;
  const padLeft = 45;
  const padRight = 20;
  const padTop = 20;
  const padBottom = 35;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const maxTheta = 60.0;
  const maxPf = 4.5;

  // Conversión de coordenadas a píxeles
  const toX = (theta: number) => padLeft + (Math.max(0, Math.min(maxTheta, theta)) / maxTheta) * chartW;
  const toY = (pf: number) => padTop + chartH - (Math.max(0, Math.min(maxPf, pf)) / maxPf) * chartH;

  // Puntos notables pF
  const pSat = 0.6;
  const pFc = 2.53;  // -33 kPa (~330 cm)
  const pCrit = 3.0; // -100 kPa
  const pPwp = 4.18; // -1500 kPa (~15300 cm)

  // Generar curva suave de retención van Genuchten aproximada
  const curvePath = useMemo(() => {
    const points: [number, number][] = [];
    const steps = 40;
    const startTheta = Math.max(2, wiltingPoint * 0.5);
    const endTheta = saturationTheta;

    for (let i = 0; i <= steps; i++) {
      const t = startTheta + (i / steps) * (endTheta - startTheta);
      let pfVal: number;

      if (t >= saturationTheta) {
        pfVal = pSat;
      } else if (t >= fieldCapacity) {
        const ratio = (saturationTheta - t) / Math.max(0.1, saturationTheta - fieldCapacity);
        pfVal = pSat + ratio * (pFc - pSat);
      } else if (t >= wiltingPoint) {
        const ratio = (fieldCapacity - t) / Math.max(0.1, fieldCapacity - wiltingPoint);
        pfVal = pFc + ratio * (pPwp - pFc);
      } else {
        const ratio = (wiltingPoint - t) / Math.max(0.1, wiltingPoint);
        pfVal = Math.min(maxPf, pPwp + ratio * 0.3);
      }

      points.push([toX(t), toY(pfVal)]);
    }

    if (points.length === 0) return '';
    return 'M ' + points.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' L ');
  }, [fieldCapacity, wiltingPoint, saturationTheta, chartW, chartH]);

  // Posición del punto actual
  let currentPf = pFc;
  if (moisturePct >= saturationTheta) currentPf = pSat;
  else if (moisturePct >= fieldCapacity) {
    const r = (saturationTheta - moisturePct) / Math.max(0.1, saturationTheta - fieldCapacity);
    currentPf = pSat + r * (pFc - pSat);
  } else if (moisturePct >= wiltingPoint) {
    const r = (fieldCapacity - moisturePct) / Math.max(0.1, fieldCapacity - wiltingPoint);
    currentPf = pFc + r * (pPwp - pFc);
  } else {
    currentPf = pPwp;
  }

  const currentX = toX(moisturePct);
  const currentY = toY(currentPf);

  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: '100%', height: 'auto', display: 'block', background: 'rgba(15, 23, 42, 0.4)', borderRadius: 12 }}
      >
        <defs>
          <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>

        {/* Zonas de Humedad de Fondo */}
        {/* Zona Marchitez (Rojo) */}
        <rect
          x={toX(0)}
          y={padTop}
          width={toX(wiltingPoint) - toX(0)}
          height={chartH}
          fill="rgba(239, 68, 68, 0.12)"
        />
        {/* Zona Estrés (Ámbar) */}
        <rect
          x={toX(wiltingPoint)}
          y={padTop}
          width={toX(criticalThreshold) - toX(wiltingPoint)}
          height={chartH}
          fill="rgba(245, 158, 11, 0.12)"
        />
        {/* Zona Óptima PAW (Verde) */}
        <rect
          x={toX(criticalThreshold)}
          y={padTop}
          width={toX(fieldCapacity) - toX(criticalThreshold)}
          height={chartH}
          fill="rgba(16, 185, 129, 0.18)"
        />
        {/* Zona Gravitacional / Drenaje (Azul) */}
        <rect
          x={toX(fieldCapacity)}
          y={padTop}
          width={toX(saturationTheta) - toX(fieldCapacity)}
          height={chartH}
          fill="rgba(6, 182, 212, 0.12)"
        />

        {/* Ejes y Cuadrícula */}
        {/* Líneas horizontales de pF */}
        {[1.0, 2.0, 2.53, 3.0, 4.18].map(pf => (
          <g key={`pf-${pf}`}>
            <line
              x1={padLeft}
              y1={toY(pf)}
              x2={padLeft + chartW}
              y2={toY(pf)}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeDasharray="3 3"
            />
            <text
              x={padLeft - 6}
              y={toY(pf) + 3}
              fill="#94a3b8"
              fontSize="10"
              textAnchor="end"
              fontFamily="monospace"
            >
              {pf.toFixed(1)}
            </text>
          </g>
        ))}

        {/* Líneas verticales de Theta */}
        {[wiltingPoint, criticalThreshold, fieldCapacity, saturationTheta].map((th, idx) => (
          <g key={`th-${idx}`}>
            <line
              x1={toX(th)}
              y1={padTop}
              x2={toX(th)}
              y2={padTop + chartH}
              stroke="rgba(255, 255, 255, 0.15)"
              strokeDasharray="2 2"
            />
            <text
              x={toX(th)}
              y={padTop + chartH + 16}
              fill="#cbd5e1"
              fontSize="10"
              textAnchor="middle"
              fontFamily="monospace"
            >
              {th.toFixed(0)}%
            </text>
          </g>
        ))}

        {/* Eje X y Eje Y principales */}
        <line x1={padLeft} y1={padTop + chartH} x2={padLeft + chartW} y2={padTop + chartH} stroke="#64748b" strokeWidth="1.5" />
        <line x1={padLeft} y1={padTop} x2={padLeft} y2={padTop + chartH} stroke="#64748b" strokeWidth="1.5" />

        {/* Etiquetas de Ejes */}
        <text x={padLeft + chartW / 2} y={height - 6} fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="600">
          Humedad Volumétrica del Suelo (θ %)
        </text>
        <text
          x={-padTop - chartH / 2}
          y={14}
          fill="#94a3b8"
          fontSize="11"
          textAnchor="middle"
          fontWeight="600"
          transform="rotate(-90)"
        >
          Succión Mátrica (pF)
        </text>

        {/* Curva de Retención de Agua */}
        <path d={curvePath} fill="none" stroke="url(#curveGradient)" strokeWidth="3" strokeLinecap="round" />

        {/* Etiquetas de Puntos Clave */}
        <text x={toX(fieldCapacity)} y={padTop + 14} fill="#10b981" fontSize="9" fontWeight="700" textAnchor="middle">
          θ_FC
        </text>
        <text x={toX(wiltingPoint)} y={padTop + 14} fill="#ef4444" fontSize="9" fontWeight="700" textAnchor="middle">
          θ_PWP
        </text>
        <text x={toX(saturationTheta)} y={padTop + 14} fill="#06b6d4" fontSize="9" fontWeight="700" textAnchor="middle">
          θ_SAT
        </text>

        {/* Marcador del punto de humedad actual */}
        <circle cx={currentX} cy={currentY} r="7" fill="#38bdf8" stroke="#ffffff" strokeWidth="2.5" />
        <circle cx={currentX} cy={currentY} r="14" fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.6">
          <animate attributeName="r" values="7;16;7" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.1;0.8" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}
