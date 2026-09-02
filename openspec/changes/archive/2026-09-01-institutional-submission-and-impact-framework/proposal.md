## Why

When presenting Agrotech Venezuela to institutional evaluators, innovation programs, academic boards, and agricultural extension bodies, the project needs an impeccable, high-rigor submission framework. This includes a comprehensive Technical Memorandum (Whitepaper) documenting its TRL 7 maturity, scientific equations (Shoelace WGS84, Sentinel-1 SAR Radar dB, GDD Hydro-thermal, IPCC Tier 2 SOC), a dedicated Evaluator Demo Tour route, and clear alignment with Sustainable Development Goals (SDG / ODS 2, 12, 13) and farmer ROI.

## What Changes

- **Institutional Technical Memorandum (`docs/MEMORANDO_POSTULACION.md`)**: A complete, formal technical whitepaper detailing the executive summary, problem-solution matrix, TRL 7 validation status, architectural layers, scientific formulas, and citations to MapBiomas, Provita, NASA POWER, and IPCC.
- **Interactive Project Profile & Evaluator Tour (`src/app/dashboard/postulacion/page.tsx`)**: A dedicated route in the platform providing a 5-minute guided walkthrough for technical reviewers, live platform KPIs (TRL 7, 24 states, 1,245 soil samples, 89 automated tests, offline resilience), and scientific methodology cards.
- **ESG & SDG Impact Badges in Landing (`src/components/landing/LandingFeatures.tsx`)**: Prominent impact indicators for ODS 2 (Hambre Cero), ODS 12 (Producción Responsable), and ODS 13 (Acción por el Clima), plus ROI metrics (cost reduction from \$150 to \$0, prevention of 45% fertilizer loss due to aluminum toxicity).
- **Navigation Link to Project Dossier (`src/app/dashboard/layout.tsx` & Landing Navbar)**: Direct navigation item allowing reviewers and guests to easily inspect the institutional technical dossier at any time.

## Capabilities

### New Capabilities
- `docs/institutional-postulation-memorandum`: Formal technical whitepaper for institutional submissions and evaluation committees.
- `ux/evaluator-project-profile`: Dedicated project overview and evaluator tour route (`/dashboard/postulacion`).
- `ux/sdg-impact-indicators`: Visual ESG/ODS alignment cards and farmer ROI metrics.

### Modified Capabilities
- `interactive-landing-ecosystem`: Landing page updated with institutional submission highlights and direct evaluator tour links.
- `agronomic-dossier-exporter`: Technical dossier generator updated with formal postulation headers and academic citations.

## Impact

- `docs/MEMORANDO_POSTULACION.md`: New formal technical memorandum.
- `src/app/dashboard/postulacion/page.tsx`: New interactive project dossier route.
- `src/app/dashboard/postulacion/page.module.css`: New glassmorphic styles for the project profile view.
- `src/app/dashboard/layout.tsx`: Added "Acerca del Proyecto" link under system tools.
- `src/components/landing/LandingFeatures.tsx`: Added ODS/ESG impact metrics section.
- Zero database migrations required; backward-compatible.
