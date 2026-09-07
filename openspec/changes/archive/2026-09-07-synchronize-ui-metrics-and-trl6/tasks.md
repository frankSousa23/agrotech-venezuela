## 1. Landing Page & Navigation Synchronization

- [x] 1.1 Update `src/app/page.tsx` to replace all remaining "TRL 7" references with "TRL 6" across the navbar link, award badge, call-to-action button, and footer links. Verify text rendered on landing page.
- [x] 1.2 Update `src/app/dashboard/layout.tsx` to replace the navigation badge for Ficha de Postulación from `TRL 7` to `TRL 6`. Verify sidebar item badge.

## 2. Institutional Postulación Dashboard & Tour Modal

- [x] 2.1 Update `src/app/dashboard/postulacion/page.tsx` header maturity badge, test count badge (`233 Tests Automatizados Pasando: 179 Jest + 54 Pytest`), inline body text, article badge (`TRL 6 Demostrado`), and matrix card metadata (`233 tests`). Verify page renders properly.
- [x] 2.2 Update `src/components/layout/DemoTourModal.tsx` Step 5 to reference `Madurez TRL 6` in title, description, and action button label. Verify tour modal step 5.

## 3. Verification & Build

- [x] 3.1 Execute `npm run typecheck` and confirm 0 TypeScript errors.
- [x] 3.2 Execute `npm test` and `npm run test:backend` (233 total tests) to confirm zero regressions.
- [x] 3.3 Execute `npm run build` and confirm all 30 production routes compile cleanly with Next.js Turbopack.
