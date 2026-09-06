# Proposal: Synchronize MapBiomas Postulation, Author Details, and Scientific Dossier

## Why

The scientific article, evaluation criteria compliance matrix, and compiled PDF (`Articulo_Cientifico_Agrotech_MapBiomas_2026.pdf`) for the Segunda Edición del Premio MapBiomas Venezuela 2026 contain outdated system metrics (stating 148 tests instead of the current 227 tests, and 28 routes instead of 30 routes) and do not reflect recent architectural breakthroughs (Dual-Mode UI, Saxton-Rawls dynamic PAW model with IoT, Sentinel-1 SAR radar oracle for MRV, universal precision machinery VRA packages, deterministic offline conflict resolution, and QoS 2-channel sync). 

Furthermore, explicit author attribution to **Frank Sousa**, open-source MIT licensing, and formal MapBiomas CC BY 4.0 data terms must be seamlessly cemented across all postulation assets, dossiers, and the compiled scientific PDF to present a cohesive, competitive, and publication-ready submission package for the evaluation committee.

## What Changes

- **Update Scientific Manuscript**: Update `public/docs/ARTICULO_CIENTIFICO_DRAFT.md` and `docs/mapbiomas_premio_2026/ARTICULO_CIENTIFICO_DRAFT.md` with complete author attribution (Frank Sousa), institutional affiliations, dual-licensing notice (MIT for code, CC BY 4.0 for MapBiomas data), mandatory terms-of-use citation, up-to-date system metrics (**227 automated tests: 173 Jest + 54 Pytest**, **30 Next.js 16 Turbopack production routes**), and technical coverage of Dual-Mode UI, Saxton-Rawls PAW, SAR Sentinel-1 oracle, machinery VRA Shapefiles/KML, and Agrotech Carbon Pooling.
- **Update Evaluation Compliance Matrix**: Update `public/docs/MATRIZ_CUMPLIMIENTO_EVALUACION.md` aligning the project's current state with all 6 official jury evaluation criteria (Anexo II of the Prize Rules), upgrading technical complexity and social impact evidence to 227 tests and TRL 7 operational deployment.
- **Harmonize Submission Dossiers**: Synchronize `docs/mapbiomas_premio_2026/POSTULACION_EXPEDIENTE_PREMIO_2026.md` and verify `scripts/generate_prize_pdf.py` for formal word-count compliance (< 10,000 words) and high-resolution analytical figures.
- **Compile Publication-Grade PDF**: Generate an updated, publication-ready PDF document `public/docs/Articulo_Cientifico_Agrotech_MapBiomas_2026.pdf` using `md-to-pdf` (A4 format, full KaTeX mathematical typesetting, high-definition styling, and author metadata) replacing the outdated August 30 build.
- **Verify WebGIS Postulation Hub**: Ensure that `src/app/dashboard/postulacion/page.tsx` references and provides clean downloads of the updated PDF and Markdown documents with zero broken links.

## Capabilities

### Modified Capabilities
- `prize-publication-exporter`: Update requirements to reflect the 227-test validation suite, 30 production routes, unified author Frank Sousa metadata, full edaphic and SAR radar formulas, dual-mode UI, and the regenerated publication-grade PDF under MapBiomas Prize 2026 guidelines.
- `docs/institutional-postulation-memorandum`: Update requirements to explicitly state licensing (MIT code / CC BY 4.0 data) and author Frank Sousa across technical memorandum files.

## Impact

- **Affected Files**:
  - `public/docs/ARTICULO_CIENTIFICO_DRAFT.md`
  - `public/docs/MATRIZ_CUMPLIMIENTO_EVALUACION.md`
  - `public/docs/Articulo_Cientifico_Agrotech_MapBiomas_2026.pdf`
  - `docs/mapbiomas_premio_2026/ARTICULO_CIENTIFICO_DRAFT.md`
  - `docs/mapbiomas_premio_2026/POSTULACION_EXPEDIENTE_PREMIO_2026.md`
  - `scripts/generate_prize_pdf.py`
  - `src/app/dashboard/postulacion/page.tsx`
- **APIs & Dependencies**: No breaking API changes; utilizes `md-to-pdf` for document compilation. All 227 automated tests remain 100% green.
