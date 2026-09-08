# Proposal: Polish README, Code Clarity, and Documentation Modernization

## Why

Following the grounding of the postulation dossier to TRL 4 and Technical Article format, the repository requires a final polish to eliminate cognitive overload in documentation, ensure 100% badge consistency across all UI components, enrich core mathematical code with pedagogical comments for evaluators, and ensure the interactive API documentation (`/api-docs`) is resilient and comprehensive.

## What Changes

1. **Radical Simplification of `README.md`**:
   - Shrink from 262 dense, repetitive lines to an agile, elegant ~130-line document readable in under 90 seconds.
   - Remove redundant comparative tables while retaining the punchy 3-box ASCII pipeline, essential badges, 3 core pillars, turnkey local run instructions, and author attribution.
2. **Sidebar Navigation Badge Synchronization**:
   - Update the residual `'TRL 6'` badge in `src/app/dashboard/layout.tsx:75` to `'TRL 4'`.
3. **API Documentation & Swagger Resilience (`/api-docs`)**:
   - Add graceful fallback instructions when the FastAPI backend is not active locally.
   - Expand the endpoint catalog to include native Next.js API routes (`/api/parcels/conflicts`, `/api/mrv/sar-oracle`, `/api/iot/telemetry`, `/api/field-logs`) alongside FastAPI routes.
4. **Pedagogical Comments in Core Mathematical Engines**:
   - Add clear, non-specialist explanatory comments to the mathematical engines:
     - `src/lib/geo/spatialUtils.ts` (Shoelace WGS84 ellipsoidal area formula).
     - `src/lib/geo/sarRadarService.ts` (Sentinel-1 SAR C-band microwave cloud penetration and backscatter).
     - `src/lib/agronomy/pedotransferEngine.ts` (Saxton-Rawls water retention curves and PAW threshold).
     - `src/lib/geo/hydroThermalEngine.ts` (Growing Degree Days $GDD_{10}^{30}$ and water balance).
5. **Test Validation & Summary Reporting**:
   - Add a lightweight summary script (`scripts/test_summary.js` / `npm run test:summary`) that prints a formatted, categorized matrix of the 233 automated tests.

## Capabilities

### Modified Capabilities

- `ux/evaluator-project-profile`: Update navigation bar badge in `layout.tsx` to TRL 4 and enhance `/api-docs` with multi-service catalog and connection state resilience.
- `system-status-synchronization`: Synchronize simplified, non-redundant README structure, test summary reporting, and pedagogical docstrings in core engines.

## Impact

- Files affected: `README.md`, `src/app/dashboard/layout.tsx`, `src/app/api-docs/page.tsx`, `src/lib/geo/spatialUtils.ts`, `src/lib/geo/sarRadarService.ts`, `src/lib/agronomy/pedotransferEngine.ts`, `src/lib/geo/hydroThermalEngine.ts`, `scripts/test_summary.js`, `package.json`.
- Zero breaking API changes.
- 100% backward compatibility maintained.
