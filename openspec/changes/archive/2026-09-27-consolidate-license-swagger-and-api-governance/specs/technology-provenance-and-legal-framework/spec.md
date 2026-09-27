# Spec Delta: technology-provenance-and-legal-framework

## ADDED Requirements

### Requirement: Root Repository Licensing and Third-Party Data Alignment
The repository root `LICENSE` and architectural guidelines (`AGENTS.md`) SHALL explicitly formalize third-party data licensing alongside the core MIT License, ensuring complete legal clarity:
1. **ESA Copernicus Sentinel**: Mandatory attribution clause *"Contains modified Copernicus Sentinel data [2026]"* pursuant to European Commission Delegated Regulation (EU) No 1159/2013.
2. **NASA Earth Science Data**: Acknowledgment of royalty-free, open access under NASA Directives NPD 2230.1 and SPD-41A.
3. **MapBiomas Venezuela**: Full institutional attribution (Provita, LSIGMA USB, Wataniba, RAISG) under Creative Commons CC BY 4.0.
4. **Canonical Reference**: Direct hyperlink to `docs/DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md`.

#### Scenario: Inspecting Root LICENSE Third-Party Attributions
- **WHEN** an auditor, developer, or juror inspects the root `LICENSE` file
- **THEN** distinct sections clearly state the permitted usages and mandatory attributions for Copernicus Sentinel-1/2, NASA POWER/SRTM, and MapBiomas 3.0.

#### Scenario: Verifying Architectural Guidelines Alignment
- **WHEN** an AI agent or engineer reads `AGENTS.md` section 4
- **THEN** the licensing guidelines explicitly cite Copernicus Regulation (EU) 1159/2013, NASA NPD 2230.1, and MapBiomas CC BY 4.0 alongside MIT.

### Requirement: OpenAPI and Swagger Governance Metadata Publication
The FastAPI backend service SHALL expose comprehensive open-science governance metadata via OpenAPI 3.0 specifications at `/openapi.json` and Swagger UI at `/docs`:
1. `license_info`: Documenting the MIT software license and open data compliance.
2. `contact`: Author information and repository links.
3. `terms_of_service`: Linking directly to the canonical data provenance framework.
4. `description`: Detailed overview of the satellite, agroclimatic, and AI technologies powering the 39 endpoints.

#### Scenario: Fetching OpenAPI Specification Metadata
- **WHEN** a client or automated test performs a `GET` request to `/openapi.json`
- **THEN** the response includes `license_info`, `contact`, and references to Copernicus and NASA open science policies with HTTP status 200.

#### Scenario: Inspecting Interactive Swagger Documentation
- **WHEN** a user or developer opens `/docs` in the browser
- **THEN** the Swagger UI header presents the legal governance notice, open data terms, and links to the canonical framework.

### Requirement: Developer API Portal Legal Governance Showcase
The WebGIS API portal route (`/api-docs`) in the Next.js frontend SHALL integrate a dedicated, visually prominent card titled *Gobernanza de Datos & Marco Legal de APIs*:
1. Display regulatory badges for Copernicus (Reglamento UE 1159/2013), NASA (NPD 2230.1), and MapBiomas (CC BY 4.0).
2. Provide a 1-click action to read or download the canonical framework document.
3. Guarantee responsive rendering across desktop and mobile devices.

#### Scenario: Viewing API Documentation Governance Card
- **WHEN** a developer or evaluator visits `/api-docs`
- **THEN** the top section of the page displays the API legal governance card detailing external data policies and permits.
