# api-security-and-defensive-headers Specification

## Purpose

Enforces HTTP defensive headers, timing-safe cryptographic comparisons, and strict microservice CORS whitelisting to protect against common web vulnerabilities.

## Requirements

### Requirement: Constant-Time Signature Verification
The system SHALL use constant-time comparison algorithms when verifying cryptographic signatures to eliminate side-channel timing attack vectors.

#### Scenario: Token Validation
- **WHEN** incoming requests present an authorization token to `verifyToken`
- **THEN** signature verification uses `crypto.timingSafeEqual()` preventing timing discrepancy exploitation.

### Requirement: Defensive HTTP Security Headers
The web application SHALL configure standard defensive HTTP response headers across all responses to mitigate clickjacking, MIME sniffing, and unauthorized framing, while permitting necessary self-origin capabilities such as geolocation and native microphone speech recognition.

#### Scenario: Receiving HTTP Response Headers
- **WHEN** client requests any web route or API endpoint
- **THEN** response headers include `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy: camera=(), microphone=(self), geolocation=(self)`.

#### Scenario: Using Voice Assistant Dictation in Production
- **WHEN** user activates the microphone button in the Intentions Navigator or Recommendations Advisor on a production deployment
- **THEN** the browser does not reject the Web Speech API request due to `Permissions-Policy` restrictions, allowing speech-to-text dictation on the application's origin.

### Requirement: Hardened CORS Configuration in Spatial Microservice
The FastAPI backend service SHALL enforce explicit origin whitelisting instead of wildcard wildcards when credentials support is enabled.

#### Scenario: Cross-Origin API Request to FastAPI
- **WHEN** a client performs a preflight OPTIONS or GET/POST request to the FastAPI microservice
- **THEN** CORS headers allow only configured trusted local and production origins rather than a universal wildcard.

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
