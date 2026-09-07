## Context

See `proposal.md` for motivation.
The platform operates in two distinct operational modes:
1. **Turnkey Local Evaluation / Rural Offline Sandbox**: Zero-friction setup where developers and evaluators can explore the platform without configuring a `.env` or starting external PostgreSQL databases.
2. **Production Deployment (Cloud / VPS / Docker)**: High-security multi-tenant environment requiring cryptographically sound keys and strict authorization.

The challenge is hardening production security while preserving 100% of the turnkey experience for evaluation and testing.

## Goals / Non-Goals

**Goals:**
- Eliminate accidental credential exposure via wildcard `.gitignore` hygiene.
- Enforce strict `JWT_SECRET` requirement in `NODE_ENV === 'production'`.
- Confine testing bypass tokens and permissive defaults strictly to non-production environments.
- Introduce continuous secret-scanning automation in GitHub Actions.
- Preserve 100% pass rate across the 227 automated tests (173 Jest + 54 Pytest).

**Non-Goals:**
- Forcing external database setup during local evaluation.
- Rewriting password hashing across all seed records to Argon2 in this change (deferred to future user onboarding migration).
- Removing SheetJS (`xlsx`) export capabilities.

## Decisions

### 1. Universal Wildcard Matching for Environment Files
- **Decision**: Update `.gitignore` to use `.env*` accompanied by `!.env.example` and `!.env.production.example`.
- **Rationale**: Prevents accidental staging of `.env.production`, `.env.staging`, or `.env.backup`.
- **Alternatives Considered**: Enumerating every possible `.env.<name>`. Rejected because humans invent unpredictable suffixes.

### 2. Environment-Conditioned JWT Validation
- **Decision**: Check `process.env.NODE_ENV === 'production'` inside `authUtils.ts`. If running in production and `JWT_SECRET` equals the default fallback or is empty, throw a descriptive fatal Error.
- **Rationale**: Prevents accidental production deployments from using the repository's public fallback secret.
- **Alternatives Considered**: Generating a random ephemeral secret on startup. Rejected because horizontal container restarts would invalidate existing user session cookies.

### 3. Non-Production Gating for Demo Bypass Token
- **Decision**: Guard `if (process.env.NODE_ENV !== 'production' && token === 'demo_jwt_token_frank')`.
- **Rationale**: Keeps legacy end-to-end tests functioning seamlessly in `NODE_ENV === 'test'` while permanently closing the backdoor in production.

### 4. Continuous Integration DevSecOps Scanner
- **Decision**: Add a Git secret-scanning step using `gitleaks-action` or a lightweight git entropy check in `.github/workflows/ci.yml`.
- **Rationale**: Automates push and pull request verification before code reaches `main`.

## Risks / Trade-offs

- **[Risk] Test suite failures if Jest runs with production flag** → Mitigation: Jest defaults to `NODE_ENV = 'test'`, which bypasses production-only restrictions.
- **[Risk] CI runner network latency for Gitleaks action** → Mitigation: Use official action `gitleaks/gitleaks-action@v2` with `fetch-depth: 0` cached.
