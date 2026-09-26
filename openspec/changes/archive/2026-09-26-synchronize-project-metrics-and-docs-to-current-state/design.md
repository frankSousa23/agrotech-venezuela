# Design: Sincronización Integral de Métricas, Rutas y Documentación

## Context

Tras la incorporación de la paleta de comandos `Ctrl+K` con React Portal a `document.body`, los endpoints `/api/soils`, `/api/recomendaciones`, `/api/export/stats` y la página institucional 404, la plataforma opera con:
- **290 pruebas automatizadas** (236 Jest en 33 suites + 54 Pytest en 17 módulos).
- **35 rutas de producción en Next.js 16 Turbopack** (19 dinámicas/API + 16 estáticas/páginas).
- **82 especificaciones OpenSpec validadas**.

Ver motivación completa en `proposal.md` y requisitos en `specs/system-status-synchronization/spec.md`.

## Goals / Non-Goals

**Goals:**
- Sincronizar de forma atómica y consistente el 100% de las referencias numéricas y arquitectónicas en los 5 grupos de archivos del proyecto.
- Mantener en 100% PASS la suite unificada de 290 pruebas (Jest + Pytest), tipado TypeScript estricto (0 errores) y compilación limpia de Next.js (35 rutas).
- Actualizar `scripts/test_summary.js` para que el desglose de suites coincida con exactitud matemática con los resultados de Jest.
- Sincronizar la aserción de `__tests__/api/security-and-dossier.test.ts` con `public/docs/MEMORANDO_POSTULACION.md`.

**Non-Goals:**
- No se modificará la lógica de negocio de las rutas API existentes ni de los componentes visuales más allá de sus etiquetas/insignias de estado.
- No se agregarán dependencias externas de npm o pip.
- No se alterarán los esquemas de base de datos de Prisma ni migraciones.

## Decisions

### 1. Consistencia Numérica Estricta (290 Tests y 35 Rutas)
- *Decisión*: Estandarizar la redacción en todos los documentos técnicos e institucionales bajo el patrón:
  `290 pruebas automatizadas (236 Jest + 54 Pytest, 100% aprobadas)` y `35 rutas de producción Next.js 16 Turbopack`.
- *Alternativas consideradas*: Mantener números aproximados ("~280 tests"). Rechazado: el comité evaluador del Premio MapBiomas y los jurados técnicos exigen reproducibilidad y exactitud milimétrica.

### 2. Desglose Exacto en `scripts/test_summary.js`
- *Decisión*: Corregir los contadores individuales de suites en el array `frontendSuites`:
  - `soils.test.ts`: 2 ➔ 6 tests (+4 por validación de endpoints y filtros)
  - `recomendaciones.test.ts`: 5 ➔ 7 tests (+2 por consultas y RBAC)
  - `command-palette-and-search.test.ts`: 5 ➔ 7 tests (+2 por polos agrícolas y trigger móvil)
  - `routing-and-redirects.test.ts`: 7 ➔ 11 tests (+4 por alias de visor, costos, export stats y 404)
  - `roiCostEngine.test.ts`: 5 ➔ 6 tests
  - `ImpactRoiWidget.test.ts`: 6 ➔ 5 tests
  Total Jest = 236 tests en 33 suites. Total consolidado = 290 tests.
- *Beneficio*: `npm run test:summary` reflejará exactamente la salida nativa de Jest sin discrepancias.

### 3. Sincronización Simultánea de Tests y Documentación
- *Decisión*: Actualizar `__tests__/api/security-and-dossier.test.ts` (líneas 170-171) para verificar `'290 pruebas automatizadas'` y `'35 rutas'` al mismo tiempo que se actualiza `public/docs/MEMORANDO_POSTULACION.md`.
- *Mitigación*: Evita fallos transitorios en CI o en `npm test`.

### 4. Estructuración por Lotes de Actualización
- *Decisión*: Ejecutar la sincronización en 5 lotes lógicos:
  1. Guías de Ingeniería (`AGENTS.md`, `README.md`, `DEVELOPING.md`).
  2. Scripts y Herramientas de Auditoría (`scripts/test_summary.js`, `scripts/generate_prize_pdf.py`, `AUDITORIA_GLOBAL_SISTEMA_2026.md`).
  3. Interfaces y Componentes de Usuario (`postulacion/page.tsx`, `DemoTourModal.tsx`, `MultiLevelMapViewer.tsx`, `DataflowDiagramStudio.tsx`).
  4. Expedientes de Postulación Oficial (`docs/` y `public/docs/`).
  5. Suite de Pruebas y Verificación Global (`__tests__/api/security-and-dossier.test.ts`, `npm test`, `npm run build`).

## Risks / Trade-offs

- **[Riesgo: Discrepancia entre `public/docs/` y `docs/mapbiomas_premio_2026/`]**
  - *Mitigación*: Ambos directorios contienen copias espejo de los documentos del premio (`MEMORANDO_POSTULACION.md`, `POSTULACION_EXPEDIENTE_PREMIO_2026.md`, `ARTICULO_TECNICO_DRAFT.md`, `MATRIZ_CUMPLIMIENTO_EVALUACION.md`, `GUIA_POSTULACION.md`). Ambos árboles se actualizarán de forma idéntica.
- **[Riesgo: Regresión en tests durante la edición]**
  - *Mitigación*: Ejecutar `npm test` inmediatamente después de sincronizar los archivos para confirmar que las 33 suites y los 236 tests Jest sigan en 100% PASS.
