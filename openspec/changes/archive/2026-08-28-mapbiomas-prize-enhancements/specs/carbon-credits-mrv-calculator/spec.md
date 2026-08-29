## MODIFIED Requirements

### Requirement: Soil Carbon Storage and MRV Quantification
The system SHALL quantify annual carbon sequestration potential ($\text{tCO}_2\text{e}/\text{ha}/\text{yr}$) based on soil texture, organic matter percentage, tillage practice, parcel area, and historical MapBiomas land cover transition categories.

#### Scenario: Calculating Parcel Carbon Credits
- **WHEN** user inputs parcel soil organic matter, area, and chooses regenerative tillage practice alongside historical MapBiomas land transition history
- **THEN** the system computes annual $\text{tCO}_2\text{e}$ sequestered adjusted for past land-use degradation/preservation, generated carbon credits, and estimated economic yield in USD at current voluntary carbon market benchmark prices.
