## 1. Navigation & Role Switcher Ergonomic Parity

- [x] 1.1 Add `🚀 Demo` / `🚀 Invitado` button to the compact sidebar role switcher in `src/app/dashboard/layout.tsx` and verify switching to the guest sandbox updates active badges and session state.
- [x] 1.2 Add "📖 Manual & Guías" link into the sidebar navigation groups in `src/app/dashboard/layout.tsx` and verify routing to `/dashboard/manual`.
- [x] 1.3 Refine mobile floating ergonomics and safe-area offsets in `src/components/layout/AgronomicGlossaryDrawer.module.css` and verify no overlap occurs on viewports under 380px.

## 2. Interactive User Manual & Printable Cabin Sheet

- [x] 2.1 Implement the comprehensive manual content repository in `src/lib/manual/manualContent.ts` containing chapters for all personas (`FARMER`, `AGRONOMIST`, `ADMIN`, `GUEST`), operational checklists, and vernacular unit conversions.
- [x] 2.2 Implement `src/components/manual/InteractiveManualViewer.tsx` and its CSS module with interactive chapter navigation, instant full-text search, and role filter tabs.
- [x] 2.3 Implement the printable tractor cabin cheat sheet `src/components/manual/CabinReferenceSheet.tsx` with high-contrast `@media print` styling for offline cab usage.
- [x] 2.4 Create the dashboard route `src/app/dashboard/manual/page.tsx` integrating the manual viewer, quick switcher, and SEO metadata.

## 3. Gamified Onboarding Progress Checklist

- [x] 3.1 Implement `src/components/dashboard/OnboardingChecklistWidget.tsx` and its CSS module tracking 4 initial operational milestones with progress percentage, celebratory state at 100%, and `localStorage` persistence.
- [x] 3.2 Embed `OnboardingChecklistWidget` into `src/app/dashboard/page.tsx` in both Technical and Farmer modes, verifying immediate interactivity and deep-links.

## 4. Testing, Type Checking & Browser Verification

- [x] 4.1 Implement unit test suites in `src/components/manual/__tests__/InteractiveManual.test.tsx` and `src/components/dashboard/__tests__/OnboardingChecklist.test.tsx` testing search filtering, role tabs, and checklist completion logic.
- [x] 4.2 Run TypeScript verification (`npm run typecheck`) and Jest test suite (`npm test`) ensuring 0 errors and 100% passing tests.
- [x] 4.3 Perform end-to-end browser verification of the manual route, role switching, and onboarding widget using the browser subagent.
