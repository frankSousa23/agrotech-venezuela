## Why

Most Venezuelan rural producers and smallholders have low digital literacy and interact primarily with mobile interfaces via voice notes and photos (e.g., WhatsApp). They find dense scientific terminology (*"Shoelace Geodésico"*, *"Algoritmo Multicriterio AHP"*, *"Radar SAR Banda C dB"*, *"Edafológico"*) and conventional text-based search palettes (`Ctrl+K`) intimidating, leading to cognitive overload and abandonment.

To ensure Agrotech Venezuela is genuinely inclusive, democratic, and useful to anyone who has never used a GIS or computerized management system before, the platform requires an empathetic **"Zero-Barrier UX"** architecture. This bridges cutting-edge MapBiomas satellite intelligence with plain agricultural language, intent-driven visual navigation, speech input/output, and a simple one-click mode switch.

## What Changes

- **Modo Productor Simple vs. Modo Técnico Especialista**: A persistent top-bar toggle allowing users to switch between a simplified 4-card interface (Mi Tierra, Clima y Lluvia, Médico del Suelo, Cuaderno de Tareas) and the comprehensive scientific telemetry dashboard.
- **Navegador Visual de Intenciones ("¿Qué necesitas hacer hoy?")**: A pictorial, intent-driven modal replacing the expectation of knowing what to type in a search box with 6 large, illustrated action cards.
- **Asistente por Voz y Audio (Web Speech API)**: Microphone button to dictate farming queries in natural language and listen to spoken recommendations without requiring typing.
- **Glosario Campesino y Semáforos de Claridad**: Conversational translation layer displaying layman terms alongside scientific metrics (e.g., *Tierra Brava/Ácida* vs *pH 5.2*, *Receta de Abono* vs *Prescripción NPK*).
- **Ergonomía Táctil y Reaseguro Psicológico**: Minimum 56px touch targets, sticky back navigation, and persistent peace-of-mind indicators (*"Tranquilo, tu finca está guardada"*).

## Capabilities

### New Capabilities
- `farmer-mode-dual-ui`: Dual-mode layout controller, persistent mode state, and streamlined 4-door action dashboard for low-digital-literacy users.
- `guided-intentions-navigator`: Intent-driven visual modal offering 6 large conversational cards with direct action routes and visual prompts.
- `voice-assisted-agronomy`: Voice input and audible speech synthesis module for hands-free query transcription and spoken agronomic advice.

### Modified Capabilities
- `onboarding-module-guide`: Extend onboarding workflows with plain-language conversational steps and high-contrast farmer-first visual tooltips.

## Impact

- Frontend components: `DashboardOverview`, `DashboardLayout`, `CommandPalette`, `QuickStartWizard`, and mobile navigation.
- Local storage persistence for user UI mode preference (`agrotech_ui_mode`: `'farmer'` | `'specialist'`).
- Web APIs: Native browser `webkitSpeechRecognition` / `SpeechRecognition` and `window.speechSynthesis` (graceful zero-dependency fallback for unsupported browsers).
- Zero breaking changes to existing REST endpoints, Prisma schema, or MapBiomas GIS spatial engine.
