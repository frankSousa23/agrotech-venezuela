# Directrices de Desarrollo y Arquitectura — Agrotech Venezuela 🌾🛰️

Este documento define los estándares arquitectónicos, convenciones de código y pautas de ingeniería para desarrolladores y agentes de IA trabajando en el ecosistema **Agrotech Venezuela**.

---

## 🏗️ 1. Ecosistema de Microservicios

1. **Plataforma WebGIS (Next.js 16 App Router con Turbopack)**:
   - Directorio: `src/`
   - Tecnologías: Next.js 16, React 19, Leaflet / React-Leaflet, CSS Modules Glassmorphism, Prisma ORM.
   - Puerto por defecto: `3000` (`npm run dev`).
   - Componentes interactivos de Leaflet **deben** renderizarse con dynamic import (`ssr: false`).

2. **Backend Espacial, ML & Gemini AI (FastAPI)**:
   - Directorio: `backend/src/`
   - Tecnologías: Python 3.13, FastAPI, Uvicorn, Scikit-Learn, NumPy, Google Earth Engine API, NASA POWER Client.
   - Puerto por defecto: `8000` (`py -m uvicorn src.main:app --port 8000 --reload`).
   - Documentación interactiva en `/docs` (OpenAPI 3.0).

3. **Dashboard Interactivo de Prescripción (Streamlit)**:
   - Archivo: `backend/streamlit_app.py`
   - Tecnologías: Streamlit 1.62, Folium, Streamlit-Folium, Plotly Express.
   - Puerto por defecto: `8501` (`py -m streamlit run streamlit_app.py`).

4. **Base de Datos & Caché**:
   - PostgreSQL 15 en Docker (Puerto `5444`).
   - SQLite en modo WAL (`backend/src/cache_manager.py`) con hashing geodésico a 4 decimales (~11m de resolución) para latencias < 25ms y funcionamiento rural offline.

---

## 🧮 2. Convenciones y Algoritmos Geoespaciales

- **Cálculo de Área en Hectáreas**: Fórmula esferoidal de Shoelace geodésico proyectada sobre el elipsoide WGS84.
- **Cálculo de Distancias y Perímetro**: Fórmula de Haversine en kilómetros.
- **Detección de Estado Territorial**: Algoritmo Ray-Casting (Point-in-Polygon) sobre las geometrías de `src/lib/geo/venezuelaGeoJson.ts` antes de recurrir a distancia euclidiana.
- **Máscara de Nubes Sentinel-2 L2A**: Utilizar la banda SCL (Scene Classification Layer) excluyendo sombras (3), nubes medias/altas (8, 9) y cirros (10).
- **Cálculo de GDD**: Base térmica $10.0^\circ\text{C}$ con umbral superior $30.0^\circ\text{C}$.

---

## 🧪 3. Pautas de Testing y Validación

Antes de realizar cualquier commit a la rama `main`, se **deben** ejecutar y pasar ambas suites de pruebas automatizadas:

```bash
# 1. Pruebas de Frontend WebGIS & APIs (Jest - 30 tests)
npm test

# 2. Pruebas de Backend Espacial, ML, IA y Carga (Pytest - 39 tests)
cd backend && py -m pytest tests
```

- **Verificación de Tipos TypeScript**: `npx tsc --noEmit` debe arrojar 0 errores.
- **Compilación de Producción**: `npm run build` debe compilar todas las rutas estáticas y dinámicas limpiamente con Turbopack.

---

## 📜 4. Licenciamiento y Atribución

- Código fuente bajo **Licencia MIT** (Copyright 2026 Frank Sousa - Agrotech Venezuela).
- Los datos de cobertura vegetal referencian a **MapBiomas Venezuela** (Provita, LSIGMA USB, Wataniba y RAISG) bajo licencia **Creative Commons Atribución 4.0 Internacional (CC BY 4.0)**.
