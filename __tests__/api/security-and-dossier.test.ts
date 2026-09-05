import fs from 'fs';
import path from 'path';
import { GET as adminGet, PATCH as adminPatch } from '@/app/api/admin/users/route';
import { GET as parcelsGet, POST as parcelsPost } from '@/app/api/parcels/route';
import { GET as logsGet, POST as logsPost } from '@/app/api/field-logs/route';
import { generateToken, createGuestSession, DEMO_USERS } from '@/lib/auth/authUtils';

describe('Security Hardening, Guest Sandbox Isolation & Award Dossier Suite', () => {
  const adminUser = DEMO_USERS.find(u => u.role === 'ADMIN')!;
  const farmerUser = DEMO_USERS.find(u => u.role === 'FARMER')!;

  const adminToken = generateToken(adminUser);
  const farmerToken = generateToken(farmerUser);

  describe('1. Server-Side Protection on /api/admin/users (RBAC)', () => {
    it('debe rechazar GET sin cabecera Authorization con código 401', async () => {
      const req = new Request('http://localhost:3000/api/admin/users');
      const res = await adminGet(req);
      expect(res.status).toBe(401);
      const data = await res.json();
      expect(data.error).toContain('No autorizado');
    });

    it('debe rechazar GET de un usuario no-ADMIN con código 403', async () => {
      const req = new Request('http://localhost:3000/api/admin/users', {
        headers: { Authorization: `Bearer ${farmerToken}` }
      });
      const res = await adminGet(req);
      expect(res.status).toBe(403);
      const data = await res.json();
      expect(data.error).toContain('Acceso denegado');
    });

    it('debe permitir GET a un usuario con rol ADMIN con código 200', async () => {
      const req = new Request('http://localhost:3000/api/admin/users', {
        headers: { Authorization: `Bearer ${adminToken}` }
      });
      const res = await adminGet(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(Array.isArray(data.users)).toBe(true);
      expect(data.stats).toBeDefined();
    });

    it('debe rechazar PATCH sin rol ADMIN con código 403', async () => {
      const req = new Request('http://localhost:3000/api/admin/users', {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${farmerToken}` 
        },
        body: JSON.stringify({ userId: 'usr-pending-01', newStatus: 'APPROVED' })
      });
      const res = await adminPatch(req);
      expect(res.status).toBe(403);
    });
  });

  describe('2. Multi-Guest Sandbox Isolation in Parcels & Field Logs', () => {
    it('debe inicializar parcelas de muestra aisladas para un nuevo usuario invitado', async () => {
      const guestSession = createGuestSession();
      const guestToken = generateToken(guestSession);

      const req = new Request(`http://localhost:3000/api/parcels?userId=${guestSession.id}`, {
        headers: { Authorization: `Bearer ${guestToken}` }
      });

      const res = await parcelsGet(req);
      expect(res.status).toBe(200);
      const parcels = await res.json();
      expect(parcels.length).toBe(2);
      expect(parcels[0].userId).toBe(guestSession.id);
      expect(parcels[0].name).toContain('Finca Demostración');
    });

    it('debe garantizar que dos invitados concurrentes tengan particiones de parcelas independientes', async () => {
      const guestA = createGuestSession();
      const guestB = createGuestSession();
      const tokenA = generateToken(guestA);
      const tokenB = generateToken(guestB);

      // Invitado A crea una parcela
      const postReqA = new Request('http://localhost:3000/api/parcels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenA}`
        },
        body: JSON.stringify({
          userId: guestA.id,
          name: 'Parcela Experimental Aislada A'
        })
      });
      const postResA = await parcelsPost(postReqA);
      expect(postResA.status).toBe(201);

      // Consulta de Invitado A
      const getReqA = new Request(`http://localhost:3000/api/parcels?userId=${guestA.id}`, {
        headers: { Authorization: `Bearer ${tokenA}` }
      });
      const getResA = await parcelsGet(getReqA);
      const parcelsA = await getResA.json();
      expect(parcelsA.some((p: any) => p.name === 'Parcela Experimental Aislada A')).toBe(true);

      // Consulta de Invitado B (NO debe contener la parcela de A)
      const getReqB = new Request(`http://localhost:3000/api/parcels?userId=${guestB.id}`, {
        headers: { Authorization: `Bearer ${tokenB}` }
      });
      const getResB = await parcelsGet(getReqB);
      const parcelsB = await getResB.json();
      expect(parcelsB.some((p: any) => p.name === 'Parcela Experimental Aislada A')).toBe(false);
    });

    it('debe aislar las entradas de bitácora entre sesiones de invitados', async () => {
      const guestA = createGuestSession();
      const guestB = createGuestSession();
      const tokenA = generateToken(guestA);
      const tokenB = generateToken(guestB);

      // Invitado A registra una labor
      const postReqA = new Request('http://localhost:3000/api/field-logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tokenA}`
        },
        body: JSON.stringify({
          userId: guestA.id,
          title: 'Labor Exclusiva de Invitado A',
          description: 'Prueba de aislamiento'
        })
      });
      const postResA = await logsPost(postReqA);
      expect(postResA.status).toBe(201);

      // Consulta de Invitado B (NO debe contener la labor de A)
      const getReqB = new Request(`http://localhost:3000/api/field-logs?userId=${guestB.id}`, {
        headers: { Authorization: `Bearer ${tokenB}` }
      });
      const getResB = await logsGet(getReqB);
      const logsB = await getResB.json();
      expect(logsB.some((l: any) => l.title === 'Labor Exclusiva de Invitado A')).toBe(false);
    });
  });

  describe('3. Public Documentation & MapBiomas Prize 2026 Suite Presence', () => {
    const publicDocsDir = path.join(process.cwd(), 'public', 'docs');

    const expectedFiles = [
      'MEMORANDO_POSTULACION.md',
      'BASES_PREMIO_MAPBIOMAS_2026.md',
      'PREGUNTAS_FRECUENTES_PREMIO_2026.md',
      'MATRIZ_CUMPLIMIENTO_EVALUACION.md',
      'ARTICULO_CIENTIFICO_DRAFT.md',
      'Bases_Premio_MapBiomas_Venezuela_2026.pdf',
      'Preguntas_Frecuentes_Premio_MapBiomas_2026.pdf',
      'Guia_Postulacion_MapBiomas_2026.pdf',
      'Formulario_Postulacion_MapBiomas_2026.pdf',
      'Articulo_Cientifico_Agrotech_MapBiomas_2026.pdf'
    ];

    expectedFiles.forEach(fileName => {
      it(`debe existir el archivo público oficial '${fileName}' y tener contenido sustancial`, () => {
        const filePath = path.join(publicDocsDir, fileName);
        expect(fs.existsSync(filePath)).toBe(true);
        const stats = fs.statSync(filePath);
        expect(stats.size).toBeGreaterThan(1000); // Al menos 1 KB de contenido técnico
        if (fileName === 'MEMORANDO_POSTULACION.md') {
          const content = fs.readFileSync(filePath, 'utf8');
          expect(content).toContain('197 pruebas automatizadas');
          expect(content).toContain('28 rutas limpias');
        }
      });
    });
  });
});
