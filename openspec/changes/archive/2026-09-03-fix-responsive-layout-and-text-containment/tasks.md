## 1. Global Touch Target and Micro-Button Safeguards

- [x] 1.1 In `src/app/globals.css`, refine the `@media (max-width: 640px)` touch target selector from universal `button` to explicit action CTA classes (`.btn-primary`, `.btn-secondary`, `.btn-accent`, `.actionBtn`, `button[type="submit"]`), and verify `button.triggerBtn` is excluded.
- [x] 1.2 In `src/components/ui/AgroTooltip.module.css`, enforce strict circular geometry on `.triggerBtn` with `min-width: 18px !important; min-height: 18px !important; max-width: 18px; max-height: 18px; flex-shrink: 0; aspect-ratio: 1 / 1;`, and verify with Jest or browser check.

## 2. Landing Page and Dashboard Layout Header Containment

- [x] 2.1 In `src/app/page.module.css` and `src/app/page.tsx`, adjust `.navLinks` gap, collapse nav links at `<= 1140px`, and display a single consolidated CTA button on mobile viewports (< 768px) to eliminate multi-line text wrapping.
- [x] 2.2 In `src/app/dashboard/layout.module.css` and `src/app/dashboard/layout.tsx`, optimize `mobileBar`: display icon-only actions for secondary buttons ("Tour Demo" and "Salir") on screens under 420px, and verify header fits inside 375px/390px viewports without horizontal scrolling.

## 3. Agronomic Container and Text Containment

- [x] 3.1 In `src/app/dashboard/postulacion/page.module.css`, add `max-width: 100%; overflow-x: auto; white-space: nowrap; -webkit-overflow-scrolling: touch;` to `.scienceFormula`, and verify formulas do not clip on mobile viewports.
- [x] 3.2 In `src/app/dashboard/tierras/page.module.css`, add `white-space: nowrap; flex-shrink: 0;` to `.areaBadge` and `flex-wrap: wrap; gap: 0.5rem;` to `.cardActions`, verifying parcel card buttons do not wrap into single syllables.
- [x] 3.3 In `src/app/dashboard/recomendaciones/page.module.css`, update `.cropsResultsGrid` to `grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))` with `@media (max-width: 640px) { grid-template-columns: 1fr; }`, verifying crop names and score badges never collide.
- [x] 3.4 In `src/components/agronomy/MicrocropIoTLab.module.css`, add smooth horizontal touch scrolling to `.tabNav` and responsive wrapping to `.kpiRow` on screens under 480px.

## 4. Automated Testing and Responsive Verification

- [x] 4.1 Run `npm run typecheck` (`tsc --noEmit`) and verify 0 TypeScript errors.
- [x] 4.2 Run `npm run test:all` and verify all 148 Jest and Pytest tests pass without regressions.
- [x] 4.3 Launch the browser subagent across 375px (mobile), 768px (tablet), and 1280px (desktop) viewports to verify that all texts, badges, formulas, and action buttons remain 100% contained within their cards.
