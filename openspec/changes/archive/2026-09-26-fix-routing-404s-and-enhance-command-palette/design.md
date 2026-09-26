# Design: Resilient Routing & Decoupled Command Palette Architecture

## Context

See `proposal.md` for overall motivation.

Currently, `CommandPalette.tsx` is mounted inside `<div className={styles.desktopUtilityBar}>`. Because `.desktopUtilityBar` defines `backdrop-filter: blur(12px)`, CSS specification rules force this element to generate a new Stacking Context and become the containing block for all `position: fixed` descendant elements. This confines the modal's `z-index: 999999` to that container, causing it to render behind Leaflet map layers, sticky drawers, and modal backdrops on certain views.

Furthermore, on viewports `<= 768px`, `.desktopUtilityBar` is hidden with `display: none !important;`, hiding the search button and neutralizing physical keyboard shortcuts on tablets. In addition, several documented endpoints (`/api/soils`, `/api/recomendaciones`, `/api/export/stats`) and aliases (`/dashboard/visor`, `/dashboard/costos`, `/registro`) lack handlers or redirect definitions.

## Goals / Non-Goals

**Goals:**
- Completely eliminate stacking context trapping by mounting `CommandPalette`'s modal directly to `document.body` via React Portal.
- Provide ubiquitous, responsive access to search across all devices (desktop header button, mobile bar button, and global custom event dispatching).
- Ensure mobile ergonomic comfort (16px font to prevent iOS Safari auto-zoom, dynamic viewport padding, body scroll lock).
- Expand search index to cover 13 core platform modules, 11 key Venezuelan agricultural poles, and direct action intents.
- Provide complete redirect resilience for all common legacy and root-level routes in `next.config.ts`.
- Implement missing API endpoints with appropriate role-based permission checks (`AGRONOMIST`/`ADMIN` for mutation).
- Deliver a branded custom `not-found.tsx` page matching AgroTech's glassmorphism dark mode aesthetic.

**Non-Goals:**
- Replacing Next.js App Router or rewriting the main navigation architecture.
- Implementing an external full-text search backend (e.g. ElasticSearch/Algolia); the client-side normalized indexing is fast (< 2ms) and works 100% offline in rural environments.

## Decisions

### 1. React Portal for Modal Mounting (`createPortal`)
- **Decision**: Render the search backdrop and modal box using `ReactDOM.createPortal(modalContent, document.body)`.
- **Rationale**: Escapes any parent containing block created by `backdrop-filter`, `transform`, `filter`, or `perspective`. Guarantees that `z-index: 999999` is evaluated against the root document context, ensuring it always paints above Leaflet map panes, sticky headers, and drawers.
- **SSR Safety**: Use `const [mounted, setMounted] = useState(false); useEffect(() => setMounted(true), []);` to avoid hydration mismatches.
- **Alternatives Considered**:
  - *Increasing z-index on `.desktopUtilityBar`*: Rejected because it interferes with Leaflet controls and still hides when `.desktopUtilityBar` has `display: none` on mobile.
  - *Moving `CommandPalette` to `layout.tsx` root*: Doesn't solve the trigger button placement inside the utility bar. Portal allows the trigger button to stay anywhere in the layout while projecting the modal markup to `document.body`.

### 2. Decoupled Global Event Bus for Mobile & Omnipresent Triggering
- **Decision**: Implement `window.addEventListener('open-command-palette')` in `CommandPalette.tsx` and add a search button with `<Search size={16} />` in `.mobileBar` of `src/app/dashboard/layout.tsx`.
- **Rationale**: Decouples the trigger button from the modal state. Any UI component—such as the mobile header, empty states, sidebar shortcuts, or the 404 page—can trigger the search modal simply by dispatching a custom event.
- **Alternatives Considered**:
  - *React Context provider*: Possible, but creates unnecessary context re-renders across the dashboard layout. A lightweight window custom event is zero-cost and works across independent sub-trees.

### 3. Comprehensive Redirects in `next.config.ts`
- **Decision**: Define redirects in `next.config.ts` for:
  - `/dashboard/visor` & `/visor` -> `/dashboard/mapa`
  - `/dashboard/costos` & `/costos` -> `/dashboard/tierras`
  - `/registro` -> `/auth/register`
  - `/login` -> `/auth/login`
  - Root module shortcuts: `/tierras`, `/bitacora`, `/recomendaciones`, `/suelos`, `/cultivos`, `/iot`, `/estadisticas`, `/admin`, `/manual`, `/postulacion`, `/arquitectura` -> `/dashboard/:path`.
- **Rationale**: Eliminates accidental 404s from direct browser typing, legacy links in documentation, or external references.

### 4. Resilient In-Memory & Role-Gated API Endpoints
- **Decision**: Implement `src/app/api/soils/route.ts`, `src/app/api/recomendaciones/route.ts`, and `src/app/api/export/stats/route.ts`.
  - `GET /api/soils`: Returns mock and cached soil profile records across Venezuelan states, supporting text and pH filtering.
  - `POST /api/soils`: Extracts user session with `extractUserFromRequest`. Allows mutations only for roles `AGRONOMIST` and `ADMIN` (returns 403 Forbidden for `FARMER` or unauthenticated).
  - `GET /api/recomendaciones`: Returns agronomic compatibility matrices between Venezuelan crops and regional soil chemistry.
  - `GET /api/export/stats`: Generates formatted CSV (or JSON) for soil and statistical datasets.
- **Rationale**: Resolves silent network 404 errors in `suelos/page.tsx` and `recomendaciones/page.tsx`, and satisfies `swagger.json` specs.

### 5. Branded 404 Glassmorphism Page (`src/app/not-found.tsx`)
- **Decision**: Build a custom `not-found.tsx` component with AgroTech visual identity, featuring a direct "Buscar en AgroTech (Ctrl+K)" button, navigation pills to main modules (Mapa, Tierras, Bitácora), and a "Volver al Dashboard" action.
- **Rationale**: Replaces unstyled Next.js default error screens with a helpful recovery experience.

## Risks / Trade-offs

- **[Risk]** React Portal SSR hydration error if rendered before `document.body` is ready.
  - **Mitigation**: Guard portal rendering behind `mounted` state (`if (!mounted || !isOpen) return null;`).
- **[Risk]** Mobile virtual keyboard pushing modal out of view.
  - **Mitigation**: Set `paddingTop: '3vh'`, `maxHeight: '85vh'`, `overflowY: 'auto'`, and input `fontSize: '1rem'` (16px) to avoid iOS Safari viewport scaling glitches.
- **[Risk]** Body scrolling while modal is open on mobile.
  - **Mitigation**: Toggle `document.body.style.overflow = isOpen ? 'hidden' : 'unset'` in a `useEffect`.
