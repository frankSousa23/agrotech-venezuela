## 1. Synchronize Public Evaluation Matrices & Guides

- [x] 1.1 Update `public/docs/MATRIZ_CUMPLIMIENTO_EVALUACION.md` replacing all occurrences of 252 tests, 198 Jest, and 30/31 routes with 278 automated tests (224 Jest + 54 Pytest) and 32 routes, and verify with text search.
- [x] 1.2 Update `public/docs/GUIA_POSTULACION.md` replacing all occurrences of 252 tests with 278 automated tests, and verify with text search.

## 2. Synchronize Offline Award Dossier Archive (`docs/mapbiomas_premio_2026/`)

- [x] 2.1 Update `docs/mapbiomas_premio_2026/ARTICULO_TECNICO_DRAFT.md` (abstract, English abstract, table, and TRL section) to reflect 278 automated tests (224 Jest + 54 Pytest) and 32 clean production routes, and verify with text search.
- [x] 2.2 Update `docs/mapbiomas_premio_2026/MEMORANDO_POSTULACION.md` to reflect 278 automated tests and 32 production routes, and verify with text search.
- [x] 2.3 Update `docs/mapbiomas_premio_2026/PITCH_DECK.md` to reflect 278 automated tests and 32 production routes, and verify with text search.
- [x] 2.4 Update `docs/mapbiomas_premio_2026/MATRIZ_CUMPLIMIENTO_EVALUACION.md` and `docs/mapbiomas_premio_2026/GUIA_POSTULACION.md` to reflect 278 automated tests and 32 production routes, and verify with text search.

## 3. Update Compilation Scripts & Validate Test Suite

- [x] 3.1 Update `scripts/generate_prize_pdf.py` line 220 to reflect 278 automated tests (224 Jest + 54 Pytest, 100% aprobadas), and verify with text inspection.
- [x] 3.2 Run `npm test` to verify that `__tests__/api/security-and-dossier.test.ts` (all 20 tests) and all 224 Jest tests pass without errors.
- [x] 3.3 Run `npm run test:summary` and `npm run test:all` to verify that all 278 automated tests (224 Jest + 54 Pytest) pass.
- [x] 3.4 Run `npm run typecheck` and `npm run build` to confirm 0 TypeScript errors and clean compilation of 32 Next.js 16 production routes.
