## Why

To deliver an elite, intuitive, and field-resilient user experience across all modules of Agrotech Venezuela by integrating a global Command Palette (`Ctrl + K`), unified Toast notifications, a Sunlight High-Contrast mode for farm tractor visibility, and animated shimmer skeletons with guided onboarding empty states.

## What Changes

- **1. Global Command Palette (`Ctrl + K` / `Cmd + K`)**: Add an omnibox modal accessible from anywhere to search and jump directly to any of the 24 Venezuelan states, strategic crops, parcel management, or AI simulators.
- **2. Global Toast Notification System**: Provide animated status toasts for parcel creation, field log updates, offline mutation alerts, and data exports.
- **3. High Contrast Sunlight Mode ("Modo Pleno Campo")**: Add a header toggle allowing farmers to switch between the default dark glassmorphism theme and an ultra-high-contrast daylight theme for outdoor readability.
- **4. Shimmer Skeletons & Guided Empty States**: Replace raw "Cargando..." loading text with animated CSS shimmer placeholders and transform empty tables/lists into actionable step-by-step onboarding cards.

## Capabilities

### New Capabilities
- `command-palette-and-quick-jump`: Omnibox search palette for fast state, crop, and action navigation.
- `global-toast-notification-system`: Non-blocking toast notification stack for real-time user feedback.
- `high-contrast-sun-mode`: Outdoor daylight contrast theme toggle for agricultural fields.
- `shimmer-skeletons-and-empty-states`: Shimmer loading states and onboarding empty-state guides.

### Modified Capabilities
<!-- None -->

## Impact

- **UI Components**: `src/components/layout/Navbar.tsx`, `src/components/layout/CommandPalette.tsx`, `src/components/ui/ToastProvider.tsx`, `src/components/ui/ShimmerSkeleton.tsx`, `src/components/ui/EmptyStateCard.tsx`.
- **Layout & Pages**: `src/app/dashboard/layout.tsx`, `src/app/dashboard/tierras/page.tsx`, `src/app/dashboard/bitacora/page.tsx`, `src/app/globals.css`.
