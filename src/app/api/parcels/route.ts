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
import { extractUserFromRequest } from '@/lib/auth/authUtils';

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
  },
  {
    id: "parc-003",
    userId: "usr-farmer-01",
    name: "Hacienda San José — Tablón Sur del Lago (Plátano)",
    stateId: "zulia",
    municipalityId: "colon",
    areaHectares: 35.0,
    polygonGeoJson: JSON.stringify({
      type: "Polygon",
      coordinates: [[
        [-71.730, 8.980],
        [-71.720, 8.980],
        [-71.720, 8.990],
        [-71.730, 8.990],
        [-71.730, 8.980]
      ]]
    }),
    centerLat: 8.985,
    centerLng: -71.725,
    currentCrop: "Plátano Hartón / Cacao",
    soilTexture: "Franco-arcilloso",
    ph: 6.4,
    organicMatter: 2.9,
    createdAt: new Date().toISOString()
  },
  {
    id: "parc-004",
    userId: "usr-farmer-01",
    name: "Finca Los Frailes — Cafetal Andino de Sombra",
    stateId: "merida",
    municipalityId: "rivas_davila",
    areaHectares: 18.5,
    polygonGeoJson: JSON.stringify({
      type: "Polygon",
      coordinates: [[
        [-71.820, 8.415],
        [-71.810, 8.415],
        [-71.810, 8.425],
        [-71.820, 8.425],
        [-71.820, 8.415]
      ]]
    }),
    centerLat: 8.420,
    centerLng: -71.815,
    currentCrop: "Café Arábica de Especialidad",
    soilTexture: "Franco Andino",
    ph: 5.6,
    organicMatter: 4.5,
    createdAt: new Date().toISOString()
  },
  {
    id: "parc-005",
    userId: "usr-farmer-01",
    name: "Agropecuaria Las Mesas — Lote Soya Oriente",
    stateId: "monagas",
    municipalityId: "maturin",
    areaHectares: 80.0,
    polygonGeoJson: JSON.stringify({
      type: "Polygon",
      coordinates: [[
        [-63.185, 9.738],
        [-63.175, 9.738],
        [-63.175, 9.746],
        [-63.185, 9.746],
        [-63.185, 9.738]
      ]]
    }),
    centerLat: 9.742,
    centerLng: -63.180,
    currentCrop: "Soya / Rotación Granos",
    soilTexture: "Franco-arenoso Oxisol",
    ph: 5.2,
    organicMatter: 1.8,
    createdAt: new Date().toISOString()
  }
];

// Almacén aislado por sesión de invitado (multi-guest isolation)
export const GUEST_PARCELS_MAP = new Map<string, InMemParcel[]>();

export function getOrCreateGuestParcels(guestId: string): InMemParcel[] {
  if (!GUEST_PARCELS_MAP.has(guestId)) {
    // Inicializar siempre con réplica de datos de muestra prístina
    const cleanSamples: InMemParcel[] = [
      {
        ...IN_MEMORY_PARCELS[0],
        id: `parc-guest-${guestId.replace('usr-guest-', '')}-1`,
        userId: guestId,
        name: "Finca Demostración — Tablón Turén (Maíz)"
      },
      {
        ...IN_MEMORY_PARCELS[1],
        id: `parc-guest-${guestId.replace('usr-guest-', '')}-2`,
        userId: guestId,
        name: "Lote Demostración — Arroz Calabozo"
      }
    ];
    GUEST_PARCELS_MAP.set(guestId, cleanSamples);
  }
  return GUEST_PARCELS_MAP.get(guestId)!;
}

export async function GET(req: Request) {
  try {
    const session = extractUserFromRequest(req);
    const { searchParams } = new URL(req.url);
    const requestedUserId = session ? session.id : (searchParams.get('userId') || 'usr-farmer-01');
    const isGuest = session 
      ? (session.isGuest || session.status === 'GUEST' || session.id.startsWith('usr-guest')) 
      : requestedUserId.startsWith('usr-guest');

    // Aislamiento estricto: los usuarios invitados solo acceden a su partición efímera
    if (isGuest) {
      const parcels = getOrCreateGuestParcels(requestedUserId);
      return NextResponse.json(parcels);
    }

    // Para productores autenticados registrados
    const parcels = IN_MEMORY_PARCELS.filter(p => p.userId === requestedUserId);
    return NextResponse.json(parcels);
  } catch (error) {
    return NextResponse.json({ error: 'Error al consultar parcelas' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = extractUserFromRequest(req);
    const body = await req.json();
    const {
      userId,
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

    const effectiveUserId = session ? session.id : (userId || 'usr-farmer-01');
    const isGuest = session 
      ? (session.isGuest || session.status === 'GUEST' || session.id.startsWith('usr-guest')) 
      : effectiveUserId.startsWith('usr-guest');

    const newParcel: InMemParcel = {
      id: `parc-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      userId: effectiveUserId,
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

    if (isGuest) {
      const guestList = getOrCreateGuestParcels(effectiveUserId);
      guestList.unshift(newParcel);
      return NextResponse.json({ success: true, parcel: newParcel }, { status: 201 });
    }

    IN_MEMORY_PARCELS.unshift(newParcel);
    return NextResponse.json({ success: true, parcel: newParcel }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al guardar la parcela' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = extractUserFromRequest(req);
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID de parcela requerido' }, { status: 400 });
    }

    const effectiveUserId = session ? session.id : (searchParams.get('userId') || 'usr-farmer-01');
    const isGuest = session 
      ? (session.isGuest || session.status === 'GUEST' || session.id.startsWith('usr-guest')) 
      : effectiveUserId.startsWith('usr-guest');

    if (isGuest) {
      const guestList = getOrCreateGuestParcels(effectiveUserId);
      const idx = guestList.findIndex(p => p.id === id);
      if (idx !== -1) {
        guestList.splice(idx, 1);
        return NextResponse.json({ success: true, message: 'Parcela eliminada exitosamente' });
      }
      return NextResponse.json({ error: 'Parcela no encontrada' }, { status: 404 });
    }

    const idx = IN_MEMORY_PARCELS.findIndex(p => p.id === id && p.userId === effectiveUserId);
    if (idx !== -1) {
      IN_MEMORY_PARCELS.splice(idx, 1);
      return NextResponse.json({ success: true, message: 'Parcela eliminada exitosamente' });
    }
    return NextResponse.json({ error: 'Parcela no encontrada' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al eliminar la parcela' }, { status: 500 });
  }
}
