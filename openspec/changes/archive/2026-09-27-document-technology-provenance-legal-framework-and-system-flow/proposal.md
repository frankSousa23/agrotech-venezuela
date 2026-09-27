# Proposal

## Why

While Agrotech Venezuela integrates cutting-edge remote sensing, agroclimatology, and machine learning technologies (ESA Copernicus Sentinel-1/2, NASA POWER/SRTM, MapBiomas Venezuela Collection 3.0, Gemini 1.5 Flash), the repository and public application interfaces currently lack a dedicated, centralized canonical document and user-facing surface that exhaustively details the legal provenance, international regulatory frameworks, data usage permits, exact operational purposes, and creative process driving the platform's multi-layered architecture. Evaluators, jurists (such as the MapBiomas Venezuela 2026 Prize Committee), researchers, and institutional partners require transparent, auditable evidence proving compliance with European space directives, NASA open data policies, Creative Commons licensing, and a clear conceptual walkthrough of the end-to-end system data pipeline.

## What Changes

- Create a comprehensive canonical document `docs/DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md` and its synchronized public download counterpart `public/docs/DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md` detailing:
  - **ESA Copernicus Sentinel-1 SAR (C-Band 5.405 GHz)** & **Sentinel-2 L2A**: Legal basis under European Commission Delegated Regulation (EU) No 1159/2013 (free, full, and open data policy), mandatory attribution, and all-weather cloud-penetration/vegetation-index usage.
  - **NASA Planetary & Surface Data (POWER, SRTM, GPM)**: Compliance with NASA Earth Science Data Policy (NPD 2230.1 and SPD-41A) for open, royalty-free public science, and its operational application in Growing Degree Days (GDD), water balances ($P - ET_c$), and automated rain suppression for IoT irrigation.
  - **MapBiomas Venezuela (Colección 3.0, 1985–2024)**: Creative Commons Attribution 4.0 International (CC BY 4.0) compliance, mandatory institutional attribution (Provita, LSIGMA USB, Wataniba, RAISG), and 40-year land-use trajectory translation into regionalized Kamprath soil amendment plans.
  - **Empirical Scientific Models**: Public-domain scientific validity for ellipsoidal WGS84 Shoelace geodesy, USDA Saxton-Rawls pedotransfer curves, and IPCC Tier 2 / Verra VCS carbon quantification.
  - **Google AI Studio (Gemini 1.5 Flash)**: Google AI Studio Terms of Service compliance under Free Tier usage for the on-demand agronomic advisor.
  - **Creative Process Synthesis & Global System Flow**: Detailed chronicle of how the project overcame the "cloud curtain" through radar SAR, eliminated the rural digital divide via native voice and vernacular units, and routed data through a 5-stage pipeline from orbital platforms to tractor cabins and drip valves.
- Update project documentation (`README.md`, `DEVELOPING.md`, and `AUDITORIA_GLOBAL_SISTEMA_2026.md`) with cross-references to the legal provenance and governance framework.
- Integrate user-facing provenance and legal governance surfaces into the Next.js 16 WebGIS interface:
  - Add an interactive "Gobernanza de Datos, Permisos & Marco Legal" card in `/dashboard/postulacion`.
  - Add a direct legal provenance and data governance link in the global application footer (`src/components/layout/Footer.tsx`) and attribution modal.
- Implement automated test suites in `__tests__/api/security-and-dossier.test.ts` to assert the physical existence, size, and substantive legal content of `DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md` in both `docs/` and `public/docs/`.

## Capabilities

### New Capabilities
- `technology-provenance-and-legal-framework`: Standardizes data provenance, international space law compliance, usage permits, creative process documentation, and user-facing legal governance surfaces across the platform.

### Modified Capabilities
<!-- No existing capabilities change their core behavioral contracts; this change adds legal governance and data provenance traceability. -->

## Impact

- **Documentation**: New canonical files in `docs/` and `public/docs/`, with cross-links in `README.md`, `DEVELOPING.md`, and `AUDITORIA_GLOBAL_SISTEMA_2026.md`.
- **UI Components**: `src/app/dashboard/postulacion/page.tsx` and `src/components/layout/Footer.tsx` reflect data governance cards and attribution links.
- **Testing & Verification**: Automated tests updated in `__tests__/api/security-and-dossier.test.ts` without regressing the 290 passing tests, 35 Turbopack production routes, or TypeScript strict typing.
