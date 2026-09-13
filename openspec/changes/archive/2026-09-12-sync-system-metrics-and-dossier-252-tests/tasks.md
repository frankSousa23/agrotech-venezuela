## 1. UI Components and Test Script Synchronization

- [x] 1.1 Update `src/app/dashboard/postulacion/page.tsx` (header badge, TRL card, text mentions) and `src/components/layout/DemoTourModal.tsx` (step 5 description and highlight) to reflect 252 tests passing (198 Jest + 54 Pytest) and verify with browser or text inspection.
- [x] 1.2 Enrich `scripts/test_summary.js` with `mapbiomas-discrepancy-and-pedagogy.test.ts` (14 tests) and `unifiedMapAndIoTLab.test.ts` (5 tests) in the frontend suites list, update totals to 198 Jest + 54 Pytest = 252 tests and 31 routes, and verify by running `npm run test:summary`.

## 2. Technical Guidelines, README and Auditoría Global

- [x] 2.1 Update `README.md`, `DEVELOPING.md`, and `AGENTS.md` (badges, verification steps, suite counts: 30 Jest suites, 198 Jest tests, 252 total tests, 31 routes) and verify with text inspection.
- [x] 2.2 Update `AUDITORIA_GLOBAL_SISTEMA_2026.md` health matrix, test suite breakdowns, and 31-route table including `/api/mapbiomas/discrepancy`. Verify with text inspection.

## 3. Dossiers, Test Assertions, CI and Python Scripts

- [x] 3.1 Update `docs/MEMORANDO_POSTULACION.md` and `public/docs/MEMORANDO_POSTULACION.md` with 252 automated tests (198 Jest + 54 Pytest) and 31 production routes.
- [x] 3.2 Update `__tests__/api/security-and-dossier.test.ts` to assert `252 pruebas automatizadas` and `31 rutas` in `MEMORANDO_POSTULACION.md`, and verify with `npm test`.
- [x] 3.3 Synchronize `PITCH_DECK.md`, `public/docs/PITCH_DECK.md`, `public/docs/ARTICULO_TECNICO_DRAFT.md`, `public/docs/POSTULACION_EXPEDIENTE_PREMIO_2026.md`, `scripts/generate_prize_pdf.py`, and `.github/workflows/ci.yml` with 252 tests, 30 Jest suites, and 31 routes.

## 4. End-to-End Verification and Validation

- [x] 4.1 Run `npm test` verifying 30 passing Jest suites and 198 passing tests.
- [x] 4.2 Run `npm run typecheck` verifying 0 TypeScript errors.
- [x] 4.3 Run `npm run build` verifying clean production build across 31 Turbopack routes.
- [x] 4.4 Run `npm run test:all` verifying 252 passing tests (198 Jest + 54 Pytest).
- [x] 4.5 Run `npx openspec validate --all` verifying all specification deltas pass validation.
