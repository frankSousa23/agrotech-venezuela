import { GET } from '@/app/api/export/stats/route';
import { NextRequest } from 'next/server';

describe('Import / Export y Permisos de API', () => {
  it('debería exportar estadísticas en formato CSV exitosamente', async () => {
    const req = new NextRequest('http://localhost/api/export/stats?format=csv');
    const res = await GET(req);
    
    expect(res.status).toBe(200);
    const contentType = res.headers.get('Content-Type');
    expect(contentType).toContain('text/csv');
  });

  it('debería exportar estadísticas en formato Excel exitosamente', async () => {
    const req = new NextRequest('http://localhost/api/export/stats?format=excel');
    const res = await GET(req);
    
    expect(res.status).toBe(200);
    const contentType = res.headers.get('Content-Type');
    expect(contentType).toContain('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  });
});
