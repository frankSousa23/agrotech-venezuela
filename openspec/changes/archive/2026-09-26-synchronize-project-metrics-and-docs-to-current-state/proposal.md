# Proposal: Sincronizar Métricas y Documentación al Estado Real del Proyecto

## Why

Tras las recientes expansiones del sistema —que introdujeron la Paleta de Comandos Global `Ctrl+K` desacoplada con React Portal a `document.body`, los endpoints REST edafológicos y de recomendaciones (`/api/soils`, `/api/recomendaciones`, `/api/export/stats`), y el manejador 404 institucional en `src/app/not-found.tsx`— la suite de pruebas automatizadas aumentó a **290 tests (236 Jest en 33 suites + 54 Pytest en 17 módulos)** y el catálogo de rutas de producción Next.js 16 Turbopack creció a **35 rutas**. 

Sin embargo, múltiples documentos clave, insignias, diagramas arquitectónicos, scripts de resumen y componentes de interfaz aún declaran las métricas anteriores (278 tests, 224 Jest, 32 rutas). Para garantizar la integridad técnica y la credibilidad institucional ante los evaluadores del Premio MapBiomas Venezuela 2026, es mandatorio unificar y sincronizar todas las referencias al estado real verificado.

## What Changes

- **Sincronización de Métricas de Calidad de Software**:
  - Actualizar todas las menciones de tests automatizados a **290 tests pasando (236 Jest + 54 Pytest, 100% OK)**.
  - Actualizar el desglose de pruebas Jest en 33 suites (+12 tests añadidos en `soils.test.ts`, `recomendaciones.test.ts`, `command-palette-and-search.test.ts`, `routing-and-redirects.test.ts`, `roiCostEngine.test.ts` e `ImpactRoiWidget.test.ts`).
  - Actualizar el conteo de rutas de producción Next.js 16 Turbopack de 32 a **35 rutas de producción** (19 dinámicas/API + 16 estáticas/páginas).
- **Actualización de Scripts de Auditoría y Verificación**:
  - Actualizar `scripts/test_summary.js` con los conteos exactos por suite, el total consolidado de 290 tests y 35 rutas.
  - Actualizar `scripts/generate_prize_pdf.py` a 290 tests automatizados.
- **Sincronización de Aserciones en Tests**:
  - Actualizar `__tests__/api/security-and-dossier.test.ts` (líneas 170-171) para verificar `'290 pruebas automatizadas'` y `'35 rutas'` en `MEMORANDO_POSTULACION.md`.
- **Actualización de Componentes e Interfaces en Pantalla**:
  - Actualizar insignias de cabecera y tarjetas en `src/app/dashboard/postulacion/page.tsx` (290 tests).
  - Actualizar paso 5 de validación en `src/components/layout/DemoTourModal.tsx` (290 tests, 236 Jest + 54 Pytest).
  - Actualizar banner de auditor/jurado en `src/components/gis/MultiLevelMapViewer.tsx` (290 tests).
  - Actualizar ficha de certificación de calidad en `src/components/diagrams/DataflowDiagramStudio.tsx` (290 tests, 35 rutas).
- **Actualización de Expedientes Institucionales y Guías de Desarrollo**:
  - Actualizar `AGENTS.md`, `README.md`, `DEVELOPING.md` y `AUDITORIA_GLOBAL_SISTEMA_2026.md`.
  - Actualizar expedientes oficiales en `docs/` y `public/docs/` (`MEMORANDO_POSTULACION.md`, `POSTULACION_EXPEDIENTE_PREMIO_2026.md`, `ARTICULO_TECNICO_DRAFT.md`, `MATRIZ_CUMPLIMIENTO_EVALUACION.md`, `GUIA_POSTULACION.md`, `GUIA_EVALUADOR.md`, `SHOWCASE.md`, `PITCH_DECK.md`).

## Capabilities

### New Capabilities
*(Ninguna nueva capacidad; este cambio sincroniza las capacidades y métricas reales existentes).*

### Modified Capabilities
- `system-status-synchronization`: Actualizar requisitos y escenarios para exigir de manera estricta y sincronizada las métricas de **290 pruebas automatizadas (236 Jest + 54 Pytest en 33 suites y 17 módulos)**, **35 rutas de producción Next.js 16 Turbopack**, y la presencia de las nuevas APIs edafológicas y manejador 404 en el catálogo de producción.

## Impact

- **Documentación**: Consistencia total entre `README.md`, `DEVELOPING.md`, `AGENTS.md`, `AUDITORIA_GLOBAL_SISTEMA_2026.md` y los expedientes del jurado en `public/docs/` y `docs/`.
- **Scripts y Testing**: `npm run test:summary`, `scripts/generate_prize_pdf.py` y `__tests__/api/security-and-dossier.test.ts` reportan y validan con exactitud las cifras reales sin desajustes.
- **Riesgo**: Nulo para la lógica de negocio; fortalece la verificación automatizada y elimina cualquier posible bandera roja por discrepancia numérica ante comités de evaluación.
