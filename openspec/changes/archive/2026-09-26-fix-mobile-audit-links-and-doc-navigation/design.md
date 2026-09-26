# Design: Resilient Mobile Audit Navigation & Documentation Link Verification

## Context

Evaluators and jury members reviewing Agrotech Venezuela from the official GitHub mobile applications (Android / iOS) encounter silent navigation failures when tapping internal anchor links such as `[Auditar](#1-complejidad-técnica-ponderación-20)`. The native Markdown parser in mobile views does not support in-page scroll intents when fragment identifiers contain accented characters or complex punctuation. Furthermore, tests listed in the criteria summary table were plain backticked text rather than clickable links, and internal file paths in the body contained path mismatches.

See `proposal.md` for motivation and scope boundaries.

## Goals / Non-Goals

**Goals:**
- Provide immediate 1-tap mobile access from the criteria table directly to automated test suites (`spatial.test.ts`, etc.) and primary source code files (`spatialUtils.ts`, etc.).
- Ensure bulletproof in-page scrolling across both desktop and mobile renderers via explicit HTML anchor targets (`<a id="criterio-1"></a>`) and clean ASCII anchor links (`#criterio-1`).
- Enable seamless bidirectional reading with «Volver al Índice ↑» return links at the conclusion of every criterion section.
- Eliminate 100% of broken relative links and 404 path references across `docs/GUIA_EVALUADOR.md`, `docs/mapbiomas_premio_2026/*.md`, and `public/docs/*.md`.

**Non-Goals:**
- Modifying Next.js UI components or TypeScript business logic (the application code is already verified and operating at 100%).
- Modifying test execution suites or Pytest fixtures (the 278 automated test suite remains the immutable ground truth).

## Decisions

### Decision 1: Direct In-Cell Links vs Anchor-Only Navigation
- **Choice**: Embed direct clickable Markdown links to both the verifiable test suite(s) and primary source code in the summary table cells of `docs/GUIA_EVALUADOR.md`.
- **Rationale**: On mobile devices, even when anchor jumping functions, navigating down a long file to find a link is cumbersome. Providing direct links allows jurors to tap straight into the test implementation or mathematical algorithm directly from the executive matrix.
- **Alternatives Considered**: Keeping tests as plain text and only fixing the anchor. Rejected because it forces unnecessary scrolling on small phone viewports.

### Decision 2: Dual Anchor Strategy for Universal Markdown Compatibility
- **Choice**: Pair explicit HTML anchor elements (`<a id="criterio-1"></a>`) with clean ASCII-only slug links (`[Ver Detalle ↓](#criterio-1)`).
- **Rationale**: Web browsers on desktop auto-generate slugs from headings, but native Android/iOS Markdown webviews often fail when handling unicode accents (`é`, `ó`) or punctuation (`:`, `%`). Explicit ASCII `id` attributes are universally supported across all Markdown flavors.
- **Alternatives Considered**: Using English headings. Rejected because the official evaluation bases and jury communication are strictly in Spanish.

### Decision 3: Path Correction & Relative Depth Standardization
- **Choice**:
  1. Fix `src/components/maps/VenezuelaStateMapInner.tsx` to `src/components/gis/VenezuelaStateMapInner.tsx`.
  2. Fix `src/components/gis/ParcelConflictModal.tsx` to `src/components/tierras/ParcelConflictModal.tsx`.
  3. Correct nesting depth in `docs/mapbiomas_premio_2026/*.md` and `public/docs/*.md` from `../README.md` to `../../README.md`.
- **Rationale**: Evaluators browsing source files from GitHub expect every relative link to resolve cleanly to the actual commit tree without 404 errors.

## Risks / Trade-offs

- **[Risk]** Adding links to multiple files in table cells could cause visual wrapping on narrow screens.  
  → **Mitigation**: Use compact basename formatting (`[`spatial.test.ts`](../__tests__/api/spatial.test.ts)`) separated by line breaks or commas to maintain a crisp, readable tabular layout.
