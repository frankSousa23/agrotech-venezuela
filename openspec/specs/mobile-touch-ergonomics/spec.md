# mobile-touch-ergonomics Specification

## Purpose

Optimizes mobile and tablet touch ergonomics to ensure buttons, layer toggles, and form controls are easily pressable under outdoor field conditions.

## Requirements

### Requirement: Minimum 44px Touch Target Height
The system SHALL provide primary action buttons, secondary CTAs, select menus, and form inputs with a minimum computed touch target of 44px on viewport widths below 640px, while strictly excluding inline micro-buttons, tooltip triggers, table mini-actions, and compact filter pills from vertical stretching.

#### Scenario: Switching Layers on Smartphone
- **WHEN** user taps layer options on a mobile device
- **THEN** buttons are comfortably separated and easy to tap without misclicks.

#### Scenario: Preserving Compact Tooltip Trigger and Micro-Buttons
- **WHEN** user views KPI metrics or field logs containing the "?" help button (`.triggerBtn`) on a mobile screen
- **THEN** the tooltip trigger maintains its 18px by 18px circular geometry without stretching or warping contigous text.

### Requirement: Responsive Mobile Layout and Topbar Optimization
The dashboard layout SHALL adapt cleanly across viewports, hiding redundant desktop utility bars on viewports under 768px and exposing full navigation, logout, and theme toggling directly within the mobile header and slide-out sidebar drawer without exceeding the viewport width. On mobile viewports under 640px, header action buttons including `SunlightThemeToggle` SHALL support an icon-only display mode to eliminate button wrapping and horizontal clipping.

#### Scenario: Mobile Viewport Rendering
- **WHEN** user loads the dashboard on a viewport narrower than 768px
- **THEN** the fixed mobile topbar displays the logo, theme toggle, and hamburger menu toggle, while the redundant desktop utility bar is hidden.

#### Scenario: Mobile Viewport Header Containment
- **WHEN** user loads the dashboard on a viewport narrower than 420px (e.g. 360px, 375px, or 390px)
- **THEN** the fixed mobile topbar displays the logo, icon-only theme toggle (32x32px), compact exit icon, and hamburger menu toggle without horizontal scroll, button truncation, or multi-line header wrapping.

#### Scenario: Landing Page Header Mobile Containment
- **WHEN** user loads the landing page on a mobile viewport narrower than 768px
- **THEN** navigation links collapse behind the mobile drawer and action buttons display a single primary call-to-action without multi-line button text wrapping.

### Requirement: Persistent and Sticky Logout Access
The dashboard sidebar SHALL provide a sticky or consistently positioned Logout action reachable at all times across mobile and desktop viewport sizes.

#### Scenario: Logout from Mobile Drawer
- **WHEN** user opens the mobile navigation drawer
- **THEN** the "Cerrar Sesión" button is visible and actionable without clipping or overflow.

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
