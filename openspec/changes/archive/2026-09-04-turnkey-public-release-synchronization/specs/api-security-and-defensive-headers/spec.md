## MODIFIED Requirements

### Requirement: Defensive HTTP Security Headers
The web application SHALL configure standard defensive HTTP response headers across all responses to mitigate clickjacking, MIME sniffing, and unauthorized framing, while permitting necessary self-origin capabilities such as geolocation and native microphone speech recognition.

#### Scenario: Receiving HTTP Response Headers
- **WHEN** client requests any web route or API endpoint
- **THEN** response headers include `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy: camera=(), microphone=(self), geolocation=(self)`.

#### Scenario: Using Voice Assistant Dictation in Production
- **WHEN** user activates the microphone button in the Intentions Navigator or Recommendations Advisor on a production deployment
- **THEN** the browser does not reject the Web Speech API request due to `Permissions-Policy` restrictions, allowing speech-to-text dictation on the application's origin.
