## ADDED Requirements

### Requirement: Compact Sidebar Vertical Fit and Zero Scroll Layout
The dashboard sidebar navigation SHALL adapt its item padding, icon dimensions, and footer spacing so that on viewports with height ≥ 900px all navigation links, profile metadata, connectivity indicator, and logout buttons remain visible simultaneously without requiring vertical scrolling.

#### Scenario: Desktop Navigation Fit on High Resolution Screens
- **WHEN** user views the dashboard on a screen with viewport height ≥ 900px
- **THEN** the sidebar content fits completely inside the viewport height with zero vertical scrollbars and sticky status indicators.

#### Scenario: Shorter Viewport Scrolling Fallback
- **WHEN** user views the dashboard on a screen with viewport height < 900px
- **THEN** the navigation links list scrolls smoothly with subtle scrollbars while the brand header and logout footer remain accessible.

### Requirement: Horizontal Swipeable Ergonomics for Multi-Tab Laboratories
The system SHALL provide horizontal swipeable tabs (`overflow-x: auto`) for multi-tab analytical interfaces such as the Microcrop IoT Lab, hiding native scrollbars while preserving touch targets with minimum height of 44px on mobile and tablet screens.

#### Scenario: Navigating IoT Laboratory Tabs on Mobile
- **WHEN** user views the Microcrop IoT Lab on a viewport ≤ 768px
- **THEN** the 5 laboratory tabs are scrollable horizontally without clipping text, and tapping any tab activates the respective panel smoothly.

#### Scenario: Responsive Saxton-Rawls Soil Calibration Stack
- **WHEN** user views the Soil Calibration tab (Saxton-Rawls & ADC) on a mobile device
- **THEN** the calibration controls and soil texture breakdown stack vertically with full-width sliders and touch-friendly preset buttons.

### Requirement: WebGIS Mobile Telemetry Drawer and Agronomic Alerts
The WebGIS interface SHALL provide a collapsible mobile drawer for parcel telemetry on viewport widths ≤ 768px, ensuring that regional soil-climate alerts (Kamprath acidity, gypsum requirements, SAR soil saturation) and prescriptive VRA action buttons remain fully legible and accessible.

#### Scenario: Collapsing and Expanding Mobile Telemetry Card
- **WHEN** user taps the mobile drawer toggle handle on a smartphone in the WebGIS view
- **THEN** the telemetry card toggles between an ultra-compact summary bar and the expanded multi-metric edaphic analysis card.

#### Scenario: Viewing Prescriptive Agronomic Alerts on Mobile
- **WHEN** the selected parcel triggers regional calibration conditions (e.g. acidic soil in Monagas or saline soil in Quíbor)
- **THEN** the alert banner displays inside the mobile telemetry drawer with high-contrast badge colors and immediate prescription recommendation buttons.
