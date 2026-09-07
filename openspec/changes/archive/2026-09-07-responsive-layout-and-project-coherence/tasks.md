## 1. Responsive Breakpoints & Navigation Ergonomics

- [x] 1.1 Validate tablet breakpoint in `src/app/page.module.css` at 880px and verify semantic dropdowns (`🌾 Módulos de Campo`, `🔬 Ciencia & Datos`, `🏛️ Postulación TRL 6`) remain fully accessible and interactive on viewports between 880px and 1140px.
- [x] 1.2 Validate compact sidebar vertical ergonomics in `src/app/dashboard/layout.module.css` and verify all 8 navigation links, brand header, status pill, and logout footer fit with zero vertical scroll on screens with viewport height ≥ 900px.

## 2. Mobile & Touch Analytical Interfaces

- [x] 2.1 Validate horizontal swipe ergonomics with hidden native scrollbars in `src/components/agronomy/MicrocropIoTLab.tsx` and verify seamless switching across all 5 laboratory tabs on viewports ≤ 768px.
- [x] 2.2 Validate collapsible mobile drawer behavior in `src/components/gis/VenezuelaStateMapViewer.tsx` and verify prescriptive soil/radar alert badges render with high visual contrast and touch target heights ≥ 44px.

## 3. Full System Verification & Metric Coherence

- [x] 3.1 Run the full automated test suite via `npm run test:all` and verify all 233 tests (179 Jest + 54 Pytest) pass cleanly.
- [x] 3.2 Run TypeScript type checking (`npm run typecheck`) and Next.js 16 production compilation (`npm run build`) to verify all 30 routes build with 0 errors.
