## 1. Mobile UI/UX Ergonomics

- [x] 1.1 Add `iconOnly?: boolean` prop to `SunlightThemeToggle.tsx` and activate it in the mobile header of `src/app/dashboard/layout.tsx`, verifying touch target sizing (32x32px) and aria-labels.
- [x] 1.2 Verify theme cycling and mobile header containment without button wrapping across viewports down to 360px.

## 2. Test Summary Script & Metric Synchronization

- [x] 2.1 Update `scripts/test_summary.js` to register `roiCostEngine.test.ts` (5 tests) and `ImpactRoiWidget.test.ts` (6 tests), verifying `npm run test:summary` calculates exactly 278 tests (224 Jest across 33 suites + 54 Pytest across 17 modules) and 32 production routes.
- [x] 2.2 Synchronize in-app UI components (`src/components/layout/DemoTourModal.tsx`, `src/components/gis/MultiLevelMapViewer.tsx`, and `src/app/dashboard/postulacion/page.tsx`) to cite 278 automated tests (224 Jest + 54 Pytest) and 32 production routes.

## 3. Comprehensive Technical Documentation & Dossier Alignment

- [x] 3.1 Synchronize `public/docs/ARTICULO_TECNICO_DRAFT.md`, `docs/mapbiomas_premio_2026/POSTULACION_EXPEDIENTE_PREMIO_2026.md`, and `public/docs/POSTULACION_EXPEDIENTE_PREMIO_2026.md` to 278 tests, 32 routes, and decoupled operational ROI vs separate ESG carbon simulation.
- [x] 3.2 Synchronize `PITCH_DECK.md` (and `public/docs/PITCH_DECK.md`), `docs/MEMORANDO_POSTULACION.md` (and `public/docs/MEMORANDO_POSTULACION.md`), `DEVELOPING.md`, `AUDITORIA_GLOBAL_SISTEMA_2026.md`, and `AGENTS.md` to 278 tests and 32 routes.
- [x] 3.3 Update `__tests__/api/security-and-dossier.test.ts` assertion to match 278 tests and 32 routes in `MEMORANDO_POSTULACION.md`, verifying with `npx jest __tests__/api/security-and-dossier.test.ts`.

## 4. Final Validation, Zero-Regression Build & Quality Gate

- [x] 4.1 Run `npm test` and verify 224 Jest tests pass across 33 test suites.
- [x] 4.2 Run `npm run test:backend` and verify 54 Pytest tests pass across 17 backend modules.
- [x] 4.3 Run `npm run test:all` and verify all 278 unified automated tests pass.
- [x] 4.4 Run `npm run test:summary` and verify the terminal summary displays 278 tests and 32 routes.
- [x] 4.5 Run `npm run typecheck` and `npm run build` to confirm 0 TypeScript errors and 32 clean production routes.
