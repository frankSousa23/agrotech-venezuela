# Technical Design: Módulo de Suelos de MapBiomas Venezuela

## Context

See `proposal.md` for motivation. Agrotech Venezuela cuenta con motores consolidados de pedotransferencia (`pedotransferEngine.ts`) y corrección química edafológica regional (`spatialUtils.ts`). Esta arquitectura diseña la infraestructura de desacoplamiento, indexación espacial y serialización para exponer estos motores tanto interna como externamente.

## Goals / Non-Goals

**Goals:**
- Proporcionar endpoints espaciales de latencia inferior a 25 ms para consultas de punto (k-NN) y polígonos GeoJSON con cabeceras CORS universales.
- Generar artefactos estándar de exportación GIS: GeoJSON FeatureCollection (RFC 7946) y scripts de Google Earth Engine (`mapbiomas_soil_engine.js`).
- Diseñar una vista embebible `/embed/soil-module` libre de dependencias de navegación para incrustación directa en el portal MapBiomas.
- Transformar la interfaz de `/dashboard/suelos` en una estación de trabajo interactiva de 3 vistas con simulación reactiva de la curva pF de retención hídrica en SVG puro.

**Non-Goals:**
- No se requiere una base de datos PostGIS externa obligatoria: el motor funciona de manera turnkey mediante estructuras en memoria y geocaché SQLite WAL.
- No se realiza procesamiento raster masivo en tiempo real en el servidor Node.js; las operaciones raster a escala nacional se delegan al script de Google Earth Engine exportado.

## Decisions

### 1. Indexación Espacial k-NN Nativa en Memoria con Pre-Filtro Bounding Box
- **Decisión**: Implementar la búsqueda espacial de los 1.245 perfiles edafológicos en `src/lib/soil-module/spatialSoilIndex.ts` utilizando una ventana de pre-filtrado por Bounding Box ($\pm 0.25^\circ$) seguida de cálculo de distancia geodésica de Haversine sobre el elipsoide WGS84 e interpolación IDW (Inverse Distance Weighting).
- **Alternativas consideradas**:
  - *PostGIS con operador `<->`*: Descartado para mantener el principio de instalación cero configuración (turnkey zero-config) sin requerir servicios externos pesados.
  - *Búsqueda secuencial exhaustiva sin filtro*: Descartado por penalización de rendimiento en consultas concurrentes.

### 2. Gráfico Vectorial Interactivo de Curva pF en SVG Nativo
- **Decisión**: Renderizar la curva de retención hídrica van Genuchten / Saxton-Rawls mediante un componente React nativo con SVG generado programáticamente (`SoilRetentionCurveCanvas.tsx`), mapeando dinámicamente el eje X (humedad volumétrica $\theta\%$) y el eje Y (succión mátrica $pF$).
- **Alternativas consideradas**:
  - *Librería externa pesada (ej. Chart.js o Plotly)*: Descartado para evitar incrementar el bundle de producción y evitar advertencias de hidratación en React 19.

### 3. Microfrontend Embebible mediante Ruta Especializada de Next.js
- **Decisión**: Crear `/embed/soil-module` como una página estándar de Next.js pero envuelta en un layout aislado que omite `AppLayout`, `Header` y `Sidebar`, adaptándose al tamaño del contenedor y escuchando eventos `window.postMessage` para sincronización con el visor geográfico anfitrión.
- **Alternativas consideradas**:
  - *Web Component custom element compilado aparte*: Mayor complejidad de build y mantenimiento de bundles separados; el enfoque de ruta aislada permite compartir exactamente la misma lógica de TypeScript y componentes CSS.

### 4. Generación Parametrizada de Scripts de Google Earth Engine
- **Decisión**: El endpoint `/api/v1/soil/export/gee-script` devuelve un archivo JavaScript modular estructurado con funciones `ee.Image.expression` que los desarrolladores de MapBiomas pueden importar con `require()` en la consola de Earth Engine, sin requerir credenciales de servicio en el servidor de Agrotech.
- **Alternativas consideradas**:
  - *Conexión directa vía Service Account de Google*: Descartado para evitar dependencias de claves de API privadas que limiten la reproducibilidad libre del código por terceros.

## Risks / Trade-offs

- **[Riesgo: Consultas fuera del territorio nacional venezolano]** → **Mitigación**: El endpoint valida límites territoriales ($0^\circ \le \text{Lat} \le 13^\circ$, $-74^\circ \le \text{Lon} \le -59^\circ$); si las coordenadas caen fuera, responde con advertencia y fallback al régimen tropical general.
- **[Riesgo: Polígonos GeoJSON excesivamente complejos con miles de vértices]** → **Mitigación**: Simplificación preliminar de vértices y cálculo de centroide ponderado si la geometría excede 500 puntos.

## Migration Plan

- Los endpoints existentes (`/api/soils`, `/api/recomendaciones`, `/api/export/stats`) se preservan intactos para retrocompatibilidad absoluta.
- Las nuevas rutas se exponen bajo el prefijo versionado `/api/v1/soil/` y `/embed/soil-module`.
