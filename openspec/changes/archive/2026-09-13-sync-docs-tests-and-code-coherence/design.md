## Context

Ver `proposal.md → Why` para la motivación. El ciclo `usability-roles-manual-and-onboarding` (commit `a79e425`, 13 Sep 2026) añadió 11 tests nuevos en una suite nueva y una ruta nueva, pero los documentos técnicos y de postulación no fueron actualizados en ese mismo ciclo. Los cambios son exclusivamente textuales/documentales; no hay modificaciones de lógica, APIs ni base de datos.

Los archivos de documentación afectados son todos ediciones de texto plano Markdown (`.md`) o TypeScript (cabecera JSDoc). El script `scripts/test_summary.js` puede o no tener conteos hardcodeados — debe inspeccionarse.

## Goals / Non-Goals

**Goals:**
- Sincronizar todos los conteos de tests y suites en todos los documentos.
- Añadir la ruta `/dashboard/manual` y el `OnboardingChecklistWidget` al README y a la auditoría.
- Añadir cabecera JSDoc al componente `OnboardingChecklistWidget.tsx`.
- Corregir la spec `system-status-synchronization` en el OpenSpec main.
- Verificar (y corregir si aplica) `scripts/test_summary.js`.
- Ejecutar `npm run test:all` y `npm run build` como verificación final.

**Non-Goals:**
- Cambiar lógica de tests, componentes, APIs o estilos CSS.
- Añadir nuevas rutas, componentes o funcionalidades.
- Modificar el `PITCH_DECK.md` ni el `docs/MEMORANDO_POSTULACION.md` ni el `public/docs/MEMORANDO_POSTULACION.md` (estos documentos tienen su propio ciclo de sincronización y no mencionan conteos de suites individuales que hayan cambiado).
- Modificar archivos de CI/CD (`.github/workflows/ci.yml`) — el workflow no tiene conteos hardcodeados de suites individuales.

## Decisions

### D1: Conteos exactos a usar

Basados en la inspección de `npm test -- --listTests` (31 archivos detectados) y el contenido de `manual-and-onboarding.test.ts` (11 test cases), los valores correctos son:

| Métrica | Valor anterior (incorrecto) | Valor nuevo (correcto) |
|---|---|---|
| Jest suites | 30 | **31** |
| Jest tests | 198 | **209** |
| Total (Jest + Pytest) | 252 | **263** |
| Pytest suites / tests | 17 módulos / 54 | Sin cambio |
| Rutas Next.js | 31 | Sin cambio (31) |

**Alternativa considerada**: Re-ejecutar la suite completa para obtener el número exacto antes de editar los docs. Se incluirá `npm run test:all` como paso de verificación final en lugar de como prerequisito de edición, dado que los archivos de test son inspeccionables directamente.

### D2: Orden de edición (secuencial por riesgo)

Editar en este orden para minimizar el riesgo de conflictos o errores:
1. `scripts/test_summary.js` — verificar primero si hardcodea conteos.
2. `AGENTS.md` — archivo de reglas del agente, impacto limitado.
3. `README.md` — documento público más visible.
4. `DEVELOPING.md` — documentación técnica.
5. `AUDITORIA_GLOBAL_SISTEMA_2026.md` — documento de certificación más extenso.
6. `src/components/dashboard/OnboardingChecklistWidget.tsx` — solo añadir cabecera JSDoc.
7. Verificación: `npm run test:all` + `npm run build`.

### D3: Granularidad de los cambios en la auditoría

La `AUDITORIA_GLOBAL_SISTEMA_2026.md` requiere cambios en múltiples lugares:
- **Sección 1 (Matriz de salud)**: Actualizar la fila `Frontend & WebGIS Suite (Jest)` de 198/30 a 209/31.
- **Sección 1 (Matriz de salud)**: Actualizar `Suite Unificada Completa` de 252 a 263.
- **Sección 3A (Desglose de pruebas)**: Añadir suite 31 `manual-and-onboarding.test.ts` (11 tests).
- **Sección 3A (título)**: Cambiar "198 Tests en 30 Suites" a "209 Tests en 31 Suites".
- **Sección 4 (Catálogo de rutas)**: La ruta `/dashboard/manual` ya aparece (línea 26 de la tabla) — sin cambio necesario.
- **Sección 5 (Dictamen final)**: Actualizar "252" → "263" y "198 Jest + 54 Pytest" → "209 Jest + 54 Pytest".

### D4: Cabecera JSDoc para OnboardingChecklistWidget.tsx

Usar exactamente el mismo formato de bloque que `manualContent.ts`:
```ts
/**
 * ============================================================================
 * AGROTECH VENEZUELA — ONBOARDING CHECKLIST WIDGET
 * ============================================================================
 *
 * Widget gamificado de bienvenida para el dashboard principal:
 * - Guía paso a paso con 4 hitos: explorar mapa, delimitar parcela,
 *   activar telemetría IoT, y consultar el manual agronómico.
 * - Persistencia de progreso en localStorage (clave: agrotech_onboarding_checklist).
 * - Barra de progreso 0%–100% y animación de confeti al completar.
 */
```

## Risks / Trade-offs

- **Riesgo**: `scripts/test_summary.js` podría tener conteos hardcodeados que generarían discrepancias si no se actualizan → **Mitigación**: Inspeccionarlo como primer paso (T1).
- **Riesgo**: El número real de tests podría diferir levemente del estimado 209 si algún `describe`/`test` se cuenta de manera diferente por Jest → **Mitigación**: Ejecutar `npm run test:all` como último paso de verificación y ajustar si el número difiere.
- **Trade-off**: No se actualizan `PITCH_DECK.md`, `MEMORANDO_POSTULACION.md` ni el CI — estos documentos no mencionan conteos de suites individuales en forma que haya cambiado, y actualizarlos requeriría un ciclo de revisión institucional separado.
