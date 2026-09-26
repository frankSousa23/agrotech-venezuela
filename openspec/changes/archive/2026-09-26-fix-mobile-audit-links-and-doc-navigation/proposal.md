# Proposal: Resilient Mobile Audit Navigation & Documentation Link Verification

## Why

When evaluating the Agrotech Venezuela repository from mobile environments (specifically the official GitHub App for Android and iOS), tapping the **«Auditar»** links in the summary table of `docs/GUIA_EVALUADOR.md` produced no response. In native mobile Markdown viewports, in-page fragment links (`#...`) containing accented characters (`é`, `ó`) and punctuation (`(Ponderación: 20%)`) are either ignored or fail to match generated headers. Furthermore, the test suites listed in the summary table were plain text instead of clickable links, forcing evaluators on mobile devices to scroll blindly. In addition, internal links within the guide referenced outdated file paths (`src/components/maps/VenezuelaStateMapInner.tsx` and `src/components/gis/ParcelConflictModal.tsx`) resulting in HTTP 404 errors, and relative links in subfolder markdown files (`docs/mapbiomas_premio_2026/`) suffered from incorrect directory nesting.

Establishing a resilient, mobile-first navigation architecture ensures that jury members, agronomic evaluators, and researchers can audit code, formulas, and test suites with zero friction across any device or operating system.

## What Changes

- **Direct In-Table Audit Links**: Transform all automated test references (`spatial.test.ts`, `pedotransfer.test.ts`, etc.) and primary source files in the summary table of `docs/GUIA_EVALUADOR.md` into direct, clickable Markdown links. A mobile user can now tap directly into any test suite or source file from the top table.
- **ASCII-Safe & Universal Mobile Anchors**: Replace accent-heavy and punctuation-laden section fragment links with clean, universal ASCII anchor tags (`<a id="criterio-1"></a>` paired with `[Ver Detalle ↓](#criterio-1)`) that reliably scroll across GitHub Web, GitHub Android, and GitHub iOS.
- **Bidirectional Mobile Navigation**: Insert a «Volver al Índice ↑» link (`[Volver al Índice ↑](#indice)`) at the end of each evaluation criterion section to avoid tedious upward scrolling on mobile screens.
- **Path Corrections in Evaluator Guide**:
  - Correct `src/components/maps/VenezuelaStateMapInner.tsx` → `src/components/gis/VenezuelaStateMapInner.tsx`.
  - Correct `src/components/gis/ParcelConflictModal.tsx` → `src/components/tierras/ParcelConflictModal.tsx`.
- **Dossier Markdown Relative Link Normalization**:
  - Fix relative links in `docs/mapbiomas_premio_2026/MEMORANDO_POSTULACION.md` and `PITCH_DECK.md` (e.g. changing `../README.md` to `../../README.md`).
  - Normalize root image paths in `docs/mapbiomas_premio_2026/*.md` and `public/docs/*.md` to resolve consistently on GitHub.

## Capabilities

### Modified Capabilities
- `repository-showcase-and-evaluator-guide`: Expand `Requirement: MapBiomas Prize Evaluator Audit Roadmap` to mandate mobile-resilient direct table links to tests/code, ASCII-safe internal anchors, bidirectional return links, and 100% verified non-broken file paths across all documentation artifacts.

## Impact

- **Files Affected**:
  - `docs/GUIA_EVALUADOR.md`
  - `docs/mapbiomas_premio_2026/MEMORANDO_POSTULACION.md`
  - `docs/mapbiomas_premio_2026/PITCH_DECK.md`
  - `docs/mapbiomas_premio_2026/ARTICULO_TECNICO_DRAFT.md`
  - `docs/mapbiomas_premio_2026/POSTULACION_EXPEDIENTE_PREMIO_2026.md`
  - `public/docs/MEMORANDO_POSTULACION.md`
  - `public/docs/PITCH_DECK.md`
  - `public/docs/ARTICULO_TECNICO_DRAFT.md`
  - `public/docs/POSTULACION_EXPEDIENTE_PREMIO_2026.md`
- **APIs & Codebase**: No breaking changes to TypeScript types, Next.js routes, or Python endpoints.
- **Zero Regressions**: Preserves 278 passing automated tests (224 Jest + 54 Pytest), 0 TypeScript compilation errors, and 32 Next.js production routes.
