import { VENEZUELA_SOIL_POINTS } from '@/lib/geo/spatialUtils';
import { GET as getSoils, POST as postSoil, IN_MEMORY_SOILS } from '@/app/api/soils/route';
import { generateToken } from '@/lib/auth/authUtils';

describe('Soils Database & Sampling Points Tests', () => {
  it('debe tener un conjunto amplio de muestras edafológicas georreferenciadas', () => {
    expect(VENEZUELA_SOIL_POINTS.length).toBeGreaterThan(10);
  });

  it('todas las muestras deben tener coordenadas válidas dentro del territorio venezolano', () => {
    for (const point of VENEZUELA_SOIL_POINTS) {
      expect(point.lat).toBeGreaterThanOrEqual(0.6); // Extremo sur Amazonas
      expect(point.lat).toBeLessThanOrEqual(12.5); // Extremo norte Falcón/Península
      expect(point.lng).toBeGreaterThanOrEqual(-73.5); // Extremo oeste Zulia
      expect(point.lng).toBeLessThanOrEqual(-59.5); // Extremo este Delta
      expect(point.ph).toBeGreaterThan(3.5);
      expect(point.ph).toBeLessThan(9.0);
    }
  });

  it('GET /api/soils debe retornar la lista de perfiles edafológicos y permitir filtrado', async () => {
    const res = await getSoils(new Request('http://localhost/api/soils'));
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThanOrEqual(5);

    const filtered = await getSoils(new Request('http://localhost/api/soils?q=turen'));
    const filteredData = await filtered.json();
    expect(filteredData.length).toBeGreaterThanOrEqual(1);
    expect(filteredData[0].name.toLowerCase()).toContain('turén');
  });

  it('POST /api/soils debe rechazar solicitudes no autenticadas con 401', async () => {
    const res = await postSoil(new Request('http://localhost/api/soils', {
      method: 'POST',
      body: JSON.stringify({ locationName: 'Finca El Carmen', ph: 6.0, organicMatter: 2.5 })
    }));
    expect(res.status).toBe(401);
  });

  it('POST /api/soils debe rechazar rol FARMER con 403 (solo AGRONOMIST/ADMIN)', async () => {
    const farmerToken = generateToken({
      id: 'usr-farmer',
      email: 'farmer@demo.ve',
      name: 'Juan Productor',
      role: 'FARMER',
      status: 'APPROVED'
    });

    const res = await postSoil(new Request('http://localhost/api/soils', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${farmerToken}`
      },
      body: JSON.stringify({ locationName: 'Finca El Carmen', ph: 6.0, organicMatter: 2.5 })
    }));
    expect(res.status).toBe(403);
  });

  it('POST /api/soils debe permitir registro con rol AGRONOMIST con 201', async () => {
    const agronomistToken = generateToken({
      id: 'usr-agro',
      email: 'maria@agrotech.ve',
      name: 'Ing. María Pérez',
      role: 'AGRONOMIST',
      status: 'APPROVED'
    });

    const res = await postSoil(new Request('http://localhost/api/soils', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${agronomistToken}`
      },
      body: JSON.stringify({
        locationName: 'Lote Experimental Turén Norte',
        ph: 6.5,
        organicMatter: 3.8,
        texture: 'Franco-limoso',
        state: 'portuguesa'
      })
    }));
    expect(res.status).toBe(201);
    const created = await res.json();
    expect(created.name).toBe('Lote Experimental Turén Norte');
    expect(created.ph).toBe(6.5);
  });
});

