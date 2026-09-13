## Purpose

Renders an embedded vector preview of the parcel's surveyed polygon boundary within the Digital Twin diagnostic modal alongside multitemporal analysis.

## ADDED Requirements

### Requirement: Embedded Parcel Vector Contour Preview
The parcel diagnostic modal SHALL render a vector preview map centered on the parcel centroid showing the exact Shoelace polygon boundary and surface area in hectares.

#### Scenario: Inspecting Parcel Boundary in Diagnostic Modal
- **WHEN** user opens the diagnostic modal for a registered parcel
- **THEN** the modal overview SHALL render the polygonal boundary on satellite imagery with centroid coordinates and area metrics.
