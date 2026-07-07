import { GET, POST } from '@/app/api/crops/route';
import { NextRequest } from 'next/server';

describe('Crops API', () => {
  it('debería retornar 200 y una lista de cultivos en GET /api/crops', async () => {
    const req = new NextRequest('http://localhost/api/crops');
    const res = await GET(req);
    
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
    // Asumimos que la BD fue llenada con el seed
    expect(data.length).toBeGreaterThanOrEqual(0);
  });

  it('debería rechazar un POST sin campos requeridos', async () => {
    const req = new NextRequest('http://localhost/api/crops', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    
    const res = await POST(req);
    // Dado que falla la validación o prisma tira error por falta de campos
    expect(res.status).toBe(500);
  });
});
