## ADDED Requirements

### Requirement: Continuous Deep-Link to Gemini Advisor from Saved Parcels
The parcel management view (`/dashboard/tierras`) SHALL provide a direct, prominent action button on saved parcel cards that links seamlessly to `/dashboard/recomendaciones` with query parameters (`crop`, `stateId`, `parcelName`) to auto-populate the agronomic recommendation wizard.

#### Scenario: Requesting AI Prescription for a Specific Parcel
- **WHEN** user clicks "✨ Obtener Recomendación IA" on a saved parcel card (e.g. "Tablón 1 - Maíz Turén")
- **THEN** the system navigates to `/dashboard/recomendaciones` with the parcel name, state, and crop pre-selected, ready to generate the prescription.
