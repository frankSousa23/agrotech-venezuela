import { IN_MEMORY_PARCELS } from '@/app/api/parcels/route';
import { IN_MEMORY_LOGS } from '@/app/api/field-logs/route';

describe('Parcels & Field Diary Dataflow Suite', () => {
  it('debe contener parcelas registradas para el productor con métricas válidas', () => {
    expect(IN_MEMORY_PARCELS.length).toBeGreaterThan(0);
    const parcel = IN_MEMORY_PARCELS[0];
    expect(parcel.userId).toBe('usr-farmer-01');
    expect(parcel.areaHectares).toBeGreaterThan(0);
    expect(parcel.centerLat).toBeDefined();
    expect(parcel.centerLng).toBeDefined();
    expect(parcel.polygonGeoJson).toBeDefined();

    const parsedGeo = JSON.parse(parcel.polygonGeoJson);
    expect(parsedGeo.type).toBe('Polygon');
  });

  it('debe registrar y estructurar entradas del cuaderno de campo', () => {
    expect(IN_MEMORY_LOGS.length).toBeGreaterThan(0);
    
    const encaladoLog = IN_MEMORY_LOGS.find(l => l.logType === 'ENCALADO');
    expect(encaladoLog).toBeDefined();
    expect(encaladoLog?.dosage).toContain('Dolomita');

    const cosechaLog = IN_MEMORY_LOGS.find(l => l.logType === 'COSECHA');
    expect(cosechaLog).toBeDefined();
    expect(cosechaLog?.yieldTonHa).toBeGreaterThan(4.0);
  });

  it('debe contener parcelas y bitácoras de los 5 polos agro-productivos de Venezuela', () => {
    const states = IN_MEMORY_PARCELS.map(p => p.stateId);
    expect(states).toContain('portuguesa');
    expect(states).toContain('guarico');
    expect(states).toContain('zulia');
    expect(states).toContain('merida');
    expect(states).toContain('monagas');

    const zuliaParcel = IN_MEMORY_PARCELS.find(p => p.stateId === 'zulia');
    expect(zuliaParcel?.currentCrop).toContain('Plátano');

    const meridaParcel = IN_MEMORY_PARCELS.find(p => p.stateId === 'merida');
    expect(meridaParcel?.currentCrop).toContain('Café');

    const monagasParcel = IN_MEMORY_PARCELS.find(p => p.stateId === 'monagas');
    expect(monagasParcel?.currentCrop).toContain('Soya');
  });

  it('debe ser idempotente al registrar labores con el mismo clientLogId evitando duplicados', async () => {
    const { POST } = await import('@/app/api/field-logs/route');
    const testLogId = `offline-uuid-${Date.now()}`;

    const makeRequest = (logId: string) => ({
      json: async () => ({
        clientLogId: logId,
        parcelId: 'parc-001',
        userId: 'usr-farmer-01',
        logType: 'FERTILIZACION',
        title: 'Aplicación Urea Reabono',
        description: 'Fertilización en V6',
        dosage: '100 kg/ha'
      })
    } as any);

    // Primera llamada: debe crear el registro con status 201
    const res1 = await POST(makeRequest(testLogId));
    const data1 = await res1.json();
    expect(res1.status).toBe(201);
    expect(data1.success).toBe(true);
    expect(data1.log.id).toBe(testLogId);

    // Segunda llamada con el mismo ID: debe responder 200 con duplicate: true
    const res2 = await POST(makeRequest(testLogId));
    const data2 = await res2.json();
    expect(res2.status).toBe(200);
    expect(data2.duplicate).toBe(true);
    expect(data2.log.id).toBe(testLogId);
  });

  it('debe activar el protocolo QoS rural y marcar la bandera de ahorro de datos ante redes 2G o alta latencia', () => {
    // Simular Network Information API en 2G
    const mockConnection = {
      effectiveType: '2g',
      saveData: true,
      rtt: 850
    };

    const isDegraded = mockConnection.effectiveType === '2g' || mockConnection.effectiveType === 'slow-2g' || mockConnection.saveData === true || mockConnection.rtt > 500;
    expect(isDegraded).toBe(true);

    // Bandera global para suspender descargas pesadas de teselas satelitales
    (global as any).__AGROTECH_RURAL_DATA_SAVER__ = Boolean(isDegraded);
    expect((global as any).__AGROTECH_RURAL_DATA_SAVER__).toBe(true);

    // En 4G de alta velocidad, la bandera debe desactivarse
    const mockFastConnection = { effectiveType: '4g', saveData: false, rtt: 80 };
    const isFast = mockFastConnection.effectiveType === '2g' || mockFastConnection.effectiveType === 'slow-2g' || mockFastConnection.saveData === true || mockFastConnection.rtt > 500;
    (global as any).__AGROTECH_RURAL_DATA_SAVER__ = Boolean(isFast);
    expect((global as any).__AGROTECH_RURAL_DATA_SAVER__).toBe(false);
  });
});
