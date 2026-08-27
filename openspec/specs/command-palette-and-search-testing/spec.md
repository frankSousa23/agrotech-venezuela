# command-palette-and-search-testing Specification

## Purpose

Tests omnibox search indexing, fuzzy match accuracy, state geodata lookups, and keyboard shortcut event listeners.

## Requirements

### Requirement: Search Index Accuracy
The test suite SHALL verify that queries matching state names (with or without accents), crops, and tools return correct filtered results.

#### Scenario: Searching for "Guarico"
- **WHEN** user query is "guarico"
- **THEN** search engine returns "Guárico" with capital "San Juan de los Morros" and appropriate navigation link.
