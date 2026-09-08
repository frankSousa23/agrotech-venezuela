# Technical Design: Polish README, Code Clarity, and Documentation Modernization

## Context

See `proposal.md` for motivation. The Agrotech Venezuela platform is fully verified (233 tests, 30 Next.js 16 routes, 0 TypeScript errors) and grounded in TRL 4 with Technical Article submission format. This design establishes how to simplify documentation, enhance developer and evaluator ergonomics, and ensure cross-system clarity.

## Goals / Non-Goals

**Goals:**
- Condense `README.md` from 262 lines to ~130 lines, removing repetitive comparative tables while preserving essential value propositions and quickstart guides.
- Synchronize `src/app/dashboard/layout.tsx:75` sidebar badge from `'TRL 6'` to `'TRL 4'`.
- Improve `/api-docs` with multi-service catalog (FastAPI + Next.js routes) and connection status notice.
- Insert non-specialist pedagogical annotations in key mathematical engines (`spatialUtils.ts`, `sarRadarService.ts`, `pedotransferEngine.ts`, `hydroThermalEngine.ts`).
- Introduce a lightweight test matrix summary script (`scripts/test_summary.js` and `npm run test:summary`).

**Non-Goals:**
- No alteration of underlying mathematical formulas or business logic.
- No new external runtime npm or python dependencies.

## Decisions

### 1. Structure of the Simplified README
- **Hero & Badges**: Clean badge row (TRL 4, 233 Tests, License MIT, Next.js 16, Python 3.13).
- **Executive Pitch**: 2 paragraphs highlighting Frank Sousa's independent authorship (UNERG 2025) and the 40-year MapBiomas data backbone.
- **ASCII Architecture Pipeline**: Preserved as the central visual asset showing the 3 phases: *Observación Satelital* ➔ *Cerebro Agronómico e IA* ➔ *Acción en Finca*.
- **The 3 Strategic Pillars**: Condensed into 3 short, punchy bulleted blocks (eliminating duplicate tables).
- **Turnkey Quickstart**: 3 shell commands (`git clone`, `npm install`, `npm run dev`) with port list.
- **Testing & PDF Dossier**: Single verification table pointing to the 233 tests and downloadable official PDFs.

### 2. Resilience in `/api-docs`
- When FastAPI is not running on port 8000, `<iframe>` tags fail silently or show connection errors.
- We will add a connection banner informing users: *"FastAPI Backend en puerto 8000. Si está en reposo, ejecuta `py -m uvicorn src.main:app --port 8000 --reload` o consulta el catálogo interactivo de endpoints a continuación."*
- Expand the endpoint catalog tabs to include Next.js native routes (`/api/parcels/conflicts`, `/api/mrv/sar-oracle`, `/api/iot/telemetry`).

### 3. Pedagogical Comments in Code
- Embed structured comment headers:
  ```typescript
  // ----------------------------------------------------------------------------
  // NOTA EXPLICATIVA PARA EL JURADO / EVALUADOR:
  // [Explicación en lenguaje claro del fundamento físico-matemático]
  // ----------------------------------------------------------------------------
  ```
  in the 4 core mathematical and pedological engines.

### 4. Test Summary Script
- Implement `scripts/test_summary.js` using native Node.js (no extra libraries).
- Add `"test:summary": "node scripts/test_summary.js"` to `package.json`.

## Risks / Trade-offs

- **[Risk]** Updating `README.md` might remove details expected by technical readers.  
  → **Mitigation**: All granular engineering and deployment details remain fully documented in `DEVELOPING.md` and `docs/mapbiomas_premio_2026/`.
- **[Risk]** Modifying `package.json` could affect scripts.  
  → **Mitigation**: Additive script only; verified with `npm run test:summary` and full test suite.
