## MODIFIED Requirements

### Requirement: Minimum 44px Touch Target Height
The system SHALL provide primary action buttons, secondary CTAs, select menus, and form inputs with a minimum computed touch target of 44px on viewport widths below 640px, while strictly excluding inline micro-buttons, tooltip triggers, table mini-actions, and compact filter pills from vertical stretching.

#### Scenario: Switching Layers on Smartphone
- **WHEN** user taps layer options on a mobile device
- **THEN** buttons are comfortably separated and easy to tap without misclicks.

#### Scenario: Preserving Compact Tooltip Trigger and Micro-Buttons
- **WHEN** user views KPI metrics or field logs containing the "?" help button (`.triggerBtn`) on a mobile screen
- **THEN** the tooltip trigger maintains its 18px by 18px circular geometry without stretching or warping contigous text.

### Requirement: Responsive Mobile Layout and Topbar Optimization
The dashboard layout SHALL adapt cleanly across viewports, hiding redundant desktop utility bars on viewports under 768px and exposing full navigation, logout, and theme toggling directly within the mobile header and slide-out sidebar drawer without exceeding the viewport width.

#### Scenario: Mobile Viewport Rendering
- **WHEN** user loads the dashboard on a viewport narrower than 768px
- **THEN** the fixed mobile topbar displays the logo, theme toggle, and hamburger menu toggle, while the redundant desktop utility bar is hidden.

#### Scenario: Mobile Viewport Header Containment
- **WHEN** user loads the dashboard on a viewport narrower than 420px (e.g. 375px or 390px)
- **THEN** the fixed mobile topbar displays the logo, theme toggle, compact exit icon, and hamburger menu toggle without horizontal scroll or button truncation.

#### Scenario: Landing Page Header Mobile Containment
- **WHEN** user loads the landing page on a mobile viewport narrower than 768px
- **THEN** navigation links collapse behind the mobile drawer and action buttons display a single primary call-to-action without multi-line button text wrapping.
