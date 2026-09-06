# Directrices de Desarrollo y Arquitectura — Agrotech Venezuela 🌾🛰️

Este documento define los estándares arquitectónicos, convenciones de código y pautas de ingeniería para desarrolladores y agentes de IA trabajando en el ecosistema **Agrotech Venezuela**.

---

## 🏗️ 1. Ecosistema de Microservicios

1. **Plataforma WebGIS (Next.js 16 App Router con Turbopack)**:
   - Directorio: `src/`
   - Tecnologías: Next.js 16, React 19, Leaflet Nativo (L.map) + useRef, CSS Modules Glassmorphism, Prisma ORM.
   - Puerto por defecto: `3000` (`npm run dev`).
   - Componentes interactivos de Leaflet **deben** renderizarse con dynamic import (`ssr: false`) usando el motor Leaflet puro (`L.map`) y ciclo de vida controlado por `useRef` (No usar react-leaflet).
   - Resiliencia PWA & Accesibilidad Rural: Indicador de conectividad reactivo (`src/components/layout/ConnectivityStatusBadge.tsx`), cola de mutaciones en IndexedDB, y arquitectura **Dual-Mode UI** (`UIModeContext` y `FarmerModeToggle`) con *Modo Productor Fácil* (4 Puertas táctiles, glosario de campo y dictado por voz nativo Web Speech API) y *Modo Técnico* para ingenieros y científicos.

2. **Backend Espacial, ML & Gemini AI (FastAPI)**:
   - Directorio: `backend/src/`
   - Tecnologías: Python 3.13, FastAPI, Uvicorn, Scikit-Learn, NumPy, Google Earth Engine API, NASA POWER Client.
   - Puerto por defecto: `8000` (`py -m uvicorn src.main:app --port 8000 --reload`).
   - Documentación interactiva en `/docs` (OpenAPI 3.0).

3. **Dashboard Interactivo de Prescripción (Streamlit)**:
   - Archivo: `backend/streamlit_app.py`
   - Tecnologías: Streamlit 1.62, Folium, Streamlit-Folium, Plotly Express.
   - Puerto por defecto: `8501` (`py -m streamlit run streamlit_app.py --server.headless true`).

4. **Base de Datos & Caché**:
   - PostgreSQL 15 en Docker (Puerto `5444`).
   - SQLite en modo WAL (`backend/src/cache_manager.py`) con hashing geodésico a 4 decimales (~11m de resolución) para latencias < 25ms y funcionamiento rural offline.
   - Fallback en memoria en Next.js (`src/lib/prisma.ts`) para funcionamiento turnkey inmediato sin base de datos externa.

---

## 🧮 2. Convenciones y Algoritmos Geoespaciales

- **Cálculo de Área en Hectáreas**: Fórmula esferoidal de Shoelace geodésico proyectada sobre el elipsoide WGS84 (`src/lib/geo/spatialUtils.ts`).
- **Cálculo de Distancias y Perímetro**: Fórmula de Haversine en kilómetros y metros.
- **Detección de Estado Territorial**: Algoritmo Ray-Casting (Point-in-Polygon) sobre las geometrías de `src/lib/geo/venezuelaGeoJson.ts` antes de recurrir a distancia euclidiana.
- **Jerarquía WebGIS Multi-Escala**:
  - Nivel 1: Nacional (`src/lib/geo/venezuelaData.ts` y `VenezuelaStateMapInner.tsx`).
  - Nivel 2: Municipal (`src/lib/geo/venezuelaMunicipalities.ts` y `venezuelaMunicipalitiesGeoJson.ts`).
  - Nivel 3: Micro-Parcela Sentinel-2 / Sentinel-1 SAR con delimitador interactivo y persistencia en `/api/parcels`.
- **Penetración de Nubes con Radar SAR Banda C**: Retrodispersión dual VV/VH en dB (`src/lib/geo/sarRadarService.ts`) para estimar índice de saturación de humedad en suelo sin interferencia de nubes.
- **Grados Día de Crecimiento (GDD)**: Base térmica $10.0^\circ\text{C}$ con umbral superior $30.0^\circ\text{C}$ y balance hídrico mensual $P - ET_c$ (`src/lib/geo/hydroThermalEngine.ts`).
- **Cuantificación de Carbono Orgánico (SOC) y MRV**: Stock de carbono en 0-30cm y secuestro anual ($\text{tCO}_2\text{e}/\text{ha}/\text{año}$) bajo manejo regenerativo según metodología IPCC Tier 2 / Verra VCS (`src/components/agronomy/CarbonCreditsCalculator.tsx`).
- **Máscara de Nubes Sentinel-2 L2A**: Utilizar la banda SCL (Scene Classification Layer) excluyendo sombras (3), nubes medias/altas (8, 9) y cirros (10).
- **Calibración Edafológica Regional**: Modelo Kamprath modificado ($1.5 \times \text{Al}^{3+} \times 100 / \text{PRNT}$) para sabanas orientales ácidas, balance Ca:Mg (3:1 a 4:1) para Sur del Lago con cal dolomítica, y Yeso Agrícola ($CaSO_4 \cdot 2H_2O$) a 2.5 t/ha para suelos salino-sódicos alcalinos en Quíbor/Lara ($pH \ge 7.4$).
- **Parser Vernacular Campesino**: Normalización offline e insensible a acentos de unidades tradicionales venezolanas (1 saco = 50 kg, 1 tambor = 200 L, 1 caneca = 20 L, 1 tablón = 1.0 ha) acoplado a la Bitácora de Campo.
- **Prescripciones Tri-Modales para Maquinaria**: Paquetes ESRI Shapefile con atributos VRA (`RATE_LIME`, `RATE_NPK`, `AREA_HA` en UTM 19N WGS84) para tractores GPS, misiones de vuelo KML para drones agrícolas y fichas de cabina analógica de 1 página.
- **Resolución Determinista de Conflictos Offline**: Versionado monotónico (`version`) y timestamp (`updated_at`) en geometrías de parcelas. Colisiones concurrentes devuelven HTTP 409 y se almacenan en la cola de cuarentena `/api/parcels/conflicts` para resolución guiada (`ParcelConflictModal.tsx`) en Modo Productor (vernacular) o Modo Técnico (diff métrico).
- **Pedocalibración Dinámica Edafológica & PAW**: Modelo Saxton-Rawls regionalizado (Arenoso $\theta_{crit}=9\%$, Franco $\theta_{crit}=20\%$, Arcilloso $\theta_{crit}=35\%$). Ingestión IoT en `/api/iot/telemetry` condicionada a $\text{PAW} < 50\%$ para activación de riego.
- **Oráculo Satelital Radar SAR Sentinel-1 para MRV**: Verificación de rugosidad estructural del dosel ($\sigma^\circ_{VH}/\sigma^\circ_{VV} > -12\text{ dB}$) en `/api/mrv/sar-oracle` acoplada a la Bitácora de Campo, reduciendo la incertidumbre Verra VCS del 40% al 10%.

---

## 🧪 3. Pautas de Testing y Validación

Antes de realizar cualquier commit a la rama `main`, se **deben** ejecutar y pasar ambas suites de pruebas automatizadas:

```bash
# 1. Pruebas de Frontend WebGIS, SAR Radar, GDD, Auth, Security, Diary, Spatial, Routing, Search, IoT, Pedotransfer, Conflict Quarantine, Carbon MRV, Vernacular & Machinery (Jest — 173 tests en 28 suites)
npm test

# 2. Verificación de Tipos TypeScript (0 errores obligatorios)
npm run typecheck

# 3. Compilación de Producción Next.js 16 Turbopack (30 rutas limpias)
npm run build

# 4. Pruebas de Backend Espacial, ML, IA, Saxton-Rawls y Oráculo SAR (Pytest — 54 tests)
npm run test:backend

# 5. Suite Unificada Automatizada Completa (227 tests)
npm run test:all
```

---

## 📜 4. Licenciamiento y Atribución

- Código fuente bajo **Licencia MIT** (Copyright 2026 Frank Sousa - Agrotech Venezuela).
- Los datos de cobertura vegetal referencian a **MapBiomas Venezuela** (Provita, LSIGMA USB, Wataniba y RAISG) bajo licencia **Creative Commons Atribución 4.0 Internacional (CC BY 4.0)**.
