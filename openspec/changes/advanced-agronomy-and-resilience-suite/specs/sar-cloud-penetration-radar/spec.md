## Purpose

Enables all-weather radar moisture monitoring using Sentinel-1 Synthetic Aperture Radar (SAR) dual-polarization backscatter to bypass dense tropical cloud cover.

## ADDED Requirements

### Requirement: Sentinel-1 SAR Radar Moisture Detection
The system SHALL provide a radar-derived soil moisture and surface water layer that functions independently of cloud cover.

#### Scenario: Visualizing SAR Radar Layer
- **WHEN** user activates the "Radar SAR Sentinel-1" layer
- **THEN** the map displays radar backscatter coefficients (VV/VH in dB) highlighting waterlogged zones and soil saturation across Venezuelan agricultural regions.
