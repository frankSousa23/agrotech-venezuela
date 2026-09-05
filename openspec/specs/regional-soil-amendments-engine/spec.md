# regional-soil-amendments-engine Specification

## Purpose

Calculates pedologically accurate soil amendment prescriptions calibrated specifically for Venezuela's major agroecological regions, distinguishing between aluminum-toxicity weathering in eastern sabanas, nutrient leaching in alluvial soils of Sur del Lago, and sodicity reclamation with gypsum in the semi-arid valleys of Quíbor and Lara.

## Requirements

### Requirement: Regional Pedological Zone Detection
The system SHALL identify the dominant soil chemistry regime based on the parcel geographic coordinates and territorial bounds (Eastern Sabanas / Llanos Centrales, Sur del Lago Alluvial Basin, and Lara / Falcon Semi-Arid Valleys).

#### Scenario: Detecting Acid Weathered Sabana
- **WHEN** parcel coordinates fall within Monagas, Anzoátegui, or Guárico with pH below 5.5
- **THEN** the system classifies the pedological zone as Acidic Weathered Tropical Soil and activates Kamprath aluminum-neutralization logic.

#### Scenario: Detecting Semi-Arid Saline Sodic Soils
- **WHEN** parcel coordinates fall within Lara (e.g., Municipio Jiménez / Quíbor) or Falcón with pH equal to or above 7.5
- **THEN** the system classifies the pedological zone as Sodic/Saline Aridisol, inhibits traditional liming, and activates Agricultural Gypsum dosage.

### Requirement: Regionally Calibrated Amendment Prescription
The system SHALL prescribe chemical soil amendments adapted to the pedological zone: Dolomitic Lime ($CaCO_3 + MgCO_3$) for low-cation acidic soils, balanced Ca:Mg amendments for alluvial soils, and Agricultural Gypsum ($CaSO_4 \cdot 2H_2O$) for sodic soils.

#### Scenario: Prescribing Dolomitic Lime for Sabanas
- **WHEN** soil analysis indicates acidic pH with low base saturation in eastern sabanas
- **THEN** the amendment plan outputs Dolomitic Lime dosage in Ton/ha ensuring buffer capacity is respected to prevent micronutrient lockout.

#### Scenario: Prescribing Gypsum for Sodic Valleys
- **WHEN** soil analysis in Quíbor indicates alkaline sodic soil with degraded structure
- **THEN** the amendment plan outputs Agricultural Gypsum dosage in Ton/ha to displace exchangeable sodium ($Na^+$) with warning against calcium carbonate liming.
