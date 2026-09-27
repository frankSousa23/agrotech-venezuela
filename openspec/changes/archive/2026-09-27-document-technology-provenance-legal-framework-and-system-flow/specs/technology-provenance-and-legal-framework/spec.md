# Spec Delta: technology-provenance-and-legal-framework

## Purpose

Establishes formal data provenance, legal compliance frameworks, open data permits, and a clear creative process narrative connecting satellite inputs with on-the-ground agricultural workflows across the Agrotech Venezuela platform.

## ADDED Requirements

### Requirement: Canonical Legal Provenance and Permitting Registry
The system and project documentation SHALL maintain an authoritative, centralized registry in `docs/DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md` (replicated in `public/docs/DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md`) detailing the origin, governing international legislation, licensing terms, and specific operational applications for all external spatial, climatic, and artificial intelligence technologies. The registry SHALL explicitly codify:
1. **ESA Copernicus Sentinel-1 SAR (C-Band 5.405 GHz)** & **Sentinel-2 L2A**: Governed by European Commission Delegated Regulation (EU) No 1159/2013 establishing a free, full, and open data policy with mandatory attribution (`Contains modified Copernicus Sentinel data [2026]`), utilized for cloud-penetrating moisture saturation and optical vegetative indices (NDVI/EVI/NDWI).
2. **NASA Planetary & Surface Data (POWER, SRTM, GPM)**: Governed by the NASA Earth Science Data Policy (NPD 2230.1 / SPD-41A) ensuring open, royalty-free public science, utilized for thermal accumulation (GDD), monthly water balance ($P - ET_c$), and automated rain suppression in IoT irrigation.
3. **MapBiomas Venezuela (Colección 3.0, 1985–2024)**: Governed by the Creative Commons Attribution 4.0 International license (CC BY 4.0) with formal attribution to Provita, LSIGMA USB, Wataniba, and RAISG, utilized for 40-year land-use trajectory analysis and historical soil degradation calibration.
4. **Empirical Scientific Models**: Public-domain status of ellipsoidal Shoelace WGS84 geodesics, USDA Saxton-Rawls pedotransfer equations, Kamprath exchangeable aluminum neutralization, and IPCC Tier 2 / Verra VCS carbon methodologies.
5. **Google AI Studio (Gemini 1.5 Flash)**: Compliance with Google AI Studio Terms of Service under Free Tier developer quotas for on-demand vernacular assistance.

#### Scenario: Inspecting Technology Provenance and Permits
- **WHEN** an evaluator, legal auditor, or developer opens `docs/DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md` or its public version
- **THEN** each technology is detailed in a structured table specifying its official custodian, governing regulation/license, permitted uses, mandatory attribution clauses, and exact application within Agrotech Venezuela.

#### Scenario: Verifying Public Distribution Dossier Parity
- **WHEN** the static application builds and serves documents from `/docs` and `public/docs/`
- **THEN** `DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md` is present in both directories with identical content, ensuring seamless offline and browser downloads.

### Requirement: Creative Process and System Pipeline Representation
The documentation and architectural materials SHALL articulate the project's creative process and global dataflow, capturing the transition from passive academic observation to proactive on-field agronomic decision support. The documentation SHALL specifically present:
1. **The Four Foundational Creative Paradigms**:
   - *From Passive Maps to Proactive Prescriptions*: Translating 40-year historical land-use vectors into actionable lime and fertilizer doses.
   - *Piercing the Tropical Cloud Curtain*: Deploying Sentinel-1 C-Band SAR radar to overcome the >75% cloud obstruction typical of Venezuela's rainy commercial cycles.
   - *Radical Rural Accessibility*: Replacing complex forms with the *Modo Productor Fácil*, powered by 4 giant touch doors, native Web Speech API voice recognition, and Venezuelan vernacular parsing (sacos, tambores, tablones).
   - *Resilient Offline Sovereignty*: Operating locally through SQLite WAL and IndexedDB with lightweight 2-channel QoS synchronization for 2G/EDGE networks.
2. **The 5-Stage Global Dataflow**: An end-to-end pipeline diagram connecting orbital sensing (Stage 1), spatial processing and local caching (Stage 2), deterministic computational engines (Stage 3), dual-mode user experience (Stage 4), and tri-modal operational output to machinery and IoT valves (Stage 5).

#### Scenario: Reviewing the Creative Process Narrative
- **WHEN** an evaluator reviews the creative process section of the framework documentation
- **THEN** the text clearly explains how biophysical bottlenecks in Venezuelan lowlands (soil acidity, cloud cover, lack of soil labs) inspired the technical choices of Agrotech Venezuela.

#### Scenario: Tracing the End-to-End System Pipeline
- **WHEN** a system architect or evaluator traces the dataflow from satellite acquisition to tractor output
- **THEN** the pipeline diagram demonstrates the deterministic flow from raw ESA/NASA/MapBiomas inputs through local engines to ESRI Shapefile VRA, KML flight missions, and 1-page cabin printouts.

### Requirement: User-Facing Legal Governance and Attribution Surfaces
The platform's frontend interface SHALL visibly surface data governance, legal provenance, and open-source attribution without cluttering the daily agronomic workflow. The interface SHALL feature:
1. A dedicated **Gobernanza de Datos & Marco Legal** card in `/dashboard/postulacion` highlighting the compliance with Copernicus EU Regulation 1159/2013, NASA Earth Science Data Policy, and MapBiomas CC BY 4.0, complete with direct links to view or download the framework document.
2. A direct link in the global footer (`src/components/layout/Footer.tsx`) providing instant access to data provenance and licensing terms.
3. Automated test coverage in `__tests__/api/security-and-dossier.test.ts` verifying that `DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md` exists in `public/docs/`, exceeds 2 KB in size, and contains valid legal references to Copernicus, NASA, and MapBiomas.

#### Scenario: Accessing Legal Governance from Postulation Hub
- **WHEN** a user or MapBiomas prize juror navigates to `/dashboard/postulacion`
- **THEN** a specialized card displays the technology provenance highlights and offers a 1-click action to inspect the comprehensive legal framework document.

#### Scenario: Verifying Global Footer Attribution Link
- **WHEN** a user views the application footer on any dashboard page
- **THEN** an attribution and legal governance link is displayed, opening the data provenance documentation.

#### Scenario: Running Automated Dossier and Security Tests
- **WHEN** the test suite `__tests__/api/security-and-dossier.test.ts` is executed via `npm test`
- **THEN** assertions confirm that `DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md` is present in `public/docs/` and contains the required legal provenance signatures.
