# repository-showcase-and-evaluator-guide Specification

## Purpose

Provides external evaluators, jury members, and researchers with an immediate visual tour of the operational WebGIS and agronomic platform, 1-click in-browser access to official MapBiomas Prize PDFs, and a structured evaluation roadmap without requiring local repository cloning or execution.

## Requirements

### Requirement: High-Definition Operational UI Showcase
The repository SHALL provide a dedicated visual showcase document (`docs/SHOWCASE.md`) and a curated visual gallery in `README.md` displaying high-resolution screenshots of the running platform stored in `docs/images/showcase/`. The showcase SHALL cover:
1. The 3-Level WebGIS Viewer (`/dashboard/mapa`) displaying MapBiomas Colección 3.0 (1985–2024), Sentinel-1 SAR cloud penetration layers, and parcel vector drawing.
2. The Dual-Mode UI (*Modo Productor Fácil*) showing the 4 giant tactile action doors, high-contrast sunlight design, and native Web Speech voice dictation.
3. The Decoupled Operational ROI Costing Engine (`/dashboard/tierras`) contrasting mechanized diesel profiles against smallholder sack/labor structures, with carbon markets modeled separately.
4. The Agro-IoT Research Bench (`/dashboard/iot`) featuring ESP32 telemetry, Saxton-Rawls dynamic PAW balance, and NASA POWER rain suppression.
5. The Interactive Agronomic Field Manual (`/dashboard/manual`) and printable 1-page tractor cabin quick reference sheet.
6. The Official Postulation Dossier Hub (`/dashboard/postulacion`) with live quality verification badges and document download cards.

#### Scenario: Inspecting Platform Interface Without Cloning
- **WHEN** an evaluator, researcher, or juror visits the repository on GitHub without cloning or starting a development server
- **THEN** they can view clear, annotated screenshots of the operational WebGIS, Dual-Mode farmer interface, and agronomic tools in `README.md` and `docs/SHOWCASE.md`.

### Requirement: 1-Click Native Award PDF Access Table
The repository `README.md` and submission documentation SHALL feature an executive access table providing direct 1-click markdown links to all 7 compiled official PDF submission files in `docs/mapbiomas_premio_2026/` for immediate in-browser rendering via GitHub's native PDF previewer:
1. `Articulo_Tecnico_Agrotech_MapBiomas_2026.pdf`
2. `Postulacion_Expediente_Premio_2026.pdf`
3. `Memorando_Postulacion_Agrotech_2026.pdf`
4. `Matriz_Cumplimiento_Evaluacion_2026.pdf`
5. `Pitch_Deck_Agrotech_Venezuela_2026.pdf`
6. `Guia_Postulacion_MapBiomas_2026.pdf`
7. `Anexo_I_Declaracion_Jurada_Frank_Sousa.pdf`

#### Scenario: Reading Official Prize PDFs on GitHub
- **WHEN** an evaluator clicks on any PDF entry in the `README.md` award documentation table
- **THEN** GitHub renders the corresponding compiled PDF directly in the browser with full typography, mathematical formulas, and analytical Plotly charts without requiring manual downloading.

### Requirement: MapBiomas Prize Evaluator Audit Roadmap
The repository SHALL provide a fast-track audit guide (`docs/GUIA_EVALUADOR.md`) mapping each of the 7 official evaluation criteria defined in the bases of the Segunda Edición del Premio MapBiomas Venezuela 2026 directly to the corresponding source files, algorithms, API endpoints, and automated tests:
1. Complejidad Técnica (20%): MapBiomas 40-year trajectory, Sentinel-1 SAR C-Band radar, Shoelace WGS84 ellipsoidal geodesics, Saxton-Rawls PAW.
2. Impacto y Relevancia Agronómica/Ambiental (20%): Kamprath acid soil liming, dolomitic lime balance (Ca:Mg), Quíbor gypsum correction, IPCC Tier 2 / Verra VCS carbon MRV.
3. Claridad y Estructura (15%): Next.js 16 Turbopack architecture, 32 production routes, OpenAPI 3.0 documentation, and live KaTeX formulas.
4. Viabilidad e Inclusión Rural (15%): Modo Productor Fácil, Web Speech API native voice dictation, Venezuelan vernacular unit parsing, and offline IndexedDB/SQLite WAL caching.
5. Innovación Metodológica (15%): Multidecadal historical land use as an edaphic proxy, cloud-penetrating SAR radar, and tri-modal machinery prescriptions (SHP VRA, KML, cabin sheet).
6. Aporte a MapBiomas Venezuela (5%): Direct field operationalization of Colección 3.0 (1985–2024) for tractor and field decision-making.
7. Rigor Científico y Reproducibilidad (10%): MIT Open Source license, 278 automated tests passing (100% OK), zero cloud debt.

#### Scenario: Auditing Specific Evaluation Criteria
- **WHEN** a juror consults `docs/GUIA_EVALUADOR.md` to evaluate a specific scoring criterion (e.g., Inclusión Rural or Complejidad Técnica)
- **THEN** the guide presents the exact file paths, line numbers, API routes, and verification tests corresponding to that criterion.
