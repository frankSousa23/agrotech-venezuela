/**
 * ============================================================================
 * AGROTECH VENEZUELA — DOCUMENTACIÓN DE APIS OPENAPI / SWAGGER (/api-docs)
 * ============================================================================
 * 
 * Interfaz interactiva de documentación técnica OpenAPI 3.0:
 * - Conexión directa con los 39 endpoints del backend espacial FastAPI.
 * - Visor interactivo Swagger / Redoc integrado con el tema de la plataforma.
 * - Especificaciones de esquemas JSON para integración con drones y sensores IoT.
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import BackButton from '@/components/ui/BackButton';
import { 
  FileCode2, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Database, 
  Cpu, 
  Radio,
  ArrowRight,
  CheckCircle2,
  Code2
} from 'lucide-react';

export default function ApiDocsPage() {
  const [activeTab, setActiveTab] = useState<'interactive' | 'endpoints' | 'schema'>('interactive');

  const API_SECTIONS = [
    {
      title: '🛰️ Módulos Geoespaciales & Satelitales (FastAPI / GEE)',
      endpoints: [
        { method: 'GET', path: '/api/v1/spatial/venezuela/states', desc: 'Catálogo geoespacial de los 24 estados con centroide, bounding box y perfil bioclimático.' },
        { method: 'POST', path: '/api/v1/spatial/polygon/area', desc: 'Cálculo de área esferoidal Shoelace geodésico proyectado sobre el elipsoide WGS84.' },
        { method: 'GET', path: '/api/v1/spatial/sar/backscatter', desc: 'Estimación de retrodispersión Banda C (VV/VH en dB) de Sentinel-1 SAR all-weather.' },
        { method: 'POST', path: '/api/v1/gee/timeseries', desc: 'Serie temporal MapBiomas 1985-2024 de transiciones de cobertura y uso del suelo (LULC).' },
      ]
    },
    {
      title: '🧪 Modelado Agronómico, Fenología & ML (FastAPI)',
      endpoints: [
        { method: 'POST', path: '/api/v1/predict/yield', desc: 'Predictor de rendimiento en Ton/ha para 8 cadenas agrícolas (Scikit-Learn y NASA POWER).' },
        { method: 'POST', path: '/api/v1/agronomy/gdd', desc: 'Acumulación térmica GDD (base 10°C) y balance hídrico diario/mensual P - ETc.' },
        { method: 'POST', path: '/api/v1/agronomy/carbon-mrv', desc: 'Cuantificación de stock SOC y secuestro de tCO2e/ha/año (IPCC Tier 2 / Verra VCS).' },
        { method: 'POST', path: '/api/v1/gemini/advisor', desc: 'Generador de dictamen agronómico prescriptivo estructurado asistido por Gemini AI.' },
      ]
    },
    {
      title: '🌾 Microservicios WebGIS & Resiliencia Rural (Next.js 16 App Router)',
      endpoints: [
        { method: 'GET', path: '/api/mrv/sar-oracle', desc: 'Oráculo satelital radar SAR Sentinel-1 que valida rugosidad de dosel (VH/VV > -12 dB) y reduce incertidumbre al 10%.' },
        { method: 'GET', path: '/api/parcels/conflicts', desc: 'Cola de cuarentena y consulta de colisiones concurrentes de parcelas tras reconexión offline.' },
        { method: 'POST', path: '/api/parcels/conflicts', desc: 'Resolución determinista de conflictos en cuarentena (keep_server, keep_client o merged).' },
        { method: 'POST', path: '/api/iot/telemetry', desc: 'Ingestión de telemetría IoT con activación de microrriego condicionada a PAW < 50% (Saxton-Rawls).' },
        { method: 'GET', path: '/api/parcels', desc: 'Listado de micro-parcelas del productor con área Shoelace geodésica y detección de estado.' },
        { method: 'POST', path: '/api/parcels', desc: 'Persistencia de nueva micro-parcela georreferenciada con versionado monotónico y detección Ray-Casting.' },
        { method: 'GET', path: '/api/field-logs', desc: 'Historial cronológico de labores agrícolas con normalización vernacular campesina.' },
        { method: 'POST', path: '/api/auth/login', desc: 'Autenticación con JWT, control de roles (ADMIN, FARMER, AGRONOMIST) y modo sandbox 1-clic.' },
      ]
    }
  ];

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Barra de Retorno al Dashboard */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <BackButton fallbackHref="/dashboard" label="Volver al Dashboard" />
      </div>

      {/* Cabecera Principal */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '1.5rem 2rem',
        color: '#fff'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{
              background: 'rgba(56, 189, 248, 0.15)',
              color: '#38bdf8',
              padding: '3px 10px',
              borderRadius: '999px',
              fontSize: '0.74rem',
              fontWeight: 700,
              border: '1px solid rgba(56, 189, 248, 0.3)'
            }}>
              OpenAPI 3.0 • FastAPI & Next.js 16
            </span>
            <span style={{
              background: 'rgba(34, 197, 94, 0.15)',
              color: '#4ade80',
              padding: '3px 10px',
              borderRadius: '999px',
              fontSize: '0.74rem',
              fontWeight: 700,
              border: '1px solid rgba(34, 197, 94, 0.3)'
            }}>
              39 Endpoints Documentados
            </span>
          </div>

          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileCode2 size={30} color="#38bdf8" />
            Documentación de API & Especificación OpenAPI
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: '6px 0 0 0' }}>
            Acceso programático a modelos predictivos edafoclimáticos, pipelines de MapBiomas y Sentinel-1/2 para integración con sistemas agrícolas.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <a
            href="http://127.0.0.1:8000/docs"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: '#0284c7',
              color: '#fff',
              padding: '10px 16px',
              borderRadius: '10px',
              fontSize: '0.85rem',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)'
            }}
          >
            <span>Abrir Swagger FastAPI Nativo</span>
            <ExternalLink size={15} />
          </a>

          <a
            href="http://127.0.0.1:8000/openapi.json"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(30, 41, 59, 0.8)',
              color: '#cbd5e1',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              padding: '10px 16px',
              borderRadius: '10px',
              fontSize: '0.85rem',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            <Code2 size={15} />
            <span>Descargar openapi.json</span>
          </a>
        </div>
      </div>

      {/* Selector de Pestañas */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => setActiveTab('interactive')}
          style={{
            padding: '10px 18px',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: 'none',
            background: activeTab === 'interactive' ? '#16a34a' : 'rgba(30, 41, 59, 0.7)',
            color: '#fff',
            transition: 'all 0.2s'
          }}
        >
          🎮 Visor Swagger Interactivo
        </button>

        <button
          onClick={() => setActiveTab('endpoints')}
          style={{
            padding: '10px 18px',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: 700,
            cursor: 'pointer',
            border: 'none',
            background: activeTab === 'endpoints' ? '#16a34a' : 'rgba(30, 41, 59, 0.7)',
            color: '#fff',
            transition: 'all 0.2s'
          }}
        >
          📋 Catálogo de Endpoints Clave
        </button>
      </div>

      {/* Pestaña 1: Visor Swagger Embebido */}
      {activeTab === 'interactive' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{
            background: 'rgba(2, 132, 199, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.3)',
            borderRadius: '12px',
            padding: '12px 18px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="badge-pill badge-cyan" style={{ fontSize: '0.74rem' }}>
                FastAPI Swagger UI (Puerto 8000)
              </span>
              <span style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                Visor interactivo en vivo. Si el backend espacial está en reposo, inícialo con: <code style={{ color: '#38bdf8', background: 'rgba(15, 23, 42, 0.6)', padding: '2px 6px', borderRadius: '4px' }}>py -m uvicorn src.main:app --port 8000 --reload</code>
              </span>
            </div>
            <a
              href="http://127.0.0.1:8000/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ fontSize: '0.76rem', padding: '5px 12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            >
              <span>Abrir en Pestaña Completa</span>
              <ExternalLink size={13} />
            </a>
          </div>

          <div style={{
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
            minHeight: '720px'
          }}>
            <iframe
              src="http://127.0.0.1:8000/docs"
              title="FastAPI Interactive Swagger Documentation"
              style={{
                width: '100%',
                height: '780px',
                border: 'none',
                background: '#ffffff'
              }}
            />
          </div>
        </div>
      )}

      {/* Pestaña 2: Catálogo Rápido */}
      {activeTab === 'endpoints' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {API_SECTIONS.map((sec, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(15, 23, 42, 0.8)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '14px',
                padding: '20px',
                color: '#fff'
              }}
            >
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 14px 0', color: '#38bdf8' }}>
                {sec.title}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {sec.endpoints.map((ep, eIdx) => (
                  <div
                    key={eIdx}
                    style={{
                      background: 'rgba(30, 41, 59, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '10px',
                      padding: '12px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '10px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '320px' }}>
                      <span style={{
                        background: ep.method === 'GET' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(56, 189, 248, 0.2)',
                        color: ep.method === 'GET' ? '#4ade80' : '#38bdf8',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '0.76rem',
                        fontWeight: 800,
                        border: ep.method === 'GET' ? '1px solid #22c55e' : '1px solid #0284c7'
                      }}>
                        {ep.method}
                      </span>
                      <code style={{ fontSize: '0.86rem', color: '#f8fafc', fontWeight: 600 }}>
                        {ep.path}
                      </code>
                    </div>

                    <div style={{ fontSize: '0.82rem', color: '#94a3b8', flex: 1, minWidth: '240px' }}>
                      {ep.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
