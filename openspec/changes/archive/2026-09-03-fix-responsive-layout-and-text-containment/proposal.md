## Why

Visual inspection across desktop (1280px–1920px), tablet (768px), and mobile viewports (375px–390px) revealed multiple layout overflow, text clipping, and container misalignment issues:
1. The landing page header packs 8 links and 3 full-width CTA buttons, overflowing on 1280px desktop screens and wrapping into 4-line fragments on mobile devices.
2. The dashboard mobile topbar (`mobileBar`) attempts to place 5 action buttons and badges horizontally, exceeding the 390px viewport width (404px required).
3. A blanket CSS selector `button { min-height: 44px }` on mobile in `globals.css` distorts inline micro-buttons and badges (such as the 18px circular `AgroTooltip` "?" button) into elongated oval shapes.
4. Mathematical formulas on the TRL 7 postulacion page (`.scienceFormula`), parcel action buttons on Mis Tierras (`.cardActions`), and crop ranking cards on the Soil Advisor (`.cropsResultsGrid`) suffer from horizontal clipping and rigid 2-column grids on narrow screens.

Resolving these containment and responsiveness issues ensures that all text, buttons, and visual containers fit their boundaries seamlessly across all screen sizes.

## What Changes

- **Landing Page Header Optimization**:
  - Reduce navbar gap and link font size to prevent clipping at 1280px/1366px laptop resolutions.
  - Set breakpoint collapse for nav links at `<= 1140px`.
  - On mobile (`< 768px`), display a single primary CTA button (`🚀 Iniciar WebGIS` / `Demo`) and conceal secondary text buttons to eliminate multi-line text wrapping.
- **Dashboard Mobile Topbar (`mobileBar`) Optimization**:
  - Restructure mobile header elements: hide verbose text labels for secondary buttons ("🎬 Tour Demo" becomes an icon/compact badge, "Salir" becomes an icon-only button), freeing > 120px of space.
  - Guarantee that the branding, theme toggle, and hamburger menu fit comfortably within 360px–390px screens without horizontal scroll.
- **Micro-Control & Tooltip Protection**:
  - Refine mobile touch target rules in `globals.css` so that `min-height: 44px` targets primary, secondary, and form buttons without distorting inline micro-buttons (`.triggerBtn`, `.badgeBtn`, `.pillBtn`).
  - Explicitly reinforce `AgroTooltip.module.css` with `min-width: 18px !important; min-height: 18px !important; max-width: 18px; max-height: 18px; flex-shrink: 0; aspect-ratio: 1 / 1` to guarantee perfectly circular rendering.
- **Container and Text Containment (TRL 7, Parcel Cards & Crops Grid)**:
  - Add `overflow-x: auto; max-width: 100%; white-space: nowrap; -webkit-overflow-scrolling: touch` to `.scienceFormula` in `postulacion/page.module.css`.
  - Add `white-space: nowrap; flex-shrink: 0;` to `.areaBadge` and `flex-wrap: wrap; gap: 0.5rem;` to `.cardActions` in `tierras/page.module.css`.
  - Update `.cropsResultsGrid` in `recomendaciones/page.module.css` to `grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));` with a mobile 1-column fallback (`@media (max-width: 640px) { grid-template-columns: 1fr; }`).
  - Add horizontal scrolling ergonomics to `.tabNav` in `MicrocropIoTLab.module.css`.

## Capabilities

### Modified Capabilities
- `mobile-touch-ergonomics`: Refine the 44px touch target requirement to exclude inline micro-buttons/tooltips, and optimize the fixed mobile topbar layout to prevent multi-button overflow on screens under 420px.
- `agronomic-typography-and-layout-fixes`: Add strict text containment, horizontal scroll protection for scientific formulas, parcel card button wrap, and responsive crop card grid sizing.

## Impact

- **Affected Files**:
  - `src/app/globals.css`: Touch target selectors and text wrap safeguards.
  - `src/app/page.module.css` & `src/app/page.tsx`: Navbar spacing and mobile CTA containment.
  - `src/app/dashboard/layout.module.css` & `src/app/dashboard/layout.tsx`: Mobile topbar ergonomics and compact button rendering.
  - `src/components/ui/AgroTooltip.module.css`: Micro-button circular geometry lock.
  - `src/app/dashboard/postulacion/page.module.css`: Mathematical formula scroll container.
  - `src/app/dashboard/tierras/page.module.css`: Parcel card header badges and button wrap.
  - `src/app/dashboard/recomendaciones/page.module.css`: Crop ranking grid responsive breakpoint.
  - `src/components/agronomy/MicrocropIoTLab.module.css`: Tab bar mobile overflow touch scrolling.
- **Dependencies & APIs**: None. Purely frontend CSS and layout component ergonomics.
- **Breaking Changes**: None.
