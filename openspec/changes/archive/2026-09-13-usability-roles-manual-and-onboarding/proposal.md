## Why

While Agrotech Venezuela features robust dual-mode UI (`FARMER` and `AGRONOMIST`), administrative guardrails, and floating pedagogical assistants (`QuickStartWizard`, `IntentionsModal`, `DemoTourModal`, `AgronomicGlossaryDrawer`), users and field producers lack a unified, permanent reference manual (`/dashboard/manual`) accessible directly from the navigation bar. Furthermore, the quick role selector in the dashboard sidebar currently omits a direct 1-click shortcut for `🚀 Invitado` (available only in `/dashboard/admin`), and new users lack an onboarding progress tracker (gamified checklist) to guide them step-by-step through their first productive session.

Providing an integrated, role-adaptive interactive manual and tractor cabin quick sheet, alongside full role switcher parity and an onboarding checklist, removes user friction, accelerates adoption across rural and technical audiences, and guarantees seamless usability.

## What Changes

- **New Interactive User Manual Route (`/dashboard/manual`)**:
  - Chapter-based navigation covering *Modo Productor Fácil*, *Ingeniería Agronómica & Radar SAR*, *Manejo de Maquinaria & VRA*, *Cálculo de Carbono MRV*, *Telemetría IoT* y *Administración*.
  - Real-time search filter across chapters and procedures.
  - Role filter tabs to display relevant documentation immediately based on active persona (`Productor`, `Técnico`, `Administrador`, `Invitado`).
  - Printable single-page "Ficha de Cabina para Tractor / Guía Rápida de Campo" with offline instructions and key vernacular conversion factors.
- **Role Switcher Ergonomic Parity**:
  - Integrate `🚀 Invitado` directly into the compact sidebar role switcher in `src/app/dashboard/layout.tsx` so evaluators and farmers can switch into isolated guest sandbox mode without navigating to `/dashboard/admin`.
  - Add active role badge and visual indicator in the top navbar.
- **Gamified Onboarding Checklist Widget**:
  - Add a "Primeros Pasos en Agrotech" progress card on the main dashboard (`/dashboard`) displaying completion progress (0% to 100%) across 4 core initial milestones:
    1. 🛰️ Explorar el visor WebGIS multi-escala.
    2. 📍 Delimitar o consultar una parcela productiva.
    3. 📡 Simular telemetría o estación agrometeorológica.
    4. 📖 Consultar el Manual de Campo o Glosario Vernacular.
  - Interactive click-through triggers that navigate to the respective feature or mark as completed with local persistence (`localStorage`).
- **Mobile Floating Ergonomics**:
  - Adjust z-index and bottom safe-area offset for the floating `AgronomicGlossaryDrawer` button to ensure it never overlaps with map bottom drawers or mobile bottom navigation bars on screens under 380px.

## Capabilities

### New Capabilities
- `interactive-agronomic-manual`: Comprehensive, role-segmented manual and field guide at `/dashboard/manual` with interactive chapter search, audio readouts, and printable cabin reference sheet.

### Modified Capabilities
- `user-roles-and-permissions`: Compact role switcher parity in sidebar/header including `GUEST` mode, ensuring immediate access to demo profiles and active role indicators.
- `onboarding-module-guide`: Interactive multi-step onboarding checklist tracking user onboarding milestones with persistent progress state and contextual deep-links.

## Impact

- **Affected Routes & Components**:
  - `src/app/dashboard/manual/page.tsx` (New route).
  - `src/components/manual/InteractiveManualViewer.tsx` (New component).
  - `src/components/manual/CabinReferenceSheet.tsx` (New printable component).
  - `src/components/dashboard/OnboardingChecklistWidget.tsx` (New component).
  - `src/app/dashboard/layout.tsx` (Sidebar role switcher update & navigation link).
  - `src/app/dashboard/page.tsx` (Integration of Onboarding Checklist).
  - `src/components/layout/AgronomicGlossaryDrawer.tsx` (Mobile bottom offset tuning).
- **APIs & Data**:
  - Client-side persistent storage for onboarding state via `localStorage` (with safe hydration fallback).
  - No database migration or backend schema changes required; completely non-breaking and additive.
