## Context

Ver `proposal.md` para la motivación. Actualmente la arquitectura tiene configuraciones duplicadas, no usa Docker en el frontend, incluye payloads estáticos pesados en el cliente de Next.js, y carece de un mecanismo de purga para la base de datos de telemetría SQLite.

## Goals / Non-Goals

**Goals:**
- Centralizar la gestión de paquetes en un único ecosistema (NPM).
- Estandarizar el despliegue con Docker Compose unificado.
- Mejorar el Time To Interactive (TTI) del frontend desacoplando GeoJSONs de los JS bundles.
- Garantizar estabilidad de espacio en disco en el backend local.

**Non-Goals:**
- No se modificarán las interfaces de usuario (UI/UX).
- No se migrará a una base de datos distribuida (Redis/Memcached); SQLite en modo WAL sigue siendo suficiente.

## Decisions

1. **NPM sobre Bun**:
   - *Decisión*: Eliminar `bun.lock` y conservar `package-lock.json`.
   - *Rationale*: El `README.md` actual y el ecosistema de CI/CD (pruebas Jest) están configurados para NPM. Mantener dos lockfiles puede generar dependencias asíncronas y errores en builds automatizados.

2. **Docker Compose Unificado**:
   - *Decisión*: Agrupar Next.js (Puerto 3000), FastAPI (Puerto 8000), Streamlit (Puerto 8501) y PostgreSQL (Puerto 5444) en un solo archivo `docker-compose.yml`.
   - *Rationale*: Facilita el *onboarding* de nuevos contribuidores. `docker compose up` será suficiente para inicializar todos los entornos.

3. **Desacoplamiento GeoJSON**:
   - *Decisión*: Mover los objetos pesados (`VENEZUELA_STATES_DATA`) de archivos `.ts` importados directamente, a endpoints JSON nativos servidos desde `public/` o `api/`.
   - *Rationale*: Previene que Next.js incruste polígonos masivos de ~1MB en el bundle de primera carga del cliente (Initial JS load), mejorando el *First Contentful Paint*.

4. **Auto-Purga con APScheduler**:
   - *Decisión*: Usar `APScheduler` (Background scheduler) en FastAPI para eliminar entradas en `agrotech_spatial_cache.db` que tengan más de 30 días de antigüedad.
   - *Rationale*: SQLite WAL es ultra-rápido (<5ms), pero sin expiración de registros (TTL) puede desbordar el almacenamiento del servidor con el paso de los años.

## Risks / Trade-offs

- **Riesgo 1**: Eliminar `agrotech-app/` podría romper algún script de despliegue obsoleto.
  - *Mitigación*: Se validará el script `build` en el `package.json` de la raíz antes del *commit*.
- **Riesgo 2**: Cargar polígonos GeoJSON asíncronamente puede causar un ligero retraso al visualizar el mapa por primera vez.
  - *Mitigación*: Se puede utilizar un "skeleton loading" y estrategias SWR (Stale-While-Revalidate) para la caché del navegador.
