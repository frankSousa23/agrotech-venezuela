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
});
