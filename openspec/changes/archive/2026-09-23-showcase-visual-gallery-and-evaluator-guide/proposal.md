# Proposal

## Why

External evaluators, jury members of the MapBiomas Venezuela 2026 Prize, agronomists, and researchers frequently inspect the repository directly through GitHub's web interface without cloning, installing Node.js/Python, or running development servers. While the codebase is certified with 278 automated tests, 32 Next.js 16 Turbopack routes, and zero TypeScript errors, the GitHub repository currently presents only one conceptual infographic and does not visually showcase the actual running WebGIS interface, the Dual-Mode farmer UX, the operational ROI cost engine, or the Agro-IoT lab. Furthermore, the 7 official compiled award PDFs are not directly linked for 1-click in-browser reading via GitHub's native PDF previewer, and there is no direct navigation guide mapped to the 7 official evaluation criteria of the MapBiomas Prize.

## What Changes

- **Visual Showcase Gallery (`docs/SHOWCASE.md` & `README.md` Gallery Section)**: Curate and store high-definition operational screenshots in `docs/images/showcase/` (WebGIS 3-level viewer with MapBiomas/SAR layers, Dual-Mode tactile Farmer Mode with Web Speech voice dictation, decoupled operational ROI costing for smallholders vs mechanized farms, Agro-IoT lab research bench with ESP32 and NASA POWER rain suppression, interactive agronomic manual with tractor cabin sheet, and official postulation dossier hub).
- **1-Click Native PDF Reader Table in `README.md`**: Embed an executive table linking directly to the 7 compiled official PDF files in `docs/mapbiomas_premio_2026/` for immediate in-browser reading on GitHub.
- **Fast-Track Evaluator Rubric Guide (`docs/GUIA_EVALUADOR.md`)**: Create a structured audit guide mapping each of the 7 official MapBiomas Prize evaluation criteria (Technical Complexity, Agronomic/Environmental Impact, Clarity & Structure, Rural Usability & Inclusion, Methodological Innovation, Contribution to MapBiomas, Scientific Rigor & Reproducibility) directly to the corresponding source code files, API routes, mathematical models, and automated tests in the repository.
- **Collapsible Automated Test Breakdown in `README.md`**: Provide an expandable `<details>` section with the exact categorized output of `npm run test:summary` (224 Jest tests in 33 suites + 54 Pytest tests in 17 modules = 278 tests) so evaluators can inspect verification results without cloning.
- **Explicit Cloud-Penetrating SAR Radar Highlighting**: Emphasize how Sentinel-1 SAR C-Band (5.405 GHz VV/VH) overcomes the persistent tropical cloud barrier (>75% cloud cover) during Venezuela's rainy commercial planting season.

## Capabilities

### New Capabilities
- `repository-showcase-and-evaluator-guide`: Visual platform showcase, in-browser PDF direct access, and MapBiomas Prize evaluator audit roadmap for visitors exploring the repository without local execution.

### Modified Capabilities
- `system-status-synchronization`: Update documentation standards to mandate the showcase gallery, 1-click PDF access table, and evaluator rubric guide across repository overviews.

## Impact

- **Affected Files**:
  - `README.md` (Showcase gallery preview, 1-click PDF table, collapsible test summary, SAR radar emphasis)
  - `docs/SHOWCASE.md` (Comprehensive visual tour with high-resolution screenshots and feature annotations)
  - `docs/GUIA_EVALUADOR.md` (Audit matrix aligned with the 7 MapBiomas award criteria)
  - `docs/images/showcase/` (Directory storing curated operational screenshots)
- **Code & API Impact**: None. Zero modifications to runtime WebGIS code, spatial algorithms, or backend services. All existing 278 automated tests and 32 production routes remain untouched and 100% passing.
