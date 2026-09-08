## Context

Agrotech Venezuela is an open-source software project built by Frank Alfonso Sousa Mota (Ingeniero en Informática, UNERG 2025). Previous iterations overclaimed TRL 6 maturity, empirical field harvests, and dual-category submissions. See `proposal.md` for motivation. This design articulates how to calibrate the narrative, documentation, UI, and compiled artifacts to TRL 4, Technical Article format, Categoría General, and computational modeling scenarios.

## Goals / Non-Goals

**Goals:**
- Transition the core postulation deliverable from "Artículo Científico" to **"Artículo Técnico"** across all files (`ARTICULO_TECNICO_DRAFT.md` and compiled `Articulo_Tecnico_Agrotech_MapBiomas_2026.pdf`).
- Unify submission category strictly as **Categoría General** in all forms, matrices, and metadata.
- Re-anchor technology maturity to **TRL 4** (*Prototipo Funcional de Software Validado en Entorno de Desarrollo y Simulación Local*) backed by 233 automated tests, including a structured Roadmap to TRL 5 and TRL 6.
- Reframe agronomic cases (Turén and Calabozo) as **"Escenarios de Modelado y Simulación Computacional"** based on historical MapBiomas data and pedological equations.
- Present economic ROI and carbon accounting as **algorithmic projection tools** for forward-looking farmer assistance.
- Update UI in `/dashboard/postulacion` and recompile all 6 official publication PDFs.
- Guarantee 0 TypeScript errors and 233 passing tests (179 Jest + 54 Pytest).

**Non-Goals:**
- Modifying underlying calculation engines (Shoelace, Kamprath, Saxton-Rawls, SAR retrodispersion logic remain intact and fully functional).
- Altering core WebGIS Leaflet maps or UI architectures.
- Altering authentication, Prisma schemas, or backend FastAPI routing.

## Decisions

### 1. Document Renaming and Structure
- **Decision**: Refactor `ARTICULO_CIENTIFICO_DRAFT.md` to `ARTICULO_TECNICO_DRAFT.md` (and PDF `Articulo_Tecnico_Agrotech_MapBiomas_2026.pdf`) in both `docs/mapbiomas_premio_2026/` and `public/docs/`.
- **Rationale**: Official MapBiomas Bases (Página 3, punto 3.1) accept Technical Articles. A Technical Article centers on computer science, geospatial system design, and data integration rather than empirical biological field trials.
- **Alternatives considered**: Submitting as "Reporte Técnico" (less standard in academic award tracks) or keeping "Artículo Científico" (leaves the author vulnerable to biological and agronomic field trial inquiries).

### 2. TRL Calibration to Level 4 with Roadmap
- **Decision**: Adopt TRL 4 as the official system maturity status across all documents and platform badges.
- **Rationale**: Under ISO 16290 and NASA standards, TRL 4 represents "Component and/or breadboard validation in laboratory environment". In software engineering, this corresponds to a fully programmed, tested, and integrated codebase running locally with synthetic or historical data. Adding an explicit Roadmap towards TRL 5 (cloud deployment / pilot) and TRL 6 (field trials with producer associations) demonstrates rigorous engineering planning.
- **Alternatives considered**: Keeping TRL 6 (dishonest, as no operational field testing with real tractors was conducted) or dropping to TRL 3 (understates the fact that the full software stack and 233 tests are functional).

### 3. Simulation Scenario Framing
- **Decision**: Rephrase Turén (maize) and Calabozo (rice) as "Escenarios de Modelado y Simulación Computacional".
- **Rationale**: Emphasizes the software's ability to model soil deficits and water dynamics without asserting that Frank personally harvested the crops.
- **Alternatives considered**: Deleting the cases entirely (would weaken the demonstrative value of the platform).

### 4. Algorithmic Projection for Economic ROI and Carbon MRV
- **Decision**: Frame ROI (3.8x) and Carbon Sequestration (3.85 tCO2e/ha/yr) as prospective calculations produced by the platform's decision-support models.
- **Rationale**: Shows the algorithmic depth of the software while being completely transparent about the need for multi-year field adoption to verify real-world realization.

## Risks / Trade-offs

- **[Risk] Broken download links on `/dashboard/postulacion`** → **Mitigation**: Update all links to `Articulo_Tecnico_Agrotech_MapBiomas_2026.pdf` in `src/app/dashboard/postulacion/page.tsx` and verify `scripts/compile_all_docs_to_pdf.js` generates the exact filenames.
- **[Risk] Perceived drop in readiness from TRL 6 to TRL 4** → **Mitigation**: Evaluators heavily penalize unsubstantiated claims. A verified TRL 4 with 233 automated tests and a transparent roadmap inspires far higher confidence than an unverified TRL 6.
