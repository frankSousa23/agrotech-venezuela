## MODIFIED Requirements

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
