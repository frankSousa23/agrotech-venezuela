import { NextResponse } from 'next/server';
import { evaluatePointSoil } from '@/lib/soil-module/spatialSoilIndex';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400'
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS
  });
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const latParam = searchParams.get('lat') || searchParams.get('latitude');
    const lonParam = searchParams.get('lon') || searchParams.get('lng') || searchParams.get('longitude');

    if (!latParam || !lonParam) {
      return NextResponse.json(
        {
          error: 'Parámetros requeridos faltantes. Debe proporcionar latitud (lat) y longitud (lon).',
          example: '/api/v1/soil/point?lat=9.324&lon=-69.112'
        },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const lat = parseFloat(latParam);
    const lon = parseFloat(lonParam);

    if (isNaN(lat) || isNaN(lon)) {
      return NextResponse.json(
        { error: 'Coordenadas geográficas inválidas. Deben ser números flotantes WGS84.' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // Validación de límites geográficos generales para Venezuela (-74° a -59° Lon, 0° a 13° Lat)
    const isWithinVenezuela = lat >= 0.0 && lat <= 13.5 && lon >= -74.5 && lon <= -59.0;

    const evaluation = evaluatePointSoil(lat, lon);

    return NextResponse.json(
      {
        success: true,
        source: 'Agrotech Venezuela — Módulo de Suelos MapBiomas',
        timestamp: new Date().toISOString(),
        isWithinTerritorialBounds: isWithinVenezuela,
        data: evaluation
      },
      {
        status: 200,
        headers: {
          ...CORS_HEADERS,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error interno al evaluar perfil edafológico', message: error?.message },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
