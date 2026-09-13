## Context

Véase `proposal.md` para la justificación general. El sistema actual cuenta con componentes especializados pero segmentados:
1. `MicrocropIoTLab.tsx`: Funciona de manera aislada con 5 pestañas, pero carece de un historiador temporal dinámico y micro-animaciones de flujo de agua.
2. `MultiLevelMapViewer.tsx` y `VenezuelaStateMapViewer.tsx`: Conviven como dos modos separados mediante botones superiores en `/dashboard/mapa`, lo cual fragmenta la experiencia de usuario.
3. `ParcelDiagnosticModal.tsx`: Presenta análisis multitemporal sin vista previa del contorno poligonal dibujado.

## Goals / Non-Goals

**Goals:**
- **Laboratorio IoT**: Dotar al sandbox experimental de animaciones de flujo en SVG, caudalímetro simulado, historiador de 24 horas y disparadores de estresores en 1 clic.
- **WebGIS Unificado**: Integrar los polígonos GeoJSON de los 24 estados en el Nivel 1 de `MultiLevelMapViewer`, permitiendo zoom fluido y navegación por breadcrumbs continuos (`Venezuela ──► Estado ──► Municipio ──► Parcela`).
- **Mini-Mapa en Modal de Parcela**: Incorporar un mini-visor con el contorno de la parcela delimitada en `ParcelDiagnosticModal.tsx`.
- **Ergonomía Táctil y Responsive**: Prevenir trampas de scroll en teléfonos móviles con `touch-action: pan-y` y márgenes laterales accesibles.

**Non-Goals:**
- No se comercializa ni exige hardware físico obligatorio (se preserva la filosofía BYOD y la autonomía satelital 100% de la plataforma).
- No se reemplaza Leaflet nativo por react-leaflet (se mantiene la directriz arquitectónica de `L.map` controlado por `useRef` con dynamic import `ssr: false`).
- No se altera la estructura de la base de datos ni los endpoints REST existentes.

## Decisions

### Decisión 1: Historiador 24h Mediante SVG / Canvas Ligero en el Laboratorio IoT
- **Elección**: Renderizar la curva de oscilación diurna de humedad y los pulsos de riego directamente en un gráfico SVG reactivo dentro de la pestaña de Telemetría.
- **Alternativas consideradas**:
  - *Librería externa pesada (Chart.js / Recharts)*: Añadiría peso innecesario al bundle de producción en Next.js.
  - *SVG nativo*: Latencia de renderizado < 5ms, altamente personalizable con temas oscuros y alto contraste solar.

### Decisión 2: Unificación de la Pirámide Cartográfica en `MultiLevelMapViewer`
- **Elección**: Eliminar el selector de modo `"state" vs "multilevel"` en `/dashboard/mapa`. El Nivel 1 Nacional renderiza directamente las capas vectoriales GeoJSON de los 24 estados provenientes de `venezuelaGeoJson.ts`. Al tocar un estado, se ejecuta un zoom animado (`flyTo`) al centroide y se despliega el Nivel 2 Municipal.
- **Alternativas consideradas**:
  - *Mantener pestañas separadas*: Confunde al productor y evaluador al presentar dos visores distintos para el mismo territorio.

### Decisión 3: Mini-Mapa Vectorial en `ParcelDiagnosticModal`
- **Elección**: Dibujar el polígono de coordenadas de la parcela (`parcel.coordinates`) con un canvas/SVG vectorial centrado en el modal overview o mediante un mini-contenedor Leaflet simplificado, mostrando el cálculo de Shoelace (ha).
- **Razón**: Permite al productor confirmar visualmente que el diagnóstico de acidez, trayectoria MapBiomas y NASA POWER corresponde exactamente al lote georreferenciado.

## Risks / Trade-offs

- **[Riesgo] Invalidación de tamaño de contenedor Leaflet al redimensionar en móviles** → **Mitigación**: Usar `MapResizeSynchronizer` que dispara `map.invalidateSize()` tras cambios de orientación o apertura de paneles.
- **[Riesgo] Sobrecarga de eventos de arrastre táctil (Scroll-Trap)** → **Mitigación**: Configurar `dragging: !L.Browser.mobile` o mantener padding táctil perimetral para navegación vertical fluida de la página.
