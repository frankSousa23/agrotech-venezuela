# Spec Delta: prize-publication-exporter

## MODIFIED Requirements

### Requirement: Creative Process Engineering Memoir and Human Dimension Integration
The system and project documentation SHALL maintain an authoritative, personal engineering memoir and creative process narrative in `docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md` (with an identical public replica in `public/docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md`). The document SHALL present the authentic voice of the creator, **Frank Sousa**, detailing:
1. **The Academic Spark and Certified MapBiomas Training**: The project's genesis originating from proximity to a university research group and mentorship from an agronomist professor specialized in edaphology (soil science); Frank Sousa's formal certified attendance at the official MapBiomas Venezuela training workshop; and the strategic vision of bridging 40 years of territorial land-use data with practical soil physics for both vegetable/crop production (cereals, legumes, horticulture) and livestock pasture nutrition (forage).
2. **The Solo Developer's Critical Sieve and Iterative Rigor**: The sovereign methodology of Frank Sousa as a solo developer (*solo developer*) collaborating with Gemini within the Google Antigravity IDE: actively researching suggestions, critically filtering, adapting, pruning, and rejecting ideas that did not fit the biophysical and infrastructural realities of Venezuela, validated through consecutive exhaustive audit cycles and 292 passing automated tests (237 Jest + 55 Pytest).
3. **The Tangible Seed of Arduino/ESP32 Soil Sensors**: The bottom-up experimental origin using low-cost microcontrollers (Arduino/ESP32) and capacitive soil moisture probes in controlled pot/bed assays to observe real-world hydraulic responses, establishing the architectural foundation for scalable LoRaWAN mesh networks and automated pivot irrigation across large commercial harvests.
4. **Legal Governance and Third-Party Data Licensing**: The integration of external open-data frameworks (Copernicus Regulation EU 1159/2013, NASA NPD 2230.1, MapBiomas CC BY 4.0, Google AI Studio Free Tier, and MIT software licensing) providing an unassailable legal and operational foundation.
5. **Multidisciplinary Evolutionary Horizons**: Five tangible expansion vectors building on current foundations:
   - Conversational WhatsApp/SMS rural bot for non-smartphone accessibility.
   - Agro-banking credit risk and micro-insurance scoring based on historical satellite proof.
   - MapBiomas Ground-Truth participatory co-validation network.
   - Open-hardware solar LoRaWAN IoT weather stations for rural micro-catchments.
   - Pan-Amazonian / Orinoco Basin transboundary territorial monitoring.

#### Scenario: Inspecting Author Engineering Memoir from Documentation Hub
- **WHEN** an evaluator, researcher, or juror visits `/dashboard/postulacion` or opens `docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md`
- **THEN** the document is fully readable, detailing Frank Sousa's academic edaphology roots, official MapBiomas workshop certificate, the solo developer filter methodology, the Arduino IoT origin, the Antigravity-Gemini pair programming method, the 292 tests quality gate, and the 5 evolutionary horizons.

#### Scenario: Verifying Public Distribution Parity for Engineering Memoir
- **WHEN** the documentation build pipeline executes or automated tests run
- **THEN** `PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md` is present in both `docs/` and `public/docs/` with identical content, ensuring immediate browser download availability.
