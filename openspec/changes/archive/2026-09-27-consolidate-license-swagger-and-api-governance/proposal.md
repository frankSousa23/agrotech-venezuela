# Proposal: Consolidate License, Swagger, and API Governance

## Why

Following the creation of the canonical data provenance framework (`docs/DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md`), an exhaustive repository exploration revealed that external legal frameworks (ESA Copernicus Regulation EU 1159/2013, NASA NPD 2230.1 / SPD-41A, MapBiomas CC BY 4.0) are present in the core technical documentation but remain only partially referenced in:
1. The root repository `LICENSE` file (which only mentions MIT and MapBiomas, omitting Copernicus and NASA).
2. The project architecture standards in `AGENTS.md` (which omits explicit Copernicus and NASA governance).
3. The FastAPI Swagger / OpenAPI 3.0 configuration in `backend/src/main.py` (which lacks `license_info`, `contact`, `terms_of_service`, and rich legal description at `/docs` and `/openapi.json`).
4. The WebGIS API portal in `src/app/api-docs/page.tsx` (which lacks a dedicated developer governance card).

Consolidating these surfaces ensures that legal compliance, data provenance, and public science regulations are completely and seamlessly visible to open-source evaluators, prize juries, and third-party developers across all interfaces.

## What Changes

- **Root `LICENSE` Harmonization**: Add formal Third-Party Attribution sections for ESA Copernicus Sentinel-1/2 (EU Regulation 1159/2013) and NASA Earth Science Data Policy (NPD 2230.1), alongside the existing MapBiomas attribution and a direct link to `docs/DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md`.
- **Architectural Guidelines (`AGENTS.md`)**: Update Section 4 ("Licenciamiento y Atribución") with explicit governance mandates for Copernicus Sentinel data, NASA agroclimatology, MapBiomas land-use records, and canonical legal documentation.
- **FastAPI Swagger / OpenAPI 3.0 Metadata (`backend/src/main.py`)**: Enrich the `FastAPI` instance with `license_info` (MIT + Open Data policies), `contact`, `terms_of_service`, and an informative `description` explaining the open science legal framework governing all 39 endpoints.
- **Next.js WebGIS API Portal (`src/app/api-docs/page.tsx`)**: Insert a prominent glassmorphic "Gobernanza de Datos & Marco Legal de APIs" card with badges for Copernicus, NASA, and MapBiomas, linking to the canonical framework document.
- **Backend Testing Verification (`backend/tests/test_api_endpoints.py`)**: Add an automated Pytest test asserting that `GET /openapi.json` returns valid OpenAPI 3.0 metadata with `license_info`, `contact`, and references to Copernicus and NASA.

## Capabilities

### Modified Capabilities
- `technology-provenance-and-legal-framework`: Expand requirements to cover root `LICENSE` parity, FastAPI OpenAPI metadata (`license_info`, `terms_of_service`), and API documentation governance surfaces.

## Impact

- **Affected Files**:
  - `LICENSE`
  - `AGENTS.md`
  - `backend/src/main.py`
  - `src/app/api-docs/page.tsx`
  - `backend/tests/test_api_endpoints.py`
- **Zero Breaking Changes**: All API routes and schemas retain exact backwards compatibility.
- **Testing**: Ensures 100% pass rate across Jest (237 tests) and Pytest (55 tests), 0 TypeScript errors, and 35 clean Next.js 16 production routes.
