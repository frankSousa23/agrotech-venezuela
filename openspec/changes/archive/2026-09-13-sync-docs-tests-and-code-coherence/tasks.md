## 1. Inspección y Diagnóstico Previo

- [x] 1.1 Inspeccionar `scripts/test_summary.js` para verificar si tiene conteos hardcodeados (198, 252, 30) y registrar qué líneas deben actualizarse.
- [x] 1.2 Ejecutar `npm test -- --listTests 2>&1 | Measure-Object` para confirmar el conteo exacto de suites (debe ser 31) antes de editar cualquier documento.

## 2. Actualización de AGENTS.md

- [x] 2.1 En la sección de testing de `AGENTS.md`, actualizar el comentario "198 tests en 30 suites" → **"209 tests en 31 suites"** y "252 tests" → **"263 tests"**. Verificar que el archivo guarda sin errores de sintaxis Markdown.

## 3. Actualización de README.md

- [x] 3.1 Actualizar el badge `[![Tests: 252 Passing]...]` → **`[![Tests: 263 Passing]...]`** en la línea 9.
- [x] 3.2 Actualizar el título de la sección `🧪` de "252 Tests" → **"263 Tests"** y el texto "252 pruebas automatizadas (100% passing)" → **"263 pruebas automatizadas (100% passing)"**.
- [x] 3.3 Actualizar el comentario del comando `npm run test:all` de "198 tests Jest + 54 tests Pytest" → **"209 tests Jest + 54 tests Pytest"**.
- [x] 3.4 En el pilar "🚜 Inclusión Rural", añadir una línea mencionando el **Manual Agronómico Interactivo** (`/dashboard/manual`) con filtrado por rol y hoja de cabina imprimible. Verificar que el README sigue siendo conciso (≤150 líneas).

## 4. Actualización de DEVELOPING.md

- [x] 4.1 Actualizar el título de la sección 4 de "252 Tests" → **"263 Tests"**.
- [x] 4.2 Actualizar el comentario del paso 1 de "198 tests en 30 suites" → **"209 tests en 31 suites"** y añadir la suite `manual-and-onboarding` en la enumeración de categorías.
- [x] 4.3 Actualizar la referencia del paso 5 de "252 de 252 tests" → **"263 de 263 tests"**.
- [x] 4.4 Actualizar el escenario del desarrollador (sección de convenciones o test summary) si menciona "30 suites" o "252 tests" → **"31 suites" / "263 tests"**.

## 5. Actualización de AUDITORIA_GLOBAL_SISTEMA_2026.md

- [x] 5.1 En la **Sección 1 — Matriz de Salud**, actualizar la fila `Frontend & WebGIS Suite (Jest)` de `198 Tests Pasando (30 Test Suites)` → **`209 Tests Pasando (31 Test Suites)`**.
- [x] 5.2 En la **Sección 1 — Matriz de Salud**, actualizar la fila `Suite Unificada Completa` de `252 Tests Automatizados (100% Passing)` → **`263 Tests Automatizados (100% Passing)`**.
- [x] 5.3 En la **Sección 3A — Desglose de Pruebas**, actualizar el encabezado de "198 Tests en 30 Suites" → **"209 Tests en 31 Suites"**.
- [x] 5.4 En la **Sección 3A**, añadir la entrada de la suite 31 bajo la categoría "Usabilidad Rural / Manual & Onboarding": `31. __tests__/manual-and-onboarding.test.ts (11 tests) — Manual agronómico 7 capítulos, filtrado por 4 roles, onboarding 4 hitos y sandbox efímero de invitado.`
- [x] 5.5 En la **Sección 3A**, actualizar el total acumulado de tests Frontend de 198 → **209** (ajustar los números de la categoría "Usabilidad Rural / Sistema" donde se encuentra el sub-total).
- [x] 5.6 En la **Sección 4 — Catálogo de Rutas**, verificar que la ruta `/dashboard/manual` (entrada 26) ya esté presente con descripción correcta. No requiere cambio numérico (sigue siendo 31 rutas).
- [x] 5.7 En la **Sección 5 — Dictamen Final**, actualizar "252 de 252 tests" → **"263 de 263 tests"** y "198 Jest + 54 Pytest" → **"209 Jest + 54 Pytest"**.

## 6. Cabecera JSDoc en OnboardingChecklistWidget.tsx

- [x] 6.1 Añadir bloque de comentario JSDoc de cabecera al inicio del archivo `src/components/dashboard/OnboardingChecklistWidget.tsx` (inmediatamente antes de `'use client';`), siguiendo el mismo formato de bloque que `src/lib/manual/manualContent.ts`. Verificar visualmente que el archivo compila sin errores.

## 7. Actualización del Script de Test Summary (si aplica)

- [x] 7.1 Si `scripts/test_summary.js` tiene conteos hardcodeados, actualizar los valores de 198→**209**, 252→**263**, 30 suites→**31 suites** y agregar la suite `manual-and-onboarding` al resumen categorizado. Verificar ejecutando `npm run test:summary`.

## 8. Verificación Final Integral

- [x] 8.1 Ejecutar `npm run test:all` y confirmar que todos los tests pasan (263 de 263). Si el conteo difiere de 263, ajustar los documentos con el número exacto real reportado por Jest.
- [x] 8.2 Ejecutar `npm run typecheck` y confirmar 0 errores TypeScript.
- [x] 8.3 Ejecutar `npm run build` y confirmar compilación limpia de 31 rutas sin errores ni warnings críticos.
- [x] 8.4 Ejecutar `git diff --stat` para confirmar que los únicos archivos modificados son los documentados en el proposal (ningún archivo de lógica o test fue alterado).
- [x] 8.5 Realizar commit con mensaje `docs: sync test counts and module catalog to post-onboarding state (267 tests / 31 suites)`.
