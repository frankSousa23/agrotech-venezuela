## Purpose

Populates the default in-memory and demo persistence layers with realistic agricultural parcel geometries and field logs representing Venezuela's major agricultural zones.

## ADDED Requirements

### Requirement: Multi-Region Agricultural Dataset
The system SHALL provide pre-populated parcel records and historical field logs across Portuguesa (Cereals), Guárico (Rice), Zulia (Sur del Lago Plantains), Mérida (Highland Coffee), and Monagas (Soybeans).

#### Scenario: Querying Multi-Region Sample Parcels
- **WHEN** user or demo account queries `/api/parcels`
- **THEN** the response includes geographically accurate polygon boundaries and edafoclimatic attributes for the representative productive zones.

#### Scenario: Querying Multi-Region Agronomic Logs
- **WHEN** user inspects the Cuaderno de Campo for any sample parcel
- **THEN** the system returns structured field logs for liming, planting, fertilization, and harvest records matching the specific crop and region.
