## ADDED Requirements

### Requirement: AI Advisor Dual-Tone Dynamic Translation
The Gemini AI agronomic advisor endpoint and local deterministic fallback engine SHALL dynamically adapt their language and tone according to the active `uiMode` parameter passed from the client interface.

#### Scenario: AI Advisor Response in Farmer Mode
- **WHEN** a user requests agronomic advice or parcel diagnostics while `uiMode` is `'farmer'`
- **THEN** the system generates guidance using the "El Compadre Agrónomo" persona, translating complex satellite and edaphic metrics into rural vernacular (substituting SAR backscatter with soil deep moisture under clouds, GDD with remaining sunny days to harvest, and Kamprath lime requirements with sacks of agricultural lime per hectare to sweeten acidic soil) while omitting raw mathematical and software jargon.

#### Scenario: AI Advisor Response in Technical Mode
- **WHEN** a user requests agronomic advice or parcel diagnostics while `uiMode` is `'technical'`
- **THEN** the system generates guidance preserving full scientific and quantitative rigor, including Kamprath lime calculations, GDD thermal accumulation base 10°C, SAR backscatter in decibels (dB), and detailed chemical soil fractions.
