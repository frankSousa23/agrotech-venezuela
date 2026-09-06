import { GET as parcelsGet, POST as parcelsPost, IN_MEMORY_PARCELS, PARCEL_CONFLICTS_MAP } from '@/app/api/parcels/route';
import { GET as conflictsGet, POST as conflictsPost } from '@/app/api/parcels/conflicts/route';

describe('Parcel Versioning & Deterministic Conflict Quarantine Suite', () => {
  beforeEach(() => {
    PARCEL_CONFLICTS_MAP.clear();
  });

  it('debe inicializar parcelas semilla con versión 1 y estado sincronizado', async () => {
    const p = IN_MEMORY_PARCELS[0];
    expect(p.version).toBeGreaterThanOrEqual(1);
    expect(p.syncStatus).toBe('synced');
    expect(p.updated_at).toBeDefined();
  });

  it('debe incrementar la versión secuencialmente tras una actualización válida', async () => {
    const target = IN_MEMORY_PARCELS[0];
    const initialVersion = target.version || 1;

    const req = new Request('http://localhost:3000/api/parcels', {
      method: 'POST',
      body: JSON.stringify({
        id: target.id,
        userId: target.userId,
        name: `${target.name} (Editado Válido)`,
        baseVersion: initialVersion,
        areaHectares: target.areaHectares
      })
    });

    const res = await parcelsPost(req);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.parcel.version).toBe(initialVersion + 1);
    expect(data.parcel.syncStatus).toBe('synced');
  });

  it('debe detectar colisión de versión 409 y encolar en cuarentena si baseVersion es obsoleta', async () => {
    const target = IN_MEMORY_PARCELS[1];
    // Asegurar que el servidor tenga versión mayor
    target.version = 3;

    // El cliente envía actualización asumiendo baseVersion 1 (obsoleta)
    const req = new Request('http://localhost:3000/api/parcels', {
      method: 'POST',
      body: JSON.stringify({
        id: target.id,
        userId: target.userId,
        name: 'Hacienda El Porvenir — Intento Offline Desfasado',
        baseVersion: 1,
        areaHectares: 65.0,
        currentCrop: 'Arroz Primario'
      })
    });

    const res = await parcelsPost(req);
    expect(res.status).toBe(409);
    const data = await res.json();
    expect(data.code).toBe('VERSION_CONFLICT');
    expect(data.conflict).toBeDefined();
    expect(data.conflict.parcelId).toBe(target.id);
    expect(data.conflict.serverVersion.version).toBe(3);
    expect(data.conflict.clientVersion.version).toBe(1);

    // Verificar presencia en endpoint de conflictos
    const conflictReq = new Request(`http://localhost:3000/api/parcels/conflicts?userId=${target.userId}`);
    const conflictRes = await conflictsGet(conflictReq);
    const conflictData = await conflictRes.json();
    expect(conflictData.success).toBe(true);
    expect(conflictData.count).toBe(1);
    expect(conflictData.conflicts[0].conflictId).toBe(data.conflict.conflictId);
  });

  it('debe resolver conflicto eligiendo keep_client y actualizar la parcela', async () => {
    const target = IN_MEMORY_PARCELS[2];
    target.version = 2;

    // Crear conflicto intencional
    const postReq = new Request('http://localhost:3000/api/parcels', {
      method: 'POST',
      body: JSON.stringify({
        id: target.id,
        userId: target.userId,
        name: 'Tablón Sur del Lago — Versión de Campo',
        baseVersion: 1,
        areaHectares: 40.0
      })
    });

    const postRes = await parcelsPost(postReq);
    const postData = await postRes.json();
    const conflictId = postData.conflict.conflictId;

    // Resolver eligiendo 'keep_client'
    const resolveReq = new Request('http://localhost:3000/api/parcels/conflicts', {
      method: 'POST',
      body: JSON.stringify({
        conflictId,
        resolutionChoice: 'keep_client'
      })
    });

    const resolveRes = await conflictsPost(resolveReq);
    expect(resolveRes.status).toBe(200);
    const resolveData = await resolveRes.json();
    expect(resolveData.success).toBe(true);
    expect(resolveData.parcel.name).toBe('Tablón Sur del Lago — Versión de Campo');
    expect(resolveData.parcel.areaHectares).toBe(40.0);
    expect(resolveData.parcel.syncStatus).toBe('synced');
    expect(resolveData.conflict.resolved).toBe(true);
  });

  it('debe permitir sobreescritura forzada cuando forceOverwrite es true', async () => {
    const target = IN_MEMORY_PARCELS[3];
    target.version = 5;

    const forceReq = new Request('http://localhost:3000/api/parcels', {
      method: 'POST',
      body: JSON.stringify({
        id: target.id,
        userId: target.userId,
        name: 'Finca Los Frailes — Sobreescritura Forzada',
        baseVersion: 1,
        forceOverwrite: true
      })
    });

    const res = await parcelsPost(forceReq);
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
    expect(data.parcel.name).toBe('Finca Los Frailes — Sobreescritura Forzada');
  });
});
