"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Compass, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Map, 
  Radio, 
  Sparkles, 
  Award,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

interface TourStep {
  title: string;
  badge: string;
  badgeColor: string;
  icon: React.ElementType;
  description: string;
  highlights: string[];
  actionLabel: string;
  actionHref: string;
}

const TOUR_STEPS: TourStep[] = [
  {
    title: "Cartografía Nacional & Edafología MapBiomas",
    badge: "Paso 1 de 4 • WebGIS",
    badgeColor: "#38bdf8",
    icon: Map,
    description: "Cobertura territorial en 24 estados y 335 municipios con GeoJSON WGS84 confinado a Venezuela, series históricas 1985–2024 y mapas edafológicos de pH y textura de suelos.",
    highlights: [
      "Fijación geográfica estricta con maxBounds sin desbordes internacionales.",
      "Integración de 40 años de datos de uso y cobertura MapBiomas Colección 3.",
      "Cálculo de balance hídrico y grados día de crecimiento (GDD)."
    ],
    actionLabel: "Explorar Mapa Nacional",
    actionHref: "/dashboard/mapa"
  },
  {
    title: "Micro-Parcelas & Radar SAR Sentinel-1 Banda C",
    badge: "Paso 2 de 4 • Teledetección",
    badgeColor: "#4ade80",
    icon: Radio,
    description: "Delimitador satelital de alta precisión con cálculo geodésico Shoelace en hectáreas y penetración de nubes tropicales vía radar SAR retrodispersión dual VV/VH.",
    highlights: [
      "Estimación de humedad superficial del suelo sin interferencia de nubes.",
      "Cálculo de perímetro Haversine y persistencia en base de datos.",
      "Soporte offline con sincronización en segundo plano vía IndexedDB."
    ],
    actionLabel: "Ver Mis Tierras & Parcelas",
    actionHref: "/dashboard/tierras"
  },
  {
    title: "Prescripción Asistida por Gemini AI & Suelos",
    badge: "Paso 3 de 4 • Inteligencia Artificial",
    badgeColor: "#a855f7",
    icon: Sparkles,
    description: "Asesor agronómico interactivo con memoria territorial que dosifica encalado con carbonato de calcio (CaCO₃), planes N-P-K y recomendaciones de manejo por cultivo.",
    highlights: [
      "Inferencia Gemini calibrada para las condiciones agroecológicas venezolanas.",
      "Algoritmo multicriterio AHP para evaluar aptitud botánica por rubro.",
      "Resiliencia Zero-Fail con fallback heurístico ante desconexión."
    ],
    actionLabel: "Abrir Simulador Agronómico",
    actionHref: "/dashboard/recomendaciones"
  },
  {
    title: "Madurez TRL 7, MRV de Carbono & APIs OpenAPI",
    badge: "Paso 4 de 4 • Certificación",
    badgeColor: "#f59e0b",
    icon: Award,
    description: "Plataforma validada en entorno operativo real (TRL 7), con cuantificación de secuestro de carbono orgánico (SOC) bajo IPCC Tier 2 y catálogo de 39 APIs REST.",
    highlights: [
      "Calculadora de créditos de carbono certificables para la banca agrícola.",
      "Documentación técnica interactiva OpenAPI / Swagger en Next.js App Router.",
      "Ecosistema de microservicios contenerizado y listo para producción."
    ],
    actionLabel: "Ver Ficha de Postulación TRL 7",
    actionHref: "/dashboard/postulacion"
  }
];

export default function DemoTourModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // Cerrar con Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const step = TOUR_STEPS[currentStep];
  const IconComponent = step.icon;

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsOpen(false);
      setCurrentStep(0);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setCurrentStep(0);
          setIsOpen(true);
        }}
        title="Iniciar Tour Demostrativo del Sistema"
        style={{
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15) 0%, rgba(56, 189, 248, 0.15) 100%)',
          border: '1px solid rgba(34, 197, 94, 0.4)',
          color: '#4ade80',
          padding: '6px 12px',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '0.8rem',
          fontWeight: 600,
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}
        aria-label="Abrir Tour Demostrativo"
      >
        <Compass size={15} color="#4ade80" />
        <span>Tour Demo</span>
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(11, 19, 41, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '16px'
        }}>
          <div style={{
            background: 'linear-gradient(180deg, #0f172a 0%, #0b1329 100%)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '560px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.15)',
            overflow: 'hidden',
            animation: 'fadeIn 0.2s ease-out'
          }}>
            {/* Header del Modal */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(15, 23, 42, 0.6)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: step.badgeColor,
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  border: `1px solid ${step.badgeColor}40`
                }}>
                  {step.badge}
                </span>
              </div>
              
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '6px'
                }}
                aria-label="Cerrar tour"
              >
                <X size={18} />
              </button>
            </div>

            {/* Contenido del Paso */}
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' }}>
                <div style={{
                  background: `${step.badgeColor}15`,
                  border: `1px solid ${step.badgeColor}40`,
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: step.badgeColor,
                  flexShrink: 0
                }}>
                  <IconComponent size={28} />
                </div>
                <div>
                  <h3 style={{ margin: '0 0 6px 0', fontSize: '1.25rem', color: '#f8fafc', fontWeight: 700 }}>
                    {step.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.5 }}>
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Lista de Puntos Destacados */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '10px',
                padding: '14px 16px',
                marginBottom: '20px'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Capacidades del Módulo
                </div>
                <ul style={{ margin: 0, paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {step.highlights.map((h, i) => (
                    <li key={i} style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Enlace Directo al Módulo */}
              <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '20px' }}>
                <Link
                  href={step.actionHref}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: step.badgeColor,
                    textDecoration: 'none',
                    padding: '6px 12px',
                    background: `${step.badgeColor}12`,
                    border: `1px solid ${step.badgeColor}30`,
                    borderRadius: '8px'
                  }}
                >
                  <span>{step.actionLabel}</span>
                  <ExternalLink size={14} />
                </Link>
              </div>

              {/* Barra de Navegación y Paginación */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
              }}>
                {/* Indicadores de Paso */}
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  {TOUR_STEPS.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentStep(idx)}
                      style={{
                        width: idx === currentStep ? '24px' : '8px',
                        height: '8px',
                        borderRadius: '4px',
                        background: idx === currentStep ? step.badgeColor : 'rgba(255, 255, 255, 0.2)',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'all 0.3s ease'
                      }}
                      aria-label={`Ir al paso ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Botones Prev / Next */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  {currentStep > 0 && (
                    <button
                      onClick={handlePrev}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#cbd5e1',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      <ChevronLeft size={16} /> Anterior
                    </button>
                  )}

                  <button
                    onClick={handleNext}
                    style={{
                      background: currentStep === TOUR_STEPS.length - 1 ? '#16a34a' : '#2563eb',
                      border: 'none',
                      color: '#ffffff',
                      padding: '6px 16px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                    }}
                  >
                    <span>{currentStep === TOUR_STEPS.length - 1 ? 'Finalizar Tour' : 'Siguiente'}</span>
                    {currentStep === TOUR_STEPS.length - 1 ? <CheckCircle2 size={16} /> : <ChevronRight size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
