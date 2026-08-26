/**
 * ============================================================================
 * AGROTECH VENEZUELA — PALETA DE COMANDOS GLOBAL (CommandPalette.tsx)
 * ============================================================================
 * 
 * Omnibox modal accesible con Ctrl+K / Cmd+K o botón de búsqueda:
 * - Búsqueda instantánea en los 24 estados, capitales y regiones.
 * - Acceso a cultivos estratégicos y requerimientos agronómicos.
 * - Enlaces directos a simuladores, bitácora y visor cartográfico.
 */

'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { VENEZUELA_STATES_DATA } from '@/lib/geo/venezuelaData';
import { 
  Search, 
  MapPin, 
  Sprout, 
  Compass, 
  BookOpen, 
  Sparkles, 
  Tractor, 
  BarChart3, 
  ShieldCheck, 
  X, 
  ArrowRight,
  Flame
} from 'lucide-react';

interface PaletteItem {
  id: string;
  category: 'Estados' | 'Herramientas' | 'Cultivos' | 'Acciones';
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  url: string;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Atajo de Teclado Global: Ctrl + K o Cmd + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Catálogo Completo de Ítems Buscables
  const allItems: PaletteItem[] = useMemo(() => {
    const tools: PaletteItem[] = [
      { id: 'tool-mapa', category: 'Herramientas', title: 'Visor WebGIS (3 Niveles)', subtitle: 'Explorador Nacional, Municipal y Micro-Parcelas Sentinel-2', icon: <Compass size={16} color="#38bdf8" />, url: '/dashboard/mapa' },
      { id: 'tool-tierras', category: 'Herramientas', title: '🚜 Mis Tierras & Fincas', subtitle: 'Gestión de lotes delimitados y diagnósticos satelitales', icon: <Tractor size={16} color="#22c55e" />, url: '/dashboard/tierras' },
      { id: 'tool-bitacora', category: 'Herramientas', title: '📖 Cuaderno de Campo Digital', subtitle: 'Bitácora cronológica de siembras, encalados y fertilización', icon: <BookOpen size={16} color="#f59e0b" />, url: '/dashboard/bitacora' },
      { id: 'tool-simulador', category: 'Herramientas', title: '✨ Simulador Edafológico & Asesor Gemini AI', subtitle: 'Prescripción NPK, curvas de encalado y dictamen IA', icon: <Sparkles size={16} color="#a855f7" />, url: '/dashboard/recomendaciones' },
      { id: 'tool-carbon', category: 'Herramientas', title: '🌱 Calculadora de Créditos de Carbono MRV', subtitle: 'Cuantificación SOC y valoración económica IPCC Tier 2', icon: <Sprout size={16} color="#10b981" />, url: '/dashboard/recomendaciones' },
      { id: 'tool-stats', category: 'Herramientas', title: '📊 Geoestadísticas Agroclimáticas', subtitle: 'Series temporales multianuales de lluvia y temperatura', icon: <BarChart3 size={16} color="#0284c7" />, url: '/dashboard/estadisticas' },
      { id: 'tool-admin', category: 'Herramientas', title: '🛡️ Panel de Administración', subtitle: 'Aprobación de productores y auditoría de seguridad', icon: <ShieldCheck size={16} color="#e11d48" />, url: '/dashboard/admin' },
    ];

    const states: PaletteItem[] = VENEZUELA_STATES_DATA.map((st) => ({
      id: `state-${st.id}`,
      category: 'Estados',
      title: `🇻🇪 ${st.name}`,
      subtitle: `Capital: ${st.capital} • Región ${st.region} • pH: ${st.averagePh} • ${st.annualRainfallMm} mm/año`,
      icon: <MapPin size={16} color="#22c55e" />,
      url: `/dashboard/mapa?state=${st.id}`
    }));

    const crops: PaletteItem[] = [
      { id: 'crop-maiz', category: 'Cultivos', title: '🌽 Maíz Blanco Harinero (Zea mays)', subtitle: 'Cereal estratégico • Base térmica 10°C • 1,650 GDD', icon: <Sprout size={16} color="#eab308" />, url: '/dashboard/cultivos' },
      { id: 'crop-arroz', category: 'Cultivos', title: '🌾 Arroz Paddy (Oryza sativa)', subtitle: 'Cereal bajo riego • Llanos Centro-Occidentales', icon: <Sprout size={16} color="#38bdf8" />, url: '/dashboard/cultivos' },
      { id: 'crop-cacao', category: 'Cultivos', title: '🍫 Cacao Criollo Porcelana (Theobroma cacao)', subtitle: 'Agroforestal premium • Sur del Lago / Barlovento', icon: <Sprout size={16} color="#d97706" />, url: '/dashboard/cultivos' },
      { id: 'crop-cana', category: 'Cultivos', title: '🎋 Caña de Azúcar (Saccharum officinarum)', subtitle: 'Industrial • Valles de Aragua y Portuguesa', icon: <Sprout size={16} color="#10b981" />, url: '/dashboard/cultivos' },
    ];

    return [...tools, ...states, ...crops];
  }, []);

  // Filtrado reactivo según query
  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      return allItems.slice(0, 8);
    }
    const cleanQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return allItems.filter((item) => {
      const matchTitle = item.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(cleanQuery);
      const matchSubtitle = item.subtitle.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(cleanQuery);
      return matchTitle || matchSubtitle;
    }).slice(0, 10);
  }, [allItems, query]);

  const handleSelect = (url: string) => {
    setIsOpen(false);
    router.push(url);
  };

  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex].url);
    }
  };

  return (
    <>
      {/* Botón Trigger Omnibox en Navbar */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(30, 41, 59, 0.7)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '8px',
          padding: '6px 12px',
          color: '#94a3b8',
          fontSize: '0.82rem',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        title="Buscar estados, cultivos o herramientas (Ctrl + K)"
      >
        <Search size={14} color="#38bdf8" />
        <span style={{ display: 'inline-block' }}>Buscar en Agrotech...</span>
        <kbd style={{
          background: 'rgba(15, 23, 42, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '4px',
          padding: '1px 5px',
          fontSize: '0.68rem',
          color: '#cbd5e1',
          marginLeft: '4px'
        }}>
          Ctrl K
        </kbd>
      </button>

      {/* Modal Backdrop y Omnibox */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '12vh',
            paddingLeft: '16px',
            paddingRight: '16px'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#0f172a',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '640px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75), 0 0 30px rgba(56, 189, 248, 0.15)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              animation: 'modalSlideDown 0.15s ease-out'
            }}
          >
            {/* Input de Búsqueda */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <Search size={20} color="#38bdf8" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDownList}
                placeholder="Escribe un estado (Portuguesa, Zulia...), cultivo o herramienta..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 500
                }}
              />
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Lista de Resultados */}
            <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '8px' }}>
              {filteredItems.length === 0 ? (
                <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
                  No se encontraron resultados para &ldquo;{query}&rdquo;
                </div>
              ) : (
                filteredItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item.url)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        background: isSelected ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                        border: isSelected ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: 'rgba(30, 41, 59, 0.8)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          {item.icon}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: '0.88rem', fontWeight: 600, color: isSelected ? '#38bdf8' : '#f8fafc' }}>
                            {item.title}
                          </div>
                          <div style={{ fontSize: '0.74rem', color: '#94a3b8', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            {item.subtitle}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                        <span style={{
                          fontSize: '0.68rem',
                          background: 'rgba(255, 255, 255, 0.06)',
                          color: '#64748b',
                          padding: '2px 6px',
                          borderRadius: '4px'
                        }}>
                          {item.category}
                        </span>
                        <ArrowRight size={14} color={isSelected ? '#38bdf8' : '#475569'} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer con Tips de Teclado */}
            <div style={{
              padding: '10px 16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(15, 23, 42, 0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.72rem',
              color: '#64748b'
            }}>
              <div>
                Navegar: <kbd style={{ background: '#1e293b', padding: '1px 4px', borderRadius: '3px' }}>↓</kbd> <kbd style={{ background: '#1e293b', padding: '1px 4px', borderRadius: '3px' }}>↑</kbd> | Seleccionar: <kbd style={{ background: '#1e293b', padding: '1px 4px', borderRadius: '3px' }}>↵ Enter</kbd>
              </div>
              <div>
                Cerrar: <kbd style={{ background: '#1e293b', padding: '1px 4px', borderRadius: '3px' }}>Esc</kbd>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
