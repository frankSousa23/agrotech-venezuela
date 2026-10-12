# Tasks

## 1. Métricas & Test Summary Script Synchronization

- [x] 1.1 Actualizar `scripts/test_summary.js` registrando `SoilPedagogicalWaterBar.test.tsx` (3 tests) y `MapBiomas40YearTrajectoryCard.test.tsx` (2 tests), verificando que `node scripts/test_summary.js` reporte exactamente 256 frontend tests en 36 suites y 311 tests consolidados.
- [x] 1.2 Actualizar las menciones y tablas de pruebas en `README.md` y `AGENTS.md` a 311 tests automatizados (256 Jest en 36 suites + 55 Pytest en 17 módulos, 40 rutas Next.js 16).
- [x] 1.3 Actualizar insignias y certificaciones en componentes UI (`src/app/dashboard/postulacion/page.tsx`, `DemoTourModal.tsx`, `MultiLevelMapViewer.tsx`, `DataflowDiagramStudio.tsx`) reemplazando cifras históricas por 311 tests (256 Jest + 55 Pytest).

## 2. Enriquecimiento de Guías Operativas y Showcase

- [x] 2.1 Enriquecer `docs/GUIA_MODULO_SUELOS.md` incorporando la sección completa sobre la Capa Pedagógica MapBiomas: Barra de Confort Hídrico ("Esponja de Suelo"), autonomía hídrica en días, tarjeta de memoria histórica de 40 años (-55% a -61% MO) y traspaso a Bitácora en sacos tradicionales de 50 kg.
- [x] 2.2 Actualizar `docs/GUIA_EVALUADOR.md` y `docs/SHOWCASE.md` reflejando los 311 tests y añadiendo el Módulo Pedagógico de Suelos en los criterios oficiales de evaluación del jurado (Aporte Social y Contribución a MapBiomas).

## 3. Sincronización del Expediente Oficial MapBiomas 2026 y Espejos Públicos

- [x] 3.1 Actualizar los manuscritos oficiales de postulación en `docs/mapbiomas_premio_2026/` (`ARTICULO_TECNICO_DRAFT.md`, `POSTULACION_EXPEDIENTE_PREMIO_2026.md`, `MEMORANDO_POSTULACION.md`, `MATRIZ_CUMPLIMIENTO_EVALUACION.md`, `PITCH_DECK.md`, `GUIA_POSTULACION.md`, `DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md`, `PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md`) con las 311 pruebas automatizadas y el valor del Módulo Pedagógico de Suelos.
- [x] 3.2 Sincronizar bilateralmente los archivos espejo en `public/docs/` para garantizar total paridad en las descargas del aplicativo web.
- [x] 3.3 Ejecutar la suite unificada completa (`npm run test:all`, `npm run typecheck`, `npm run build`, `npm run test:summary`) y verificar que todos los 311 tests pasen con 0 errores y compilación limpia.
