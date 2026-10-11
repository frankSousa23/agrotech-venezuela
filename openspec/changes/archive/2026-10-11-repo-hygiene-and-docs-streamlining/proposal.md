# Proposal: repo-hygiene-and-docs-streamlining

## Why

As Agrotech Venezuela reaches operational maturity (TRL 4, 306 passing tests, 40 Next.js routes) and prepares for final submission to the Segunda Edición del Premio MapBiomas Venezuela 2026, the repository requires comprehensive hygiene and streamlined documentation discovery. Eliminating unreferenced legacy files (such as an unused React-Leaflet synchronizer and redundant pitch decks), establishing clean Git boundaries between local caches and tracked assets, and providing a crystal-clear navigation guide across user personas—including an end-to-end operational manual for the MapBiomas Soil Module—will drastically reduce cognitive friction for evaluators, producers, and developers.

## What Changes

1. **Purge Orphaned & Redundant Code Assets**:
   - Remove `src/components/gis/MapResizeSynchronizer.tsx` (an unreferenced component that was the only consumer of `react-leaflet`).
   - Remove `react-leaflet` dependency from `package.json` to reduce bundle size and dependency overhead, adhering to the canonical `L.map` native architecture with `useRef`.
   - Remove duplicate/outdated `PITCH_DECK.md` from the root directory, maintaining `docs/mapbiomas_premio_2026/PITCH_DECK.md` as the single canonical source of truth.
   - Remove redundant `.agent/` folder (which only contains 2 partial skills) in favor of the canonical `.agents/` directory containing all 6 skills and workflows.
   - Relocate root audit record `AUDITORIA_GLOBAL_SISTEMA_2026.md` into `docs/audits/` to keep the root directory uncluttered.
   - Refactor `backend/scripts/generate_slides_video.py` to remove stale machine-specific artifact paths and align metrics with the 306-test suite.

2. **Streamline Repository Documentation & Role-Based Navigation**:
   - Enhance `README.md` with a high-visibility **Quick Navigation Matrix by Persona** (Jury/Evaluators, Smallholder Farmers, Software/GIS Engineers, Soil Scientists, Investors/Cooperatives).
   - Author a dedicated **Field Operations Guide for the MapBiomas Soil Module** in `docs/GUIA_MODULO_SUELOS.md` and link it prominently in `README.md` and `docs/SHOWCASE.md`.
   - Document the complete data journey: from WebGIS point/polygon selection (`/dashboard/mapa`) through the Saxton-Rawls pF interactive simulation workstation (`/dashboard/suelos?tab=simulator`) to tri-modal machinery prescriptions and GEE script exports.

3. **Verification & Regression Testing**:
   - Run complete test suites (`npm run test:all`, `npm run typecheck`) to confirm 306/306 tests passing and 0 TypeScript errors after dependency and code pruning.

## Capabilities

### Modified Capabilities
- `repository-hygiene-and-secret-prevention`: Update requirements to enforce zero unreferenced legacy component wrappers and zero root-level documentation duplications.
- `role-based-documentation-and-navigation`: Expand requirements to mandate an end-to-end operational user guide for the federated Soil Module across WebGIS maps, interactive simulation sliders, and export hubs.

## Impact

- **Dependencies**: Pruning `react-leaflet` from `package.json` and lockfile.
- **Components**: Safe deletion of `src/components/gis/MapResizeSynchronizer.tsx`.
- **Documentation**: Cleaner root directory (`README.md`, `DEVELOPING.md`, `LICENSE`, `AGENTS.md`), centralized dossiers under `docs/`, and new operational guide `docs/GUIA_MODULO_SUELOS.md`.
- **Testing**: Zero regression across all 34 Jest suites and 17 Pytest modules.
