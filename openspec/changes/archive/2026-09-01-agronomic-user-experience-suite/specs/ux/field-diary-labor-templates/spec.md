## Purpose
Provides quick-fill phenological labor templates in the Field Diary so agronomists can log standard seasonal farming operations with one tap without filling out empty forms from scratch.

## ADDED Requirements

### Requirement: Quick Phenological Labor Templates
The system SHALL provide quick-fill template buttons for standard agricultural operations in the Field Diary (`/dashboard/bitacora`).

#### Scenario: User clicks "🌱 Siembra & Fondo" template
- **WHEN** user clicks the "🌱 Siembra & Fondo" template button
- **THEN** the labor modal opens pre-populated with type "Siembra", description "Siembra mecanizada con fertilización de fondo NPK 12-24-12", and standard dose estimates

#### Scenario: User clicks "🧪 Encalado Dolomítico" template
- **WHEN** user clicks the "🧪 Encalado" template button
- **THEN** the modal opens pre-populated with type "Encalado", product "Cal Dolomítica (CaCO3 + MgCO3)" and soil correction guidelines

#### Scenario: User clicks "🌾 Cosecha & Rendimiento" template
- **WHEN** user clicks the "🌾 Cosecha" template button
- **THEN** the modal opens pre-populated with type "Cosecha" and fields ready to capture actual yield in Ton/ha
