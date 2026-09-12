# guided-demo-tour Specification

## Purpose

Provides an interactive 5-step walkthrough modal to guide judges, evaluators, and stakeholders through the key technical pillars of the Agrotech Venezuela platform, including in-situ Agro-IoT simulation.

## Requirements

### Requirement: Interactive Demo Tour Walkthrough
The platform SHALL provide a dedicated "Modo Demostración / Tour Guiado" button in the dashboard utility bar that triggers an interactive step-by-step modal presenting the 5 system pillars:
1. Visor Nacional y Datos Biofísicos.
2. Delimitación de Parcelas y Radar SAR Banda C.
3. Asesor Edafológico con Gemini AI.
4. Laboratorio Agro-IoT de Micro-Cultivo & Riego Predictivo.
5. Ficha Técnica Institucional TRL 4.

#### Scenario: Launching the Demo Tour
- **WHEN** user clicks "🎬 Tour Demo" in the dashboard header
- **THEN** an accessible modal opens highlighting Step 1 with clear next/previous step navigation and direct quick-jump links.

#### Scenario: Navigating Through Tour Steps
- **WHEN** user advances to Step 4
- **THEN** the modal displays the Agro-IoT Micro-Crop Laboratory highlight with direct navigation to `/dashboard/iot`.

#### Scenario: Inspecting Institutional Tour Step
- **WHEN** user advances to Step 5
- **THEN** the modal displays the TRL 4 maturity highlight and provides an action button to open the institutional postulation profile.
