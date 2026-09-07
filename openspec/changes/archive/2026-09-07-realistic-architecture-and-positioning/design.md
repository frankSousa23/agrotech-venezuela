## Context

See `proposal.md` for motivation.
Agrotech Venezuela was designed and developed by Frank Sousa as a software-first WebGIS, satellite observation, and agronomic intelligence platform for Venezuelan agriculture. During early external analysis, several aspects were misinterpreted as heavy industrial ambitions (e.g., hardware manufacturing, continuous cloud LLM bills, immediate international carbon market trading). This design aligns all project documentation, user interface banners, and official dossier artifacts with the author's real, pragmatic vision.

## Goals / Non-Goals

**Goals:**
- Present an honest and credible maturity level: **TRL 6** (Functional System Prototype demonstrated in a relevant environment with real multi-temporal data from Portuguesa, Zulia, and Monagas, positioned for pilot field validation).
- Establish the **Micro-crop IoT Lab** strictly as an **Educational Sandbox and BYOD Testbed**, confirming that Agrotech does not manufacture physical hardware and that 100% of core satellite capabilities operate without physical sensors.
- Articulate the **Pragmatic AI Architecture**, emphasizing that daily edaphic and meteorological calculations run locally at zero marginal cost, reserving Gemini 1.5 Flash (via Google AI Studio Free Tier) for on-demand complex synthesis.
- Center the value proposition on tangible agricultural priorities: input cost reduction (-35% fertilizer waste), soil correction (Kamprath), drainage detection via Sentinel-1 SAR, and rural voice accessibility.
- Reposition carbon credits as an exploratory, future-facing research module rather than a primary operational pillar.
- Recompile all 6 official PDFs and synchronize Markdown files across `docs/mapbiomas_premio_2026/` and `public/docs/`.

**Non-Goals:**
- Removing the interactive IoT simulator or firmware code generator (it remains a valuable educational and prototyping feature).
- Removing the carbon calculator (it remains an exploratory research tool for future climate finance modeling).
- Altering core geo-algorithms or database schemas.

## Decisions

### 1. Clear Educational Labeling on IoT View
- **Decision**: Update the header of `src/components/agronomy/MicrocropIoTLab.tsx` to include an explicit disclaimer badge: *"Laboratorio Didáctico y Sandbox de Experimentación (BYOD) — 100% Opcional. Agrotech Venezuela no comercializa ni requiere hardware físico para su operación satelital."*
- **Rationale**: Completely dispels the misconception of physical manufacturing and operational maintenance liabilities.

### 2. Honest TRL 6 Calibration Across Pitch Deck & Dossier
- **Decision**: Update `PITCH_DECK.md`, `POSTULACION_EXPEDIENTE_PREMIO_2026.md`, `MEMORANDO_POSTULACION.md`, and `MATRIZ_CUMPLIMIENTO_EVALUACION.md` to define the project as TRL 6.
- **Rationale**: In the European and NASA TRL scale, TRL 6 represents a fully integrated functional prototype validated with real spatial data in relevant operational environments. This conveys maximum technical credibility without overclaiming commercial enterprise deployment.

### 3. Pragmatic Free-Tier AI Model Documentation
- **Decision**: Document that the "Compadre Agrónomo" runs on a hybrid model: local deterministic calculations (Kamprath, Shoelace, Saxton-Rawls) execute instantly at $0.00 cost, and Gemini 1.5 Flash is invoked on-demand within Google AI Studio's Free Tier (15 RPM / 1,500 RPD), guaranteeing zero cloud debt.

### 4. Coordinated PDF Recompilation
- **Decision**: Execute `node scripts/compile_all_docs_to_pdf.js` and `py scripts/generate_prize_pdf.py` to regenerate all 6 PDFs in both `docs/mapbiomas_premio_2026/` and `public/docs/`, preserving clean pagination.

## Risks / Trade-offs

- **[Risk] Shift in narrative altering PDF page budgets** → Mitigation: Keep edits concise and verify that `Postulacion_Expediente_Premio_2026.pdf` remains at exactly 8 pages without orphan section breaks.
