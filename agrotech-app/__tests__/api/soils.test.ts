import { GET } from '@/app/api/soils/route';
import { NextRequest } from 'next/server';

describe('Soils API', () => {
  it('debería retornar 200 y una lista de perfiles de suelo en GET /api/soils', async () => {
    const req = new NextRequest('http://localhost/api/soils');
    const res = await GET(req);
    
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
  });
});
