## 1. Theme-Aware Modals & Inputs Refactoring

- [x] 1.1 Update `SoilModal.tsx`, `CropModal.tsx`, and `ParcelModal.tsx` to use CSS variables (`var(--surface)`, `var(--surface-raised)`, `var(--text-main)`, `var(--surface-border)`). Verify theme switching on modals.

## 2. Mobile Touch Target Ergonomics & Responsive Overlays

- [x] 2.1 Enhance button touch targets in `MapBiomasViewer.tsx` and `VenezuelaStateMapViewer.tsx` to ensure 44px minimum touch target on mobile screens (< 640px).

## 3. Global Sunlight Mode Contrast Fine-Tuning

- [x] 3.1 Extend `[data-theme="sunlight"]` CSS rules in `src/app/globals.css` for inputs, selects, textareas, tables, and modal backgrounds. Verify contrast in Sunlight mode.

## 4. Full Validation & Test Suite

- [x] 4.1 Run full Jest test suite (`npm test`), TypeScript verification (`npx tsc --noEmit`), and Turbopack production build (`npm run build`).
