## ADDED Requirements

### Requirement: Micro-Crop Lab Linkage and Digital Twin Extension
The farm management view (`/dashboard/tierras`) and global dashboard navigation SHALL provide direct bidirectional routing to the interactive IoT Micro-Crop Laboratory (`/dashboard/iot`), enabling producers to transition between macro-parcel twin monitoring and micro-experimental sensor benches.

#### Scenario: Navigating from Saved Parcel to IoT Laboratory
- **WHEN** user clicks "Laboratorio IoT" on a saved parcel or in the sidebar
- **THEN** the system navigates to `/dashboard/iot` retaining the parcel context and active crop presets.
