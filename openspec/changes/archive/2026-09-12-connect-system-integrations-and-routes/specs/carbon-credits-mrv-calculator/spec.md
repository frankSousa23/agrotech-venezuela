## ADDED Requirements

### Requirement: Direct Hash Anchor and Cross-Platform Routing
The system SHALL expose an explicit anchor `id="carbon-credits"` in the recommendations view (`/dashboard/recomendaciones#carbon-credits`) and provide direct, verified navigation links from the public landing page, geo-statistics sustainability section, command palette, and the main dashboard sidebar.

#### Scenario: Navigating to Carbon Credits from Landing Page
- **WHEN** user clicks "Calcular Créditos de Carbono" on the landing page Module 5
- **THEN** the system navigates directly to `/dashboard/recomendaciones#carbon-credits`, scrolling to the MRV calculator.

#### Scenario: Accessing Carbon MRV from Sidebar
- **WHEN** user selects the "Créditos de Carbono" item in the dashboard sidebar
- **THEN** the system navigates to `/dashboard/recomendaciones#carbon-credits`.
