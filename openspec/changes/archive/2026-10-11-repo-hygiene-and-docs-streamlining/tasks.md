# Tasks: repo-hygiene-and-docs-streamlining

## 1. Code and Dependency Hygiene

- [x] 1.1 Delete `src/components/gis/MapResizeSynchronizer.tsx` and verify no lingering imports exist in `src/`.
- [x] 1.2 Remove `"react-leaflet"` from `package.json` dependencies and run `npm run typecheck` to verify clean compilation without react-leaflet.
- [x] 1.3 Refactor `backend/scripts/generate_slides_video.py` to remove stale hardcoded machine paths and align slide 7 metric to 306 tests.

## 2. Repository Structure and Duplicate Cleanup

- [x] 2.1 Delete duplicate `PITCH_DECK.md` from the project root and verify `docs/mapbiomas_premio_2026/PITCH_DECK.md` is intact as canonical.
- [x] 2.2 Delete redundant `.agent/` directory (preserving `.agents/` which contains all 6 OpenSpec skills and workflows).
- [x] 2.3 Create `docs/audits/` directory, move `AUDITORIA_GLOBAL_SISTEMA_2026.md` from root into `docs/audits/`, and update references.

## 3. Documentation Discovery & Soil Module Field Operations Guide

- [x] 3.1 Create `docs/GUIA_MODULO_SUELOS.md` providing the complete end-to-end user manual from WebGIS point/polygon selection to Saxton-Rawls simulation and multi-format exports.
- [x] 3.2 Update `README.md` to add the Quick Navigation Matrix by Persona (Jury, Farmer, Developer, Soil Scientist, Investor) and integrate links to `docs/GUIA_MODULO_SUELOS.md` and `docs/mapbiomas_premio_2026/PITCH_DECK.md`.
- [x] 3.3 Update `docs/SHOWCASE.md` with links and operational instructions referencing `docs/GUIA_MODULO_SUELOS.md`.

## 4. Verification and Regression Testing

- [x] 4.1 Run unit and integration tests (`npm test`) to verify all 251 Jest tests pass.
- [x] 4.2 Run backend tests (`npm run test:backend`) to verify all 55 Pytest tests pass.
- [x] 4.3 Run unified test suite (`npm run test:all`) and TypeScript check (`npm run typecheck`) to verify 306/306 tests pass and 0 TS errors.

