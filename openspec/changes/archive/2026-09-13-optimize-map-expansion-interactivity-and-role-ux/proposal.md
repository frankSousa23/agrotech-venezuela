## Why

El visor cartográfico WebGIS de Agrotech Venezuela presenta dos problemas críticos de usabilidad detectados en auditoría:
1. **Recorte espacial del mapa**: El mapa aparece restringido o "recortado a la mitad" de su expansión natural en pantallas anchas y móviles debido a un confinamiento geográfico excesivamente rígido (`maxBounds` estricto con `maxBoundsViscosity: 1.0`), lo cual bloquea el panning, genera márgenes vacíos y no aprovecha la altura y ancho completos del contenedor.
2. **Botones de interactividad sin respuesta visual**: Varios botones de control no reflejan cambios en el mapa (por ejemplo, el botón "Modo Oscuro" en teselas carga teselas claras estándar de OSM en vez de CartoDB Dark, y en Nivel 3 de micro-parcela los cambios de capa de pH y lluvias no proyectan información edafoclimática al haber desaparecido los polígonos estadales/municipales).
3. **Falta de ergonomía adaptable por roles**: El panel flotante de controles en Nivel 3 obstruye el lienzo táctil en dispositivos móviles sin opción de colapsar, y la interfaz requiere una experiencia de uso fluida y adaptada para cada rol (`FARMER`, `TECH`, `AUDITOR`, `ADMIN`, `GUEST`).

Esta propuesta optimiza la expansión espacial del mapa, corrige la interactividad de todos los botones de capa/navegación, y añade herramientas ergonómicas de vanguardia (colapso de panel flotante, pantalla completa, geolocalización GPS y adaptabilidad por roles).

## What Changes

- **Eliminación del recorte espacial y suavizado de límites (Cushioned Viewport)**:
  - Flexibilizar el confinamiento territorial en `LeafletMapInner.tsx` y `VenezuelaStateMapInner.tsx` (reemplazar `maxBoundsViscosity: 1.0` por `0.55` y ampliar el bounding box con zona de amortiguamiento marítimo-fronterizo `[-1.0, -76.0]` a `[16.0, -57.0]`).
  - Optimizar el contenedor CSS de mapa en `/dashboard/mapa` y `MultiLevelMapViewer` para adoptar un dimensionamiento adaptativo (`height: 75vh; min-height: 680px; width: 100%`) con llamadas reactivas inmediatas a `map.invalidateSize()`.
- **Corrección de interactividad de botones y teselas temáticas**:
  - Implementar teselas reales en "Modo Oscuro" usando el proveedor CartoDB Dark Matter (`https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png`) en lugar de OpenStreetMap estándar.
  - Habilitar en Nivel 3 (Micro-Parcela) la proyección contextual de datos al cambiar capas: cuando el usuario selecciona "Semáforo pH", "Lluvias NASA" o "MapBiomas", el mapa renderiza un halo temático alrededor de la parcela o actualiza un badge informativo flotante en tiempo real con los valores edafoclimáticos del lote.
- **Herramientas de ergonomía cartográfica avanzada**:
  - **Panel Colapsable en `MultiLevelMapViewer`**: Botón de minimizar/desplegar (`[◀ Ocultar Panel]` / `[▶ Controles]`) para dejar el mapa 100% libre para dibujo táctil, especialmente crucial en pantallas móviles.
  - **Botón de Pantalla Completa (`[⛶ Fullscreen]`)**: Permite expandir el visor a pantalla completa en tablets y laptops de campo.
  - **Botón de Geolocalización GPS (`[📍 Ubicar mi Finca]`)**: Centra la vista satelital directamente en la posición GPS actual del productor mediante la API nativa `navigator.geolocation`.
- **Adaptabilidad y usabilidad fluida por roles (`FARMER`, `TECH`, `AUDITOR`, `GUEST`)**:
  - Para `FARMER`: Acceso prioritario al trazado simplificado de 1 clic ("Tablón Auto"), glosario vernáculo y compuertas directas.
  - Para `TECH`: Acceso total a radar SAR, capas de penetración de nubes, calculadora Kamprath y exportación de prescripciones VRA.
  - Para `AUDITOR` / `JURY`: Acceso rápido a las métricas del sistema (252 tests, TRL 4), certificación de licencias y visor Swagger `/api-docs`.
  - Para `GUEST`: Persistencia de fincas demostrativas sin pérdida de sesión ni bloqueos de navegación.

## Capabilities

### Modified Capabilities
- `unified-webgis-pyramid-and-responsive-ergonomics`: Requisitos de confinamiento elástico WGS84, contenedor auto-expandible a 75vh sin recorte, teselas reales de Modo Oscuro CartoDB, proyección temática en Nivel 3, controles de colapso de panel y pantalla completa.
- `user-roles-and-permissions`: Requisitos de fluidez de interfaz y presentación ergonómica diferenciada en los mapas según el rol autenticado (`FARMER`, `TECH`, `AUDITOR`, `ADMIN`, `GUEST`).

## Impact

- **Componentes Afectados**:
  - `src/components/gis/LeafletMapInner.tsx` (proveedor de teselas Dark, `maxBoundsViscosity`, GPS, Fullscreen).
  - `src/components/gis/MultiLevelMapViewer.tsx` (toggle de colapso, overlays temáticos Nivel 3, Fullscreen).
  - `src/components/gis/VenezuelaStateMapInner.tsx` (suavizado de límites y teselas).
  - `src/app/dashboard/mapa/page.module.css` (dimensionamiento responsivo 75vh).
- **APIs y Microservicios**:
  - No altera contratos de endpoints REST existentes; 100% compatible hacia atrás.
- **Suites de Pruebas**:
  - Se ampliarán las pruebas de `map-viewer.test.ts`, `native-gis-lifecycle.test.ts` y `unifiedMapAndIoTLab.test.ts`.
