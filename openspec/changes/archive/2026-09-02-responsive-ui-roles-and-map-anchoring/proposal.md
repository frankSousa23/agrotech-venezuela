## Why

El usuario requiere una optimización completa de la experiencia visual y operativa del sistema: asegurar que la interfaz responda con fluidez en pantallas móviles, tablets y monitores de escritorio; garantizar la accesibilidad incondicional del botón de cierre de sesión en todos los contextos; anclar permanentemente la cartografía satelital a las coordenadas geográficas de Venezuela impidiendo que el visor se desplace fuera del territorio nacional; y blindar las rutas protegidas para los distintos roles (FARMER, AGRONOMIST, ADMIN, GUEST) con transiciones limpias.

## What Changes

- **Anclaje Cartográfico Territorial WGS84:** Configuración de `maxBounds` estricto `[[0.6, -73.4], [12.5, -59.8]]`, `maxBoundsViscosity: 1.0` y `minZoom: 4.8` en los visores Leaflet (`VenezuelaStateMapInner.tsx` y `LeafletMapInner.tsx`), asegurando que la cámara se centre en Venezuela y nunca derive al océano o repita el mapa mundial en móviles.
- **Leyenda Dinámica Adaptativa:** Optimización responsive de `MapLayerLegendOverlay.tsx` para colapsar en formato acordeón compacto flotante en móviles (< 768px), sin obstruir la vista satelital ni superponer controles.
- **Ergonomía Móvil y Limpieza de Layout:** Ocultar en dispositivos móviles la barra de herramientas de escritorio duplicada; colocar el botón de Cerrar Sesión y el Toggle de Modo Sol directamente en la barra móvil fija y de forma fija (sticky) al pie del sidebar drawer.
- **Blindaje de Roles y Permisos:** Protección de ruta en `/dashboard/admin` (fallback con aviso visual si el rol no es `ADMIN`); adición de un selector rápido de perfiles demostrativos en el avatar del usuario para pruebas ágiles de roles (`FARMER`, `AGRONOMIST`, `ADMIN`, `GUEST`).

## Capabilities

### New Capabilities
- `user-roles-and-permissions`: Definición de controles de acceso basados en roles en vistas del dashboard, guardas de rutas administrativas y selector rápido de roles para pruebas operativas.

### Modified Capabilities
- `venezuela-map-viewer`: Incorporación de límites espaciales estrictos (`maxBounds`), viscosidad de rebote y zoom responsivo para garantizar el anclaje soberano en Venezuela.
- `mobile-touch-ergonomics`: Adaptación integral del layout, sidebar drawer, botones de salida móviles y eliminación de elementos redundantes en pantallas pequeñas.

## Impact

- `src/components/gis/VenezuelaStateMapInner.tsx`: Configuración de límites espaciales y zoom adaptable.
- `src/components/gis/LeafletMapInner.tsx`: Restricción de navegación fuera del polígono nacional.
- `src/components/gis/MapLayerLegendOverlay.tsx`: Adaptabilidad móvil colapsable.
- `src/app/dashboard/layout.tsx` y `layout.module.css`: Optimización de barras y posicionamiento de salida.
- `src/app/dashboard/admin/page.tsx`: Guarda de acceso según rol `ADMIN`.
- Cero impacto negativo en APIs de backend ni base de datos PostgreSQL.
