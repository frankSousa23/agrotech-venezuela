# Tasks: Módulo de Suelos de MapBiomas Venezuela

## 1. Motor de Indexación Espacial y Utilidades

- [x] 1.1 Implementar `src/lib/soil-module/spatialSoilIndex.ts` con búsqueda k-NN, Bounding Box filter, Haversine geodésico e interpolación IDW. Verificar con pruebas unitarias.
- [x] 1.2 Implementar `src/lib/soil-module/geeTemplateGenerator.ts` para generar el script modular `mapbiomas_soil_engine.js` para Google Earth Engine.

## 2. API Geoespacial Federada y Exportación

- [x] 2.1 Implementar endpoint `GET /api/v1/soil/point/route.ts` con resolución de coordenadas, estimación Saxton-Rawls, enmienda Kamprath y cabeceras CORS.
- [x] 2.2 Implementar endpoint `POST /api/v1/soil/intersect/route.ts` para análisis zonal agregado a partir de polígonos GeoJSON (área, pH ponderado, toneladas de cal/yeso y volumen de agua en m³).
- [x] 2.3 Implementar endpoint `GET /api/v1/soil/export/geojson/route.ts` y extender `/api/export/stats?format=geojson` con FeatureCollection RFC 7946.
- [x] 2.4 Implementar endpoint `GET /api/v1/soil/export/gee-script/route.ts` con entrega de archivo JavaScript ejecutable para Earth Engine.

## 3. Microfrontend Embebible para MapBiomas

- [x] 3.1 Implementar `src/app/embed/soil-module/page.tsx` como vista aislada sin shell, con soporte de parámetros `lat`, `lon`, `theme` y protocolo bidireccional `window.postMessage`.
- [x] 3.2 Añadir componente de tarjeta diagnóstica compacta y estilos adaptativos glassmorphism para integración en iframe.

## 4. Estación de Trabajo Edafológica en `/dashboard/suelos`

- [x] 4.1 Implementar componente `src/components/soils/SoilRetentionCurveCanvas.tsx` para trazado SVG reactivo de la curva pF van Genuchten / Saxton-Rawls (Saturación, Capacidad de Campo, PAW 50% y Marchitez Permanente).
- [x] 4.2 Implementar componente `src/components/soils/SoilSimulationSliders.tsx` (arena, arcilla, pH, aluminio) y `src/components/soils/MapBiomasExportHub.tsx` (descargas y snippets de código cURL/Python/JS).
- [x] 4.3 Actualizar `src/app/dashboard/suelos/page.tsx` con navegación tri-modal interactiva en pestañas.

## 5. Pruebas y Verificación del Sistema

- [x] 5.1 Crear suite de pruebas de integración `__tests__/api/soil-federated-module.test.ts` verificando endpoints `/api/v1/soil/*`, exportaciones y widget embebible.
- [x] 5.2 Ejecutar `npm run typecheck`, `npm test` y verificar cero errores y cero regresiones en la suite completa de pruebas.

## Workflow follow-up

- Sincronizar especificaciones con `openspec sync`.
- Archivar el cambio con `openspec archive`.
