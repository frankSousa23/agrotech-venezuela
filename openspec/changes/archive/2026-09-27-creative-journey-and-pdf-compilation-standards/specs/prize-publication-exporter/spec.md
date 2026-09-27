# Spec Delta: prize-publication-exporter

## ADDED Requirements

### Requirement: Creative Process Engineering Memoir and Human Dimension Integration
The system and project documentation SHALL maintain an authoritative, personal engineering memoir and creative process narrative in `docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md` (with an identical public replica in `public/docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md`). The document SHALL present the authentic voice of the creator, **Frank Sousa**, detailing:
1. **The Creative Genesis and Contextual Pivot**: The initial technical intuition ("para mapas Google es quien tiene los mejores, supongo") contrasted against the biophysical and infrastructural realities of rural Venezuela (dense cloud cover in 75% of rainy cycles making optical imagery blind, low rural connectivity, lack of soil testing labs, and smallholder farmers operating in vernacular units such as sacos, tambores y tablones).
2. **Human-AI Pair Programming in Antigravity with Gemini**: The collaborative engineering symbiosis between the human architect and Google Gemini within the Antigravity IDE, characterized by exhaustive consecutive audit requests, deep iterative refactoring, and deterministic zero-regression enforcement resulting in 292 passing automated tests (237 Jest + 55 Pytest).
3. **Legal Governance and Third-Party Data Licensing**: The integration of external open-data frameworks (Copernicus Regulation EU 1159/2013, NASA NPD 2230.1, MapBiomas CC BY 4.0, Google AI Studio Free Tier, and MIT software licensing) providing an unassailable legal and operational foundation.
4. **Multidisciplinary Evolutionary Horizons**: Five tangible expansion vectors building on current foundations:
   - Conversational WhatsApp/SMS rural bot for non-smartphone accessibility.
   - Agro-banking credit risk and micro-insurance scoring based on historical satellite proof.
   - MapBiomas Ground-Truth participatory co-validation network.
   - Open-hardware solar LoRaWAN IoT weather stations for rural micro-catchments.
   - Pan-Amazonian / Orinoco Basin transboundary territorial monitoring.

#### Scenario: Inspecting Author Engineering Memoir from Documentation Hub
- **WHEN** an evaluator, researcher, or juror visits `/dashboard/postulacion` or opens `docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md`
- **THEN** the document is fully readable, detailing Frank Sousa's creative journey, the Antigravity-Gemini pair programming method, the 292 tests quality gate, and the 5 evolutionary horizons.

#### Scenario: Verifying Public Distribution Parity for Engineering Memoir
- **WHEN** the documentation build pipeline executes or automated tests run
- **THEN** `PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md` is present in both `docs/` and `public/docs/` with identical content, ensuring immediate browser download availability.

### Requirement: Official PDF Formatting and Compilation Parameters Specification
The publication exporter and project documentation SHALL explicitly document the technical parameters, layout rules, styling constraints, and compilation commands for generating official award-grade PDF dossiers from Markdown sources. The specification SHALL codify:
1. **Physical Page Layout**: ISO A4 standard (210 mm x 297 mm) with uniform 15 mm margins and `printBackground: true`.
2. **Typography and Readability Hierarchy**: Clean modern sans-serif typography (`Segoe UI`, system Apple-System) with 9 pt body text, justified paragraphs, and emerald primary accents (`#065f46`, `#059669`).
3. **CSS Page-Break Constraints**: Mandatory `page-break-inside: avoid; break-inside: avoid;` rules applied to tables, pre/code blocks, figure containers, blockquotes, and image captions to prevent split figures and orphaned headers across page transitions.
4. **Dynamic Running Headers and Footers**: Header templates featuring document title, author Frank Sousa attribution, and right-aligned branding; footer templates rendering dynamic `<span class='pageNumber'></span> de <span class='totalPages'></span>` page counters.
5. **High-Resolution Vector and Plotly Pre-Rendering**: Pre-compilation of interactive Plotly HTML figures into 300 DPI high-resolution PNG images via headless Puppeteer browser before PDF injection.
6. **Word Count Compliance**: Automated verification guaranteeing that official prize dossiers remain strictly below the 10,000-word limit prescribed by MapBiomas Venezuela guidelines.
7. **Compilation Tooling and Reproduction**: Documentation of the universal batch script (`node scripts/compile_all_docs_to_pdf.js`) and individual CLI generation (`npx md-to-pdf <document.md> --config-file scripts/pdf_config.json`).

#### Scenario: Reviewing PDF Parameters in Engineering Documentation
- **WHEN** an evaluator, designer, or developer inspects the PDF compilation section in `docs/PROCESO_CREATIVO_Y_MEMORIA_DE_INGENIERIA.md` or `scripts/`
- **THEN** the document details the exact page dimensions (A4), 15 mm margins, CSS anti-split rules, header/footer tokens, and execution commands.

#### Scenario: Reproducing Official Dossier Compilation via Node Script
- **WHEN** an engineer executes `node scripts/compile_all_docs_to_pdf.js` with `md-to-pdf` installed
- **THEN** the system compiles all registered Markdown sources into publication-grade PDFs in `public/docs/` adhering to the configured styling and pagination parameters.
