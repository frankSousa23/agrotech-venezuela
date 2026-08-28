## Why

El ecosistema de Agrotech Venezuela ha alcanzado madurez funcional, pero arrastra artefactos de desarrollo, configuraciones redundantes y deuda técnica en infraestructura. Estas optimizaciones (higiene de repositorios, estandarización con Docker, mitigación del peso de payloads geoespaciales y auto-limpieza de caché) son necesarias para llevar el proyecto a un estándar de producción profesional, mejorar la Developer Experience (DX) y prevenir cuellos de botella de rendimiento o de almacenamiento a largo plazo.

## What Changes

- **Higiene del Repositorio**: Se eliminará el directorio duplicado y obsoleto `agrotech-app/`, se resolverá el conflicto entre `bun.lock` y `package-lock.json` unificando bajo NPM, y se migrarán los secretos locales perdidos (`agrotech-app/.env` hacia la raíz).
- **Despliegue Estandarizado (Docker)**: Se añadirá un `Dockerfile` al frontend Next.js y se configurará un orquestador unificado en `docker-compose.yml` para levantar toda la stack (PostgreSQL, FastAPI, Streamlit, Next.js) con un solo comando.
- **Performance Geoespacial**: Se aislarán los pesados conjuntos de datos topológicos (`VENEZUELA_STATES_DATA` y municipios) fuera del bundle inicial de Javascript del cliente, mejorando los tiempos de carga en dispositivos móviles o zonas rurales.
- **Escalabilidad de Caché (Backend)**: Se implementará un `BackgroundTasks` o `APScheduler` en FastAPI para purgar periódicamente la base de datos local SQLite WAL de registros de telemetría de más de 30 días, evitando crecimiento descontrolado de disco.

## Capabilities

Esta es una actualización estrictamente técnica de infraestructura, refactorización y DevOps que no altera los requerimientos funcionales del sistema (comportamiento observable).
Por lo tanto, se ha establecido `skip_specs: true` en `.openspec.yaml`.

### New Capabilities
*(Ninguna)*

### Modified Capabilities
*(Ninguna)*

## Impact

- **Repositorio**: Reducción drástica del tamaño y eliminación de confusión con gestores de paquetes.
- **DevOps**: Integración de nuevos desarrolladores reducida a un solo comando `docker compose up`.
- **Frontend**: Menor tamaño de bundle inicial (TBT - Total Blocking Time reducido).
- **Backend**: Sistema auto-mantenible con consumo de disco predecible.
