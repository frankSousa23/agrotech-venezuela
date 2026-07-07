import { GET } from '@/app/api/recomendaciones/route';
import { NextRequest } from 'next/server';

describe('Recomendaciones API', () => {
  it('debería retornar 200 y una lista de recomendaciones en GET /api/recomendaciones', async () => {
    const req = new NextRequest('http://localhost/api/recomendaciones');
    const res = await GET();
    
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
  });
});
