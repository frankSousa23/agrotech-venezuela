'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Compass, 
  Search, 
  Home, 
  MapPin, 
  Tractor, 
  BookOpen, 
  ArrowLeft,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export default function NotFound() {
  const handleOpenSearch = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-command-palette'));
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at 50% 20%, rgba(18, 61, 47, 0.4) 0%, rgba(11, 19, 16, 0.98) 70%), #0b1310',
      padding: '24px',
      color: '#f0fdf4',
      fontFamily: 'var(--font-sans, sans-serif)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Glow ambient background lights */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '20%',
        width: '350px',
        height: '350px',
        background: 'rgba(34, 197, 94, 0.12)',
        borderRadius: '50%',
        filter: 'blur(90px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '20%',
        width: '400px',
        height: '400px',
        background: 'rgba(56, 189, 248, 0.08)',
        borderRadius: '50%',
        filter: 'blur(100px)',
        pointerEvents: 'none'
      }} />

      {/* Main Glassmorphism Card */}
      <div style={{
        maxWidth: '620px',
        width: '100%',
        background: 'rgba(18, 28, 23, 0.75)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(74, 222, 128, 0.25)',
        borderRadius: '24px',
        padding: '40px 32px',
        textAlign: 'center',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(34, 197, 94, 0.1)',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Top Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.35)',
          borderRadius: '9999px',
          padding: '4px 14px',
          fontSize: '0.78rem',
          fontWeight: 700,
          color: '#fca5a5',
          marginBottom: '20px'
        }}>
          <span>🌱 Coordenada No Encontrada</span>
          <span style={{ opacity: 0.5 }}>•</span>
          <span>HTTP 404</span>
        </div>

        {/* 404 Big Display */}
        <h1 style={{
          fontSize: 'clamp(4rem, 10vw, 6rem)',
          fontWeight: 900,
          letterSpacing: '-2px',
          lineHeight: 1,
          margin: '0 0 12px',
          background: 'linear-gradient(135deg, #4ade80 0%, #38bdf8 50%, #a855f7 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: 'var(--font-display, sans-serif)'
        }}>
          404
        </h1>

        <h2 style={{
          fontSize: '1.35rem',
          fontWeight: 700,
          color: '#f8fafc',
          margin: '0 0 12px'
        }}>
          El lote o página solicitada no está en el mapa
        </h2>

        <p style={{
          fontSize: '0.92rem',
          color: '#94a3b8',
          lineHeight: 1.6,
          margin: '0 auto 28px',
          maxWidth: '480px'
        }}>
          La ruta que intentas consultar puede haber sido movida, escrita con un alias antiguo o no existe en la cuadrícula territorial de AgroTech Venezuela.
        </p>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '32px'
        }}>
          <Link
            href="/dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #16a34a, #15803d)',
              color: '#fff',
              border: 'none',
              padding: '10px 22px',
              borderRadius: '10px',
              fontSize: '0.88rem',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(22, 163, 74, 0.4)',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
          >
            <Home size={16} />
            <span>Volver al Panel Principal</span>
          </Link>

          <button
            type="button"
            onClick={handleOpenSearch}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              color: '#38bdf8',
              padding: '10px 18px',
              borderRadius: '10px',
              fontSize: '0.88rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title="Abrir buscador omnibox (Ctrl+K)"
          >
            <Search size={16} />
            <span>Buscar en AgroTech</span>
            <kbd style={{
              background: 'rgba(15, 23, 42, 0.8)',
              padding: '2px 5px',
              borderRadius: '4px',
              fontSize: '0.7rem',
              border: '1px solid rgba(255, 255, 255, 0.15)'
            }}>
              Ctrl K
            </kbd>
          </button>
        </div>

        {/* Quick Jump Module Pills */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '20px',
          textAlign: 'left'
        }}>
          <div style={{
            fontSize: '0.74rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#64748b',
            marginBottom: '12px',
            textAlign: 'center'
          }}>
            Módulos recomendados de navegación
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '8px'
          }}>
            <Link
              href="/dashboard/mapa"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '8px',
                padding: '8px 10px',
                color: '#cbd5e1',
                fontSize: '0.78rem',
                textDecoration: 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <Compass size={14} color="#38bdf8" />
              <span>Visor WebGIS</span>
            </Link>

            <Link
              href="/dashboard/tierras"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '8px',
                padding: '8px 10px',
                color: '#cbd5e1',
                fontSize: '0.78rem',
                textDecoration: 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <Tractor size={14} color="#22c55e" />
              <span>Mis Tierras</span>
            </Link>

            <Link
              href="/dashboard/bitacora"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '8px',
                padding: '8px 10px',
                color: '#cbd5e1',
                fontSize: '0.78rem',
                textDecoration: 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <BookOpen size={14} color="#f59e0b" />
              <span>Cuaderno de Campo</span>
            </Link>

            <Link
              href="/dashboard/manual"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '8px',
                padding: '8px 10px',
                color: '#cbd5e1',
                fontSize: '0.78rem',
                textDecoration: 'none',
                transition: 'all 0.15s ease'
              }}
            >
              <HelpCircle size={14} color="#a855f7" />
              <span>Manual y Guías</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
