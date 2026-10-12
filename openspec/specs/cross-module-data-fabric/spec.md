# cross-module-data-fabric Specification

## Purpose
Unifies Agrotech modules (WebGIS, Parcel Management, Soils, Crops, Field Diary, and IoT Lab) through bidirectional state transfer, deep-linking URL contracts, and touch-optimized mobile ergonomics.

## Requirements

### Requirement: Bidirectional Soil and Parcel Navigation Bridge
The system SHALL provide direct cross-navigation between `/dashboard/tierras` and `/dashboard/suelos`, allowing users to jump from any registered parcel into the soil simulator with the parcel's texture, pH, and geographic coordinates preloaded.

#### Scenario: Jump from parcel card to soil simulator
- **WHEN** user clicks the "Curva Hídrica & Suelo" action on a parcel card in `/dashboard/tierras`
- **THEN** system navigates to `/dashboard/suelos?tab=simulator` pre-populating texture, pH, and parcel metadata

#### Scenario: Preloading simulation parameters from parcel attributes
- **WHEN** `/dashboard/suelos` loads with `parcelId`, `texture`, and `ph` query parameters
- **THEN** the simulation sliders automatically initialize to those exact values and indicate the origin parcel name

### Requirement: Soil Amendment to Field Diary Labor Handoff
The system SHALL provide a direct handoff action from `/dashboard/suelos` to `/dashboard/bitacora` after calculating a regional liming or gypsum amendment, automatically converting metric rates (t/ha) into traditional Venezuelan 50 kg bags.

#### Scenario: Logging soil liming into field diary
- **WHEN** user completes a liming calculation in `/dashboard/suelos` and clicks "Registrar Enmienda en Bitácora"
- **THEN** system redirects to `/dashboard/bitacora` pre-filling labor type as `ENCALADO`, dosage as `X t/ha (Y sacos de 50 kg)`, and descriptive notes

#### Scenario: Automatic conversion of metric tons to traditional bags
- **WHEN** Kamprath liming rate is calculated (e.g., 1.5 t/ha)
- **THEN** the handoff calculates $1.5 \times 1000 / 50 = 30$ sacos and formats the dosage accordingly

### Requirement: Soil to Crop Catalog and IoT Lab Integration
The system SHALL provide contextual links in the soil simulator to filter compatible species in the Crop Catalog and trigger micro-irrigation tests in the IoT Lab when soil water falls below the critical threshold.

#### Scenario: Filtering crops compatible with simulated soil
- **WHEN** user clicks "Ver Cultivos Compatibles" in the soil simulator
- **THEN** system navigates to `/dashboard/cultivos` pre-filtering species whose optimal pH range encompasses the simulated pH

#### Scenario: Triggering IoT lab test when PAW is low
- **WHEN** the simulated soil Plant Available Water drops below 50% ($\text{PAW} < 50\%$)
- **THEN** an actionable callout appears offering to test predictive irrigation in `/dashboard/iot` with the matching soil texture

### Requirement: Touch-Optimized Mobile Actions Layout
The system SHALL provide responsive, touch-friendly layouts on viewports below 768px, replacing cluttered multi-button rows on parcel cards with clear primary actions and a secondary actions menu, and exposing an outdoor quick-dictation trigger in the Field Diary.

#### Scenario: Clean card action grouping on mobile viewports
- **WHEN** viewing parcel cards on screens narrower than 768px
- **THEN** cards display primary buttons for Soil Diagnosis and AI Advisor with secondary actions grouped to prevent multiline button wrapping

#### Scenario: Quick vernacular dictation trigger in field diary
- **WHEN** a user accesses `/dashboard/bitacora` on a mobile device
- **THEN** a thumb-accessible quick-dictation button enables instant vernacular voice input without requiring prior modal navigation
