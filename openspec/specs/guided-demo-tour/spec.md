# guided-demo-tour Specification

## Purpose

Provides an interactive 4-step walkthrough modal to guide judges, evaluators, and stakeholders through the key technical pillars of the Agrotech Venezuela platform.

## Requirements

### Requirement: Interactive Demo Tour Walkthrough
The platform SHALL provide a dedicated "Modo Demostración / Tour Guiado" button in the dashboard utility bar that triggers an interactive step-by-step modal presenting the 4 system pillars:
1. Visor Nacional y Datos Biofísicos.
2. Delimitación de Parcelas y Radar SAR Banda C.
3. Asesor Edafológico con Gemini AI.
4. Ficha Técnica Institucional TRL 7.

#### Scenario: Launching the Demo Tour
- **WHEN** user clicks "🎬 Tour Demo" in the dashboard header
- **THEN** an accessible modal opens highlighting Step 1 with clear next/previous step navigation and direct quick-jump links.

#### Scenario: Navigating Through Tour Steps
- **WHEN** user clicks "Siguiente" on Step 1
- **THEN** the modal transitions smoothly to Step 2 explaining micro-parcel SAR cloud penetration with sample coordinates.
