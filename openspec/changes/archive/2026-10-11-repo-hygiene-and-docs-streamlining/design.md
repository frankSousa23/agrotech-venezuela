# Design: repo-hygiene-and-docs-streamlining

## Context

See `proposal.md` for motivation. The codebase has reached operational maturity (TRL 4) with 306 automated tests passing across 40 Next.js 16 routes and 17 Python 3.13 backend modules. However, several legacy files remain from earlier development iterations: an unused React-Leaflet synchronizer, duplicate pitch decks with discordant test numbers, a redundant `.agent/` folder alongside `.agents/`, and audit reports in the root directory.

## Goals / Non-Goals

**Goals:**
- Eliminate all orphaned components and unneeded dependencies (`react-leaflet`).
- Establish single-source-of-truth document locations with zero stale root copies.
- Create an intuitive, high-visibility persona navigation matrix in `README.md`.
- Author an authoritative, end-to-end operational guide for the MapBiomas Soil Module (`docs/GUIA_MODULO_SUELOS.md`).
- Ensure all 306 tests continue passing with 0 TypeScript compilation errors.

**Non-Goals:**
- Modifying core agronomic calculations or geospatial algorithms (Shoelace, Saxton-Rawls, Kamprath, SAR).
- Altering existing API contracts or backend endpoints.

## Decisions

### Decision 1: Purge `MapResizeSynchronizer.tsx` and Uninstall `react-leaflet`
- **Choice**: Permanently delete `src/components/gis/MapResizeSynchronizer.tsx` and remove `"react-leaflet"` from `package.json`.
- **Rationale**: Both `LeafletMapInner.tsx` and `VenezuelaStateMapInner.tsx` manage resize lifecycle natively using pure `L.map` and `useRef`. `react-leaflet` was only imported by this unused component.
- **Alternatives considered**: Keeping the component as a fallback. Rejected because it introduces unnecessary bundle weight and potential React 19 type friction.

### Decision 2: Centralize Dossier Documents under `docs/mapbiomas_premio_2026/`
- **Choice**: Delete `PITCH_DECK.md` from the root directory and link directly to `docs/mapbiomas_premio_2026/PITCH_DECK.md` from `README.md`.
- **Rationale**: Having two copies led to desynchronization (the root copy still stated 292 tests and 35 routes while the dossier had 306 tests and 40 routes). Single source of truth prevents future divergence.

### Decision 3: Remove Redundant `.agent/` Directory
- **Choice**: Remove `.agent/` and preserve `.agents/`.
- **Rationale**: `.agents/` contains all 6 OpenSpec skills (`openspec-apply-change`, `openspec-archive-change`, `openspec-explore`, `openspec-propose`, `openspec-sync-specs`, `openspec-update-change`) and 6 workflows. `.agent/` only contained 2 partial files.

### Decision 4: Relocate Root Audit Report to `docs/audits/`
- **Choice**: Create `docs/audits/` and move `AUDITORIA_GLOBAL_SISTEMA_2026.md` there, updating links.
- **Rationale**: Keeps the root directory pristine for new developers and cloning users.

### Decision 5: Publish `docs/GUIA_MODULO_SUELOS.md`
- **Choice**: Write a detailed markdown guide covering the operational workflow "Del Píxel al Surco" (From Pixel to Furrow): WebGIS pin/polygon click ➔ query string prefill ➔ interactive simulation sliders ➔ multi-format exports.

## Risks / Trade-offs

- **[Risk] Deleting `MapResizeSynchronizer` might break undetected imports** → *Mitigation*: Grep search confirmed zero external references; TypeScript typecheck and Jest test suite verify zero breakages.
- **[Risk] Removing `PITCH_DECK.md` from root might break external bookmarks or GitHub links** → *Mitigation*: Add an explicit reference anchor in `README.md` pointing to `docs/mapbiomas_premio_2026/PITCH_DECK.md`.
