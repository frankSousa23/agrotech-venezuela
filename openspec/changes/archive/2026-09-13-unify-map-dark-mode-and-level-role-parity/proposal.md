## Why

El modo oscuro en el mapa principal mostraba una marca de agua diagonal repetida que indicaba `API KEY REQUIRED carto.com/basemaps/apikey` debido a cambios recientes en la política de acceso de CartoDB. Asimismo, otros visores de la plataforma como `MapBiomasViewer.tsx` (en `/dashboard`) y `VenezuelaStateMapViewer.tsx` carecían por completo del botón de modo oscuro y de paridad en la navegación de niveles y controles por rol. Este cambio resuelve de forma definitiva cualquier dependencia de claves privadas adoptando un proveedor público, abierto y de alto rendimiento (Esri World Dark Gray Canvas HD) y unificando la botonera e interactividad de niveles y roles en todos los visores.

## What Changes

- **Sustitución Definitiva de Teselas de Modo Oscuro**: Reemplazar las URLs de CartoDB con marca de agua por **Esri World Dark Gray Canvas HD** (`https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}`) en todos los visores WebGIS de Next.js y en las utilidades Folium de Streamlit (`viz_utils.py`), garantizando mapas oscuros 100% limpios, sin marcas y con cero API keys.
- **Paridad de Botones en Visores Secundarios**: Incorporar el botón `Modo Oscuro` y la navegación jerárquica en `MapBiomasViewer.tsx` (`/dashboard`) y `VenezuelaStateMapViewer.tsx`.
- **Sincronización Reactiva con el Tema Global**: Permitir que los visores satelitales armonicen automáticamente con el interruptor global de contraste (`SunlightThemeToggle.tsx`).
- **Coherencia y Ergonomía por Rol en Todos los Mapas**: Garantizar que la botonera táctil para productores (`FARMER`), herramientas de telemetría para ingenieros (`TECH`), y credenciales para jurado/auditor (`AUDITOR`) estén disponibles y sincronizadas en toda la plataforma.

## Capabilities

### Modified Capabilities
- `unified-webgis-pyramid-and-responsive-ergonomics`: Actualiza los requerimientos de mapas base oscuros para prohibir dependencias de API key y exigir teselas limpias Esri Dark Gray Canvas HD con paridad completa de controles por nivel.
- `watermark-free-map-tiles`: Extiende la política estricta de cero marcas de agua a todos los mapas del ecosistema (Leaflet nativo, visores embebidos y Folium).
- `user-roles-and-permissions`: Refuerza la disponibilidad de acciones y herramientas cartográficas según el rol activo en todos los mapas del sistema.

## Impact

- **Componentes Frontend Afectados**: `src/components/gis/LeafletMapInner.tsx`, `src/components/gis/VenezuelaStateMapInner.tsx`, `src/components/gis/MapBiomasViewer.tsx`, `src/components/gis/VenezuelaStateMapViewer.tsx`, `src/components/gis/MultiLevelMapViewer.tsx`.
- **Backend Espacial**: `backend/src/viz_utils.py` (Streamlit Folium).
- **Dependencias**: Ninguna nueva dependencia requerida (100% nativo con Leaflet y URLs públicas de ArcGIS Online).
- **Pruebas y Validación**: Actualización de suites de prueba de mapas para validar las nuevas rutas de teselas oscuras y la paridad de controles.
