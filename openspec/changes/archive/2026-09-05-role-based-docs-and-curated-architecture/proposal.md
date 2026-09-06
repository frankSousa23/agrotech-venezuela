## Why

The repository documentation suffers from an identity crisis by trying to communicate simultaneously with developers, innovation jurors, and agricultural producers on a single linear page. At TRL 7 maturity, presenting flat 16-item lists and low-level microservice port topologies before establishing core value creates high cognitive friction, burying breakthrough innovations like Sentinel-1 all-weather SAR radar and AI advisory behind routine UI settings.

## What Changes

- **Role-Based Navigation (Navegación por Perfiles)**: Prominent visual entry badges at the top of `README.md` segmenting journeys for Developers (Docker, stack, 202 tests), Jurors/Investors (TRL 7, ROI 3.8x, Carbon Pooling, SDGs), and Farmers/Agronomists (Dual-Mode UI, 4 Doors, Offline PWA, Voice Dictation).
- **Curated Conceptual Dataflow Diagram**: Replace premature microservice/port schemas in introductory sections with an abstract, intuitive 3-stage data pipeline (`Satélites ➔ Cerebro IA ➔ Campo`).
- **3 High-Impact Pillars (Zero Flat 16-Item Lists)**: Restructure system capabilities into 3 thematic pillars (Pilar I: Inteligencia Espacial & Radar SAR; Pilar II: Operaciones de Campo & Accesibilidad Offline; Pilar III: Viabilidad Comercial, MRV Carbon Pooling & TRL 7) with a dedicated collapsible section for secondary UI ergonomics.
- **Collapsible Technical Deep-Dives (`<details>`)**: Encapsulate environment variables, Docker run profiles, SQLite WAL caching, and testing commands inside native HTML dropdowns, preserving 100% technical depth without visual clutter.
- **Metric Synchronization**: Update test badge to 202 Passing (150 Jest + 52 Pytest) across all root documentation.

## Capabilities

### New Capabilities
- `role-based-documentation-and-navigation`: Governs the role-based entry architecture, conceptual dataflow presentation, and collapsible technical encapsulation across project documentation.

### Modified Capabilities
- `docs/institutional-postulation-memorandum`: Expands navigation guidelines and cross-referencing between the institutional dossier, developer guide, and root repository entry points.

## Impact

- Documentation files: `README.md`, `DEVELOPING.md`, `PITCH_DECK.md`, `docs/MEMORANDO_POSTULACION.md`, `public/docs/MEMORANDO_POSTULACION.md`.
- Automated test suite: Retains 100% pass rate across 202 tests (150 Jest + 52 Pytest) and strict OpenSpec validation.
