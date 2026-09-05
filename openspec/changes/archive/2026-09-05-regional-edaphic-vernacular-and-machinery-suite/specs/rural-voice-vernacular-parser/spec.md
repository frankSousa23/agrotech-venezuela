## Purpose

Provides offline-first client-side linguistic normalization of Venezuelan campesino speech patterns, dialectal agricultural verbs, and traditional volume or mass units into standardized agronomic records for field diaries and intention navigators.

## ADDED Requirements

### Requirement: Vernacular Agricultural Verb Parsing
The system SHALL parse common Venezuelan campesino spoken expressions for farming activities into standard task categories (`SIEMBRA`, `ENCALADO`, `FERTILIZACION`, `FITOSANITARIO`, `RIEGO`, and `COSECHA`).

#### Scenario: Normalizing Spoken Reabono
- **WHEN** user dictates "le tiré tres sacos de urea al maizal" or "le eché el reabono"
- **THEN** the parser maps the action to `FERTILIZACION` with input type Urea (46% N).

#### Scenario: Normalizing Pest Control Dialect
- **WHEN** user dictates "le eché veneno a la candelilla en el tablón"
- **THEN** the parser maps the action to `FITOSANITARIO` targeting pest management.

### Requirement: Traditional Unit Conversion to Metric
The system SHALL normalize traditional agrarian units into kilograms, liters, and hectares without requiring network calls.

#### Scenario: Converting Sacos to Kilograms
- **WHEN** user speech mentions quantities of "sacos"
- **THEN** the parser converts each saco to 50 kilograms.

#### Scenario: Converting Tambores and Canecas to Liters
- **WHEN** user speech mentions "un tambor" or "dos canecas / bombas"
- **THEN** the parser converts tambores to 200 liters and canecas/bombas to 20 liters.

#### Scenario: Converting Tablones and Tablitas to Hectares
- **WHEN** user speech references "un tablón" or "una tablita"
- **THEN** the parser maps to 1.0 ha or 0.5 ha respectively, or matches against the user's named saved parcel aliases.
