## ADDED Requirements

### Requirement: Multi-Scale Map Level Return Action
The multi-scale map viewer (`MultiLevelMapViewer`) SHALL render an explicit, prominent "Volver al nivel anterior" button when the active zoom level is Level 2 (Municipio) or Level 3 (Parcela), enabling immediate one-tap return to the parent state or national map.

#### Scenario: Returning from Parcel Level 3 to State Level 2
- **WHEN** user is inspecting Level 3 (Parcela / Municipio) and taps "Volver al Nivel Estatal"
- **THEN** the viewer camera animates back to Level 2 (Estado) and updates telemetry accordingly.

#### Scenario: Returning from State Level 2 to National Level 1
- **WHEN** user is inspecting Level 2 (Estado) and taps "Volver al Mapa Nacional"
- **THEN** the viewer camera resets to Level 1 (Venezuela global).
