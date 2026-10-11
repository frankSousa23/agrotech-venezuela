# Technical Design: soils-ux-integration-and-dossier-sync

## Context

See `proposal.md` for motivation.
Agrotech Venezuela features an operational MapBiomas Soil Module (TRL 4) with Saxton-Rawls pedotransfer models and Kamprath regional liming calculations. WebGIS cartographic views and parcel diagnostic modals contain rich geospatial and pedological attributes that should directly link to the Soil Simulator workstation (`/dashboard/suelos`). Concurrently, project documentation across 9 markdown files needs consolidation to reflect 306 tests and 40 routes.

## Goals / Non-Goals

**Goals:**
- Provide direct navigation bridges from map soil pins, municipal cards, and parcel modals to `/dashboard/suelos?tab=simulator`.
- Implement declarative search param parsing in `/dashboard/suelos/page.tsx` wrapped in `Suspense` for Next.js App Router streaming compliance.
- Update CSS grid styling in `/dashboard/suelos/page.module.css` to 2 columns on viewports <= 640px.
- Synchronize all postulation dossier metrics and canonical documentation to 306 automated tests, 40 routes, and active TRL 4 Soil Module federation.

**Non-Goals:**
- Modifying underlying pedotransfer formulas or altering REST API payloads.
- Changing Leaflet version or adding third-party React-Leaflet dependencies.

## Decisions

### 1. URL Query Parameter Navigation Pattern
- **Decision**: Use Next.js `useSearchParams()` inside a `<Suspense>` wrapper in `src/app/dashboard/suelos/page.tsx` to read `tab`, `texture`, `ph`, `om`, and `al`.
- **Rationale**: Ensures zero client-side hydration mismatches or SSG bailouts in Next.js 16 App Router while enabling direct deep-linking from maps, external widgets, and bookmarks.
- **Alternatives considered**: Passing parameters via global React context or localStorage; rejected because deep-links from external iframes or shared URLs would not work.

### 2. Native Leaflet Marker Popups with Hyperlink CTAs
- **Decision**: In `LeafletMapInner.tsx`, inject a clean, styled HTML anchor into `marker.bindPopup(...)` pointing to `/dashboard/suelos?tab=simulator&texture=${pt.texture}&ph=${pt.ph}&om=${pt.organicMatter}`.
- **Rationale**: Leaflet popups are rendered in the DOM outside React's virtual DOM tree; clean anchor tags with proper styling provide instantaneous, reliable navigation.

### 3. Mobile CSS Optimization
- **Decision**: Add `@media (max-width: 640px)` in `src/app/dashboard/suelos/page.module.css` setting `.statsGrid` to `grid-template-columns: repeat(2, 1fr)`.
- **Rationale**: Prevents cramped 4-column metrics on small smartphone screens (320px–375px), maintaining visual hierarchy for farmers.

## Risks / Trade-offs

- **[Risk]** `useSearchParams` causing build errors without `Suspense` → **Mitigation**: Extract page content to `SuelosContent` component wrapped by `Suspense` with an accessible fallback spinner.
- **[Risk]** Divergence between dossier docs and test runner → **Mitigation**: Update all 9 dossier files and run `scripts/test_summary.js` and `npm run test:all` to certify exact 306-test alignment.
