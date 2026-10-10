# Proposal: Módulo de Suelos de MapBiomas Venezuela (Federación, Exportación y Estación de Trabajo)

## Why

El sistema Agrotech Venezuela cuenta con motores de física edafológica (Saxton-Rawls) y enmiendas químicas regionalizadas (Kamprath, dolomita, yeso agrícola) de alta precisión científica. Sin embargo, actualmente estos activos operan primordialmente en tablas estáticas y no disponen de una capa de interoperabilidad geoespacial que permita a la plataforma externa **MapBiomas Venezuela** (Provita, LSIGMA USB, Wataniba, RAISG) consultar el módulo por coordenadas/polígonos, ni descargar scripts nativos para Google Earth Engine (GEE), ni embeber el módulo como un microfrontend interactivo en su portal web.

Este cambio implementa una arquitectura de doble vía que eleva el Módulo de Suelos a un componente de grado de producción enterprise: plenamente operativo dentro de Agrotech Venezuela (con un simulador interactivo de curvas de retención hídrica pF y sliders de física de suelos) y totalmente desacoplado, exportable y federado para su adopción directa por la Red MapBiomas.

## What Changes

- **API Espacial Federada de Suelos (`/api/v1/soil/...`)**:
  - Endpoint `GET /api/v1/soil/point?lat={lat}&lon={lon}` con resolución geodésica k-NN ultrarrápida (<15 ms) e interpolación por ponderación inversa de distancia (IDW).
  - Endpoint `POST /api/v1/soil/intersect` para análisis zonal agregado a partir de polígonos GeoJSON (área total, pH ponderado, retención hídrica en m³ y enmiendas totales en toneladas y sacos de 50 kg).
  - Cabeceras CORS abiertas (`Access-Control-Allow-Origin: *`) y directivas de caché perimetral `stale-while-revalidate` para consumo desde dominios externos autorizados.
- **Hub de Exportación Estándar para MapBiomas**:
  - Exportador a **GeoJSON FeatureCollection** estandarizado (RFC 7946) con atributos de física y química edáfica (`/api/v1/soil/export/geojson`).
  - Generador dinámico de scripts para **Google Earth Engine** (`/api/v1/soil/export/gee-script`), codificando las fórmulas Saxton-Rawls y Kamprath como expresiones matriciales de Earth Engine (`ee.Image.expression`).
- **Microfrontend / Widget Embebible (`/embed/soil-module`)**:
  - Vista ultraligera sin navegación global, con soporte de parámetros de tema (`?theme=dark|light`) y protocolo de comunicación bidireccional `window.postMessage` para interactuar con el mapa host de MapBiomas.
- **Estación de Trabajo Edafológica Renovada (`/dashboard/suelos`)**:
  - Reemplazo de la tabla simple por una interfaz tri-modal:
    1. *Explorador Territorial*: Mapa y perfiles con clasificación taxonómica regional.
    2. *Simulador Saxton-Rawls en Vivo*: Sliders de arena/arcilla/pH y gráfico vectorial interactivo de curva de retención hídrica pF (Saturación, Capacidad de Campo, PAW 50% y Marchitez Permanente).
    3. *Hub de Integración MapBiomas*: Descarga de GeoJSON/GEE y visor de snippets de código (cURL, Python, JS).

## Capabilities

### New Capabilities
- `mapbiomas-soil-module-federation`: Especifica la API pública geoespacial federada para consultas de punto (k-NN) y polígonos, cabeceras CORS, generador de scripts para Google Earth Engine y exportador de GeoJSON estandarizado.
- `embeddable-soil-widget`: Especifica el microfrontend embebible `/embed/soil-module` para integración mediante `iframe` o Web Component en portales de MapBiomas, con protocolo `postMessage`.
- `interactive-soil-simulator-ui`: Especifica la interfaz interactiva de la estación de trabajo de suelos en `/dashboard/suelos` con canvas de curvas de retención hídrica pF y sliders reactivos.

### Modified Capabilities
- `soils-and-recommendations-api`: Amplía las capacidades de exportación de datos edafológicos más allá de CSV plano, incorporando soporte para GeoJSON espacial y contratos de consulta enriquecidos.

## Impact

- **Código Afectado**:
  - Creación de rutas de API en `src/app/api/v1/soil/`.
  - Creación de ruta de widget embebible en `src/app/embed/soil-module/`.
  - Actualización de página `src/app/dashboard/suelos/page.tsx` y creación de componentes en `src/components/soils/`.
  - Módulos auxiliares en `src/lib/soil-module/` (indexación k-NN, plantillas GEE).
- **Dependencias**: Cero dependencias externas adicionales; algoritmos 100% nativos en TypeScript/SVG.
- **Rendimiento**: Respuestas de consulta de suelo en <20 ms mediante búsqueda en memoria / geocaché SQLite WAL.
- **Testing**: Nuevas suites de pruebas de frontend (Jest) y validación de tipos estricta (0 errores TypeScript).
