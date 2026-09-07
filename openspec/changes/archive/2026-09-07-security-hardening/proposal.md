## Why

Recent audits and DevSecOps assessments identified subtle security vulnerabilities in local configuration hygiene and environment-aware authorization:
1. `.gitignore` currently allows arbitrary `.env.*` files (such as `.env.production` or `.env.staging`) to be staged and committed by mistake.
2. The authentication engine allows an insecure default `JWT_SECRET` and a hardcoded test bypass token (`demo_jwt_token_frank`) regardless of `NODE_ENV`.
3. Unauthenticated API requests fall back to querying or creating parcels for `usr-farmer-01`, which is suitable for offline sandbox evaluation but unsafe for production multi-tenant environments.

Hardening these areas ensures that zero credentials can be leaked and that production environments fail closed without degrading offline sandbox evaluation.

## What Changes

- **Repository Hygiene (.gitignore)**: Upgrade `.gitignore` to universally ignore all `.env*` files with explicit negation for `.env.example` and `.env.production.example`. Add rules for private keys (`*.pem`, `*.key`, `*.p12`, `*.id_rsa`, `credentials.json`, `service-account*.json`) and package manager configs (`.pypirc`, `.npmrc`, `pip.conf`).
- **Production JWT Enforcement**: Fail closed in `src/lib/auth/authUtils.ts` if `NODE_ENV === 'production'` and `JWT_SECRET` is unset or equals the fallback default secret.
- **Environment-Isolated Test Bypass**: Restrict `demo_jwt_token_frank` in `verifyToken` strictly to non-production environments (`NODE_ENV !== 'production'`).
- **Production API Authorization**: Enforce 401 Unauthorized for unauthenticated requests to `/api/parcels` when running in production mode, while maintaining graceful demo/guest fallback in local development.
- **CI/CD DevSecOps Step**: Integrate an automated secret-scanning step (or git secret verification) into `.github/workflows/ci.yml`.

## Capabilities

### New Capabilities
- `repository-hygiene-and-secret-prevention`: Covers universal exclusion patterns in `.gitignore` for secrets and keys, plus CI/CD secret scanning integration.

### Modified Capabilities
- `api-security-and-defensive-headers`: Adds requirements for environment-aware JWT secret enforcement, non-production test token restriction, and production endpoint authorization guards.

## Impact

- `src/lib/auth/authUtils.ts`: JWT initialization and token verification logic.
- `src/app/api/parcels/route.ts`: Environment-conditioned authorization fallback.
- `.gitignore`: Enhanced exclusion rules.
- `.github/workflows/ci.yml`: Added secret verification action.
- Test suites: Ensures all existing Jest (173) and Pytest (54) tests continue passing without regression.
