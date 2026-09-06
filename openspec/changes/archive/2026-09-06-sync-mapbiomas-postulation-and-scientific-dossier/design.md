# Technical Design: MapBiomas Postulation Synchronization and Scientific Dossier

## Context

See `proposal.md` for motivation. Currently, `public/docs/ARTICULO_CIENTIFICO_DRAFT.md` and `public/docs/MATRIZ_CUMPLIMIENTO_EVALUACION.md` cite legacy metrics (148 tests and 28 routes), omitting critical architectural components developed in recent iterations (Dual-Mode UI, Saxton-Rawls dynamic PAW model with IoT, Sentinel-1 SAR radar oracle for MRV, universal precision machinery VRA packages, and deterministic offline conflict resolution). The compiled PDF `Articulo_Cientifico_Agrotech_MapBiomas_2026.pdf` was generated on August 30 and requires a fresh, publication-grade compilation to reflect the current state of the project and author **Frank Sousa**.

## Goals / Non-Goals

**Goals:**
- Provide a rigorous, academic, and publication-ready scientific article (`ARTICULO_CIENTIFICO_DRAFT.md`) conforming to the official rules of the Segunda Edición del Premio MapBiomas Venezuela 2026.
- Cement author attribution to **Frank Sousa**, MIT open-source code licensing, and MapBiomas CC BY 4.0 data terms across all postulation assets.
- Update the Evaluation Compliance Matrix (`MATRIZ_CUMPLIMIENTO_EVALUACION.md`) to 227 automated tests and TRL 7 operational proof.
- Compile a publication-grade PDF (`Articulo_Cientifico_Agrotech_MapBiomas_2026.pdf`) using `md-to-pdf` with A4 formatting, clean typography, and KaTeX mathematical formulas.
- Verify word count compliance (< 10,000 words) using `scripts/generate_prize_pdf.py`.

**Non-Goals:**
- Modifying backend core algorithms or GIS endpoints (these are already validated and passing 227 tests).
- Redesigning the `/dashboard/postulacion` page layout (it already features the 5-step tour, commercial metrics, and download links).

## Decisions

### Decision 1: Author Attribution and Licensing Architecture
- **Choice**: Display Frank Sousa as Principal Author and Investigator, with explicit MIT License for the Agrotech Venezuela codebase and Creative Commons CC BY 4.0 attribution for MapBiomas Venezuela data.
- **Rationale**: Complies with MapBiomas Venezuela Prize Rules (Punto 4.4 and Anexo I) requiring open-source access, public GitHub repository reference, and formal source attribution (`https://venezuela.mapbiomas.org/terminos-de-uso/`).

### Decision 2: Markdown Synchronization & Dual Directory Structure
- **Choice**: Maintain `public/docs/ARTICULO_CIENTIFICO_DRAFT.md` as the public downloadable markdown and synchronize it to `docs/mapbiomas_premio_2026/ARTICULO_CIENTIFICO_DRAFT.md`.
- **Rationale**: Ensures that evaluators viewing the repository via GitHub or through the WebGIS `/dashboard/postulacion` hub access identical, up-to-date manuscripts.

### Decision 3: PDF Generation via `md-to-pdf`
- **Choice**: Use `npx md-to-pdf` with Chromium headless and sandbox disabled (`--no-sandbox`) with A4 margins to compile `public/docs/Articulo_Cientifico_Agrotech_MapBiomas_2026.pdf`.
- **Rationale**: Generates vector-quality typography and renders embedded math notation and tables with higher fidelity than ad-hoc python scripts.

## Risks / Trade-offs

- **[Risk] Word count overflow**: The MapBiomas rules set a strict limit of 10,000 words for the main body.
  - *Mitigation*: Run `scripts/generate_prize_pdf.py` to audit word count. The target paper is structured between 4,500 and 6,500 words, well within the 10,000-word limit.
- **[Risk] Math rendering issues in PDF**: Complex LaTeX/KaTeX formulas might fail in simple HTML converters.
  - *Mitigation*: Format equations using standard GitHub-compatible math syntax and test compile with `md-to-pdf`.
