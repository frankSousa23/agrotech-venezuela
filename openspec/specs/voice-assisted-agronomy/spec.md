# Capability: Voice-Assisted Agronomy

## Purpose

Provides native in-browser voice transcription and audible speech synthesis so rural users can ask questions and hear agronomic prescriptions without typing or reading dense text.

## Requirements

### Requirement: Web Speech Voice Input Recognition
The application SHALL provide a microphone button in the intent and advisor interfaces that captures spoken agricultural queries via the browser's native SpeechRecognition API.

#### Scenario: User dictates a question
- **WHEN** the user taps the microphone button and speaks their query
- **THEN** the speech is transcribed into text in real-time and displayed in the query field with an option to confirm or re-record.

#### Scenario: Unsupported Browser or Permission Denied
- **WHEN** the browser does not support SpeechRecognition or microphone permission is denied
- **THEN** the interface displays a graceful alert allowing standard touch/click selection without breaking the layout.

### Requirement: Audible Advice Playback (Text-to-Speech)
The agronomic prescription and advisor panels SHALL provide an audible playback button ("Escuchar en Audio") utilizing the Web Speech Synthesis API.

#### Scenario: Listening to Farm Advice
- **WHEN** the user clicks "Escuchar en Audio" on an agronomic recommendation
- **THEN** the system vocalizes the diagnosis and fertilizer dosage in Spanish at a clear, natural conversational pace.

#### Scenario: Pausing or Stopping Audio
- **WHEN** the user clicks "Detener Audio" during active speech synthesis
- **THEN** audio playback stops immediately.
