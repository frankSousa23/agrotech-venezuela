## Context

The Agrotech platform serves agricultural producers, agronomists, and researchers. To ensure seamless productivity both in the office and directly in the field under harsh sunlight, the UI requires global quick-jump search, unified toast feedback, a high-contrast solar theme, and smooth loading/empty states.

## Goals / Non-Goals

**Goals:**
- Enable keyboard-driven (`Ctrl+K`) omnibox navigation across states, crops, parcels, and tools.
- Provide a global Toast context for real-time user feedback.
- Introduce a high-contrast daylight theme toggle for field readability.
- Standardize shimmer loading skeletons and illustrated onboarding empty states.

**Non-Goals:**
- Completely replacing the dark theme (the dark glassmorphism theme remains the default aesthetic).

## Architecture & Decisions

### 1. Global Toast Context (`src/components/ui/ToastProvider.tsx`)
- Lightweight React Context wrapping `src/app/layout.tsx` exposing `toast.success()`, `toast.info()`, `toast.warning()`, and `toast.error()`.
- Renders in a portal container fixed at the bottom-right or top-right.

### 2. Command Palette (`src/components/layout/CommandPalette.tsx`)
- Global omnibar searching across `VENEZUELA_STATES_DATA`, `CROPS_DATA`, and dashboard routes.
- Closes on `Escape` or backdrop click.

### 3. Sunlight Mode CSS Variables (`src/app/globals.css`)
- Root CSS variables dynamically switched via `data-theme="sunlight"`.

### 4. Shimmer Skeleton and Empty States
- Micro-component `<ShimmerSkeleton height="120px" borderRadius="12px" />` and `<EmptyStateCard icon={Tractor} title="..." description="..." actionLabel="..." onAction={...} />`.
