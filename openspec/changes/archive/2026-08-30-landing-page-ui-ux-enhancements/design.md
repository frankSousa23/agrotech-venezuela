## Context

Agrotech Venezuela combines macro satellite earth observation with micro-scale in-situ IoT telemetry. The root landing page (`src/app/page.tsx`) serves as the primary gateway for users, evaluators, and researchers. This design overhauls the landing page to provide an interactive, structured onboarding experience connecting all 7 core modules, explaining role access paths, and detailing the long-term technological roadmap.

## Goals / Non-Goals

**Goals:**
- Implement a modern, high-impact glassmorphic interface on `/` communicating the v2.5 Space-Earth architecture.
- Provide an interactive 4-region digital twin preview (Turén, Sur del Lago, Andes, Amazonas).
- Build a guided 7-module catalog with clear definitions of purpose, 3-step action instructions, and direct deep-links.
- Create an explicit onboarding section explaining role-based authentication (`/auth/login`) for Farmers, Agronomists, Admins, and Sandbox Guests.
- Document the future innovation roadmap (Hyperspectral imaging, LoRaWAN, Computer Vision, Carbon Blockchain).

**Non-Goals:**
- Modifying backend database models or altering core GIS projection algorithms.
- Restricting public access to the landing page.

## Decisions

### 1. Interactive 4-Region Territorial Switcher
- **Decision**: Integrate a reactive tab switcher showcasing distinct agro-ecological poles:
  - *Turén (Portuguesa)*: Intensive cereals, neutral pH, Sentinel-1 SAR soil saturation.
  - *Sur del Lago (Zulia)*: Plantain/Porcelana Cocoa, acidic pH, dolomitic lime amendments.
  - *Andes (Mérida)*: High-altitude specialty coffee, GDD thermal accumulation.
  - *Amazonas (Orinoco)*: Agroforestry systems (Copoazú / Açaí) under strict conservation.

### 2. Standardized 7-Module Onboarding Cards
- **Decision**: Present every primary route with a unified structure:
  - *Header*: Icon + Name + Route badge.
  - *Purpose*: Brief definition of what the tool accomplishes.
  - *Quick Guide*: 3-step execution steps.
  - *Action*: Direct CTA button linking to the route.

### 3. Role-Based Login Gateway
- **Decision**: Clearly map the 4 user profiles to `/auth/login` so evaluators and producers know immediately how to test or operate the platform.

## Risks / Trade-offs

- **[Risk: Content overload on mobile screens]** → **Mitigation**: Responsive CSS grid with collapsible cards and thumb-friendly touch targets.
