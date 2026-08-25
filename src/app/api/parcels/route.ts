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
    const parcels = IN_MEMORY_PARCELS.filter(p => p.userId === userId);
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
