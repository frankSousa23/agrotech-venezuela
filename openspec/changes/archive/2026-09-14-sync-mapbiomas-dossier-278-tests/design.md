## Context

See `proposal.md` for motivation. The Agrotech Venezuela platform operates with 278 automated tests passing (224 Jest across 33 suites + 54 Pytest across 17 modules) and 32 clean Next.js 16 Turbopack production routes. Previous synchronization passes updated root documentation (`README.md`, `DEVELOPING.md`, `AGENTS.md`, `AUDITORIA_GLOBAL_SISTEMA_2026.md`, `PITCH_DECK.md`), test assertion suites (`security-and-dossier.test.ts`), and the in-app UI (`/dashboard/postulacion`). However, offline submission copies stored in `docs/mapbiomas_premio_2026/`, along with `public/docs/MATRIZ_CUMPLIMIENTO_EVALUACION.md`, `public/docs/GUIA_POSTULACION.md`, and `scripts/generate_prize_pdf.py`, remained on earlier metrics (252 tests, 198 Jest, 30/31 routes).

## Goals / Non-Goals

**Goals:**
- Harmonize all 7 dossier markdown files across `public/docs/` and `docs/mapbiomas_premio_2026/` to reflect exactly **278 pruebas automatizadas** (224 Jest en 33 suites + 54 Pytest en 17 módulos) and **32 rutas de producción**.
- Update `scripts/generate_prize_pdf.py` line 220 to embed the certified 278 automated tests.
- Re-run the automated dossier test suite (`__tests__/api/security-and-dossier.test.ts`) and `scripts/test_summary.js` to ensure 100% compliance.
- Zero TypeScript errors (`npm run typecheck`) and clean production build (`npm run build`).

**Non-Goals:**
- Modifying UI components or backend ML algorithms (already tested and validated).
- Changing the structure of the MapBiomas evaluation criteria or the scoring in the matrix.

## Decisions

### 1. Dual Update for Public and Offline Folders
- *Decision*: Keep `public/docs/` (downloadable web documents) and `docs/mapbiomas_premio_2026/` (repository submission archive) identical in content.
- *Rationale*: A juror may evaluate the project either by downloading the markdown/PDFs from the running web application or by cloning/browsing the GitHub repository. There must be zero discrepancy between both locations.
- *Alternatives considered*: Deleting one folder — discarded because `public/docs/` is required by Next.js static asset routing while `docs/mapbiomas_premio_2026/` serves as the official repo dossier package.

### 2. Precise Granular Phrasing
- *Decision*: Standardize on `"278 pruebas automatizadas (224 Jest + 54 Pytest, 100% aprobadas)"` and `"32 rutas de producción"` across all documents.
- *Rationale*: Consistent phrasing ensures that regexes and string assertions in automated tests (such as `security-and-dossier.test.ts`) match cleanly.

## Risks / Trade-offs

- **[Risk]** Accidental regression in `__tests__/api/security-and-dossier.test.ts` if a required string is displaced.
  - *Mitigation*: The test specifically asserts `'278 pruebas automatizadas'` and `'32 rutas'` in `MEMORANDO_POSTULACION.md`. We will verify with `npm test` immediately after edits.
- **[Risk]** `scripts/generate_prize_pdf.py` overwriting dossier files with stale data if executed.
  - *Mitigation*: Update line 220 in `scripts/generate_prize_pdf.py` to embed 278 tests before running any compilation.
