# Design: Consolidate License, Swagger, and API Governance

## Context

The platform has established an authoritative canonical data provenance framework in `docs/DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md`. To achieve 100% legal coherence across the repository, the root `LICENSE`, `AGENTS.md`, FastAPI's Swagger (`/docs` and `/openapi.json`), and the Next.js API developer portal (`/api-docs`) must be updated with identical legal references and open-access policies (EU Regulation 1159/2013, NASA NPD 2230.1, MapBiomas CC BY 4.0).

## Goals / Non-Goals

**Goals:**
- Provide complete third-party data attribution in `LICENSE` for ESA Copernicus Sentinel-1/2 and NASA Earth Science data.
- Formalize open-access satellite and agroclimatic regulations in `AGENTS.md` Section 4.
- Expose standard OpenAPI 3.0 metadata (`license_info`, `contact`, `terms_of_service`, legal summary) in FastAPI's `main.py`.
- Introduce a glassmorphic data governance banner in `src/app/api-docs/page.tsx`.
- Add an automated test in `backend/tests/test_api_endpoints.py` to continuously verify OpenAPI metadata compliance.

**Non-Goals:**
- Altering existing REST endpoint request/response payloads or database models.
- Changing software license terms (the codebase remains strictly MIT).
- Modifying backend server ports, CORS configuration, or authentication schemes.

## Decisions

### 1. Root `LICENSE` Multi-Authority Attribution Structure
- **Choice**: Structure the root `LICENSE` file into three distinct parts:
  1. Standard MIT License (Frank Sousa / Agrotech Venezuela).
  2. MapBiomas Venezuela CC BY 4.0 Attribution.
  3. European Space Agency (ESA) Copernicus Sentinel-1 SAR & Sentinel-2 Optical Attribution under Regulation (EU) No 1159/2013, NASA Earth Science Data Policy (NPD 2230.1), and link to `docs/DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md`.
- **Rationale**: Keeps the software license clean while meeting international requirements for open satellite data reuse.

### 2. FastAPI OpenAPI 3.0 Standard Fields
- **Choice**: Configure `FastAPI(..., license_info={...}, contact={...}, terms_of_service=...)` in `backend/src/main.py`.
- **Rationale**: Swagger UI automatically renders interactive badges for "License: MIT & Open Data" and "Terms of Service" at the top of `/docs`, allowing developers and evaluators to inspect compliance without digging into source code.

### 3. Integrated Governance Card in `/api-docs` (Next.js)
- **Choice**: Place a sleek, responsive card above the Swagger iframe in `src/app/api-docs/page.tsx` with pills for Copernicus EU, NASA Open Science, and MapBiomas CC BY 4.0, with a direct button to download/view the legal framework.
- **Rationale**: Gives frontend and mobile developers immediate legal grounding when exploring endpoints.

### 4. Automated Contract Verification in Pytest
- **Choice**: Add `test_openapi_metadata_and_legal_governance()` in `backend/tests/test_api_endpoints.py`.
- **Rationale**: Prevents accidental regressions or removals of Swagger metadata during future backend refactors.

## Risks / Trade-offs

- **[Risk] Test count desynchronization**: Adding a new Pytest will increase backend tests from 54 to 55 (total from 290 to 291).
  - *Mitigation*: Update `scripts/test_summary.js` and all test runners so the unified report cleanly accounts for 291 automated tests passing at 100%.
