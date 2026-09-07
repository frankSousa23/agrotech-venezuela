## Why

The recent recalibration of Agrotech Venezuela successfully aligned the official documentation, scientific articles, pitch decks, PDFs, and backend architecture with Frank Sousa's authentic vision: an honest TRL 6 benchmark (demonstrated prototype in relevant agricultural environments) and 233 automated tests (179 Jest + 54 Pytest). However, an exploration of the active UI uncovered lingering visual artifacts displaying "TRL 7" and an outdated count of "227 tests" across the landing page, dashboard navigation, postulación dossier view, and the 5-step interactive demo tour modal.

Synchronizing these UI components is essential to ensure 100% coherence between what jury members, evaluators, and producers read in the official dossiers and what they experience interactively in the web application.

## What Changes

- **Landing Page (`src/app/page.tsx`)**: Update navigation link, hero award badge, call-to-action button, and footer platform links from "TRL 7" to "TRL 6".
- **Dashboard Navigation (`src/app/dashboard/layout.tsx`)**: Update the navigation item badge for Ficha de Postulación from `TRL 7` to `TRL 6`.
- **Institutional Dossier Route (`src/app/dashboard/postulacion/page.tsx`)**:
  - Update header maturity badge from "Nivel de Madurez TRL 7 (Sistema Validado en Entorno Real)" to "Nivel de Madurez TRL 6 (Prototipo Demostrado en Entorno Relevante)".
  - Update test count badge from "227 Tests Automatizados Pasando (173 Jest + 54 Pytest)" to "233 Tests Automatizados Pasando (179 Jest + 54 Pytest)".
  - Update inline text, article card badges, and compliance matrix metadata from TRL 7 / 227 tests to TRL 6 / 233 tests.
- **Demo Tour Modal (`src/components/layout/DemoTourModal.tsx`)**: Update Step 5 title, description, and action label from "TRL 7" to "TRL 6".

## Capabilities

### Modified Capabilities

- `ux/evaluator-project-profile`: Harmonize the postulación view requirements to display TRL 6 maturity and 233 automated tests.
- `guided-demo-tour`: Harmonize Step 5 of the interactive demo tour modal to reference TRL 6 institutional profile.
- `interactive-landing-ecosystem`: Harmonize the landing page dossier links and badges to reflect TRL 6 maturity.

## Impact

- **Affected Files**:
  - `src/app/page.tsx`
  - `src/app/dashboard/layout.tsx`
  - `src/app/dashboard/postulacion/page.tsx`
  - `src/components/layout/DemoTourModal.tsx`
- **APIs and Backend**: No breaking changes; zero API modifications.
- **Tests**: Zero regressions; preserves all 233 passing tests (179 Jest + 54 Pytest).
