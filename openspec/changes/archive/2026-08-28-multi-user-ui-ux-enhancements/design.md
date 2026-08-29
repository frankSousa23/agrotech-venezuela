## Context

Agrotech Venezuela features client-side session management (`authContext.tsx`) with HMAC-SHA256 signed tokens (`authUtils.ts`), supporting FARMER, AGRONOMIST, ADMIN, and ephemeral GUEST users. In-memory fallback layers (`IN_MEMORY_PARCELS`, `IN_MEMORY_LOGS`) provide offline resilience and sandbox isolation.

## Goals / Non-Goals

**Goals:**
- Provide an intuitive 1-click Demo Role Switcher in `/login` for rapid testing and prize evaluation.
- Add visual Guest/Sandbox indicator in `NavigationBar.tsx` with clear call-to-action for data persistence.
- Expand seed parcels and agronomic logs across 5 major agro-ecological zones of Venezuela (Portuguesa, Guárico, Zulia, Mérida, Monagas).
- Ensure 100% data isolation and zero regressions in automated tests.

**Non-Goals:**
- Implementing third-party OAuth providers (e.g. Google Sign-In, Auth0).
- Altering the Prisma database schema or cryptographic signing key conventions.

## Decisions

### 1. 1-Click Role Switcher on Login Interface
- **Decision**: Add a dedicated "Acceso Rápido Demostrativo" panel in `src/app/login/page.tsx` rendering quick-action buttons for Producer, Agronomist, Administrator, Pending, and Guest.
- **Rationale**: Evaluators and jury members can switch personas in 1 second without looking up passwords or copying emails.

### 2. Ephemeral Guest Header Badge
- **Decision**: Render an amber glassmorphic chip `🚀 Modo Invitado (Sandbox)` next to the connectivity badge in `NavigationBar.tsx` when `user.isGuest` or `user.status === 'GUEST'`.
- **Rationale**: Immediate clarity on session persistence status and gentle onboarding to register.

### 3. Multi-Region Pre-Populated Dataset
- **Decision**: Expand `IN_MEMORY_PARCELS` and `IN_MEMORY_LOGS` with canonical lots:
  1. *Finca Santa María* (Portuguesa): Maíz Blanco Harinero (48.5 ha).
  2. *Hacienda El Porvenir* (Guárico): Arroz de Riego (62.0 ha).
  3. *Hacienda San José* (Zulia - Sur del Lago): Plátano Hartón / Cacao (35.0 ha).
  4. *Finca Los Frailes* (Mérida - Andes): Café Arábica de Especialidad (18.5 ha).
  5. *Finca Las Mesas* (Monagas - Oriente): Soya / Rotación (80.0 ha).
- **Rationale**: Demonstrates all 8 strategic crop models across diverse soil textures and climates.

## Risks / Trade-offs

- **[Risk: In-memory state mutation across test suites]** → **Mitigation**: Pure immutable cloning for guest accounts (`userId.startsWith('usr-guest')`).
