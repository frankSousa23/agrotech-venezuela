## Context

See `proposal.md - Why` for motivation. Agrotech Venezuela has reached complete technical operational readiness (TRL 7). To present the project to institutional reviewers, evaluation committees, and agricultural innovation programs, the platform requires an authoritative technical memorandum, an interactive evaluator tour route, and clear ESG/ODS impact quantification, completely free of competition/prize jargon.

## Goals / Non-Goals

**Goals:**
- Author a formal Institutional Technical Memorandum (`docs/MEMORANDO_POSTULACION.md`) with executive summary, mathematical formulas, and scientific citations.
- Create a dedicated interactive route at `/dashboard/postulacion` presenting the 5-minute Evaluator Tour, scientific algorithms, and live platform health metrics.
- Add ODS 2, 12, 13 impact indicators and farmer ROI metrics to the landing ecosystem.
- Expose the project profile directly in the dashboard sidebar navigation.

**Non-Goals:**
- Changing database schemas or altering backend spatial endpoints.
- Introducing external analytics or tracking scripts.
- Modifying core Leaflet map rendering or drawing logic.

## Decisions

### 1. Structure of the Technical Memorandum (`docs/MEMORANDO_POSTULACION.md`)
- **Decision**: Structured following standard academic and institutional whitepaper standards (Executive Summary, TRL 7 Status, Multi-Layer Architecture, Mathematical Formulations, ESG/ODS Matrix, Rural Deployment Strategy, and Open Data Licensing).
- **Why**: Provides evaluators with an exhaustive, self-contained reference document that proves the scientific depth and technological maturity of the project.

### 2. Dedicated In-App Evaluator Tour Route (`/dashboard/postulacion`)
- **Decision**: Built as a responsive Next.js client component with glassmorphic cards, progressive disclosure, and 1-click jumps to the 5 core platform sections (Guest Sandbox, WebGIS, Asesor IA, Cuaderno de Campo, OpenAPI Docs).
- **Why**: Evaluators can verify every claim within 5 minutes directly in the running web application without reading thousands of lines of source code.

### 3. Quantified Impact Indicators (ODS 2, 12, 13)
- **Decision**: Integrated into `LandingFeatures.tsx` and the project profile page with exact numerical metrics (\$0 barrier vs \$150 lab cost, +40% fertilizer absorption efficiency, up to 3.85 tCO2e/ha/year).
- **Why**: Grounds the project in tangible economic and ecological outcomes for Venezuelan agriculture.

## Risks / Trade-offs

- **[Risk] Information density**: Too much text on the evaluator page may overwhelm casual users. → **Mitigation**: Use modular cards with expandable details and concise KPI badges.
- **[Risk] Styling consistency across dark/light/sunlight modes**: → **Mitigation**: Use CSS module tokens and `data-theme` overrides already established across the application.

## Migration Plan

1. Purely additive documentation and UI route.
2. 0 breaking changes to existing routes or APIs.
3. Accessible immediately in both production build and local dev.
