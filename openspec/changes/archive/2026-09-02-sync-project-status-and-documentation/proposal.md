## Why

El proyecto ha alcanzado un estado de madurez superior (140 pruebas automatizadas, 26 rutas Next.js limpias, Tour Demostrativo interactivo de 4 pasos, navegación universal BackButton y plantilla de despliegue en producción), pero varios documentos esenciales y vistas internas (`PITCH_DECK.md`, `README.md`, `AGENTS.md`, `/dashboard/postulacion` y memorandos de postulación) aún muestran métricas preliminares o desactualizadas (ej. conteos de 63 tests en lugar de 140, o 25 rutas en lugar de 26). Es imperativo sincronizar todas las referencias documentales y explicaciones dentro del sistema para presentar un proyecto coherente, auditado y veraz ante jurados, evaluadores de Google AI Studio y despliegues en producción.

## What Changes

- **Sincronización de Métricas de Calidad de Código:**
  - Actualizar `PITCH_DECK.md` para reflejar la cifra real de **140 pruebas automatizadas aprobadas (89 Jest + 51 Pytest)**, 26 rutas Next.js limpias y 0 errores TypeScript.
  - Actualizar `src/app/dashboard/postulacion/page.tsx` para elevar la insignia visual de testing a **140 Tests Automatizados (89 Jest + 51 Pytest)** y añadir referencia al **Tour Demo Interactivo**.
  - Actualizar `AGENTS.md` para fijar la meta de compilación en **26 rutas limpias** (en lugar de 25).
- **Actualización de Módulos e Innovaciones en `README.md`:**
  - Incorporar la documentación del **Tour Demostrativo Guiado (`DemoTourModal`)**, **Navegación Universal de Retorno (`BackButton`)**, **Deep-Linking de Parcelas hacia Gemini** y la plantilla `.env.production.example`.
- **Sincronización de Expediente y Memorando de Postulación:**
  - Actualizar `docs/MEMORANDO_POSTULACION.md` y `docs/mapbiomas_premio_2026/POSTULACION_EXPEDIENTE_PREMIO_2026.md` con las estadísticas vigentes y la arquitectura de microservicios robustecida.
- **Auditoría Técnica Integral:**
  - Verificación rigurosa mediante `npx tsc --noEmit`, suite Jest (`npm test`) y compilación limpia con Turbopack (`npm run build`).

## Capabilities

### New Capabilities
- `system-status-synchronization`: Sincronización continua de métricas operativas (140 tests automatizados, 26 rutas Next.js limpias, TRL 7 operativo y badges dinámicos) en documentación externa y vistas internas del sistema.

### Modified Capabilities
- `prize-publication-exporter`: Actualización de métricas de calidad y capacidades tecnológicas verificadas en los dossiers y fichas de postulación.

## Impact

- `PITCH_DECK.md`: Actualización de métricas, guión de 3 minutos y stack tecnológico.
- `README.md`: Adición de nuevos módulos de navegación, tour y configuración de producción.
- `AGENTS.md`: Actualización de rutas en las pautas de testing.
- `src/app/dashboard/postulacion/page.tsx`: Actualización de insignias y guía de evaluación.
- `docs/MEMORANDO_POSTULACION.md`: Consolidación del estatus TRL 7 y 140 tests.
