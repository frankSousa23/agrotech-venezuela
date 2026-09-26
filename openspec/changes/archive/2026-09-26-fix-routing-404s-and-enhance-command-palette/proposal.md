# Proposal: Fix Routing 404s and Enhance Global Command Palette

## Why

During user navigation and platform exploration, multiple routes and API calls resulted in 404 errors (such as `/dashboard/visor`, `/dashboard/costos`, `/registro`, `/api/soils`, `/api/recomendaciones`, and `/api/export/stats`), and standard Next.js unstyled error pages were shown due to the lack of a dedicated `not-found.tsx`. Concurrently, the global search palette (`Ctrl+K` "Buscar en AgroTech") suffered from stacking context trapping inside a container with `backdrop-filter: blur()`, causing it to render behind Leaflet map layers, drawers, and overlays. Furthermore, the search trigger was completely hidden on mobile viewports (< 768px), lacked critical agricultural poles and platform documentation modules, and lacked category filtering and mobile-friendly touch ergonomics.

Resolving these routing vulnerabilities and elevating the Command Palette ensures seamless, robust navigation across all screen sizes and prevents user drop-off.

## What Changes

- **Route Aliasing & Redirects in `next.config.ts`**: Add permanent/temporary redirects for legacy and common navigation paths (`/dashboard/visor` -> `/dashboard/mapa`, `/visor` -> `/dashboard/mapa`, `/dashboard/costos` -> `/dashboard/tierras`, `/costos` -> `/dashboard/tierras`, `/registro` -> `/auth/register`, `/login` -> `/auth/login`, and root aliases `/tierras`, `/bitacora`, `/recomendaciones`, `/suelos`, `/cultivos`, `/iot`, `/estadisticas`, `/admin`, `/manual`, `/postulacion`, `/arquitectura`).
- **Fix Broken Link in Map Viewer**: Update [`MultiLevelMapViewer.tsx`](file:///c:/Users/Windows/Documents/fRaNk/Agrotech%20FrankS/src/components/gis/MultiLevelMapViewer.tsx) line 1280 to point to `/auth/register` instead of the broken `/registro`.
- **Implement Missing API Handlers**:
  - Implement `/api/soils` (GET with texture/pH filters; POST with `AGRONOMIST` or `ADMIN` role check and fallback storage).
  - Implement `/api/recomendaciones` (GET returning the agroecological suitability matrix).
  - Implement `/api/export/stats` (GET returning CSV or JSON formatted dataset).
- **Custom AgroTech 404 Page**: Implement `src/app/not-found.tsx` with glassmorphism styling, search palette trigger, quick navigation links, and back-to-dashboard recovery button.
- **Command Palette React Portal**: Refactor [`CommandPalette.tsx`](file:///c:/Users/Windows/Documents/fRaNk/Agrotech%20FrankS/src/components/layout/CommandPalette.tsx) to mount the modal overlay via `createPortal(modal, document.body)` so it permanently escapes parent stacking contexts (`backdrop-filter`, `transform`, Leaflet map panes).
- **Mobile Responsive Search & Event Dispatching**:
  - Add search button (`<Search size={16} />`) to `.mobileBar` in [`src/app/dashboard/layout.tsx`](file:///c:/Users/Windows/Documents/fRaNk/Agrotech%20FrankS/src/app/dashboard/layout.tsx).
  - Enable decoupled triggering via `window.addEventListener('open-command-palette')`.
  - Adjust mobile modal geometry (`paddingTop: 3vh`, 16px font to prevent iOS zoom, body scroll locking, touch scrolling).
- **Expanded Search Catalog & Filtering**:
  - Index 13 platform modules (adding Manual, Postulación, Arquitectura, Swagger API Docs, Suelos).
  - Index key Venezuelan agricultural poles and municipalities (Turén, Calabozo, Quíbor, Santa Bárbara del Zulia, El Vigía, Barinas, Mesa de Guanipa, etc.).
  - Add quick action shortcuts ("Dictar en bitácora", "Delimitar parcela", "Consultar Gemini IA", "Alternar Modo Productor").
  - Add category filter chips (`[Todos]`, `[Módulos]`, `[Polos]`, `[Cultivos]`, `[Acciones]`).
  - Add matched text highlighting and keyboard auto-scroll with arrow keys.

## Capabilities

### New Capabilities
- `soils-and-recommendations-api`: Endpoints `/api/soils`, `/api/recomendaciones`, and `/api/export/stats` providing soil profiles, agroecological compatibility recommendations, and stats export with role-based write controls.

### Modified Capabilities
- `command-palette-and-quick-jump`: Mounting via React Portal on `document.body`, responsive mobile trigger integration in `.mobileBar`, expanded agricultural catalog, category chips filtering, and keyboard navigation.
- `routing-and-redirects-testing`: Expanded redirect rules in `next.config.ts`, branded custom `not-found.tsx` 404 page, and routing test verification.

## Impact

- **Affected Files**:
  - `next.config.ts` (redirects)
  - `src/app/not-found.tsx` (new custom 404 page)
  - `src/components/gis/MultiLevelMapViewer.tsx` (fix `/registro` link)
  - `src/components/layout/CommandPalette.tsx` (React Portal, expanded catalog, responsive styling)
  - `src/app/dashboard/layout.tsx` (mobile search trigger button)
  - `src/app/api/soils/route.ts` (new API route)
  - `src/app/api/recomendaciones/route.ts` (new API route)
  - `src/app/api/export/stats/route.ts` (new API route)
  - `tests/routing.test.ts` (new/updated Jest tests)
  - `tests/commandPalette.test.tsx` (updated tests for Portal and event listener)
- **Dependencies**: No external npm packages required; leverages native React `createPortal` and existing Lucide icons.
- **Automated Tests**: Must maintain 100% pass rate across the 278 automated tests (Jest + Pytest) and 0 TypeScript errors.
