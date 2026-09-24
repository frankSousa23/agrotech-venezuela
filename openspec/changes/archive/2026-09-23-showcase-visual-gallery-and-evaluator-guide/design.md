# Design

## Context

See `proposal.md` for motivation. The Agrotech Venezuela platform has been certified with 278 automated tests, 32 Next.js 16 production routes, and complete offline MapBiomas award dossier packages. However, external jurors, evaluators, and GitHub visitors who do not clone the codebase cannot currently visualize the platform in action, must navigate manually to find compiled PDFs, and lack an evaluation rubric connecting the repository's files to the 7 formal criteria of the MapBiomas Prize.

## Goals / Non-Goals

**Goals:**
- Provide immediate, high-definition visual evidence of the running platform directly on GitHub.
- Offer 1-click in-browser access to all 7 compiled award PDFs using GitHub's native PDF previewer.
- Deliver a dedicated `docs/GUIA_EVALUADOR.md` that maps the official MapBiomas Prize scoring criteria directly to code, tests, and APIs.
- Provide a collapsible test summary block in `README.md` containing the real execution report of all 278 automated tests.
- Highlight Sentinel-1 SAR C-Band radar as the solution for all-weather, cloud-penetrating crop monitoring in tropical Venezuela.

**Non-Goals:**
- Modifying runtime WebGIS code, spatial algorithms, Leaflet lifecycle hooks, or backend services.
- Altering the existing 278 automated test assertions or changing any API signatures.
- Introducing heavy video assets that bloat repository clone sizes.

## Decisions

### 1. Asset Placement & Curation (`docs/images/showcase/`)
- *Decision*: Store 6 curated, high-resolution PNG screenshots in `docs/images/showcase/` with standardized numerical prefixes:
  - `01_webgis_3_niveles.png` (WebGIS multi-scale viewer with MapBiomas 2024 and SAR radar).
  - `02_modo_productor_facil.png` (Dual-Mode UI with 4 large touch doors and voice dictation).
  - `03_retorno_inversion_costeo.png` (Operational ROI cost engine for mechanized vs smallholders).
  - `04_laboratorio_iot_riego.png` (Agro-IoT bench with ESP32 telemetry, PAW, and rain suppression).
  - `05_manual_agronomico_cabina.png` (Interactive manual and 1-page tractor cabin sheet).
  - `06_perfil_postulacion_mapbiomas.png` (Institutional postulation dossier hub and downloads).
- *Rationale*: PNG ensures crisp typography and line sharpness for user interfaces, while keeping total image asset footprint under 3 MB.

### 2. Native GitHub PDF Direct Links in `README.md`
- *Decision*: Link to `docs/mapbiomas_premio_2026/*.pdf` in a dedicated markdown table.
- *Rationale*: GitHub includes an embedded PDF viewer that renders the PDF directly in the evaluator's browser on desktop and mobile without requiring downloads.
- *Alternative Considered*: Linking only to markdown files. Rejected because PDFs contain formal letterheads, pagination, signatures, and pre-rendered vector graphics required for institutional evaluation.

### 3. Evaluator Rubric Matrix (`docs/GUIA_EVALUADOR.md`)
- *Decision*: Structure `docs/GUIA_EVALUADOR.md` around the exact 7 criteria from `public/docs/MATRIZ_CUMPLIMIENTO_EVALUACION.md`:
  - 1. Complejidad Técnica (20%)
  - 2. Impacto y Relevancia Agronómica/Ambiental (20%)
  - 3. Claridad y Estructura (15%)
  - 4. Viabilidad e Inclusión Rural (15%)
  - 5. Innovación Metodológica (15%)
  - 6. Aporte a MapBiomas Venezuela (5%)
  - 7. Rigor Científico y Reproducibilidad (10%)
- *Rationale*: Allows jurors to verify claims in minutes by clicking directly on exact file paths, line ranges, and test suites.

### 4. Collapsible Terminal Output via HTML `<details>`
- *Decision*: Embed the categorized output of `npm run test:summary` inside a `<details><summary>` block in `README.md`.
- *Rationale*: Keeps `README.md` clean and scannable while providing unforgeable proof of test coverage across frontend and backend modules.

## Risks / Trade-offs

- **[Risk: README bloat]** → *Mitigation*: The main README will present a compact 3x2 image grid preview linking to `docs/SHOWCASE.md` for in-depth explanations, preserving the agile structure of `README.md`.
- **[Risk: Test assertion breaks on documentation]** → *Mitigation*: `__tests__/api/security-and-dossier.test.ts` checks for `'278 pruebas automatizadas'` and `'32 rutas'`. All additions strictly maintain these metrics.
