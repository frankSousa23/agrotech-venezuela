## 1. Higiene del Repositorio y Estandarización de Paquetes

- [x] 1.1 Eliminar el directorio `agrotech-app/` y verificar con `ls` que ya no existe en la raíz.
- [x] 1.2 Mover o recrear el archivo `.env` en la raíz (rescatándolo de `agrotech-app/.env` si es posible) y verificar que Prisma cargue correctamente las variables locales.
- [x] 1.3 Eliminar el archivo `bun.lock` de la raíz para consolidar la gestión de dependencias bajo `npm`, verificando con `npm install` que el árbol se resuelva limpiamente con `package-lock.json`.

## 2. Dockerización Universal

- [x] 2.1 Crear un archivo `Dockerfile` en el directorio raíz estructurado para Next.js (dependencias, build, start) y verificar con `docker build -t agrotech-frontend .` que compile exitosamente.
- [x] 2.2 Refactorizar el archivo `docker-compose.yml` de la raíz para incluir 4 servicios (db_postgres, backend_fastapi, frontend_nextjs, dash_streamlit) y verificar que `docker compose config` es válido.

## 3. Optimización de Rendimiento Geoespacial (Frontend)

- [x] 3.1 Refactorizar la provisión de datos vectoriales pesados (`venezuelaData.ts` y `venezuelaMunicipalities.ts`), moviendo sus polígonos hacia un API Endpoint `/api/geo/states` o un archivo estático en `public/`, y verificar que el mapa WebGIS siga cargando las geometrías y tooltips correctamente.

## 4. Escalabilidad de Caché (Backend)

- [x] 4.1 Añadir mecanismo nativo de `BackgroundTasks` en `backend/src/main.py` para purgar registros de la base de datos local SQLite WAL que excedan los 30 días de antigüedad, y verificar con un log de inicio que la tarea recurrente se registró exitosamente.
