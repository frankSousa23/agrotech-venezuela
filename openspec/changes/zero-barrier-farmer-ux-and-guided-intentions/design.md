## Context

See `proposal.md` for motivation. The Agrotech Venezuela web platform integrates high-density multi-temporal satellite data (MapBiomas, NASA POWER, Sentinel SAR) with agronomic calculations. While invaluable for researchers and prize evaluators, rural farmers and first-time users experience cognitive overload when faced with scientific jargon and keyboard-driven search boxes (`Ctrl+K`).

This design specifies the client-side architecture for a dual-mode presentation layer ("Modo Productor" vs "Modo Técnico"), visual goal-driven navigation, native browser speech interaction, and conversational agronomic translation.

## Goals / Non-Goals

**Goals:**
- Provide a persistent client-side UI mode switcher (`'farmer'` vs `'specialist'`) stored in `localStorage`.
- Render a streamlined 4-door action dashboard in Farmer Mode:
  1. 🌾 *Mi Tierra y Finca* (`/dashboard/tierras`)
  2. 🌧️ *El Clima y Lluvia* (`/dashboard/estadisticas` or quick weather card)
  3. 🧪 *El Médico del Suelo* (`/dashboard/recomendaciones?mode=simple`)
  4. 📖 *Cuaderno de Tareas* (`/dashboard/bitacora?mode=simple`)
- Implement a modal for visual intentions (`IntentionsModal`) triggered by a prominent "¿Qué necesitas hacer hoy?" button.
- Implement speech-to-text and text-to-speech utilizing native browser `SpeechRecognition` and `speechSynthesis` (zero extra bundle weight, zero API billing).
- Display conversational farmer tooltips translating scientific metrics into common agricultural terms.

**Non-Goals:**
- Removing or dumbing down existing scientific GIS layers or evaluative dossiers.
- Introducing heavy external speech AI dependencies or proprietary cloud STT/TTS services.
- Altering PostgreSQL schemas or REST API contracts.

## Decisions

### Decision 1: React Context & LocalStorage Mode State (`useUIMode`)
- **Choice**: Implement a lightweight `UIModeContext` providing `mode: 'farmer' | 'specialist'`, `toggleMode()`, and persistent storage key `agrotech_ui_mode`.
- **Default Rule**: Default to `'farmer'` for new visitors and guest sessions; preserve user's manual selection across page reloads and routes.
- **Alternative considered**: Server-side user profile column in Prisma. Rejected because guests and unauthenticated visitors need zero-barrier mode switching without requiring an account update.

### Decision 2: Native Web Speech API with Graceful Degradation
- **Choice**: Use standard browser `window.SpeechRecognition || window.webkitSpeechRecognition` for microphone input and `window.speechSynthesis` for vocalizing prescriptions in Spanish (`es-VE` / `es-ES`).
- **Alternative considered**: Third-party cloud transcription service. Rejected to keep application free, offline-capable in rural environments, and low-latency.
- **Degradation**: If speech APIs are unavailable (e.g., restricted webviews or older browsers), the UI hides the microphone/audio icons or provides clear visual text fallbacks without throwing errors.

### Decision 3: Dual-Mode Dashboard Architecture
- **Choice**: In `DashboardOverview` (`src/app/dashboard/page.tsx`), render either `<FarmerHomeDoors />` (4 giant touch cards + intent launcher) or the full `<SpecialistOverview />` (KPI grid, technical satellite viewer, AHP metrics) based on `useUIMode()`.
- **Rationale**: Clean separation of concerns; prevents code bloat and allows isolated unit testing for both experiences.

```
┌───────────────────────────────────────────────────────────────┐
│                    UIModeContext (State)                     │
│               'farmer' (default) ◄──► 'specialist'           │
└───────────────────────────────┬───────────────────────────────┘
                                │
        ┌───────────────────────┴───────────────────────┐
        ▼                                               ▼
┌───────────────────────────────┐       ┌───────────────────────────────┐
│    Modo Productor Simple      │       │   Modo Técnico Especialista   │
│ - 4 Puertas de Acción (≥56px) │       │ - KPI Grid (24 Estados, AHP)  │
│ - Modal de Intenciones        │       │ - MapBiomas 40 Años & SAR dB  │
│ - Asistente de Voz / Audio    │       │ - CommandPalette (Ctrl+K)     │
│ - Glosario Campesino Llano    │       │ - Fórmulas & Ficha TRL 7      │
└───────────────────────────────┘       └───────────────────────────────┘
```

## Risks / Trade-offs

- **[Risk]** Speech Recognition permission denied or microphone absent on desktop.
  - **Mitigation**: Detect permission and browser support on mount; render friendly tooltips explaining that typing/clicking works normally.
- **[Risk]** First-time farmers feeling disoriented when transitioning to deep routes.
  - **Mitigation**: Ensure `BackButton` is prominently rendered at the top of every dashboard subpage with a clear "⬅️ Volver a mis tareas" label.
- **[Risk]** Technical evaluators seeing a simplified interface and wondering where the advanced GIS features went.
  - **Mitigation**: Place a persistent, glowing "Modo Técnico 🔬" button in the navbar with a tooltip explaining that full satellite telemetry is one click away.
