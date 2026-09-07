## ADDED Requirements

### Requirement: Environment-Aware JWT Secret Enforcement
The authentication subsystem SHALL prevent application startup or token signing with default development secrets when running in a production environment.

#### Scenario: Running in production without custom JWT secret
- **WHEN** the application starts with `NODE_ENV === 'production'` and `JWT_SECRET` is unset or matches the default public secret
- **THEN** the authentication utility throws a fatal error and halts execution to protect user sessions.

#### Scenario: Running in development or test environment
- **WHEN** the application runs in development (`NODE_ENV === 'development'`) or test mode without a custom secret
- **THEN** the system falls back gracefully to the deterministic development secret allowing zero-friction local execution.

### Requirement: Non-Production Test Token Isolation
The token verification engine SHALL only accept hardcoded demo bypass tokens when the system is operating outside of production.

#### Scenario: Submitting test bypass token in production
- **WHEN** a client sends an `Authorization: Bearer demo_jwt_token_frank` header to an application running in `NODE_ENV === 'production'`
- **THEN** the token verification rejects the request as invalid (`401 Unauthorized`).

#### Scenario: Submitting test bypass token in development or test
- **WHEN** an automated test or local developer uses `demo_jwt_token_frank` in non-production mode
- **THEN** the system authenticates the user as `usr-farmer-01` enabling deterministic automated testing.

### Requirement: Strict Production API Authorization Guard
Protected data endpoints SHALL require valid user or guest session credentials in production mode rather than defaulting to sample user accounts.

#### Scenario: Unauthenticated request to parcels endpoint in production
- **WHEN** an unauthenticated client requests `/api/parcels` with `NODE_ENV === 'production'` without a valid Authorization token
- **THEN** the API returns HTTP 401 Unauthorized instead of falling back to `usr-farmer-01`.
