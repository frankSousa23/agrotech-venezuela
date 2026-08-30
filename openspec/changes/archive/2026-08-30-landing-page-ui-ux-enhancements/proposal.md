## Why

The Agrotech Venezuela landing page (`/`) serves as the entry gateway for agricultural producers, agronomists, researchers, and MapBiomas Prize evaluators. To maximize user onboarding and communicate the full breadth of the platform's v2.5 capabilities (Satellite Earth Observation, 40-year MapBiomas memory, Sentinel-1 SAR Radar, IoT Edge ESP32 sensors, and AI Prescriptions), the landing page requires a comprehensive UI/UX redesign featuring direct navigation guides to all 7 core modules, role-based login walkthroughs, and future innovation horizons.

## What Changes

- **Elevated Hero & Space-Earth Value Proposition**: Redesigns the hero header with clear summaries of project purpose, open science principles, live metrics, and an interactive 4-region digital twin preview (Portuguesa, Zulia, Mérida, Amazonas).
- **Interactive 7-Module Onboarding Guide**: Introduces an intuitive visual catalog explaining the purpose, 3-step usage workflow, and direct 1-click routing for every core module (`/dashboard/mapa`, `/dashboard/tierras`, `/dashboard/bitacora`, `/dashboard/recomendaciones`, Carbon MRV, `/dashboard/estadisticas`, and `/api-docs`).
- **Role-Based Authentication Showcase**: Directs users to `/auth/login` with clear explanations of access levels for Registered Farmers, Agronomists, Admins, and Sandbox Guests.
- **Future Innovation Horizon Section**: Outlines upcoming technological milestones including Hyperspectral imaging (EnMAP), Community LoRaWAN networks, Computer Vision pest diagnosis, and Blockchain carbon certificates.

## Capabilities

### New Capabilities
- `interactive-landing-ecosystem`: Landing page architectural redesign showcasing the complete multi-tier dataflow, live multi-region previews, and future roadmap.
- `onboarding-module-guide`: Interactive guided cards for the 7 primary platform routes with purpose definitions, 3-step action instructions, and direct deep-links.

### Modified Capabilities
- None.

## Impact

- **Frontend**: Overhauls `src/app/page.tsx` and `src/app/page.module.css` with responsive glassmorphism styles, accessible color contrasts, and interactive tabs.
- **Navigation & Routing**: Integrates unified links to all 25 Next.js App Router endpoints and documentation.
- **Testing**: Adds frontend test coverage verifying all landing page module routes and CTA links.
