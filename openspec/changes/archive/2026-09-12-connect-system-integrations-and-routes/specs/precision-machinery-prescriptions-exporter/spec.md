## ADDED Requirements

### Requirement: Cross-Linkage in Recommendations Simulator and Command Palette
The system SHALL provide an export trigger in the AI and soil recommendation view (`/dashboard/recomendaciones`) allowing farmers to directly export simulated lime and NPK rates to machinery packages (Shapefile, KML, and cabin card), and include a searchable entry in the global Command Palette.

#### Scenario: Exporting Prescription from Recommendation Screen
- **WHEN** user views simulated fertilization and lime dosages in `/dashboard/recomendaciones`
- **THEN** an action button "Exportar a Maquinaria & Dron" triggers the machinery modal or generates the VRA package for the active simulation parameters.
