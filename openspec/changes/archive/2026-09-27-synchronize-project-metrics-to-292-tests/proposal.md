# Proposal: Sincronización Exhaustiva de Métricas de Calidad a 292 Pruebas Automatizadas

## Why

El ecosistema Agrotech Venezuela ha incorporado recientemente dos nuevas pruebas automatizadas que blindan la gobernanza legal, licencias y proveniencia de datos espaciales (una en Jest para integridad del marco legal canónico en `__tests__/api/security-and-dossier.test.ts` y otra en Pytest para validación de metadatos OpenAPI y licencias en `backend/tests/test_api_endpoints.py`), elevando la suite completa de 290 a **292 pruebas automatizadas passing (237 Jest en 33 suites + 55 Pytest en 17 módulos)** con 0 errores de tipado TypeScript y 35 rutas de producción limpias.

Diversas superficies del sistema (interfaces de usuario, tarjetas de auditoría, badges, memorandos institucionales de postulación, artículo técnico, diapositivas del pitch deck y guías del evaluador) todavía referencian la cifra anterior de 290 pruebas (o cifras previas). Para mantener una rigurosidad científica absoluta, consistencia métrica inquebrantable y credibilidad ante el jurado del Premio MapBiomas Venezuela 2026, es imperativo sincronizar todas las referencias métricas y aserciones de prueba a la cifra verificada de 292 pruebas.

## What Changes

- **Sincronización en Interfaces de Usuario (UI)**:
  - Actualizar badges y tarjetas de verificación en `/dashboard/postulacion` (`src/app/dashboard/postulacion/page.tsx`) de `290 Tests` (236 Jest + 54 Pytest) a `292 Tests Automatizados Pasando (237 Jest + 55 Pytest)`.
  - Actualizar el tour interactivo guiado (`src/components/layout/DemoTourModal.tsx`) para reportar 292 pruebas automatizadas.
  - Actualizar el visor GIS multinivel (`src/components/gis/MultiLevelMapViewer.tsx`) para reportar 292 pruebas verificadas.
  - Actualizar el estudio de diagramas de flujo (`src/components/diagrams/DataflowDiagramStudio.tsx`) en `/dashboard/arquitectura` para reflejar 292 pruebas automatizadas en las especificaciones de auditoría.
- **Sincronización en Expediente Canónico y Documentación (`docs/`, `public/docs/`, `docs/mapbiomas_premio_2026/`)**:
  - Actualizar `MEMORANDO_POSTULACION.md` en todas sus ubicaciones para sincronizar la métrica a 292 pruebas automatizadas (237 Jest + 55 Pytest).
  - Actualizar `ARTICULO_TECNICO_DRAFT.md` y `PITCH_DECK.md` para reflejar la suite de 292 pruebas.
  - Actualizar `MATRIZ_CUMPLIMIENTO_EVALUACION.md`, `DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md` y `SHOWCASE.md`.
  - Actualizar el compilador y generador PDF `scripts/generate_prize_pdf.py`.
- **Sincronización en Pautas y Gobernanza de Repositorio**:
  - Actualizar el badge principal y el desglose de pruebas en `README.md` (`Tests-292%20Passing`, 237 Jest + 55 Pytest).
  - Sincronizar pautas de arquitectura en `AGENTS.md` y `DEVELOPING.md`.
- **Sincronización de Aserciones de Pruebas**:
  - Actualizar la aserción en `__tests__/api/security-and-dossier.test.ts` (línea 170) para verificar `'292 pruebas automatizadas'` en sincronía con el memorando.

## Capabilities

### New Capabilities
None.

### Modified Capabilities
- `system-status-synchronization`: Actualizar los requerimientos para fijar la métrica verificada en 292 pruebas automatizadas (237 Jest + 55 Pytest across 33 test suites and 17 backend modules), manteniendo la consistencia en todas las superficies UI, documentación de postulación y diagramas de flujo.
- `prize-publication-exporter`: Actualizar los requerimientos de sincronización del dossier de postulación y compilación técnica para reflejar las 292 pruebas automatizadas actuales.

## Impact

- **Código y UI afectada**: `src/app/dashboard/postulacion/page.tsx`, `src/components/layout/DemoTourModal.tsx`, `src/components/gis/MultiLevelMapViewer.tsx`, `src/components/diagrams/DataflowDiagramStudio.tsx`.
- **Documentación y expedientes**: Archivos markdown en `docs/`, `public/docs/`, `docs/mapbiomas_premio_2026/`, `README.md`, `DEVELOPING.md`, `AGENTS.md`.
- **Scripts y pruebas**: `scripts/generate_prize_pdf.py`, `__tests__/api/security-and-dossier.test.ts`.
- **Compatibilidad**: Sin cambios que rompan compatibilidad (non-breaking change); puramente una sincronización métrica exhaustiva y armónica.
