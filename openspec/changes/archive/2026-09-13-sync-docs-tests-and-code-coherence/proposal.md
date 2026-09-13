## Why

Tras implementar el ciclo `usability-roles-manual-and-onboarding` (commit `a79e425`), el proyecto ganó una nueva suite de pruebas (`manual-and-onboarding.test.ts`, 11 tests, suite 31) y una nueva ruta (`/dashboard/manual`). Toda la documentación oficial del proyecto —`README.md`, `DEVELOPING.md`, `AGENTS.md`, `AUDITORIA_GLOBAL_SISTEMA_2026.md`— todavía refleja métricas del ciclo anterior (252 tests / 198 Jest / 30 suites), y ni el `README.md` ni la auditoría mencionan la ruta `/dashboard/manual` ni el `OnboardingChecklistWidget`. El expediente de postulación al Premio MapBiomas Venezuela 2026 debe reflejar la realidad exacta y verificable del sistema en todos sus frentes.

## What Changes

- **Actualizar conteos de tests en todos los documentos**:
  - De `198 Jest + 54 Pytest = 252 total, 30 suites` a `209 Jest + 54 Pytest = 263 total, 31 suites` en `README.md`, `DEVELOPING.md`, `AGENTS.md` y `AUDITORIA_GLOBAL_SISTEMA_2026.md`.
- **Actualizar el catálogo de test suites en `AUDITORIA_GLOBAL_SISTEMA_2026.md`**:
  - Añadir la suite 31 `__tests__/manual-and-onboarding.test.ts` (11 tests) al desglose detallado de la Sección 3A.
  - Corregir el total de "Frontend & WebGIS Suite" de 198 a 209.
  - Corregir el gran total de 252 a 263.
- **Actualizar la ruta `/dashboard/manual` en `AUDITORIA_GLOBAL_SISTEMA_2026.md`**:
  - La ruta ya figura en el catálogo (línea 26), pero el total de la sección dice "31 rutas" — verificar que el número sea correcto y coherente.
- **Actualizar `README.md`**:
  - Añadir mención al Manual Agronómico Interactivo (`/dashboard/manual`) y al widget de onboarding dentro de las secciones pertinentes.
  - Actualizar el badge de tests.
- **Actualizar `DEVELOPING.md`**:
  - Corregir el comentario de la sección 4 (198 tests en 30 suites → 209 tests en 31 suites).
- **Actualizar `AGENTS.md`**:
  - Corregir la sección de testing con los nuevos conteos.
- **Añadir cabecera JSDoc a `OnboardingChecklistWidget.tsx`**:
  - Agregar un bloque de comentario descriptivo de cabecera idéntico en estructura al de `manualContent.ts`.
- **Actualizar `test:summary` script** (si los conteos están hardcodeados):
  - Verificar que `scripts/test_summary.js` refleje los 263 tests / 31 suites.
- **Actualizar la spec `system-status-synchronization`**:
  - Elevar el requisito R1 de 252 → 263 tests, 198 → 209 Jest, y 30 → 31 suites.
- **Verificación final**: Ejecutar `npm run test:all` + `npm run build` para confirmar que nada se rompió.

## Capabilities

### New Capabilities
*(ninguna — este cambio no introduce nuevas rutas ni comportamientos de usuario)*

### Modified Capabilities
- `system-status-synchronization`: El requisito R1 y sus escenarios de aceptación especifican métricas concretas (252 tests, 30 suites) que deben actualizarse a los valores reales verificados del sistema post-onboarding (263 tests, 31 suites).

## Impact

- **Archivos de documentación**: `README.md`, `DEVELOPING.md`, `AGENTS.md`, `AUDITORIA_GLOBAL_SISTEMA_2026.md` (todos en la raíz del proyecto).
- **Componente de UI**: `src/components/dashboard/OnboardingChecklistWidget.tsx` (cabecera JSDoc únicamente — sin cambios de lógica).
- **Script de utilidad**: `scripts/test_summary.js` (si hardcodea conteos).
- **OpenSpec spec**: `openspec/specs/system-status-synchronization/spec.md` (delta en R1 y escenarios).
- **Sin impacto en**: Tests, APIs, rutas Next.js, base de datos, estilos CSS o lógica de negocio.
