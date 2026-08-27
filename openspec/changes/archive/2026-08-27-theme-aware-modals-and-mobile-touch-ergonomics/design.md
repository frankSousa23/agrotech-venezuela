## Context

The platform supports dark glassmorphism and an ultra-high-contrast sunlight mode. While core layout containers were theme-aware, several form modals and inputs had inline static styles (`#1e293b`, `#334155`, `#fff`) that did not adjust when switching themes. Also, mobile touch targets on layer selector buttons were below 44px.

## Goals / Non-Goals

**Goals:**
- Unify CSS variable tokens (`var(--surface)`, `var(--surface-raised)`, `var(--text-main)`, `var(--surface-border)`) across `SoilModal.tsx`, `CropModal.tsx`, and `ParcelModal.tsx`.
- Add mobile touch padding rules (`min-height: 44px`) on map layer buttons and navigation filters.
- Extend `[data-theme="sunlight"]` CSS rules to automatically style all inputs, dropdowns, modal overlays, and tables with WCAG AAA contrast.

**Non-Goals:**
- Redesigning modal form fields or altering database schemas.

## Decisions

### 1. Form and Modal Design Tokens
- Replace inline static colors in form modals with CSS variables:
  - Dialog background: `var(--surface)`
  - Input background: `var(--surface-raised)`
  - Input border: `var(--surface-border)`
  - Text color: `var(--text-main)`
  - Secondary text: `var(--text-muted)`

### 2. Mobile Touch Targets
- On mobile viewports (`max-width: 640px`), ensure interactive buttons and pills have `min-height: 44px` and comfortable horizontal padding.

### 3. Sunlight Theme Global Overrides
- Add specific overrides in `globals.css` for `input`, `select`, `textarea`, and `.glass-panel` under `[data-theme="sunlight"]`.
