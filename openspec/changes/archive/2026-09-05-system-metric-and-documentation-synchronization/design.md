## Context

The platform has achieved a verified benchmark of 197 automated tests (145 Jest + 52 Pytest), 28 production routes, and 0 TypeScript compilation errors. While the institutional memorandum (`docs/MEMORANDO_POSTULACION.md`, `public/docs/MEMORANDO_POSTULACION.md`) and in-app header badge (`/dashboard/postulacion`) have been synchronized to 197, auxiliary developer guides (`DEVELOPING.md`), public summaries (`README.md`, `PITCH_DECK.md`), CI workflows (`.github/workflows/ci.yml`), and past audit reports (`AUDITORIA_GLOBAL_SISTEMA_2026.md`) maintain residual references to 182 and 130 tests.

## Goals / Non-Goals

**Goals:**
- Sincronizar todos los archivos de documentación pública y técnica para reportar uniformemente 197 pruebas automatizadas (145 Jest + 52 Pytest) y 24 suites de pruebas.
- Enriquecer `README.md`, `DEVELOPING.md` y `PITCH_DECK.md` con las tres innovaciones recién completadas:
  1. Calibración Edafológica Regional (Kamprath $Al^{3+}$, Balance Ca:Mg, Yeso Agrícola Quíbor).
  2. Parser Vernacular Campesino de Voz Offline (Normalización tradicional e intenciones dialectales).
  3. Exportador Universal de Prescripciones Tri-Modal para Maquinaria y Drones (Shapefiles VRA en UTM 19N WGS84, KML de vuelo, y Ficha de cabina analógica).
- Actualizar `.github/workflows/ci.yml` para reflejar con precisión los nombres de los pasos de pruebas automatizadas.

**Non-Goals:**
- No alterar la lógica ejecutable ni introducir nuevas dependencias de paquetes.
- No alterar los esquemas de bases de datos ni las interfaces de APIs.

## Decisions

- **Decision 1: Atomic Consistency in Public Badges & Tables**: El badge de cabecera de `README.md` (`Tests: 197 Passing`), su tabla de pruebas y el encabezado principal deben alinearse exactamente con `docs/MEMORANDO_POSTULACION.md`.
- **Decision 2: Clear Step Descriptors in GitHub Actions Workflow**: Actualizar los nombres de los pasos del workflow de CI en `.github/workflows/ci.yml` para evitar discrepancias de etiquetado durante las ejecuciones automatizadas en GitHub.
- **Decision 3: Architectural Conventions Enrichment in DEVELOPING.md**: Añadir a la sección 5 de `DEVELOPING.md` las convenciones algorítmicas de las tres nuevas capacidades desarrolladas para asegurar la trazabilidad para futuros desarrolladores.

## Risks / Trade-offs

- **[Risk] Markdown Anchor Breakage** → En `README.md`, el enlace interno a `DEVELOPING.md` debe actualizar su ancla `#4-suite-completa-de-pruebas-y-verificación-197-tests` para mantener la navegación intacta.
