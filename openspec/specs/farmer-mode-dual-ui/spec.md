# Capability: Farmer Mode Dual UI

## Purpose

Provides a persistent dual-mode presentation switch allowing rural producers with low digital literacy to interact through a simplified 4-door action layout, while retaining full scientific telemetry for technical specialists.

## Requirements

### Requirement: Persistent UI Mode Switcher
The platform SHALL provide a global, accessible UI mode switch in the top navigation allowing users to toggle between "Modo Productor" and "Modo Técnico".

#### Scenario: Toggling into Farmer Mode
- **WHEN** the user selects "Modo Productor"
- **THEN** the application stores `'farmer'` in localStorage under `agrotech_ui_mode` and transforms the dashboard into the simplified 4-door layout without reloading the page.

#### Scenario: Toggling into Specialist Mode
- **WHEN** the user selects "Modo Técnico"
- **THEN** the application stores `'specialist'` in localStorage under `agrotech_ui_mode` and reveals the full multi-module sidebar, technical telemetry, and GIS layers.

### Requirement: Streamlined 4-Door Farmer Dashboard
When Farmer Mode is active, the dashboard overview SHALL collapse complex charts and display 4 primary action doors: "Mi Tierra", "El Clima y Lluvia", "El Médico del Suelo", and "Cuaderno de Tareas".

#### Scenario: Interacting with Farmer Door Cards
- **WHEN** a user clicks any of the 4 farmer doors
- **THEN** the system navigates directly to the designated workflow with conversational helpers and minimal technical jargon.

#### Scenario: Visual Peace of Mind Guarantee
- **WHEN** the farmer dashboard is rendered
- **THEN** the interface displays an affirmative reassurance banner stating that all farm data is saved safely and cannot be accidentally deleted.
