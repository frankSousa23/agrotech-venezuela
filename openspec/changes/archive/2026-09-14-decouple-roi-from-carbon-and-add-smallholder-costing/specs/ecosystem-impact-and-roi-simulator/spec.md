## MODIFIED Requirements

### Requirement: Regenerative Impact Comparison and ROI Calculator
The system SHALL provide an interactive comparison component contrasting traditional uncalibrated agricultural practices against Agrotech regenerative intelligence, with dynamic operational ROI calculations based on cultivated area strictly decoupled from carbon credit monetization.

#### Scenario: Calculating Financial and Ecological ROI
- **WHEN** user adjusts the farm size slider (e.g., 25 ha) or selects a registered parcel in the ROI widget
- **THEN** the system SHALL compute and display net operational economic profit strictly as the sum of tangible agronomic savings (fertilizer and regional amendment savings in $ USD, predictive irrigation energy/water savings in $ USD, and fuel or manual labor savings in $ USD) plus extra crop yield revenue ($ USD), with carbon credit revenues excluded from the operational total.

#### Scenario: Prospective Environmental and Carbon ESG Simulation
- **WHEN** user views the ecological impact summary in the ROI widget
- **THEN** the interface SHALL render a decoupled prospective carbon credit card indicating annual metric tons of CO2 sequestered ($\text{tCO}_2\text{e}/\text{yr}$) and simulated voluntary market certificate valuation ($ USD/yr) explicitly tagged as a prospective environmental projection rather than realized operational cashflow.

#### Scenario: Split-Screen Practice Comparison
- **WHEN** user views the traditional vs Agrotech comparison
- **THEN** the interface SHALL render side-by-side metric cards detailing cost per hectare, soil degradation risks, and regenerative net operational margin benefits.

## ADDED Requirements

### Requirement: Dual-Track Costing Profiles and Dynamic Parcel Ingestion
The system SHALL provide selectable operational costing profiles tailored to farm mechanization level and allow dynamic parameter ingestion from real user parcels.

#### Scenario: Evaluating Smallholder Non-Mechanized Economics
- **WHEN** user selects the "Pequeño Productor / Conuco (Manual)" profile
- **THEN** the system SHALL calculate input savings based on commercial retail fertilizer sacks (50 kg units at local market rates), backpack spraying reduction, and saved manual field labor days (*jornales* at daily wage benchmarks) instead of tractor diesel passes.

#### Scenario: Evaluating Mechanized Agro-Industrial Economics
- **WHEN** user selects the "Mecanizado / Extensivo" profile
- **THEN** the system SHALL calculate operational savings factoring in bulk fertilizer reduction, tractor diesel fuel savings (liters of gasoil per hectare avoided via single-pass VRA), and tractor wear depreciation.

#### Scenario: Dynamic Ingestion from Registered Farm Parcel
- **WHEN** user initiates ROI analysis from a specific parcel in the Tierras or Recomendaciones dashboard
- **THEN** the system SHALL prefill the calculation with the parcel's verified boundary area, active crop classification, soil pH, and diagnostic amendment requirements.

#### Scenario: Vernacular Presentation in Farmer Easy Mode
- **WHEN** the user operates in *Modo Campesino Fácil*
- **THEN** the smallholder ROI breakdown SHALL display metric equivalents in vernacular agricultural units (sacos de abono ahorrados, días de trabajo/jornales rindiendo más, sacos cosechados) alongside total dollar figures.
