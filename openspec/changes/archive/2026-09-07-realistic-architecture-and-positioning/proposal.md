## Why

Following an architectural and strategic review of the project's vision, several narrative and architectural claims require recalibration to match the actual implementation and real-world rural context:
1. **IoT Scope**: Agrotech Venezuela is a software platform, not a physical hardware manufacturer. The IoT module is an isolated educational sandbox (Micro-crop IoT Lab) designed to demonstrate compatibility and experimentation, rather than an operational dependency.
2. **AI & Cloud Viability**: Clarify that Gemini AI is invoked pragmatically and on-demand for complex diagnostic queries (leveraging Google AI Studio's free tier), while day-to-day calculations run on local deterministic engines with $0.00 compute cost.
3. **TRL Level Realism**: Ground the maturity level honestly as TRL 6 (a fully integrated functional prototype validated with real Venezuelan spatial data and operational APIs, currently preparing for structured in-field pilot testing) rather than claiming full commercial enterprise deployment.
4. **Carbon Credits Repositioning**: Frame carbon credits and MRV as an exploratory, future-facing economic research model rather than the primary operational core, centering the platform's value on what Venezuelan producers need today: soil recovery, fertilizer cost reduction, drainage management via SAR radar, and offline vernacular usability.

## What Changes

- **PITCH_DECK.md & Documentation Recalibration**: Update TRL definitions across `PITCH_DECK.md`, `POSTULACION_EXPEDIENTE_PREMIO_2026.md`, `MEMORANDO_POSTULACION.md`, and `README.md` to accurately reflect TRL 6 (Functional System Prototype demonstrated in relevant environment with real multi-temporal data).
- **IoT Lab Decoupling & BYOD Policy**: Explicitly document in `MicrocropIoTLab.tsx` and architectural documentation that Agrotech Venezuela does not produce hardware; the IoT lab is an optional educational testbed and sandbox for small-scale experiments (indoor/outdoor), with zero hardware required for core platform functionality.
- **Pragmatic AI & Zero-Cost Architecture**: Document the on-demand, free-tier-optimized AI model where Gemini 1.5 Flash is reserved for unstructured contextual queries, while routine edaphic calculations run locally at zero marginal cost.
- **Core Agronomic Focus**: Re-anchor the value proposition on tangible Venezuelan agricultural realities (fertilizer savings, soil acidity mitigation, flooding prevention via Sentinel-1 SAR) while keeping carbon pooling as an auxiliary research module.
- **Dossier & PDF Recompilation**: Recompile all official dossier PDFs so that web downloads reflect the grounded, credible narrative.

## Capabilities

### Modified Capabilities
- `interactive-iot-microcrop-lab`: Clarifies the decoupled, educational, and hardware-agnostic (BYOD) nature of the IoT sandbox.
- `prize-publication-exporter`: Recalibrates the dossier narrative, TRL status (TRL 6 integrated prototype), pragmatic AI on-demand usage, and prioritized agricultural focus over carbon speculation.

## Impact

- `PITCH_DECK.md` (root, `public/docs/`, `docs/mapbiomas_premio_2026/`)
- `POSTULACION_EXPEDIENTE_PREMIO_2026.md`
- `MEMORANDO_POSTULACION.md`
- `MATRIZ_CUMPLIMIENTO_EVALUACION.md`
- `src/components/agronomy/MicrocropIoTLab.tsx`
- `scripts/generate_prize_pdf.py` and `scripts/compile_all_docs_to_pdf.js`
- Generated PDFs in `public/docs/` and `docs/mapbiomas_premio_2026/`
