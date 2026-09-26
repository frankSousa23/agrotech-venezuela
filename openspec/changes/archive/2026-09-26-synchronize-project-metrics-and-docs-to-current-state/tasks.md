# Tasks

## 1. Guías de Ingeniería y Pautas de Desarrollo

- [x] 1.1 Actualizar métricas en `AGENTS.md` (líneas 61, 67, 74) a 236 tests Jest en 33 suites, 35 rutas limpias y 290 tests automatizados unificados, verificando legibilidad.
- [x] 1.2 Actualizar `README.md` (insignia de tests a 290 Passing, sección 🧪 con 290 tests, desglose expandible con los 236 tests Jest en 33 suites y 35 rutas Next.js 16 Turbopack).
- [x] 1.3 Actualizar `DEVELOPING.md` (líneas 142, 147, 153, 159) a 290 tests unificados, 236 tests Jest en 33 suites y 35 rutas limpias de producción.

## 2. Scripts y Certificado de Auditoría Global

- [x] 2.1 Actualizar `scripts/test_summary.js` corrigiendo los contadores de tests en el array de suites (`soils.test.ts: 6`, `recomendaciones.test.ts: 7`, `command-palette-and-search.test.ts: 7`, `routing-and-redirects.test.ts: 11`, `roiCostEngine.test.ts: 6`, `ImpactRoiWidget.test.ts: 5`), el total Jest a 236, el total consolidado a 290 y las rutas a 35, verificando con `node scripts/test_summary.js`.
- [x] 2.2 Actualizar `scripts/generate_prize_pdf.py` (línea 220) para reflejar 290 pruebas automatizadas (236 Jest + 54 Pytest, 100% aprobadas).
- [x] 2.3 Actualizar `AUDITORIA_GLOBAL_SISTEMA_2026.md` (matriz de salud, desglose detallado de suites a 236 Jest, catálogo completo de 35 rutas Next.js 16 incluyendo `/api/soils`, `/api/recomendaciones`, `/api/export/stats` y `/_not-found`, y dictamen final con 290 tests).

## 3. Componentes de UI e Interfaces de Usuario

- [x] 3.1 Actualizar `src/app/dashboard/postulacion/page.tsx` (insignia superior y tarjetas técnicas de postulación reflejando 290 tests automatizados: 236 Jest + 54 Pytest).
- [x] 3.2 Actualizar `src/components/layout/DemoTourModal.tsx` (paso 5 de validación TRL 4 a 290 tests: 236 Jest + 54 Pytest).
- [x] 3.3 Actualizar `src/components/gis/MultiLevelMapViewer.tsx` (banner de auditor/jurado en línea 1259 a 290 tests verificados).
- [x] 3.4 Actualizar `src/components/diagrams/DataflowDiagramStudio.tsx` (tarjeta de calidad de software a 290 pruebas automatizadas y 35 rutas de producción Next.js 16).

## 4. Expedientes de Postulación Institucional Oficial

- [x] 4.1 Actualizar `docs/MEMORANDO_POSTULACION.md` y `public/docs/MEMORANDO_POSTULACION.md` a 290 pruebas automatizadas (236 Jest + 54 Pytest) y 35 rutas de producción.
- [x] 4.2 Actualizar `docs/mapbiomas_premio_2026/POSTULACION_EXPEDIENTE_PREMIO_2026.md` y `public/docs/POSTULACION_EXPEDIENTE_PREMIO_2026.md` (resumen ejecutivo, tablas de calidad y certificación a 290 tests y 35 rutas).
- [x] 4.3 Actualizar `docs/mapbiomas_premio_2026/ARTICULO_TECNICO_DRAFT.md` y `public/docs/ARTICULO_TECNICO_DRAFT.md` (resumen en español e inglés y tabla metodológica a 290 tests y 35 rutas).
- [x] 4.4 Actualizar `docs/mapbiomas_premio_2026/MATRIZ_CUMPLIMIENTO_EVALUACION.md` y `public/docs/MATRIZ_CUMPLIMIENTO_EVALUACION.md` (criterios 1, 3 y 6 a 290 tests y 35 rutas).
- [x] 4.5 Actualizar `docs/mapbiomas_premio_2026/GUIA_POSTULACION.md` y `public/docs/GUIA_POSTULACION.md` (criterios de complejidad técnica y solidez a 290 tests y 35 rutas).
- [x] 4.6 Actualizar `docs/GUIA_EVALUADOR.md`, `docs/SHOWCASE.md` y `PITCH_DECK.md` (con sus copias en `public/docs/` y `docs/mapbiomas_premio_2026/`) a 290 tests y 35 rutas.

## 5. Aserciones de Prueba y Verificación de Integridad Global

- [x] 5.1 Actualizar las aserciones de `__tests__/api/security-and-dossier.test.ts` (líneas 170-171) para esperar `'290 pruebas automatizadas'` y `'35 rutas'` en `MEMORANDO_POSTULACION.md`.
- [x] 5.2 Ejecutar `npm test` y verificar que las 33 suites y los 236 tests de frontend pasen al 100%.
- [x] 5.3 Ejecutar `npm run typecheck` y verificar 0 errores TypeScript.
- [x] 5.4 Ejecutar `npm run build` y verificar que las 35 rutas compilen de forma limpia en Turbopack.
- [x] 5.5 Ejecutar `npm run test:summary` y verificar que el reporte ASCII consolidado imprima 290 pruebas y 35 rutas con 100% de éxito.
