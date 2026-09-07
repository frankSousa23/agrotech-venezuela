## Context

See `proposal.md` for motivation and background.

The system uses Next.js 16 App Router with CSS Modules and glassmorphism styling. Recent UI enhancements introduced:
1. 3 semantic dropdowns in the landing page navbar.
2. Compact sidebar with sticky connectivity and profile footer.
3. Reorganized 5-tab IoT laboratory with ADC calibration and Saxton-Rawls pedotransfer metrics.
4. Prescriptive agronomic alerts within the WebGIS spatial telemetry panel.

To achieve complete cross-device usability and guarantee project-wide consistency, the design must establish clear responsive boundaries and layout rules across all screen sizes (mobile ≤ 768px, tablet 768px–1024px, and desktop ≥ 1024px).

## Goals / Non-Goals

**Goals:**
- Eliminate vertical scrolling in the dashboard navigation sidebar on viewports with height ≥ 900px.
- Extend tablet visibility for landing page navigation links down to 880px before collapsing into the mobile hamburger menu.
- Ensure smooth horizontal swipe navigation for multi-tab tools (Microcrop IoT Lab) on mobile screens with hidden native scrollbars.
- Provide a responsive collapsible telemetry drawer for WebGIS on viewports ≤ 768px with prominent prescriptive alert badges.
- Maintain full coherence across project benchmarks: TRL 6 certification, 233 automated tests, 30 Turbopack production routes, and dual-mode rural accessibility.

**Non-Goals:**
- Adopting external CSS frameworks (TailwindCSS) or changing the Vanilla CSS Modules architecture.
- Altering the backend FastAPI algorithms (Saxton-Rawls, SAR backscatter, Kamprath lime calculations).
- Modifying routing structure or database schemas.

## Decisions

### 1. Tablet Navbar Breakpoint at 880px
- **Choice**: Shift the `.navLinks` hide breakpoint from `1140px` to `880px` in `src/app/page.module.css`.
- **Rationale**: The 3 semantic dropdowns (`🌾 Módulos de Campo`, `🔬 Ciencia & Datos`, `🏛️ Postulación TRL 6`) occupy ~580px alongside the logo and CTA. Lowering the breakpoint to 880px preserves access on iPad/tablet portrait and split-screen desktop windows without visual collisions.
- **Alternatives considered**: Hiding individual dropdowns selectively (created inconsistent navigation hierarchy) or retaining `1140px` (hid full navigation prematurely on medium displays).

### 2. Pure CSS Flexbox Ergonomics for Compact Sidebar
- **Choice**: In `src/app/dashboard/layout.module.css`, adjust `.navItem` padding to `0.35rem 0.65rem`, reduce gap between items to `0.2rem`, and use responsive margin clamps for footer controls.
- **Rationale**: Fits all 8 primary navigation items, the brand badge, connectivity status pill, and user profile within 820px of vertical space, completely eliminating vertical scrollbars on standard 1080p and 900p displays.
- **Alternatives considered**: JavaScript dynamic scaling (introduces layout jank and hydration mismatches) or grouping routes in sub-menus (added extra clicks for field operators).

### 3. Native CSS Horizontal Scrolling for Multi-Tab Laboratories
- **Choice**: Set `overflow-x: auto`, `white-space: nowrap`, and `scrollbar-width: none` (`-webkit-overflow-scrolling: touch`) on the tab container in `MicrocropIoTLab.tsx`.
- **Rationale**: Provides native 60fps swipe ergonomics on smartphones without requiring heavy third-party swipe libraries.
- **Alternatives considered**: Dropdown selector instead of tabs (hid available tools and reduced discoverability) or multi-row wrapping (wasted critical vertical map/graph space).

### 4. Collapsible Bottom Sheet / Drawer for WebGIS Mobile Telemetry
- **Choice**: Implement a toggleable mobile drawer state (`isMobileDrawerOpen`) in `VenezuelaStateMapViewer.tsx` triggered by a drag handle / tap bar on screens ≤ 768px.
- **Rationale**: Keeps the Leaflet map interactive while allowing the user to inspect detailed edaphic metrics, SAR radar graphs, and Kamprath/gypsum prescription alerts on demand.
- **Alternatives considered**: Floating modal dialog (blocked map interaction entirely) or static bottom cards (covered half the viewport permanently).

## Risks / Trade-offs

- **[Risk]** Dropdown menus on 880px-1024px screens could overflow viewport edges.
  → **Mitigation**: Applied `left: 0`, `min-width: 260px`, `max-width: 90vw`, and subtle backdrop blur to prevent horizontal overflow.
- **[Risk]** Text truncation in compact sidebar on non-standard DPI scales.
  → **Mitigation**: Flexbox `min-width: 0`, graceful label truncation, and native HTML `title` attributes on navigation items.
- **[Risk]** Touch gestures on mobile WebGIS drawer conflicting with Leaflet map drag.
  → **Mitigation**: Applied `stopPropagation()` on the drawer container touch handlers so map panning is unaffected.

## Migration Plan

No database or breaking API changes are required. All styling enhancements apply transparently through CSS Modules. Continuous integration automated tests (233 tests across Jest and Pytest) must be verified after all changes.
