## ADDED Requirements

### Requirement: Empirical Field Diary Ground-Truth Coupling and Sentinel-1 SAR Radar Oracle
The system SHALL dynamically couple recorded regenerative field practices from the Cuaderno de Campo into parcel Soil Organic Carbon (SOC) sequestration calculations, and cross-validate ground biomass and soil roughness against Sentinel-1 SAR dual-polarization radar backscatter ($\sigma^\circ_{VH}/\sigma^\circ_{VV}$) and NASA POWER weather series to collapse MRV uncertainty margins for Verra VCS / IPCC Tier 2 certification.

#### Scenario: Elevating SOC Sequestration with Empirical Diary Logs
- **WHEN** user evaluates carbon credit issuance and attaches verified field diary entries (siembra directa, abonos verdes, enmiendas) for the target parcel
- **THEN** the system applies empirical regenerative practice factors to the dynamic SOC formula and displays verifiable audit timestamps.

#### Scenario: Sentinel-1 SAR Radar Cross-Validation Oracle
- **WHEN** initiating pre-certification MRV verification
- **THEN** the system queries the Sentinel-1 SAR backscatter oracle, verifies canopy structural roughness ($\sigma^\circ_{VH}/\sigma^\circ_{VV} > -12\text{ dB}$) and seasonal moisture consistency, and decreases the baseline audit uncertainty penalty from 40% to 10%, unlocking higher tier carbon revenue credits.
