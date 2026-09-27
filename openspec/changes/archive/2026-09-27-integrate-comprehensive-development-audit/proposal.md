# Proposal: Integración de la Auditoría Integral de la Trayectoria y Ciclo de Desarrollo

## Why

Agrotech Venezuela ha completado un ciclo de desarrollo extraordinario, forjado de manera soberana por un desarrollador único (**Frank Sousa**) durante sus vacaciones de trabajo, invirtiendo incontables noches de desvelo, rigor de ingeniería, y rondas consecutivas de auditorías y pruebas de calidad. Esta trayectoria transformó una intuición urbana inicial en un ecosistema agroespacial soberano de madurez TRL 4 (292 pruebas automatizadas, 35 rutas en Next.js 16 App Router).

Para que el jurado evaluador del **Premio MapBiomas Venezuela 2026** pueda apreciar de manera inmediata y fehaciente la magnitud del trabajo invertido, las barreras superadas y la coherencia sistémica del proyecto, es indispensable integrar formalmente la **Línea de Tiempo y Matriz de Auditoría del Ciclo de Desarrollo en 5 Eras** tanto en el portal interactivo de postulación (`/dashboard/postulacion`) como en el memorando ejecutivo institucional (`MEMORANDO_POSTULACION.md`).

## What Changes

- **Integración Visual en el Portal de Postulación (`src/app/dashboard/postulacion/page.tsx`)**:
  - Incorporar una nueva sección destacada: *«Auditoría de la Trayectoria de Desarrollo: De la Cátedra Universitaria al Prototipo TRL 4»*.
  - Visualizar interactivamente las 5 grandes eras del desarrollo:
    1. *La Semilla Académica & Certificación MapBiomas*: Cátedra de edafología en la UNERG, dualidad de producción vegetal y pasturas/forrajes pecuarios, y acreditación con certificado oficial en el taller de MapBiomas (40 años).
    2. *El Choque Tropical & Soberanía Satelital*: Descarte de Google Maps ante la muralla de nubes tropicales (>75% en invierno), adopción de microondas Radar SAR Sentinel-1 Banda C (5.405 GHz) y WebGIS puro con Leaflet en React 19 (`useRef`).
    3. *Inclusión Rural Radical & Voz Campesina*: Arquitectura Dual-Mode UI, 4 compuertas táctiles gigantes (80px), dictado por voz nativo, parser vernáculo (sacos de 50 kg, tambores de 200 L, canecas de 20 L y tablones de 1.0 ha) y caché offline SQLite WAL (<25 ms).
    4. *Blindaje Científico, Maquinaria & Procedencia Legal*: Modelos Kamprath modificado, cal dolomítica Sur del Lago, yeso en Quíbor, curvas de retención hídrica Saxton-Rawls USDA, paquetes tri-modales para maquinaria (Shapefiles UTM 19N, KML drones, fichas analógicas) y marco legal internacional de procedencia (Copernicus, NASA, MapBiomas CC BY 4.0).
    5. *La Síntesis de Calidad TRL 4 & Forja en Antigravity*: Pair-programming riguroso con Gemini, tamiz crítico soberano del autor (filtrando, adaptando y podando sugerencias), 292 pruebas automatizadas (237 Jest + 55 Pytest, 100% PASS), 0 errores TypeScript y 35 rutas de producción.
- **Sincronización del Memorando Ejecutivo (`MEMORANDO_POSTULACION.md` y `public/docs/`)**:
  - Incorporar la síntesis de la auditoría de trayectoria y las 5 eras en el memorando oficial de postulación.
- **Sincronización de Especificaciones (`prize-publication-exporter`)**:
  - Actualizar el requisito `Up-to-Date Institutional Submission Dossier` para codificar la presencia obligatoria de la auditoría de trayectoria y las 5 eras evolutivas.
- **Validación Automatizada**:
  - Extender las pruebas en `__tests__/api/security-and-dossier.test.ts` para verificar la presencia de los términos de la auditoría de trayectoria en el memorando institucional, manteniendo la cuenta dorada de 292 pruebas automatizadas.

## Capabilities

### Modified Capabilities
- `prize-publication-exporter`: Se actualiza `Requirement: Up-to-Date Institutional Submission Dossier` para exigir la presentación visual y documental de la línea de tiempo auditada del ciclo de desarrollo en 5 eras y las métricas de esfuerzo y calidad de autor.

## Impact

- **Frontend / UI**: `src/app/dashboard/postulacion/page.tsx`.
- **Documentos de Postulación**: `MEMORANDO_POSTULACION.md` y `public/docs/MEMORANDO_POSTULACION.md`.
- **Especificaciones OpenSpec**: `openspec/specs/prize-publication-exporter/spec.md`.
- **Pruebas Automatizadas**: `__tests__/api/security-and-dossier.test.ts`, asegurando el 100% de éxito en la suite de 292 pruebas.
