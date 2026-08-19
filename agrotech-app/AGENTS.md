# AGENTS.md - Agrotech Venezuela Development Guidelines

Este repositorio contiene la plataforma **Agrotech Venezuela**, un sistema WebGIS de agricultura de precisión, edafología y zonificación de cultivos inspirado en **MapBiomas Venezuela**.

## Arquitectura de la Aplicación
- **Framework**: Next.js 16 (App Router con Turbopack), React 19.
- **ORM / BD**: Prisma ORM con PostgreSQL.
- **Geoespacial / WebGIS**: Leaflet / React-Leaflet con carga dinámica sin SSR (`ssr: false`), cálculo geodésico de áreas en hectáreas (Shoelace) y soporte GeoJSON.
- **Módulos de Datos**:
  - `src/lib/geo/venezuelaData.ts`: Metadatos territoriales, estadísticas MapBiomas de cobertura por estado y muestras GPS.
  - `src/lib/geo/venezuelaGeoJson.ts`: FeatureCollection vectorial de estados y regiones de Venezuela.
  - `src/lib/geo/spatialUtils.ts`: Motor de cálculo espacial (Shoelace, Haversine, AHP de idoneidad y calculadora de enmiendas/encalado).
  - `src/app/api/geo/route.ts`: Endpoint REST para capas vectoriales GeoJSON.

## Guía de Pruebas y Validación
- Ejecutar tests: `npm test`
- Validar tipos: `npx tsc --noEmit`
- Compilación de producción: `npm run build`

## Convenciones de Estilos y UX
- Glassmorphism con variables CSS definidas en `src/app/globals.css`.
- Compatible con esquemas claro y oscuro (`@media (prefers-color-scheme: dark)`).
- Componentes modulares con CSS Modules (`*.module.css`).
