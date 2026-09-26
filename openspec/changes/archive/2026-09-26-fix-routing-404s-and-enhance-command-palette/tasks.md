# Tasks: Fix Routing 404s and Enhance Global Command Palette

## 1. Routing Resilience and 404 Prevention

- [x] 1.1 Update `next.config.ts` with comprehensive redirect rules for legacy paths (`/dashboard/visor`, `/visor`, `/dashboard/costos`, `/costos`, `/registro`, `/login`) and root shortcuts (`/tierras`, `/bitacora`, `/recomendaciones`, `/suelos`, `/cultivos`, `/iot`, `/estadisticas`, `/admin`, `/manual`, `/postulacion`, `/arquitectura`) and verify with redirect tests.
- [x] 1.2 Update `src/components/gis/MultiLevelMapViewer.tsx` (line 1280) to fix the broken `/registro` link so it points to `/auth/register`.
- [x] 1.3 Create a branded glassmorphism `src/app/not-found.tsx` page featuring recovery links to the dashboard, quick modules, and a button to trigger the global search palette.

## 2. Missing REST API Handlers Implementation

- [x] 2.1 Implement `src/app/api/soils/route.ts` with GET (returning regional soil profiles with text/pH filtering) and POST (enforcing `AGRONOMIST` or `ADMIN` role validation via `extractUserFromRequest`).
- [x] 2.2 Implement `src/app/api/recomendaciones/route.ts` with GET returning the agroecological compatibility matrix between Venezuelan crops and soil profiles.
- [x] 2.3 Implement `src/app/api/export/stats/route.ts` with GET supporting CSV and JSON data export with appropriate `Content-Type` headers.

## 3. Command Palette React Portal & Responsive Overhaul

- [x] 3.1 Refactor `src/components/layout/CommandPalette.tsx` to render the modal backdrop and dialog via `createPortal(modal, document.body)` with an SSR-safe `mounted` state check, breaking free from `.desktopUtilityBar` stacking context.
- [x] 3.2 Add a global custom event listener (`open-command-palette`) inside `CommandPalette.tsx` and add a touch-friendly search button (`<Search size={16} />`) to `.mobileBar` in `src/app/dashboard/layout.tsx`.
- [x] 3.3 Implement mobile viewport ergonomics in `CommandPalette.tsx` (`paddingTop: 3vh`, 16px input font size to avoid iOS zoom, `document.body` scroll freeze when open, touch inertia scrolling).
- [x] 3.4 Expand the search catalog in `CommandPalette.tsx` to include 13 platform modules (adding Manual, Postulación, Arquitectura, Swagger API Docs, Suelos), 11 key Venezuelan agricultural poles/municipalities (Turén, Calabozo, Quíbor, Santa Bárbara del Zulia, El Vigía, Barinas, Mesa de Guanipa, etc.), and quick action shortcuts.
- [x] 3.5 Add category filter chips (`[Todos]`, `[🛠️ Módulos]`, `[🇻🇪 Polos]`, `[🌾 Cultivos]`, `[⚡ Acciones]`), match text highlighting, and keyboard navigation (`↑`/`↓` with `scrollIntoView({ block: 'nearest' })`).

## 4. Testing, Quality Assurance and Verification

- [x] 4.1 Update and expand Jest tests in `tests/commandPalette.test.tsx` and `tests/routing.test.ts` to test Portal mounting, mobile event dispatching, and redirect definitions.
- [x] 4.2 Run TypeScript verification (`npm run typecheck`) and ensure 0 type errors.
- [x] 4.3 Run full test suite (`npm test` and `npm run test:backend`) to guarantee that all 278 automated tests pass.
- [x] 4.4 Run Next.js production build (`npm run build`) to verify all route outputs and Turbopack bundle integrity.
