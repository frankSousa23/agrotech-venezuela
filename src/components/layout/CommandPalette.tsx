/**
 * ============================================================================
 * AGROTECH VENEZUELA — PALETA DE COMANDOS GLOBAL (CommandPalette.tsx)
 * ============================================================================
 * 
 * Omnibox modal accesible con Ctrl+K / Cmd+K o botón de búsqueda:
 * - Renderizado en document.body mediante React Portal (libre de Stacking Context traps).
 * - Desacoplado: soporte para evento global 'open-command-palette' (Mobile & Desktop).
 * - Búsqueda instantánea en 13 módulos, 24 estados, 11 polos agrícolas y 8 cultivos.
 * - Acciones rápidas (dictado en bitácora, delimitador de parcela, prescripción VRA).
 * - Filtros por pestañas (Todos, Herramientas, Polos, Cultivos, Acciones).
 */

'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { VENEZUELA_STATES_DATA } from '@/lib/geo/venezuelaData';
import { useUIMode } from '@/lib/context/UIModeContext';
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
  Radio,
  FileCode2,
  FileSpreadsheet,
  HelpCircle,
  FlaskConical,
  Mic,
  Cpu,
  CornerDownLeft
} from 'lucide-react';

export type PaletteCategory = 'TODOS' | 'HERRAMIENTAS' | 'POLOS' | 'CULTIVOS' | 'ACCIONES';

interface PaletteItem {
  id: string;
  category: 'Herramientas' | 'Estados' | 'Polos' | 'Cultivos' | 'Acciones';
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  url: string;
}

export default function CommandPalette() {
  const { isFarmerMode } = useUIMode();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<PaletteCategory>('TODOS');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const router = useRouter();

  // Client hydration check for React Portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Global event listener for opening command palette from anywhere (e.g. mobile bar, 404 page)
  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener('open-command-palette', handleOpenEvent);
    return () => window.removeEventListener('open-command-palette', handleOpenEvent);
  }, []);

  // Body scroll freeze when open
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isOpen]);

  // Global Keyboard Shortcut: Ctrl + K or Cmd + K, Esc to close
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
      setTimeout(() => inputRef.current?.focus(), 60);
      setSelectedIndex(0);
    } else {
      setQuery('');
      setSelectedCategory('TODOS');
    }
  }, [isOpen]);

  // Catálogo Exhaustivo de Ítems Buscables
  const allItems: PaletteItem[] = useMemo(() => {
    // 1. Acciones Rápidas
    const actions: PaletteItem[] = [
      { id: 'act-bitacora', category: 'Acciones', title: '🎙️ Dictar Nota en Cuaderno de Campo', subtitle: 'Anotación por voz con normalización vernácula (sacos, canecas)', icon: <Mic size={16} color="#4ade80" />, url: '/dashboard/bitacora?intent=dictate' },
      { id: 'act-draw', category: 'Acciones', title: '🗺️ Delimitar Nueva Parcela en el Mapa', subtitle: 'Dibujar polígono georreferenciado con cálculo Shoelace de hectáreas', icon: <Compass size={16} color="#38bdf8" />, url: '/dashboard/mapa?mode=multilevel&intent=draw' },
      { id: 'act-ai', category: 'Acciones', title: '🤖 Preguntar al Asesor Gemini IA', subtitle: 'Diagnóstico en tiempo real cruzando MapBiomas y NASA POWER', icon: <Sparkles size={16} color="#c084fc" />, url: '/dashboard/recomendaciones?intent=ai' },
      { id: 'act-carbon', category: 'Acciones', title: '🌱 Calcular Créditos de Carbono MRV', subtitle: 'Cuantificación de SOC y bonos de carbono Verra VCS Tier 2', icon: <Sprout size={16} color="#10b981" />, url: '/dashboard/recomendaciones#carbon-credits' },
      { id: 'act-export-vra', category: 'Acciones', title: '🚜 Exportar Prescripción Shapefile VRA', subtitle: 'Generar mapas de dosis variable para tractores GPS y drones KML', icon: <Tractor size={16} color="#f59e0b" />, url: '/dashboard/recomendaciones#machinery' },
      { id: 'act-export-stats', category: 'Acciones', title: '📥 Descargar Consolidado Edafológico CSV', subtitle: 'Descarga directa del dataset de suelos y fertilidad química', icon: <FileSpreadsheet size={16} color="#0284c7" />, url: '/api/export/stats?format=csv' },
    ];

    // 2. Módulos & Herramientas
    const tools: PaletteItem[] = [
      { id: 'tool-mapa', category: 'Herramientas', title: 'Visor WebGIS Multi-Escala', subtitle: 'Nivel 1 Nacional, Nivel 2 Municipal y Nivel 3 Micro-Parcelas Sentinel-2', icon: <Compass size={16} color="#38bdf8" />, url: '/dashboard/mapa' },
      { id: 'tool-tierras', category: 'Herramientas', title: '🚜 Mis Tierras & Fincas', subtitle: 'Gestión de lotes delimitados, valoración económica y sensores IoT', icon: <Tractor size={16} color="#22c55e" />, url: '/dashboard/tierras' },
      { id: 'tool-bitacora', category: 'Herramientas', title: '📖 Cuaderno de Campo Digital', subtitle: 'Bitácora cronológica de labores, fertilizaciones y rendimientos Ton/ha', icon: <BookOpen size={16} color="#f59e0b" />, url: '/dashboard/bitacora' },
      { id: 'tool-simulador', category: 'Herramientas', title: '✨ Simulador Edafológico & Asesor Gemini IA', subtitle: 'Prescripción NPK, curvas de encalado y dictamen agronómico IA', icon: <Sparkles size={16} color="#a855f7" />, url: '/dashboard/recomendaciones' },
      { id: 'tool-suelos', category: 'Herramientas', title: '🔬 Perfiles Edafológicos & Muestras', subtitle: 'Química del suelo, pH, texturas y niveles de materia orgánica', icon: <FlaskConical size={16} color="#ec4899" />, url: '/dashboard/suelos' },
      { id: 'tool-iot', category: 'Herramientas', title: '📡 Laboratorio Agro-IoT & Micro-Cultivo', subtitle: 'Simulador de riego predictivo, nodos ESP32 y sensores in-situ', icon: <Radio size={16} color="#38bdf8" />, url: '/dashboard/iot' },
      { id: 'tool-stats', category: 'Herramientas', title: '📊 Geoestadísticas Agroclimáticas', subtitle: 'Series multianuales NASA POWER, balance hídrico P-ETc y grados día GDD', icon: <BarChart3 size={16} color="#0284c7" />, url: '/dashboard/estadisticas' },
      { id: 'tool-manual', category: 'Herramientas', title: '📘 Manual de Usuario & Guías de Campo', subtitle: '10 Capítulos ilustrados para Productores, Agrónomos y Administradores', icon: <HelpCircle size={16} color="#10b981" />, url: '/dashboard/manual' },
      { id: 'tool-postulacion', category: 'Herramientas', title: '🏆 Ficha de Postulación MapBiomas', subtitle: 'Memorando de integración de 40 años de cobertura y madurez TRL 4', icon: <Sprout size={16} color="#eab308" />, url: '/dashboard/postulacion' },
      { id: 'tool-arquitectura', category: 'Herramientas', title: '📐 Arquitectura de Microservicios', subtitle: 'Diagramas de Next.js Turbopack, FastAPI ML y Docker PostgreSQL', icon: <Cpu size={16} color="#8b5cf6" />, url: '/dashboard/arquitectura' },
      { id: 'tool-docs', category: 'Herramientas', title: '📄 Documentación Swagger OpenAPI 3.0', subtitle: 'Especificación técnica de endpoints REST, esquemas y autenticación', icon: <FileCode2 size={16} color="#06b6d4" />, url: '/api-docs' },
      { id: 'tool-admin', category: 'Herramientas', title: '🛡️ Panel de Administración', subtitle: 'Gestión de roles, aprobación de productores y bitácora de seguridad', icon: <ShieldCheck size={16} color="#e11d48" />, url: '/dashboard/admin' },
    ];

    // 3. Polos Agrícolas Estratégicos de Venezuela
    const poles: PaletteItem[] = [
      { id: 'pole-turen', category: 'Polos', title: '🇻🇪 Turén (Portuguesa)', subtitle: 'Granero de Venezuela • Maíz blanco/amarillo, ajonjolí y suelos aluviales', icon: <MapPin size={16} color="#22c55e" />, url: '/dashboard/mapa?state=portuguesa' },
      { id: 'pole-calabozo', category: 'Polos', title: '🇻🇪 Calabozo (Guárico)', subtitle: 'Sistema de Riego del Río Guárico • Principal polo arrocero y vertisoles', icon: <MapPin size={16} color="#38bdf8" />, url: '/dashboard/mapa?state=guarico' },
      { id: 'pole-quibor', category: 'Polos', title: '🇻🇪 Valle de Quíbor (Lara)', subtitle: 'Polo hortícola • Cebolla, tomate, pimentón y suelos alcalino-sódicos', icon: <MapPin size={16} color="#f59e0b" />, url: '/dashboard/mapa?state=lara' },
      { id: 'pole-surdellago', category: 'Polos', title: '🇻🇪 Sur del Lago (Zulia)', subtitle: 'Cuenca lechera • Plátano, palma aceitera y cacao Criollo Porcelana', icon: <MapPin size={16} color="#10b981" />, url: '/dashboard/mapa?state=zulia' },
      { id: 'pole-elvigia', category: 'Polos', title: '🇻🇪 El Vigía (Mérida)', subtitle: 'Eje Panamericano • Ganadería de doble propósito y frutales tropicales', icon: <MapPin size={16} color="#0284c7" />, url: '/dashboard/mapa?state=merida' },
      { id: 'pole-barinas', category: 'Polos', title: '🇻🇪 Pedraza & Barinas (Barinas)', subtitle: 'Llanos Occidentales • Ganadería de ceba, maíz y palma aceitera', icon: <MapPin size={16} color="#84cc16" />, url: '/dashboard/mapa?state=barinas' },
      { id: 'pole-guanipa', category: 'Polos', title: '🇻🇪 Mesa de Guanipa (Anzoátegui)', subtitle: 'Sabanas Orientales • Maní, soya, cereales y suelos oxisoles ácidos', icon: <MapPin size={16} color="#d97706" />, url: '/dashboard/mapa?state=anzoategui' },
      { id: 'pole-maturin', category: 'Polos', title: '🇻🇪 Maturín & Zamora (Monagas)', subtitle: 'Sabanas de oriente • Maíz tecnificado, ganadería y palma africana', icon: <MapPin size={16} color="#059669" />, url: '/dashboard/mapa?state=monagas' },
      { id: 'pole-barlovento', category: 'Polos', title: '🇻🇪 Barlovento (Miranda)', subtitle: 'Eje cacaotero tradicional • Cacao Carenero Superior y tubérculos', icon: <MapPin size={16} color="#92400e" />, url: '/dashboard/mapa?state=miranda' },
      { id: 'pole-aragua', category: 'Polos', title: '🇻🇪 Valles de Aragua (Aragua)', subtitle: 'Valle lacustre • Caña de azúcar, hortalizas intensivas y cítricos', icon: <MapPin size={16} color="#6366f1" />, url: '/dashboard/mapa?state=aragua' },
      { id: 'pole-yaracuy', category: 'Polos', title: '🇻🇪 Chivacoa (Yaracuy)', subtitle: 'Valle fértil del Río Yaracuy • Maíz, caña y aguacate exportable', icon: <MapPin size={16} color="#14b8a6" />, url: '/dashboard/mapa?state=yaracuy' },
    ];

    // 4. Estados Federales de Venezuela
    const states: PaletteItem[] = VENEZUELA_STATES_DATA.map((st) => ({
      id: `state-${st.id}`,
      category: 'Estados',
      title: `🇻🇪 Estado ${st.name}`,
      subtitle: `Capital: ${st.capital} • Región ${st.region} • pH edáfico prom: ${st.averagePh} • ${st.annualRainfallMm} mm/año`,
      icon: <MapPin size={16} color="#22c55e" />,
      url: `/dashboard/mapa?state=${st.id}`
    }));

    // 5. Cultivos Estratégicos
    const crops: PaletteItem[] = [
      { id: 'crop-maiz', category: 'Cultivos', title: '🌽 Maíz Blanco Harinero (Zea mays)', subtitle: 'Cereal estratégico básico • Base térmica 10°C • 1,650 GDD acumulados', icon: <Sprout size={16} color="#eab308" />, url: '/dashboard/cultivos' },
      { id: 'crop-maiz-am', category: 'Cultivos', title: '🌽 Maíz Amarillo Forrajero (Zea mays)', subtitle: 'Nutrición animal intensiva • Valles y llanos centro-occidentales', icon: <Sprout size={16} color="#f59e0b" />, url: '/dashboard/cultivos' },
      { id: 'crop-arroz', category: 'Cultivos', title: '🌾 Arroz Paddy (Oryza sativa)', subtitle: 'Cereal bajo riego en vertisoles • 1,800 GDD • Sistema Calabozo', icon: <Sprout size={16} color="#38bdf8" />, url: '/dashboard/cultivos' },
      { id: 'crop-cacao', category: 'Cultivos', title: '🍫 Cacao Criollo Porcelana (Theobroma cacao)', subtitle: 'Agroforestería premium aromática • Sur del Lago / Barlovento', icon: <Sprout size={16} color="#d97706" />, url: '/dashboard/cultivos' },
      { id: 'crop-cana', category: 'Cultivos', title: '🎋 Caña de Azúcar (Saccharum officinarum)', subtitle: 'Cultivo agroindustrial • Valles de Aragua, Lara y Portuguesa', icon: <Sprout size={16} color="#10b981" />, url: '/dashboard/cultivos' },
      { id: 'crop-cafe', category: 'Cultivos', title: '☕ Café Arábica de Sombra (Coffea arabica)', subtitle: 'Piso altitudinal andino y cordillera de la costa • Suelos francos', icon: <Sprout size={16} color="#78350f" />, url: '/dashboard/cultivos' },
      { id: 'crop-platano', category: 'Cultivos', title: '🍌 Plátano Hartón & Banano (Musa spp.)', subtitle: 'Polo Sur del Lago y Eje Panamericano • Suelos aluviales fértiles', icon: <Sprout size={16} color="#facc15" />, url: '/dashboard/cultivos' },
      { id: 'crop-yuca', category: 'Cultivos', title: '🥔 Yuca y Raíces Tropicales (Manihot esculenta)', subtitle: 'Tubérculo de alta resiliencia edáfica • Apto para sabanas orientales', icon: <Sprout size={16} color="#a16207" />, url: '/dashboard/cultivos' },
    ];

    return [...actions, ...tools, ...poles, ...states, ...crops];
  }, []);

  // Filtrado reactivo según búsqueda y categoría seleccionada
  const filteredItems = useMemo(() => {
    let list = allItems;

    // Filtro por Categoría
    if (selectedCategory === 'HERRAMIENTAS') {
      list = list.filter(i => i.category === 'Herramientas');
    } else if (selectedCategory === 'POLOS') {
      list = list.filter(i => i.category === 'Polos' || i.category === 'Estados');
    } else if (selectedCategory === 'CULTIVOS') {
      list = list.filter(i => i.category === 'Cultivos');
    } else if (selectedCategory === 'ACCIONES') {
      list = list.filter(i => i.category === 'Acciones');
    }

    if (!query.trim()) {
      return list.slice(0, 10);
    }

    const cleanQuery = query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return list.filter((item) => {
      const matchTitle = item.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(cleanQuery);
      const matchSubtitle = item.subtitle.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(cleanQuery);
      return matchTitle || matchSubtitle;
    }).slice(0, 14);
  }, [allItems, query, selectedCategory]);

  const handleSelect = (url: string) => {
    setIsOpen(false);
    router.push(url);
  };

  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => {
        const next = (prev + 1) % filteredItems.length;
        itemRefs.current[next]?.scrollIntoView({ block: 'nearest' });
        return next;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => {
        const next = (prev - 1 + filteredItems.length) % filteredItems.length;
        itemRefs.current[next]?.scrollIntoView({ block: 'nearest' });
        return next;
      });
    } else if (e.key === 'Enter' && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex].url);
    }
  };

  // Helper para resaltar coincidencias
  const highlightMatch = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text;
    const cleanSearch = searchTerm.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const parts = text.split(new RegExp(`(${cleanSearch})`, 'gi'));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === cleanSearch.toLowerCase() ? (
            <span key={i} style={{ color: '#38bdf8', fontWeight: 700, background: 'rgba(56, 189, 248, 0.15)', borderRadius: '2px', padding: '0 2px' }}>
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  // Modal content tree that will be rendered via Portal
  const modalMarkup = (
    <div
      onClick={() => setIsOpen(false)}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(10px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: 'clamp(20px, 4vh, 70px)',
        paddingLeft: '14px',
        paddingRight: '14px',
        animation: 'fadeIn 0.15s ease-out'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#0f172a',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          borderRadius: '18px',
          width: '100%',
          maxWidth: '680px',
          maxHeight: 'calc(100vh - 80px)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.85), 0 0 35px rgba(56, 189, 248, 0.18)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideDown 0.18s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Input Header de Búsqueda */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '16px 20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
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
            placeholder={isFarmerMode ? "Escribe qué buscas (Turén, maíz, suelo en Portuguesa, lluvia...)" : "Escribe un módulo, polo (Turén, Quíbor...), estado o cultivo..."}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 500,
              minWidth: 0
            }}
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0
              }}
              title="Borrar texto"
            >
              <X size={14} />
            </button>
          )}
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center'
            }}
            title="Cerrar (Esc)"
          >
            <X size={18} />
          </button>
        </div>

        {/* Pestañas de Filtrado por Categoría (Chips) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '8px 16px',
          background: 'rgba(15, 23, 42, 0.8)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}>
          {[
            { id: 'TODOS', label: '✨ Todos' },
            { id: 'ACCIONES', label: '⚡ Acciones' },
            { id: 'HERRAMIENTAS', label: '🛠️ Módulos' },
            { id: 'POLOS', label: '🇻🇪 Polos y Estados' },
            { id: 'CULTIVOS', label: '🌾 Cultivos' },
          ].map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id as PaletteCategory);
                  setSelectedIndex(0);
                }}
                style={{
                  background: isActive ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  border: isActive ? '1px solid #38bdf8' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: isActive ? '#38bdf8' : '#94a3b8',
                  borderRadius: '9999px',
                  padding: '4px 10px',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Lista de Resultados con Scroll Táctil */}
        <div style={{
          maxHeight: '400px',
          overflowY: 'auto',
          padding: '8px',
          WebkitOverflowScrolling: 'touch'
        }}>
          {filteredItems.length === 0 ? (
            <div style={{ padding: '36px 20px', textAlign: 'center', color: '#64748b' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>🌾</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#94a3b8', marginBottom: '4px' }}>
                No encontramos resultados para &ldquo;{query}&rdquo;
              </div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                Prueba buscando por estado (Portuguesa, Zulia), cultivo (maíz, arroz) o módulo (bitácora, suelos).
              </div>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  ref={(el) => { itemRefs.current[idx] = el; }}
                  onClick={() => handleSelect(item.url)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    background: isSelected ? 'rgba(56, 189, 248, 0.14)' : 'transparent',
                    border: isSelected ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid transparent',
                    transition: 'background 0.15s ease, border 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
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
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        color: isSelected ? '#38bdf8' : '#f8fafc',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap'
                      }}>
                        {highlightMatch(item.title, query)}
                      </div>
                      <div style={{
                        fontSize: '0.74rem',
                        color: '#94a3b8',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap'
                      }}>
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, marginLeft: '12px' }}>
                    <span style={{
                      fontSize: '0.66rem',
                      fontWeight: 600,
                      background: 'rgba(255, 255, 255, 0.06)',
                      color: isSelected ? '#38bdf8' : '#64748b',
                      padding: '2px 7px',
                      borderRadius: '4px'
                    }}>
                      {item.category}
                    </span>
                    {isSelected ? (
                      <CornerDownLeft size={14} color="#38bdf8" />
                    ) : (
                      <ArrowRight size={14} color="#475569" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer con Atajos y Guía de Teclado */}
        <div style={{
          padding: '10px 16px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(15, 23, 42, 0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.72rem',
          color: '#64748b'
        }}>
          <div>
            Navegar: <kbd style={{ background: '#1e293b', padding: '2px 5px', borderRadius: '3px', color: '#cbd5e1' }}>↓</kbd> <kbd style={{ background: '#1e293b', padding: '2px 5px', borderRadius: '3px', color: '#cbd5e1' }}>↑</kbd> | Abrir: <kbd style={{ background: '#1e293b', padding: '2px 5px', borderRadius: '3px', color: '#cbd5e1' }}>↵ Enter</kbd>
          </div>
          <div>
            Cerrar: <kbd style={{ background: '#1e293b', padding: '2px 5px', borderRadius: '3px', color: '#cbd5e1' }}>Esc</kbd>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Botón Trigger Omnibox en Barra de Utilidades Desktop */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: isFarmerMode ? 'rgba(34, 197, 94, 0.12)' : 'rgba(30, 41, 59, 0.7)',
          border: isFarmerMode ? '1px solid rgba(74, 222, 128, 0.35)' : '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '8px',
          padding: '6px 12px',
          color: isFarmerMode ? '#86efac' : '#94a3b8',
          fontSize: '0.82rem',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
        title={isFarmerMode ? "Buscar en mi finca o estado" : "Buscar estados, polos, cultivos o módulos (Ctrl + K)"}
        aria-label="Buscar en AgroTech"
      >
        <Search size={14} color={isFarmerMode ? "#4ade80" : "#38bdf8"} />
        <span style={{ display: 'inline-block' }}>{isFarmerMode ? '🌾 Buscar en mi finca...' : 'Buscar en Agrotech...'}</span>
        {!isFarmerMode && (
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
        )}
      </button>

      {/* Renderizado mediante Portal en document.body para escapar del Stacking Context */}
      {mounted && isOpen && typeof document !== 'undefined'
        ? createPortal(modalMarkup, document.body)
        : null}
    </>
  );
}
