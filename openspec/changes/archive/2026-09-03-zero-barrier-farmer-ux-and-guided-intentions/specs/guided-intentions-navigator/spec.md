## Purpose

Enables non-technical users to navigate the platform through conversational, goal-based visual action cards rather than requiring keyword searches or complex terminology.

## ADDED Requirements

### Requirement: Visual Intentions Modal Launcher
The dashboard SHALL provide a prominent, friendly action button ("¿Qué necesitas hacer hoy?") accessible on mobile and desktop that opens a visual intentions catalog.

#### Scenario: Opening Intentions Modal
- **WHEN** the user clicks or taps "¿Qué necesitas hacer hoy?"
- **THEN** an accessible modal dialog opens displaying 6 large visual intention cards with distinct icons and plain-language descriptions.

### Requirement: 6 Goal-Based Action Cards
The Intentions Modal SHALL present exactly 6 actionable cards:
1. "¿Cómo está mi tierra?" (Suelos y Abono)
2. "¿Va a llover esta semana?" (Clima y Siembra)
3. "¿Cuánto mide mi potrero?" (Medición Satelital)
4. "¿Qué cultivo se da mejor?" (Aptitud Agrícola)
5. "Anotar lo que hice hoy" (Bitácora Rápida)
6. "Preguntar al Asistente" (Consulta Conversacional)

#### Scenario: Selecting an Action Card
- **WHEN** the user selects any intention card
- **THEN** the modal closes and the router immediately navigates to the target feature with guidance banners pre-focused.

#### Scenario: Keyboard and Touch Accessibility
- **WHEN** the user navigates using touch on mobile or keyboard arrow keys
- **THEN** touch targets exceed 56px in height and escape/close triggers allow effortless dismissal.
