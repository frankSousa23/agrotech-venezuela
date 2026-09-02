## Purpose
Provides contextual, plain-language agronomic tooltips explaining complex satellite, edaphic, and climatic metrics across all views for non-technical farm producers.

## ADDED Requirements

### Requirement: Reusable AgroTooltip Component
The system SHALL provide an interactive `<AgroTooltip />` component that renders an accessible `(?)` help icon with popover explanation on hover or click.

#### Scenario: User inspects SAR Radar metric
- **WHEN** user hovers or taps the tooltip icon next to a SAR backscatter value (e.g. "-12.4 dB")
- **THEN** a tooltip displays: "Radar satelital all-weather: Medición de saturación de humedad en los primeros 5 cm de suelo sin interferencia de nubes."

#### Scenario: User inspects GDD thermal accumulation
- **WHEN** user hovers or taps the tooltip icon next to GDD (°C-día)
- **THEN** a tooltip displays: "Grados Día de Desarrollo: Acumulación de calor requerida por la planta para avanzar entre fases fenológicas (emergencia, floración, madurez)."

#### Scenario: User inspects SOC Carbon metric
- **WHEN** user hovers or taps the tooltip icon next to SOC (tC/ha)
- **THEN** a tooltip displays: "Stock de Carbono Orgánico en Suelo: Indicador de fertilidad biológica y potencial de secuestro para créditos de carbono."
