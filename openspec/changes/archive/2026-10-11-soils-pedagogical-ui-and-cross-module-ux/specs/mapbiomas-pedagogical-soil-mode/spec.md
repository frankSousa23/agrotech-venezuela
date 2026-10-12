# Spec Delta: mapbiomas-pedagogical-soil-mode

## Purpose

Provides an intuitive pedagogical layer for the Soil Module and its embeddable widget, translating complex pedotransfer physics into clear water comfort zones, days of water autonomy, and historical 40-year land cover impact cards.

## ADDED Requirements

### Requirement: Pedagogical Water Comfort Zone Bar
The system SHALL render an interactive 4-zone soil water comfort bar ("Esponja de Suelo") displaying current volumetric moisture ($\theta\%$) relative to Wilting Point ($\theta_{PWP}$), Critical Stress Threshold ($\theta_{crit}$), and Field Capacity ($\theta_{FC}$), alongside estimated days of crop water autonomy based on daily regional evapotranspiration ($ET_c$).

#### Scenario: Comfort zone status computation
- **WHEN** the soil simulation parameters have moisture below Wilting Point ($\theta < \theta_{PWP}$)
- **THEN** the comfort bar displays a red "Marchitez Crítica" alert indicating plants cannot extract moisture
- **WHEN** moisture is between Wilting Point and Critical Threshold ($\theta_{PWP} \le \theta < \theta_{crit}$)
- **THEN** the comfort bar displays an amber "Estrés Hídrico" alert with advice to initiate irrigation
- **WHEN** moisture is between Critical Threshold and Field Capacity ($\theta_{crit} \le \theta \le \theta_{FC}$)
- **THEN** the comfort bar displays a green "Confort Radicular Óptimo" badge

#### Scenario: Days of water autonomy calculation
- **WHEN** current soil moisture exceeds the wilting point ($\theta > \theta_{PWP}$)
- **THEN** the system computes available water depth $\text{mm} = (\theta - \theta_{PWP}) \times 3.0$ and displays days of autonomy as $\text{mm} / 4.5$ days with clear farmer-friendly phrasing

### Requirement: MapBiomas 40-Year Land Cover Memory Card
The system SHALL provide an educational historical analysis card based on `calculateMapBiomasTrajectory` showing the 40-year transition trajectory (1985–2024), estimated percentage of organic matter lost due to continuous anthropic use, and actionable regenerative remediation steps.

#### Scenario: Historical trajectory rendering
- **WHEN** user selects a region or inputs coordinates in the soil simulator
- **THEN** the card displays initial class in 1985, current class in 2024, anthropic years, and cumulative organic matter depletion percentage

#### Scenario: Regenerative remediation guidance
- **WHEN** historical organic matter loss is greater than 30%
- **THEN** the card provides practical regenerative recommendations including green manuring and Kamprath liming dosages translated to 50 kg bags per hectare

### Requirement: Dual-Mode Didactic and Technical Switcher
The system SHALL provide a mode toggle allowing users to switch between "Modo Didáctico MapBiomas" (visual water comfort bar, vernacular texture analogies, bag conversions) and "Modo Técnico Avanzado" (van Genuchten $pF$ curve, kPa matric suction, Saxton-Rawls equations).

#### Scenario: Toggling between didactic and technical modes
- **WHEN** user activates "Modo Didáctico MapBiomas"
- **THEN** technical $pF$ axes are supplemented or replaced by the 4-zone water comfort bar and vernacular soil descriptions
- **WHEN** user activates "Modo Técnico Avanzado"
- **THEN** the full logarithmic $pF$ curve, numeric theta coordinates, and mathematical hydraulic parameters are displayed

#### Scenario: Embed widget didactic mode default
- **WHEN** the embeddable widget at `/embed/soil-module` is loaded without explicit technical parameters
- **THEN** it renders the didactic water comfort bar and a direct CTA link to open the full Agrotech suite
