## 1. Repository Hygiene and Gitignore Hardening

- [x] 1.1 Update `.gitignore` with wildcard `.env*`, explicit negation for `.env.example` and `.env.production.example`, and patterns for private keys and certificates (`*.pem`, `*.key`, `*.crt`, `*.p12`, `*.pfx`, `*.id_rsa`, `credentials.json`, `service-account*.json`, `.pypirc`, `.npmrc`, `pip.conf`). Verify with `git status --ignored`.

## 2. Authentication Subsystem Hardening

- [x] 2.1 Refactor `src/lib/auth/authUtils.ts` to throw a fatal startup/signing error if `process.env.NODE_ENV === 'production'` and `JWT_SECRET` is unset or equals the fallback default, while maintaining the fallback in development/test.
- [x] 2.2 Restrict the `demo_jwt_token_frank` test bypass in `verifyToken` strictly to non-production environments (`NODE_ENV !== 'production'`).
- [x] 2.3 Add test scenarios in `__tests__/api/security-and-dossier.test.ts` or `__tests__/api/auth.test.ts` validating production rejection of unconfigured secrets and test bypass isolation. Verify with `npm test`.

## 3. Data Endpoint Authorization Guard

- [x] 3.1 Update `src/app/api/parcels/route.ts` to return HTTP 401 Unauthorized for unauthenticated requests when running in `NODE_ENV === 'production'`, while keeping guest/sample fallback in development.
- [x] 3.2 Add test assertions for production unauthorized parcels access and verify with `npx jest __tests__/api/security-and-dossier.test.ts`.

## 4. Continuous Integration DevSecOps Integration

- [x] 4.1 Add an automated secret scanning job/step in `.github/workflows/ci.yml` using `gitleaks/gitleaks-action` or a lightweight git entropy check.
- [x] 4.2 Validate workflow YAML syntax and consistency.

## 5. System Verification

- [x] 5.1 Execute static type verification (`npm run typecheck`) and confirm 0 errors.
- [x] 5.2 Execute complete test suite (`npm run test:all`) and confirm all 227 tests pass without regression.
