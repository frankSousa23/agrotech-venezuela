## ADDED Requirements

### Requirement: Direct Voice Dictation in Field Diary Modal
The Field Diary (`/dashboard/bitacora`) SHALL integrate native Web Speech API recognition and client-side vernacular parsing into the New Log creation modal, allowing producers to dictate agricultural labors and automatically populate task type, detected input, and converted metric quantities.

#### Scenario: Dictating Field Log with Traditional Units
- **WHEN** user activates voice dictation in the Bitácora log modal and speaks "Le tiré dos sacos de urea al lote 1"
- **THEN** the modal automatically selects labor `FERTILIZACION`, sets dosage to "100 kg (2 sacos)", and auto-populates title and notes without requiring manual typing.
