## 1. Formal Institutional Documentation

- [x] 1.1 Create `docs/MEMORANDO_POSTULACION.md` containing the formal Executive Summary, TRL 7 Maturity Analysis, Architectural Layers, Precision Mathematical Formulations (Shoelace WGS84, Sentinel-1 SAR dB, GDD, IPCC Tier 2 SOC), ESG/ODS Impact Matrix, and Academic Citations. Verify the document is created and properly structured.

## 2. In-App Project Profile & Evaluator Tour

- [x] 2.1 Create `src/app/dashboard/postulacion/page.tsx` and `src/app/dashboard/postulacion/page.module.css` providing the 5-Minute Evaluator Tour, Scientific Algorithm Cards, Platform Quality Indicators (TRL 7, 24 States, 89 Tests), and direct tool CTAs. Verify the route compiles and renders without errors.
- [x] 2.2 In `src/app/dashboard/layout.tsx`, add the "🏛️ Ficha de Postulación" navigation item in the system tools menu. Verify the sidebar displays the new link.

## 3. Landing Page ESG/ODS Impact & Dossier Link

- [x] 3.1 In `src/components/landing/LandingFeatures.tsx`, integrate the ODS 2, 12, 13 Impact Indicators and farmer ROI cards with a direct link to `/dashboard/postulacion`. Verify the section displays cleanly on the landing page.

## 4. Verification & Audit

- [x] 4.1 Run `npm test` and confirm all 89 unit/integration tests pass with 0 regressions.
- [x] 4.2 Run `npx tsc --noEmit` and confirm 0 TypeScript errors.
