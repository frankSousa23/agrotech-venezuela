/**
 * ============================================================================
 * AGROTECH VENEZUELA — EMPTY STATE CARD CON ONBOARDING (EmptyStateCard.tsx)
 * ============================================================================
 * 
 * Tarjeta de estado vacío con guía de onboarding paso a paso
 * para agricultores y técnicos que inician el registro de fincas o labores.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { LucideIcon, ArrowRight, Sparkles } from 'lucide-react';

interface EmptyStateCardProps {
  icon: LucideIcon;
  iconColor?: string;
  title: string;
  description: string;
  steps?: { number: number; text: string }[];
  actionLabel?: string;
  actionHref?: string;
  onActionClick?: () => void;
}

export default function EmptyStateCard({
  icon: Icon,
  iconColor = '#22c55e',
  title,
  description,
  steps = [
    { number: 1, text: '🛰️ Delimita el polígono de tu lote en el visor satelital' },
    { number: 2, text: '🧪 Consulta el perfil edafológico y textura del suelo' },
    { number: 3, text: '📖 Comienza a registrar labores y cosechas en la bitácora' },
  ],
  actionLabel,
  actionHref,
  onActionClick
}: EmptyStateCardProps) {
  return (
    <div
      style={{
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(14px)',
        border: '1px dashed rgba(255, 255, 255, 0.2)',
        borderRadius: '16px',
        padding: '36px 24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '580px',
        margin: '20px auto',
        color: '#fff',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
      }}
    >
      <div
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '16px',
          background: 'rgba(34, 197, 94, 0.12)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px'
        }}
      >
        <Icon size={30} color={iconColor} />
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 6px 0', color: '#f8fafc' }}>
        {title}
      </h3>

      <p style={{ fontSize: '0.88rem', color: '#94a3b8', margin: '0 0 20px 0', maxWidth: '420px', lineHeight: 1.4 }}>
        {description}
      </p>

      {/* Guía Onboarding 1-2-3 */}
      {steps && steps.length > 0 && (
        <div
          style={{
            background: 'rgba(30, 41, 59, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '14px 18px',
            width: '100%',
            marginBottom: '24px',
            textAlign: 'left'
          }}
        >
          <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: '#38bdf8', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={12} /> Flujo Recomendado de Inicio:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {steps.map((st) => (
              <div key={st.number} style={{ fontSize: '0.8rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '999px',
                  background: 'rgba(56, 189, 248, 0.2)',
                  color: '#38bdf8',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {st.number}
                </span>
                <span>{st.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Botón de Acción Principal */}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#16a34a',
            color: '#fff',
            textDecoration: 'none',
            padding: '10px 20px',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '0.88rem',
            boxShadow: '0 4px 14px rgba(22, 163, 74, 0.4)',
            transition: 'all 0.2s ease'
          }}
        >
          <span>{actionLabel}</span>
          <ArrowRight size={16} />
        </Link>
      )}

      {actionLabel && !actionHref && onActionClick && (
        <button
          onClick={onActionClick}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#16a34a',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '10px',
            fontWeight: 700,
            fontSize: '0.88rem',
            boxShadow: '0 4px 14px rgba(22, 163, 74, 0.4)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <span>{actionLabel}</span>
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
}
