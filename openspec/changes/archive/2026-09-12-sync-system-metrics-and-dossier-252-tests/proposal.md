## Why

Following recent integrations in the Agrotech Venezuela platform (including the interactive WebGIS 3-level cartographic pyramid, embedded vector mini-map parcel previews, and the standalone Agro-IoT sandbox suite), the test baseline expanded from 233 to **252 automated tests** across **30 Jest suites** and **17 Pytest modules**, and the production routing surface reached **31 Turbopack routes** (including `/api/mapbiomas/discrepancy`).

However, multiple project presentation surfaces—including `README.md`, `AGENTS.md`, `DEVELOPING.md`, `AUDITORIA_GLOBAL_SISTEMA_2026.md`, `src/app/dashboard/postulacion/page.tsx`, `DemoTourModal.tsx`, `scripts/test_summary.js`, `scripts/generate_prize_pdf.py`, `.github/workflows/ci.yml`, and public submission dossiers—still quote outdated metrics (233 tests / 179 Jest / 28 suites / 30 routes). This change synchronizes all metrics, documentation, test summary scripts, and test assertions across the entire repository to reflect the exact current reality.

## What Changes

- **Synchronize Repository Badges and Metrics**: Update all badges, headers, and text blocks in `README.md`, `DEVELOPING.md`, `AGENTS.md`, and `AUDITORIA_GLOBAL_SISTEMA_2026.md` to reflect **252 tests passing (198 Jest + 54 Pytest, 30 suites)** and **31 production routes**.
- **Update In-App Postulation & Tour Modal**: Update `/dashboard/postulacion` badges and descriptions, as well as `DemoTourModal.tsx` step 5, to display **252 Tests Automatizados Pasando (198 Jest + 54 Pytest)**.
- **Update Test Summary CLI Matrix**: Enrich `scripts/test_summary.js` with the 2 missing Jest test suites (`mapbiomas-discrepancy-and-pedagogy.test.ts` with 14 tests and `unifiedMapAndIoTLab.test.ts` with 5 tests), bringing the CLI output to 198 Jest tests + 54 Pytest tests = **252 automated tests** and **31 verified production routes**.
- **Synchronize CI Workflow & Automated Dossier Tests**: Update `.github/workflows/ci.yml` step names to `30 suites / 198 tests` and `252 tests`, and update `__tests__/api/security-and-dossier.test.ts` assertions for `MEMORANDO_POSTULACION.md` from `233 pruebas` and `30 rutas` to `252 pruebas` and `31 rutas`.
- **Synchronize Technical Dossiers & Python Scripts**: Update `docs/MEMORANDO_POSTULACION.md`, `public/docs/MEMORANDO_POSTULACION.md`, `PITCH_DECK.md`, `public/docs/PITCH_DECK.md`, `public/docs/ARTICULO_TECNICO_DRAFT.md`, `public/docs/POSTULACION_EXPEDIENTE_PREMIO_2026.md`, and `scripts/generate_prize_pdf.py` with 252 tests and 31 routes.

## Capabilities

### New Capabilities
*(None)*

### Modified Capabilities
- `system-status-synchronization`: Update requirement and scenarios to mandate 252 automated tests (198 Jest + 54 Pytest in 30 Jest suites and 17 Pytest modules), 31 production routes in Next.js 16 Turbopack, and corresponding test summary CLI outputs.

## Impact

- **Affected Files**:
  - `README.md`, `AGENTS.md`, `DEVELOPING.md`, `AUDITORIA_GLOBAL_SISTEMA_2026.md`
  - `src/app/dashboard/postulacion/page.tsx`, `src/components/layout/DemoTourModal.tsx`
  - `scripts/test_summary.js`, `scripts/generate_prize_pdf.py`
  - `.github/workflows/ci.yml`
  - `docs/MEMORANDO_POSTULACION.md`, `public/docs/MEMORANDO_POSTULACION.md`
  - `PITCH_DECK.md`, `public/docs/PITCH_DECK.md`
  - `public/docs/ARTICULO_TECNICO_DRAFT.md`, `public/docs/POSTULACION_EXPEDIENTE_PREMIO_2026.md`
  - `__tests__/api/security-and-dossier.test.ts`
- **Dependencies**: No external dependency changes.
- **Breaking Changes**: None. Internal text synchronization and test assertion updates.
