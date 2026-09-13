## 1. Migración de Teselas de Modo Oscuro (Sin Watermarks ni Claves)

- [x] 1.1 Actualizar el proveedor de teselas para modo oscuro en `src/components/gis/LeafletMapInner.tsx` reemplazando CartoDB por Esri World Dark Gray Canvas HD (`https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}`), verificando carga HTTP 200 sin marcas de agua.
- [x] 1.2 Actualizar el proveedor de teselas para modo oscuro en `src/components/gis/VenezuelaStateMapInner.tsx` con Esri World Dark Gray Canvas HD, verificando la renderización sin marcas ni tokens.
- [x] 1.3 Actualizar el mapa Folium en `backend/src/viz_utils.py` para usar Esri World Dark Gray Canvas HD en lugar de CartoDB dark_matter, verificando la inicialización limpia en Streamlit.

## 2. Paridad de Botonera y Controles en Visores Secundarios

- [x] 2.1 Agregar el botón y control interactivo de Modo Oscuro (`btn_layer_dark`) en `src/components/gis/MapBiomasViewer.tsx` (`/dashboard`), verificando que al hacer clic se conmute fluidamente entre satélite, topográfico y oscuro.
- [x] 2.2 Sincronizar el estado de capa activa y controles por nivel en `src/components/gis/VenezuelaStateMapViewer.tsx`, verificando la conmutación de capas y respuesta táctil.
- [x] 2.3 Sincronizar reactivamente el modo oscuro de los mapas con el tema global (`SunlightThemeToggle.tsx`), verificando que la alternancia de tema actualice el mapa sin re-montajes destructivos de Leaflet.

## 3. Ergonomía y Paridad por Rol

- [x] 3.1 Unificar la presentación de botones y badges de nivel para roles `FARMER`, `TECH`, `AUDITOR` y `GUEST` en todos los visores de mapas, verificando visualmente que los objetivos táctiles se mantengan `>= 44px` en modo fácil y la telemetría se exponga en modo técnico.

## 4. Validación Automatizada y Testing

- [x] 4.1 Actualizar las pruebas unitarias y de integración de mapas (`src/__tests__/unifiedWebGIS.test.tsx` y suites afines) para validar el endpoint de Esri Dark Gray Canvas y los nuevos botones de modo oscuro, verificando que `npm test` pase al 100%.
- [x] 4.2 Ejecutar la verificación completa de tipos (`npm run typecheck`) y pruebas de backend (`npm run test:backend`), verificando 0 errores de compilación y 54/54 tests de Python pasando.
- [x] 4.3 Ejecutar la suite unificada (`npm run test:all`) y verificar que todos los 255 tests pasen con éxito total.
