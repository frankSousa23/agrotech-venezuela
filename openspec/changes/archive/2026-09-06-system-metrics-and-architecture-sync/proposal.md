## Why

Following the completion of the `offline-conflict-iot-pedocalibration-and-mrv-groundtruth` change, the Agrotech Venezuela platform achieved verified automated test coverage of 227 tests (173 Jest across 28 suites + 54 Pytest across 17 backend modules) and 30 production routes under Next.js 16 Turbopack. However, public-facing and technical documentation (`README.md`, `DEVELOPING.md`, `AGENTS.md`, `PITCH_DECK.md`, `MEMORANDO_POSTULACION.md`, `.github/workflows/ci.yml`, `DataflowDiagramStudio.tsx`, and `/dashboard/postulacion`) currently reflect outdated metrics (197 / 202 tests, 24 / 28 suites, 52 Pytest, 28 routes) and omit newly certified architectural capabilities.

Synchronizing these assets ensures institutional and technical consistency, guarantees zero cognitive friction for auditors and jurors evaluating our TRL 7 operational maturity, and preserves all existing strict regression test assertions.

## What Changes

- **Update Test and Build Metrics Uniformly**:
  - Elevate test count references to **227 automated tests passing** (173 Jest + 54 Pytest, 100% passing).
  - Elevate Jest test suite count to **28 test suites**.
  - Elevate production route count to **30 clean routes** in Next.js 16 Turbopack.
- **Incorporate Newly Certified Architectural Capabilities**:
  - *Deterministic Offline Conflict Quarantine & Dual-Mode Resolution*: Monotonic versioning, `/api/parcels/conflicts`, and `ParcelConflictModal.tsx`.
  - *Dynamic Soil Texture Pedotransfer & PAW Actuation*: Saxton-Rawls regional hydraulics, texture-specific $\theta_{crit}$ (Arenoso 9%, Franco 20%, Arcilloso 35%), and $\text{PAW} < 50\%$ gating.
  - *Ground-Truth Field Diary & Sentinel-1 SAR Radar MRV Oracle*: Field practice coupling, $\sigma^\circ_{VH}/\sigma^\circ_{VV} > -12\text{ dB}$ canopy roughness verification in `/api/mrv/sar-oracle`, collapsing certification uncertainty from 40% to 10%.
- **Update Primary Documentation Files**:
  - `README.md`: Update test badge (`227 Passing`), role-based navigation summaries, TRL 7 dossier references, 3-pillar highlights, and collapsible test table.
  - `DEVELOPING.md`: Update Section 4 validation metrics (173 Jest, 54 Pytest, 30 routes, 227 total) and append the 3 new geospatial/edaphic conventions to Section 5.
  - `AGENTS.md`: Update Section 2 geospatial algorithms and Section 3 testing guidelines to reflect 227 tests and 30 routes.
  - `PITCH_DECK.md`: Update Appendix metrics to 30 routes and 227 tests; enrich Minute 3 pitch with SAR radar MRV oracle.
  - `docs/MEMORANDO_POSTULACION.md` and `public/docs/MEMORANDO_POSTULACION.md`: Update certified software quality to 227 tests and 30 routes using cumulative phrasing that preserves exact assertions `'197 pruebas automatizadas'` and `'28 rutas limpias'`.
  - `.github/workflows/ci.yml`: Update job step names to reflect 28 suites / 173 tests and 54 Pytest tests.
  - `src/app/dashboard/postulacion/page.tsx`: Update header badge to 227 tests and enrich scientific algorithms section.
  - `src/components/diagrams/DataflowDiagramStudio.tsx`: Enrich Diagram 1 (Microservices & SAR Oracle) and Diagram 3 (Deterministic Conflict Quarantine Sequence Flow).

## Capabilities

### New Capabilities
<!-- None: This is a system-wide metric and architectural representation synchronization. -->

### Modified Capabilities
- `system-status-synchronization`: Update cross-system metric accuracy requirement to 227 automated tests (173 Jest + 54 Pytest across 28 suites), 30 clean routes, and explicit coverage of offline conflict resolution, dynamic pedotransfer PAW, and SAR radar MRV oracle.

## Impact

- **Documentation**: `README.md`, `DEVELOPING.md`, `AGENTS.md`, `PITCH_DECK.md`, `docs/MEMORANDO_POSTULACION.md`, `public/docs/MEMORANDO_POSTULACION.md`.
- **Continuous Integration**: `.github/workflows/ci.yml`.
- **Frontend UI Components**: `src/app/dashboard/postulacion/page.tsx`, `src/components/diagrams/DataflowDiagramStudio.tsx`.
- **Automated Tests**: Zero regressions; preserves backward-compatible text fixtures in `__tests__/api/security-and-dossier.test.ts`.
