## Purpose

Provides 1-click geographic scenario presets representing Venezuela's core agroecological zones (Turén, Sur del Lago, Quíbor, Mérida) to instantly configure soil, crop, climate, and prescription engines.

## ADDED Requirements

### Requirement: 1-Click Venezuelan Territorial Scenario Presets
The system SHALL render an interactive preset bar in the Dashboard and Recommendations simulator allowing users and evaluators to autoconfigure the active state, soil chemistry, crop, and management parameters in one click.

#### Scenario: Activating Turén Cereal Belt Scenario
- **WHEN** user clicks the "Turén (Portuguesa)" preset button
- **THEN** the system SHALL set the active state to Portuguesa, soil pH to 6.4, organic matter to 3.2%, target crop to White Corn, and update fertilization recommendations to NPK 12-24-12.

#### Scenario: Activating Sur del Lago Acid Aluvial Scenario
- **WHEN** user clicks the "Sur del Lago (Zulia)" preset button
- **THEN** the system SHALL set the state to Zulia, soil pH to 5.2, target crop to Criollo Cocoa / Plantain, and trigger the Kamprath liming dosage recommendation at 2.2 Ton/ha.

#### Scenario: Activating Quíbor Saline-Sodic Valley Scenario
- **WHEN** user clicks the "Quíbor (Lara)" preset button
- **THEN** the system SHALL set the state to Lara, soil pH to 7.8, and recommend Agricultural Gypsum (CaSO4) at 2.5 Ton/ha for sodic soil reclamation.
