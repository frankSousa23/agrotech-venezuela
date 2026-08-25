'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Workflow, 
  Layers, 
  Cpu, 
  Database, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  Download, 
  Copy, 
  Check, 
  ZoomIn, 
  ZoomOut, 
  GitBranch,
  Terminal,
  Server,
  Code
} from 'lucide-react';

interface DiagramDef {
  id: string;
  title: string;
  category: 'architecture' | 'spatial' | 'offline' | 'ai' | 'mapbiomas';
  icon: any;
  badge: string;
  description: string;
  metrics: { label: string; value: string }[];
  mermaidCode: string;
  svgHighlights: {
    step: string;
    title: string;
    description: string;
    tech: string;
    latency: string;
  }[];
}

const SYSTEM_DIAGRAMS: DiagramDef[] = [
  {
    id: 'e2e_microservices',
    title: '1. Arquitectura de Microservicios & Data Flow Global E2E',
    category: 'architecture',
    icon: Workflow,
    badge: 'Microservicios',
    description: 'Flujo de datos bidireccional entre la Plataforma WebGIS (Next.js 16), el Backend Espacial & ML (FastAPI), la Caché SQLite WAL de ultra-baja latencia y la sincronización con PostgreSQL y Streamlit.',
    metrics: [
      { label: 'Latencia Caché', value: '< 25 ms' },
      { label: 'Resolución Hashing', value: '4 Decimales (~11m)' },
      { label: 'Microservicios', value: '4 Nodos Activos' },
      { label: 'Protocolo', value: 'REST JSON / GeoJSON' }
    ],
    mermaidCode: `graph TD
    %% Estilos Globales
    classDef frontend fill:#0f172a,stroke:#22c55e,stroke-width:2px,color:#fff;
    classDef backend fill:#0f172a,stroke:#38bdf8,stroke-width:2px,color:#fff;
    classDef database fill:#0f172a,stroke:#f59e0b,stroke-width:2px,color:#fff;
    classDef external fill:#0f172a,stroke:#a855f7,stroke-width:2px,color:#fff;
    classDef ai fill:#0f172a,stroke:#ec4899,stroke-width:2px,color:#fff;

    subgraph CLIENTE["🌐 Capa de Presentación & Clientes"]
        WEBGIS["🛰️ WebGIS Next.js 16 App Router\\nPuerto 3000 | Turbopack | Leaflet"]:::frontend
        STREAMLIT["📊 Streamlit Prescripción VRA\\nPuerto 8501 | Folium | Plotly"]:::frontend
    end

    subgraph BACKEND_SERVICES["⚙️ Capa de Servicios & Cómputo Espacial"]
        FASTAPI["🚀 FastAPI Backend Espacial\\nPuerto 8000 | Python 3.13 | Uvicorn"]:::backend
        ML_ENGINE["🧠 Scikit-Learn Random Forest\\nClasificación Edafológica & Salud"]:::backend
        GEMINI_AI["✨ Gemini 3.5 Flash\\nRecomendaciones Agronómicas & Dosis"]:::ai
    end

    subgraph CACHE_DATA["💾 Capa de Persistencia & Caché Híbrida"]
        SQLITE_CACHE["⚡ SQLite WAL Geodesic Cache\\nHash ~11m (lat < 25ms) | Rural Offline"]:::database
        POSTGRES["🐘 PostgreSQL 15 (Docker)\\nPuerto 5444 | Relaciones & Bitácora"]:::database
    end

    subgraph EXTERNAL_APIS["🛰️ Proveedores Satelitales & Clima"]
        GEE["🌍 Google Earth Engine API\\nSentinel-2 L2A (10m) | SCL Mask"]:::external
        NASA["☀️ NASA POWER Agroclimatology\\nPrecipitaciones, GDD (10°-30°C) & Radiación"]:::external
        MAPBIOMAS["🗺️ MapBiomas Venezuela Colección 3\\n40 Años LULC (Provita / RAISG)"]:::external
    end

    %% Relaciones y Flujos
    WEBGIS <-->|REST API / GeoJSON| FASTAPI
    WEBGIS <-->|Prisma ORM CRUD| POSTGRES
    STREAMLIT <-->|API Prescripciones| FASTAPI
    
    FASTAPI <-->|Consulta Geohash| SQLITE_CACHE
    FASTAPI -->|Fallback Ingestion| GEE
    FASTAPI -->|Consultas Agrometeorológicas| NASA
    FASTAPI -->|Entrenamiento & Inferencia| ML_ENGINE
    FASTAPI <-->|Multi-Parametric Prompt| GEMINI_AI

    SQLITE_CACHE -.->|Sincronización Batch| POSTGRES
    WEBGIS -->|Capa Vectorial Base| MAPBIOMAS`,
    svgHighlights: [
      { step: '1. Petición WebGIS', title: 'Navegación Territorial', description: 'El agricultor selecciona un estado o municipio en Next.js 16.', tech: 'Next.js 16 / Leaflet', latency: '0 ms' },
      { step: '2. Consulta de Caché', title: 'Verificación Geodésica', description: 'FastAPI comprueba el hash geodésico de 4 decimales en SQLite WAL.', tech: 'SQLite WAL (<25ms)', latency: '12 ms' },
      { step: '3. Ingestión Satelital', title: 'Sentinel-2 L2A & NASA', description: 'Si no está en caché, descarga bandas B2, B3, B4, B8, B11 y datos NASA POWER.', tech: 'GEE API / NASA POWER', latency: '240 ms' },
      { step: '4. IA & Prescripción', title: 'Gemini 3.5 Flash & ML', description: 'Generación de dosis óptima NPK, requerimientos de riego y diagnóstico.', tech: 'Gemini 3.5 Flash / Scikit-Learn', latency: '650 ms' },
      { step: '5. Persistencia Dual', title: 'Cuaderno & Finca', description: 'Guardado reactivo en PostgreSQL y sincronización local en el dispositivo.', tech: 'Prisma ORM / SQLite', latency: '18 ms' }
    ]
  },
  {
    id: 'spatial_lifecycle',
    title: '2. Ciclo de Vida del Dato Geoespacial & Micro-Parcela (10m)',
    category: 'spatial',
    icon: Layers,
    badge: 'Algoritmos GIS',
    description: 'Algoritmos y transformaciones desde la delimitación de vértices WGS84, enmascaramiento de nubes SCL Sentinel-2, cálculo de índices de vegetación hasta la prescripción de dosis variable (VRA).',
    metrics: [
      { label: 'Resolución Espacial', value: '10 metros/píxel' },
      { label: 'Bandas Espectrales', value: '13 Bandas (B1-B12, SCL)' },
      { label: 'Fórmula de Área', value: 'Shoelace Geodésico WGS84' },
      { label: 'Máscara Nubes', value: 'SCL 3, 8, 9, 10 Excluidas' }
    ],
    mermaidCode: `graph LR
    %% Nodos
    A["📍 1. Delimitador Leaflet\\nVértices WGS84"] --> B["📐 2. Shoelace Geodésico\\nÁrea Exacta (ha) & Haversine (km)"]
    B --> C["🛰️ 3. Sentinel-2 L2A Ingestión\\nBandas B2, B3, B4, B8, B11, SCL"]
    C --> D["☁️ 4. Máscara de Nubes SCL\\nExcluye Sombras (3) & Nubes (8,9,10)"]
    D --> E["🌱 5. Índices Espectrales\\nNDVI = (B8-B4)/(B8+B4)\\nNDWI = (B8-B11)/(B8+B11)\\nEVI & SAVI"]
    E --> F["🌡️ 6. GDD Agrometeorológico\\nBase 10.0°C | Techo 30.0°C"]
    F --> G["🧪 7. Modelo Random Forest\\nClasificación Edafológica pH & MO"]
    G --> H["🎯 8. Prescripción VRA\\nZonificación Nitrógeno & Fósforo (kg/ha)"]`,
    svgHighlights: [
      { step: 'Fase 1: Geometría', title: 'Trazado Esferoidal', description: 'Cálculo de área geodésica proyectada sobre el elipsoide WGS84 con Shoelace.', tech: 'TypeScript SpatialUtils', latency: '1 ms' },
      { step: 'Fase 2: Filtro SCL', title: 'Filtrado de Nubes', description: 'Eliminación rigurosa de cirros, nubes altas y sombras con la banda SCL.', tech: 'NumPy Vectorized Mask', latency: '45 ms' },
      { step: 'Fase 3: Espectro', title: 'Extracción de Índices', description: 'Cálculo de vigor fotosintético (NDVI), estrés hídrico (NDWI) y biomasa (EVI).', tech: 'FastAPI Spatial Core', latency: '60 ms' },
      { step: 'Fase 4: Inferencia', title: 'Dosis Variable VRA', description: 'Prescripción agronómica adaptada a la textura de suelo y zona climática.', tech: 'Python Scikit-Learn', latency: '80 ms' }
    ]
  },
  {
    id: 'offline_auth_sync',
    title: '3. Ciclo de Autenticación, Token Hashing & Modo Offline Rural',
    category: 'offline',
    icon: ShieldCheck,
    badge: 'Resiliencia Rural',
    description: 'Mecanismo de tolerancia a desconexión rural para productores en campo, con almacenamiento en memoria/WAL y sincronización determinista con PostgreSQL al recuperar conectividad.',
    metrics: [
      { label: 'Tolerancia', value: '100% Funcional Offline' },
      { label: 'Modo Invitado', value: 'In-Memory Concurrency Safe' },
      { label: 'Seguridad', value: 'JWT con RBAC 3 Niveles' },
      { label: 'Resincronización', value: 'Automatic Background Sync' }
    ],
    mermaidCode: `sequenceDiagram
    autonumber
    actor Productor as 🚜 Agricultor en Campo
    participant App as 📱 WebGIS Frontend (Next.js)
    participant LocalDB as 💾 SQLite WAL / Local Storage
    participant API as 🚀 FastAPI / API Gateway
    participant CloudDB as 🐘 PostgreSQL 15 (Docker)

    Productor->>App: Delimita Parcela / Registra Labor en Bitácora
    alt Sin Conexión a Internet (Modo Rural Offline)
        App->>LocalDB: Guarda Registro con Geohash (~11m) & Timestamp Local
        LocalDB-->>App: Confirmación Inmediata (<10ms)
        App-->>Productor: ✓ Guardado en Cuaderno Local Offline
    else Con Conexión de Datos (3G/4G/WiFi)
        App->>API: Envía Payload + Token JWT / Sesión Concurrente
        API->>CloudDB: Transacción ACID con Prisma ORM
        CloudDB-->>API: Confirmación de Persistencia
        API-->>App: Registro Sincronizado
        App-->>Productor: ✓ Sincronizado en la Nube
    end
    Note over App,CloudDB: Al restablecerse la red, se dispara sincronización en lote en segundo plano.`,
    svgHighlights: [
      { step: '1. Detección de Red', title: 'Conectividad Dinámica', description: 'El cliente evalúa el estado de red sin bloquear la interfaz de usuario.', tech: 'Navigator Online API', latency: '0 ms' },
      { step: '2. Buffer Local', title: 'Almacenamiento Local Seguro', description: 'Los registros se conservan con hashing geodésico y firma de integridad.', tech: 'SQLite WAL / IndexedDB', latency: '< 5 ms' },
      { step: '3. Cola de Sincronización', title: 'Batch Dispatcher', description: 'Al reconectar, procesa la cola de labores pendientes sin pérdida de datos.', tech: 'REST API Sync', latency: '150 ms' },
      { step: '4. Consistencia Global', title: 'PostgreSQL Relacional', description: 'Actualización atómica en el servidor con trazabilidad de usuario.', tech: 'PostgreSQL 15', latency: '25 ms' }
    ]
  },
  {
    id: 'ai_agroadvisor',
    title: '4. Flujo Multi-Paramétrico de Inteligencia Agronómica con Gemini 3.5',
    category: 'ai',
    icon: Sparkles,
    badge: 'Gemini 3.5 Flash',
    description: 'Estructuración contextual multi-variable que fusiona la edafología venezolana, el clima de NASA POWER, el catálogo de 6 cultivos prioritarios y el modelo LLM para generar recomendaciones expertas.',
    metrics: [
      { label: 'Modelo LLM', value: 'Gemini 3.5 Flash' },
      { label: 'Contexto Integrado', value: 'Edafológico + Climático + Histórico' },
      { label: 'Temperatura Prompt', value: '0.2 (Máxima Precisión Técnica)' },
      { label: 'Cultivos Cubiertos', value: 'Maíz, Arroz, Café, Cacao, Caña, Plátano' }
    ],
    mermaidCode: `graph TD
    subgraph INSUMOS["📥 Datos de Entrada Multi-Fuente"]
        P["📍 Parcela & Coordenadas\\nSuperficie (ha) & Pendiente"]
        S["🧪 Edafología del Suelo\\npH (5.5-7.5), MO (%), Textura"]
        C["🌾 Cultivo & Fenología\\nEtapa Vegetativa / Días Siembra"]
        M["☀️ Clima NASA POWER\\nLluvias (mm), Temp, GDD, Radiación"]
    end

    subgraph PROMPT_ENGINE["⚙️ Generador Estructurado de Contexto Agronómico"]
        ENGINE["🧠 Reglas Agronómicas Venezolanas (INIA / FUDECO)\\n+ Restricciones Nutricionales N-P-K"]
    end

    subgraph AI_CORE["✨ Motor Gemini 3.5 Flash Server-Side"]
        GEMINI["🤖 Gemini 3.5 Flash\\nAnálisis Causal y Síntesis de Prescripción"]
    end

    subgraph SALIDAS["📤 Plan de Acción Productivo"]
        FERT["🌱 Dosis de Fertilización Fraccionada\\nUrea, DAP, KCl en etapas críticas"]
        RIEGO["💧 Balance Hídrico & Turnos de Riego"]
        FITO["🛡️ Alertas Preventivas de Plagas & Hongos"]
        DIAG["📊 Calificación de Viabilidad & Rendimiento Estimado"]
    end

    P --> ENGINE
    S --> ENGINE
    C --> ENGINE
    M --> ENGINE

    ENGINE -->|Prompt Multi-Variable Seguro| GEMINI
    GEMINI --> FERT
    GEMINI --> RIEGO
    GEMINI --> FITO
    GEMINI --> DIAG`,
    svgHighlights: [
      { step: 'Paso 1: Agregación', title: 'Fusión de Parámetros', description: 'Se recolectan datos edafológicos, meteorológicos y satelitales del lote.', tech: 'TypeScript Aggregator', latency: '10 ms' },
      { step: 'Paso 2: Prompting', title: 'Contextualización Regional', description: 'Se aplican tablas agronómicas de Portuguesa, Guárico, Zulia y los Andes.', tech: 'Prompt Template v2.4', latency: '5 ms' },
      { step: 'Paso 3: Inferencia IA', title: 'Procesamiento Gemini', description: 'Gemini 3.5 Flash genera la prescripción con justificación fisicoquímica.', tech: 'Google GenAI SDK', latency: '750 ms' },
      { step: 'Paso 4: Presentación', title: 'Plan de Manejo', description: 'Renderizado interactivo de dosis de fertilización y calendario en el dashboard.', tech: 'React 19 Components', latency: '8 ms' }
    ]
  },
  {
    id: 'mapbiomas_integration',
    title: '5. Matriz de Integración de Cobertura Vegetal MapBiomas Venezuela',
    category: 'mapbiomas',
    icon: Database,
    badge: 'MapBiomas Col. 3',
    description: 'Estructura de series temporales de 40 años (1985-2024) de uso y cobertura del suelo en Venezuela elaborada por Provita, LSIGMA USB, Wataniba y RAISG bajo licencia CC BY 4.0.',
    metrics: [
      { label: 'Serie Histórica', value: '40 Años (1985 - 2024)' },
      { label: 'Resolución', value: '30m Landsat / 10m Sentinel' },
      { label: 'Clases LULC', value: 'Bosque, Sabana, Agro, Agua, Urbano' },
      { label: 'Licencia', value: 'CC BY 4.0 Internacional' }
    ],
    mermaidCode: `graph LR
    subgraph FUENTES["🛰️ Colección 3 MapBiomas Venezuela"]
        MB_BOSQUE["🌳 Formaciones Boscosas\\n(Amazonas, Guayana, Cordillera)"]
        MB_SABANA["🌾 Formaciones Naturales No Boscosas\\n(Llanos Colombo-Venezolanos)"]
        MB_AGRO["🚜 Uso Agropecuario\\n(Pastos, Mosaico de Agricultura)"]
        MB_AGUA["💧 Cuerpos de Agua & Humedales\\n(Orinoco, Apure, Lago de Maracaibo)"]
    end

    subgraph MOTOR["⚙️ Capa de Consulta Geoespacial Agrotech"]
        QUERY["🔍 Ray-Casting Point-in-Polygon\\nIntersección Parcelaria con Polígonos MapBiomas"]
    end

    subgraph ANALITICA["📊 Módulo de Diagnóstico Histórico"]
        TREND["📈 Detección de Cambios de Uso de Suelo"]
        DEFOR["🚨 Alerta de Deforestación Cero"]
        APT["🌾 Índice de Aptitud Agrícola Regenerativa"]
    end

    MB_BOSQUE --> QUERY
    MB_SABANA --> QUERY
    MB_AGRO --> QUERY
    MB_AGRO --> QUERY
    MB_AGUA --> QUERY

    QUERY --> TREND
    QUERY --> DEFOR
    QUERY --> APT`,
    svgHighlights: [
      { step: 'Nivel 1: Colección 3', title: 'Base MapBiomas', description: 'Capas raster y vectoriales históricas de Venezuela de 1985 a 2024.', tech: 'MapBiomas Raster WMS', latency: '40 ms' },
      { step: 'Nivel 2: Ray-Casting', title: 'Intersección Espacial', description: 'Algoritmo Point-in-Polygon para identificar la clase histórica del lote.', tech: 'Spatial Ray-Casting', latency: '15 ms' },
      { step: 'Nivel 3: Indicadores', title: 'Trayectoria Ecológica', description: 'Cálculo de métricas de cambio de cobertura y sostenibilidad.', tech: 'GeoStats Engine', latency: '35 ms' }
    ]
  }
];

export default function DataflowDiagramStudio() {
  const [selectedDiagramId, setSelectedDiagramId] = useState<string>('e2e_microservices');
  const [activeTab, setActiveTab] = useState<'interactive' | 'mermaid' | 'specs'>('interactive');
  const [copiedCode, setCopiedCode] = useState(false);
  const [mermaidSvg, setMermaidSvg] = useState<string>('');
  const [isRenderingMermaid, setIsRenderingMermaid] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const mermaidContainerRef = useRef<HTMLDivElement>(null);

  const currentDiagram = SYSTEM_DIAGRAMS.find(d => d.id === selectedDiagramId) || SYSTEM_DIAGRAMS[0];

  // Renderizar Mermaid dinámicamente en el cliente
  useEffect(() => {
    let isMounted = true;

    async function renderMermaidDiagram() {
      setIsRenderingMermaid(true);
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          securityLevel: 'loose',
          themeVariables: {
            darkMode: true,
            background: '#0b1329',
            primaryColor: '#16a34a',
            primaryTextColor: '#ffffff',
            primaryBorderColor: '#22c55e',
            lineColor: '#38bdf8',
            secondaryColor: '#0284c7',
            tertiaryColor: '#1e293b'
          }
        });

        const id = `mermaid_diag_${Date.now()}`;
        const { svg } = await mermaid.render(id, currentDiagram.mermaidCode);
        if (isMounted) {
          setMermaidSvg(svg);
          setIsRenderingMermaid(false);
        }
      } catch (err) {
        console.error('Error rendering mermaid:', err);
        if (isMounted) {
          setIsRenderingMermaid(false);
        }
      }
    }

    renderMermaidDiagram();

    return () => {
      isMounted = false;
    };
  }, [currentDiagram.mermaidCode, selectedDiagramId]);

  const handleCopyCode = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(currentDiagram.mermaidCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleDownloadSvg = () => {
    if (!mermaidSvg) return;
    const blob = new Blob([mermaidSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentDiagram.id}_diagram.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      {/* Header del Estudio de Diagramas */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #16a34a, #0284c7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff'
            }}>
              <Workflow size={22} />
            </div>
            <h1 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
              Estudio de Arquitectura & Ciclos de Flujo de Datos
            </h1>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.88rem', margin: 0, maxWidth: '780px' }}>
            Mapeo interactivo del prototipo integral y funcionamiento de <b>Agrotech Venezuela</b>: Microservicios, ingestión satelital Sentinel-2 L2A (10m), caché geodésico SQLite WAL, sincronización offline y análisis multi-paramétrico con Gemini 3.5.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            id="btn_tab_interactive"
            onClick={() => setActiveTab('interactive')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: activeTab === 'interactive' ? '1px solid #22c55e' : '1px solid rgba(255,255,255,0.1)',
              background: activeTab === 'interactive' ? '#16a34a' : '#1e293b',
              color: '#fff',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Activity size={15} /> Flujo Interactivo
          </button>

          <button
            id="btn_tab_mermaid"
            onClick={() => setActiveTab('mermaid')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: activeTab === 'mermaid' ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.1)',
              background: activeTab === 'mermaid' ? '#0284c7' : '#1e293b',
              color: '#fff',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <GitBranch size={15} /> Diagrama Mermaid
          </button>

          <button
            id="btn_tab_specs"
            onClick={() => setActiveTab('specs')}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: activeTab === 'specs' ? '1px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)',
              background: activeTab === 'specs' ? '#d97706' : '#1e293b',
              color: '#fff',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Terminal size={15} /> Especificaciones de Auditoría
          </button>
        </div>
      </div>

      {/* Selector de Diagramas por Categoría */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
        gap: '12px'
      }}>
        {SYSTEM_DIAGRAMS.map((diag) => {
          const isSelected = diag.id === selectedDiagramId;
          const IconComp = diag.icon;
          return (
            <div
              key={diag.id}
              id={`card_select_diag_${diag.id}`}
              onClick={() => {
                setSelectedDiagramId(diag.id);
                setActiveStepIndex(0);
              }}
              style={{
                background: isSelected 
                  ? 'linear-gradient(135deg, rgba(22, 163, 74, 0.25), rgba(2, 132, 199, 0.25))' 
                  : 'rgba(15, 23, 42, 0.75)',
                border: isSelected ? '2px solid #22c55e' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                boxShadow: isSelected ? '0 10px 25px -5px rgba(34, 197, 94, 0.3)' : 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: '8px',
                  background: isSelected ? '#16a34a' : 'rgba(51, 65, 85, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}>
                  <IconComp size={17} />
                </div>
                <span style={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  background: isSelected ? '#22c55e' : 'rgba(255,255,255,0.1)',
                  color: isSelected ? '#000' : '#94a3b8'
                }}>
                  {diag.badge}
                </span>
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.84rem', color: isSelected ? '#fff' : '#cbd5e1', lineHeight: 1.3 }}>
                {diag.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* Contenedor Principal del Diagrama Activo */}
      <div style={{
        background: '#0b1329',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Barra Superior del Diagrama */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          paddingBottom: '14px',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#f8fafc', margin: 0 }}>
                {currentDiagram.title}
              </h2>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.82rem', margin: 0, maxWidth: '750px' }}>
              {currentDiagram.description}
            </p>
          </div>

          {/* Acciones de Exportación y Zoom */}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              id="btn_copy_mermaid_code"
              onClick={handleCopyCode}
              title="Copiar código fuente Mermaid"
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.15)',
                background: '#1e293b',
                color: '#fff',
                fontSize: '0.76rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontWeight: 600
              }}
            >
              {copiedCode ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
              <span>{copiedCode ? '¡Copiado!' : 'Copiar Mermaid'}</span>
            </button>

            {mermaidSvg && (
              <button
                id="btn_download_svg_diag"
                onClick={handleDownloadSvg}
                title="Descargar diagrama en formato vectorial SVG"
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid #38bdf8',
                  background: '#0284c7',
                  color: '#fff',
                  fontSize: '0.76rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: 600
                }}
              >
                <Download size={14} /> Descargar SVG
              </button>
            )}

            <div style={{ display: 'flex', background: '#1e293b', borderRadius: '6px', padding: '2px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <button
                onClick={() => setZoomLevel(Math.min(zoomLevel + 0.15, 2.0))}
                title="Aumentar Zoom"
                style={{ background: 'transparent', border: 'none', color: '#fff', padding: '4px 6px', cursor: 'pointer' }}
              >
                <ZoomIn size={14} />
              </button>
              <button
                onClick={() => setZoomLevel(1)}
                title="Reiniciar Zoom"
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', padding: '4px 6px', cursor: 'pointer', fontSize: '0.72rem' }}
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                onClick={() => setZoomLevel(Math.max(zoomLevel - 0.15, 0.6))}
                title="Disminuir Zoom"
                style={{ background: 'transparent', border: 'none', color: '#fff', padding: '4px 6px', cursor: 'pointer' }}
              >
                <ZoomOut size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Métricas Clave del Flujo */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '10px'
        }}>
          {currentDiagram.metrics.map((m, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(30, 41, 59, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '8px',
                padding: '8px 12px'
              }}
            >
              <div style={{ fontSize: '0.70rem', color: '#94a3b8' }}>{m.label}</div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#38bdf8', marginTop: '2px' }}>{m.value}</div>
            </div>
          ))}
        </div>

        {/* VISTA 1: Flujo Interactivo con Nodos y Pasos */}
        {activeTab === 'interactive' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Secuencia Paso a Paso Interactiva */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
              gap: '10px'
            }}>
              {currentDiagram.svgHighlights.map((hl, idx) => {
                const isActive = activeStepIndex === idx;
                return (
                  <div
                    key={idx}
                    id={`step_highlight_${idx}`}
                    onClick={() => setActiveStepIndex(idx)}
                    style={{
                      background: isActive 
                        ? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(2, 132, 199, 0.2))' 
                        : 'rgba(15, 23, 42, 0.8)',
                      border: isActive ? '1px solid #22c55e' : '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '10px',
                      padding: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      position: 'relative'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.70rem', fontWeight: 700, color: isActive ? '#4ade80' : '#64748b' }}>
                        {hl.step}
                      </span>
                      <span style={{ fontSize: '0.68rem', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.15)', padding: '1px 5px', borderRadius: '4px' }}>
                        {hl.latency}
                      </span>
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#f8fafc', marginBottom: '3px' }}>
                      {hl.title}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', lineHeight: 1.3 }}>
                      {hl.description}
                    </div>
                    <div style={{ marginTop: '6px', fontSize: '0.68rem', color: '#a855f7', fontWeight: 600 }}>
                      ⚡ {hl.tech}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Lienzo Visual Renderizado con Mermaid */}
            <div style={{
              background: '#070d1e',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '24px',
              minHeight: '380px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'auto',
              position: 'relative'
            }}>
              {isRenderingMermaid ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: '#4ade80' }}>
                  <div style={{ fontSize: '2rem', animation: 'spin 2s linear infinite' }}>⚙️</div>
                  <div style={{ fontSize: '0.84rem' }}>Compilando diagrama de flujo vectorial...</div>
                </div>
              ) : mermaidSvg ? (
                <div
                  ref={mermaidContainerRef}
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'center center',
                    transition: 'transform 0.15s ease-out',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                  dangerouslySetInnerHTML={{ __html: mermaidSvg }}
                />
              ) : (
                <div style={{ color: '#94a3b8', fontSize: '0.84rem' }}>Diagrama listo para visualización.</div>
              )}
            </div>
          </div>
        )}

        {/* VISTA 2: Código Mermaid y Editor */}
        {activeTab === 'mermaid' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Code size={16} /> Código Fuente de Diagrama Mermaid (Estándar Abierto)
              </div>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Compatible con GitHub, Notion y Mermaid Live Editor</span>
            </div>

            <pre style={{
              background: '#070d1e',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '10px',
              padding: '16px',
              color: '#86efac',
              fontFamily: 'monospace',
              fontSize: '0.80rem',
              overflowX: 'auto',
              lineHeight: 1.45,
              margin: 0
            }}>
              {currentDiagram.mermaidCode}
            </pre>
          </div>
        )}

        {/* VISTA 3: Especificaciones de Auditoría y Tecnologías */}
        {activeTab === 'specs' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
            <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontWeight: 700, color: '#22c55e', fontSize: '0.88rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Server size={16} /> Microservicios y Puertos Activos
              </div>
              <ul style={{ color: '#cbd5e1', fontSize: '0.78rem', paddingLeft: '16px', margin: 0, lineHeight: 1.6 }}>
                <li><b>WebGIS Frontend:</b> Next.js 16 App Router con Turbopack (Puerto 3000)</li>
                <li><b>Backend Espacial:</b> FastAPI en Python 3.13 con Uvicorn (Puerto 8000)</li>
                <li><b>Dashboard Prescripciones:</b> Streamlit 1.62 con Folium (Puerto 8501)</li>
                <li><b>Base de Datos Relacional:</b> PostgreSQL 15 en Docker (Puerto 5444)</li>
                <li><b>Caché Desconectada:</b> SQLite en modo WAL con hashing geodésico (~11m)</li>
              </ul>
            </div>

            <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontWeight: 700, color: '#38bdf8', fontSize: '0.88rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Cpu size={16} /> Algoritmos & Motores Espaciales
              </div>
              <ul style={{ color: '#cbd5e1', fontSize: '0.78rem', paddingLeft: '16px', margin: 0, lineHeight: 1.6 }}>
                <li><b>Cálculo de Área (ha):</b> Shoelace geodésico esferoidal WGS84</li>
                <li><b>Perímetro & Distancia:</b> Fórmula de Haversine</li>
                <li><b>Ray-Casting:</b> Point-in-Polygon sobre 24 estados y 335 municipios</li>
                <li><b>Filtrado de Nubes:</b> Sentinel-2 L2A SCL (excluyendo 3, 8, 9 y 10)</li>
                <li><b>GDD Térmico:</b> Base 10.0°C con umbral superior 30.0°C</li>
              </ul>
            </div>

            <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontWeight: 700, color: '#ec4899', fontSize: '0.88rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={16} /> Inteligencia Artificial & Licenciamiento
              </div>
              <ul style={{ color: '#cbd5e1', fontSize: '0.78rem', paddingLeft: '16px', margin: 0, lineHeight: 1.6 }}>
                <li><b>Modelo Generativo:</b> Gemini 3.5 Flash server-side con prompt estructurado</li>
                <li><b>Modelo Clasificador:</b> Random Forest Classifier para perfiles edafológicos</li>
                <li><b>Atribución MapBiomas:</b> Provita, LSIGMA USB, Wataniba & RAISG (CC BY 4.0)</li>
                <li><b>Código Fuente:</b> Licencia MIT (Copyright 2026 Frank Sousa - Agrotech)</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
