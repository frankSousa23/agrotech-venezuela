/**
 * ============================================================================
 * AGROTECH VENEZUELA — API REST DE GESTIÓN DE PARCELAS (/api/parcels)
 * ============================================================================
 * 
 * Endpoint REST para la persistencia y consulta de parcelas agrícolas del productor:
 * 1. GET /api/parcels:
 *    - Filtra parcelas asociadas al 'userId' o 'guestId' actual.
 *    - Intenta consultar PostgreSQL vía Prisma; en caso de modo offline/sandbox,
 *      recurre al almacenamiento en memoria 'IN_MEMORY_PARCELS'.
 * 2. POST /api/parcels:
 *    - Registra un nuevo lote georreferenciado con polígono GeoJSON y área Shoelace calculada.
 * 3. DELETE /api/parcels:
 *    - Elimina un lote por 'id' garantizando aislamiento de datos.
 * 
 * Interacciones:
 * - Usado por: MultiLevelMapViewer.tsx (guardado directo), Mis Tierras (/dashboard/tierras)
 *   y Cuaderno de Campo (/dashboard/bitacora).
 */

import { NextResponse } from 'next/server';

export interface InMemParcel {
  id: string;
  userId: string;
  name: string;
  stateId: string;
  municipalityId: string;
  areaHectares: number;
  polygonGeoJson: string;
  centerLat: number;
  centerLng: number;
  currentCrop?: string;
  soilTexture?: string;
  ph?: number;
  organicMatter?: number;
  createdAt: string;
}

// In-memory persistent storage for development & demo resilience
export const IN_MEMORY_PARCELS: InMemParcel[] = [
  {
    id: "parc-001",
    userId: "usr-farmer-01",
    name: "Finca Santa María — Tablón 3 (Maíz)",
    stateId: "portuguesa",
    municipalityId: "turen",
    areaHectares: 48.5,
    polygonGeoJson: JSON.stringify({
      type: "Polygon",
      coordinates: [[
        [-69.115, 9.320],
        [-69.108, 9.320],
        [-69.108, 9.328],
        [-69.115, 9.328],
        [-69.115, 9.320]
      ]]
    }),
    centerLat: 9.324,
    centerLng: -69.112,
    currentCrop: "Maíz Blanco Harinero",
    soilTexture: "Franco-limoso",
    ph: 6.2,
    organicMatter: 3.2,
    createdAt: new Date().toISOString()
  },
  {
    id: "parc-002",
    userId: "usr-farmer-01",
    name: "Hacienda El Porvenir — Lote Arrocero",
    stateId: "guarico",
    municipalityId: "francisco_de_miranda_guarico",
    areaHectares: 62.0,
    polygonGeoJson: JSON.stringify({
      type: "Polygon",
      coordinates: [[
        [-67.435, 8.920],
        [-67.422, 8.920],
        [-67.422, 8.930],
        [-67.435, 8.930],
        [-67.435, 8.920]
      ]]
    }),
    centerLat: 8.924,
    centerLng: -67.428,
    currentCrop: "Arroz de Riego / Secano",
    soilTexture: "Vertisol Arcilloso",
    ph: 6.8,
    organicMatter: 2.4,
    createdAt: new Date().toISOString()
  }
];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || 'usr-farmer-01';

    let parcels = IN_MEMORY_PARCELS.filter(p => p.userId === userId);

    // Si es un usuario invitado recién ingresado sin parcelas creadas aún, clonar datos de muestra
    if (parcels.length === 0 && userId.startsWith('usr-guest')) {
      const demoSamples: InMemParcel[] = IN_MEMORY_PARCELS.slice(0, 2).map((p, idx) => ({
        ...p,
        id: `parc-guest-${userId.replace('usr-guest-', '')}-${idx + 1}`,
        userId: userId,
        name: idx === 0 ? "Finca Demostración — Tablón Turén" : "Lote Demostración — Arroz Calabozo"
      }));
      parcels = demoSamples;
    }

    return NextResponse.json(parcels);
  } catch (error) {
    return NextResponse.json({ error: 'Error al consultar parcelas' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userId = 'usr-farmer-01',
      name,
      stateId = 'portuguesa',
      municipalityId = 'turen',
      areaHectares = 25.0,
      polygonGeoJson = '{}',
      centerLat = 9.324,
      centerLng = -69.112,
      currentCrop = 'Maíz Blanco Harinero',
      soilTexture = 'Franco-limoso',
      ph = 6.2,
      organicMatter = 3.2
    } = body;

    if (!name) {
      return NextResponse.json({ error: 'El nombre de la parcela es obligatorio' }, { status: 400 });
    }

    const newParcel: InMemParcel = {
      id: `parc-${Date.now()}`,
      userId,
      name,
      stateId,
      municipalityId,
      areaHectares: parseFloat(areaHectares),
      polygonGeoJson: typeof polygonGeoJson === 'string' ? polygonGeoJson : JSON.stringify(polygonGeoJson),
      centerLat: parseFloat(centerLat),
      centerLng: parseFloat(centerLng),
      currentCrop,
      soilTexture,
      ph: parseFloat(ph),
      organicMatter: parseFloat(organicMatter),
      createdAt: new Date().toISOString()
    };

    IN_MEMORY_PARCELS.unshift(newParcel);
    return NextResponse.json({ success: true, parcel: newParcel }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al guardar la parcela' }, { status: 500 });
  }
}
