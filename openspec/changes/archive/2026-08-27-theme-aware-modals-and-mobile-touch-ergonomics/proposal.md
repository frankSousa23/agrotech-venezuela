## Why

Global responsive and theme audit revealed that form modals (`SoilModal`, `CropModal`, `ParcelModal`) contained fixed `#1e293b` backgrounds and hardcoded white text rather than dynamic CSS theme variables, leading to contrast mismatch in Sunlight Mode. Additionally, mobile touch targets on layer selectors needed enlargement to satisfy mobile ergonomic standards (min 44px height).

## What Changes

- **1. Theme-Aware Modals & Inputs**: Refactor `SoilModal.tsx`, `CropModal.tsx`, `ParcelModal.tsx`, and general form controls to use design token variables (`var(--surface)`, `var(--surface-raised)`, `var(--text-main)`, `var(--surface-border)`).
- **2. Mobile Touch Target Ergonomics**: Ensure all interactive buttons, map layer pickers, and filter pills have minimum 44px touch height with `flex-wrap: wrap` and touch-friendly padding on mobile screens (< 640px).
- **3. Sunlight Mode Fine-Tuning**: Extend `[data-theme="sunlight"]` rules in `globals.css` to cover form inputs, select dropdowns, modal overlays, and table headers for maximum daylight legibility.

## Capabilities

### New Capabilities
- `theme-aware-modals-and-inputs`: Complete integration of CSS variables across all modal dialogs and form controls.
- `mobile-touch-ergonomics`: 44px minimum touch targets and responsive wrapping for field mobile use.
- `sunlight-high-contrast-fine-tuning`: Comprehensive Daylight theme overrides across inputs, selects, and cards.

### Modified Capabilities
<!-- None -->

## Impact

- **Modal Components**: `src/components/forms/SoilModal.tsx`, `src/components/forms/CropModal.tsx`, `src/components/forms/ParcelModal.tsx`.
- **GIS Components**: `src/components/gis/MapBiomasViewer.tsx`, `src/components/gis/VenezuelaStateMapViewer.tsx`.
- **Global Styles**: `src/app/globals.css`.
