## Why

Tras la incorporación del Laboratorio Agro-IoT de Micro-Cultivo y Riego Predictivo (`/dashboard/iot`), el proyecto ha avanzado a una cota técnica superior: 144 pruebas automatizadas (93 Jest + 51 Pytest), 27 rutas de producción en Next.js 16 Turbopack y un ecosistema que cubre desde el nivel satelital macro hasta el hardware in-situ con microcontroladores ESP32. Sin embargo, la documentación (`README.md`, `PITCH_DECK.md`, `MEMORANDO_POSTULACION.md`, `AGENTS.md`), los badges de la ficha de postulación (`/dashboard/postulacion`), el Tour Demostrativo (`DemoTourModal.tsx`) y el estudio arquitectónico (`DataflowDiagramStudio.tsx`) aún conservan referencias al estado anterior (140 tests, 26 rutas, 4 pasos y 11 módulos). Es necesario sincronizar integralmente todos los puntos del sistema para que reflejen con veracidad y coherencia el estado actual del repositorio.

## What Changes

- **Actualización de Métricas de Calidad y Testing**:
  - Unificar en `README.md`, `PITCH_DECK.md`, `AGENTS.md`, `MEMORANDO_POSTULACION.md` y `/dashboard/postulacion` la métrica verificada de **144 pruebas automatizadas (93 Jest + 51 Pytest, 100% pasando)** y **27 rutas de producción limpias** en Next.js Turbopack.
- **Incorporación del Módulo 12 en la Documentación**:
  - Documentar en `README.md` y `PITCH_DECK.md` el **Módulo 12: Laboratorio Agro-IoT de Micro-Cultivo & Riego Predictivo** (corte transversal SVG animado, 3 presets agronómicos, supresión inteligente acoplada a NASA POWER, esquemas de hardware ESP32 y código Arduino C++).
- **Extensión del Tour Demostrativo Guiado a 5 Pasos**:
  - En `DemoTourModal.tsx`, expandir el recorrido interactivo de 4 a 5 pasos incorporando el paso 4 dedicado al Laboratorio Agro-IoT y hardware in-situ, actualizando las insignias correspondientes en `/dashboard/postulacion`.
- **Actualización del Diagrama de Arquitectura E2E**:
  - En `DataflowDiagramStudio.tsx` (`/dashboard/arquitectura`), integrar el nodo cliente del Laboratorio Agro-IoT y el flujo de telemetría hacia FastAPI (`/api/v1/iot/telemetry`).

## Capabilities

### Modified Capabilities
- `system-status-synchronization`: Sincronización continua de métricas operativas (144 tests automatizados pasando: 93 Jest + 51 Pytest, 27 rutas Next.js limpias, Módulo 12 Agro-IoT y badges interactivos).
- `guided-demo-tour`: Extensión del Tour Demostrativo a 5 pasos integrando el paso interactivo del Laboratorio Agro-IoT de Micro-Cultivo (`/dashboard/iot`).

## Impact

- Archivos de documentación: `README.md`, `PITCH_DECK.md`, `AGENTS.md`, `docs/MEMORANDO_POSTULACION.md`.
- Vistas frontend: `src/app/dashboard/postulacion/page.tsx`, `src/components/layout/DemoTourModal.tsx`, `src/components/diagrams/DataflowDiagramStudio.tsx`.
- Especificaciones: `openspec/specs/system-status-synchronization/spec.md`, `openspec/specs/guided-demo-tour/spec.md`, `openspec/specs/prize-publication-exporter/spec.md`.
- Verificación: `npx tsc --noEmit` (0 errores), `npm test` (93 tests Jest) y `npm run build` (27 rutas limpias).
