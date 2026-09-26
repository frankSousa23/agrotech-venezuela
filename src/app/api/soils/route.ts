import { NextResponse } from 'next/server';
import { extractUserFromRequest } from '@/lib/auth/authUtils';

export interface SoilRecord {
  id: string;
  name: string;
  description: string;
  state: string;
  region: { name: string };
  latitude: number;
  longitude: number;
  ph: number;
  organicMatter: number;
  texture: string;
  nitrogen?: string;
  phosphorus?: string;
  potassium?: string;
  createdAt: string;
}

// In-memory dataset representing diverse Venezuelan agricultural soils
export const IN_MEMORY_SOILS: SoilRecord[] = [
  {
    id: 'soil-001',
    name: 'Suelo Aluvial Llanero de Turén',
    description: 'Suelo de alta fertilidad natural, plano, textura franco-limosa con excelente capacidad de intercambio catiónico (CIC).',
    state: 'portuguesa',
    region: { name: 'Portuguesa' },
    latitude: 9.324,
    longitude: -69.112,
    ph: 6.2,
    organicMatter: 3.2,
    texture: 'Franco-limoso',
    nitrogen: 'Medio-Alto (45 kg/ha)',
    phosphorus: 'Medio (18 ppm)',
    potassium: 'Alto (220 ppm)',
    createdAt: '2026-01-10T12:00:00.000Z'
  },
  {
    id: 'soil-002',
    name: 'Vertisol Bajo Riego de Calabozo',
    description: 'Suelos arcillosos pesados con alta retención de agua, ideales para cultivo de arroz inundado en el Sistema del Río Guárico.',
    state: 'guarico',
    region: { name: 'Guárico' },
    latitude: 8.924,
    longitude: -67.428,
    ph: 5.8,
    organicMatter: 2.4,
    texture: 'Arcilloso',
    nitrogen: 'Medio (35 kg/ha)',
    phosphorus: 'Bajo (12 ppm)',
    potassium: 'Medio (160 ppm)',
    createdAt: '2026-01-15T10:30:00.000Z'
  },
  {
    id: 'soil-003',
    name: 'Suelo Calizo Salino-Sódico de Quíbor',
    description: 'Suelo semi-árido con pH alcalino y presencia de sales libres. Requiere enmiendas de yeso agrícola y manejo de conductividad.',
    state: 'lara',
    region: { name: 'Lara' },
    latitude: 9.928,
    longitude: -69.620,
    ph: 7.8,
    organicMatter: 1.5,
    texture: 'Franco-arenoso',
    nitrogen: 'Bajo (20 kg/ha)',
    phosphorus: 'Bajo (8 ppm)',
    potassium: 'Muy Alto (310 ppm)',
    createdAt: '2026-02-01T09:15:00.000Z'
  },
  {
    id: 'soil-004',
    name: 'Fluvisol Orgánico Sur del Lago',
    description: 'Suelos aluviales ricos en materia orgánica sedimentaria, óptimos para palma aceitera, plátano y cacao criollo.',
    state: 'zulia',
    region: { name: 'Zulia' },
    latitude: 8.980,
    longitude: -71.910,
    ph: 6.4,
    organicMatter: 4.5,
    texture: 'Franco-arcilloso',
    nitrogen: 'Alto (60 kg/ha)',
    phosphorus: 'Alto (28 ppm)',
    potassium: 'Alto (240 ppm)',
    createdAt: '2026-02-12T14:45:00.000Z'
  },
  {
    id: 'soil-005',
    name: 'Oxisol Ácido de la Mesa de Guanipa',
    description: 'Sabanas orientales bien drenadas de textura arenosa con alta saturación de aluminio intercambiable. Requiere cal dolomítica.',
    state: 'anzoategui',
    region: { name: 'Anzoátegui' },
    latitude: 8.885,
    longitude: -64.165,
    ph: 4.8,
    organicMatter: 1.2,
    texture: 'Arenoso',
    nitrogen: 'Bajo (15 kg/ha)',
    phosphorus: 'Muy Bajo (5 ppm)',
    potassium: 'Bajo (80 ppm)',
    createdAt: '2026-02-20T11:20:00.000Z'
  }
];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('q')?.toLowerCase();
    const phFilter = searchParams.get('phFilter');

    let result = [...IN_MEMORY_SOILS];

    const normalize = (str: string) =>
      str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    if (query) {
      const q = normalize(query);
      result = result.filter(s =>
        normalize(s.name).includes(q) ||
        normalize(s.description).includes(q) ||
        normalize(s.region.name).includes(q) ||
        normalize(s.texture).includes(q)
      );
    }

    if (phFilter) {
      if (phFilter === 'acid') result = result.filter(s => s.ph < 5.5);
      else if (phFilter === 'moderate') result = result.filter(s => s.ph >= 5.5 && s.ph <= 6.5);
      else if (phFilter === 'optimal') result = result.filter(s => s.ph > 6.5);
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Error al consultar perfiles edafológicos' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = extractUserFromRequest(req);
    
    // Only AGRONOMIST or ADMIN are allowed to register persistent soil profiles
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado. Se requiere iniciar sesión.' },
        { status: 401 }
      );
    }

    if (session.role !== 'AGRONOMIST' && session.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Acceso denegado. Se requiere rol de Ingeniero Agrónomo o Administrador.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { state, locationName, latitude, longitude, ph, organicMatter, texture } = body;

    if (!locationName || typeof ph !== 'number' || typeof organicMatter !== 'number') {
      return NextResponse.json(
        { error: 'Campos requeridos incompletos o inválidos (locationName, ph, organicMatter).' },
        { status: 400 }
      );
    }

    const newSoil: SoilRecord = {
      id: `soil-${Date.now()}`,
      name: locationName,
      description: `Muestra edafológica registrada por ${session.name} (${session.role}).`,
      state: state || 'portuguesa',
      region: { name: (state || 'Portuguesa').charAt(0).toUpperCase() + (state || 'portuguesa').slice(1) },
      latitude: Number(latitude) || 9.324,
      longitude: Number(longitude) || -69.112,
      ph: Number(ph),
      organicMatter: Number(organicMatter),
      texture: texture || 'Franco',
      nitrogen: 'En análisis de laboratorio',
      phosphorus: 'En análisis de laboratorio',
      potassium: 'En análisis de laboratorio',
      createdAt: new Date().toISOString()
    };

    IN_MEMORY_SOILS.unshift(newSoil);

    return NextResponse.json(newSoil, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al registrar perfil de suelo' }, { status: 500 });
  }
}
