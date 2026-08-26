## 1. Global Toast Notifications & Feedback

- [x] 1.1 Create `src/components/ui/ToastProvider.tsx` and integrate it into root layout (`src/app/layout.tsx`). Verify toast dispatches.

## 2. Command Palette Omnibox (`Ctrl + K`)

- [x] 2.1 Create `src/components/layout/CommandPalette.tsx` indexing states, crops, and dashboard routes. Add trigger button in dashboard navbar. Verify search and jump.

## 3. High-Contrast Sunlight Mode ("Modo Pleno Campo")

- [x] 3.1 Implement sunlight theme variables in `src/app/globals.css` and add toggle button in header. Verify contrast switching.

## 4. Shimmer Skeletons & Actionable Empty States

- [x] 4.1 Create `src/components/ui/ShimmerSkeleton.tsx` and `src/components/ui/EmptyStateCard.tsx`. Integrate into `tierras/page.tsx` and `bitacora/page.tsx`. Verify loading and empty state rendering.

## 5. Global Audit & End-to-End Test Suite Verification

- [x] 5.1 Run full Jest tests (`npm test`), TypeScript check (`npx tsc --noEmit`), and Turbopack production build (`npm run build`).
