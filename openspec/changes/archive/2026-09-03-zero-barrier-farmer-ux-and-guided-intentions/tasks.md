## 1. UI Mode State & Navigation Toggle

- [x] 1.1 Create `UIModeContext` provider and hook (`src/lib/context/UIModeContext.tsx`) supporting `'farmer'` and `'specialist'` modes with `localStorage` persistence and default fallback; verify with isolated unit tests.
- [x] 1.2 Implement `FarmerModeToggle` component (`src/components/layout/FarmerModeToggle.tsx`) with accessible aria attributes, tooltips, and responsive layout; verify toggle updates UI mode state smoothly.
- [x] 1.3 Integrate `FarmerModeToggle` into `DashboardLayout` desktop utility bar and mobile header (`src/app/dashboard/layout.tsx`); verify visual containment on both desktop and mobile viewports.

## 2. Intentions Navigator Modal ("¿Qué necesitas hacer hoy?")

- [x] 2.1 Build `IntentionsModal` (`src/components/layout/IntentionsModal.tsx`) rendering 6 visual intention cards (Suelo, Clima, Medir Potrero, Cultivos, Bitácora, Asistente) with touch targets ≥ 56px and keyboard navigation; verify modal opens, closes, and routes correctly.
- [x] 2.2 Add prominent launcher button "¿Qué necesitas hacer hoy?" to `DashboardOverview` and top navigation bar; verify clicking the button launches `IntentionsModal`.

## 3. Streamlined 4-Door Farmer Dashboard & Colloquial Terminology

- [x] 3.1 Build `FarmerHomeDoors` component (`src/components/agronomy/FarmerHomeDoors.tsx`) displaying the 4 core field doors (Mi Tierra, Clima y Lluvia, Médico del Suelo, Cuaderno de Tareas), reassurance banner (*"Tranquilo, tu finca está guardada"*), and colloquial field glossary; verify visual rendering.
- [x] 3.2 Update `DashboardOverview` (`src/app/dashboard/page.tsx`) to conditionally render `FarmerHomeDoors` when UI mode is `'farmer'`, or the advanced telemetry overview when UI mode is `'specialist'`; verify switching between modes dynamically updates the page without full refresh.
- [x] 3.3 Update onboarding walkthrough in `QuickStartWizard` (`src/components/ui/QuickStartWizard.tsx`) to support simplified colloquial terminology when launched from Farmer Mode; verify conversational step descriptions.

## 4. Web Speech Voice Assistant (Audio & Mic)

- [x] 4.1 Implement `useVoiceAssistant` hook (`src/lib/hooks/useVoiceAssistant.ts`) wrapping browser `SpeechRecognition` for voice input and `speechSynthesis` for spoken playback with graceful fallback when unsupported; verify mock speech test execution.
- [x] 4.2 Integrate voice input button and audible recommendation speaker into `IntentionsModal` and `FarmerHomeDoors`; verify user can dictate a query and trigger audio playback.

## 5. Verification & Test Suite Integrity

- [x] 5.1 Write Jest unit tests in `src/__tests__/uiMode.test.tsx` and `src/__tests__/intentionsModal.test.tsx` verifying mode toggling, modal rendering, and localStorage synchronization.
- [x] 5.2 Execute full test suite (`npm test`, `npm run typecheck`, and `npm run build`) ensuring 0 TypeScript errors, 100% build pass, and no regressions across all 160 automated tests.
