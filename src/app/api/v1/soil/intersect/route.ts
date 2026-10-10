import { NextResponse } from 'next/server';
import { evaluateSoilPolygonIntersection } from '@/lib/soil-module/spatialSoilIndex';
import { calculatePolygonAreaHa, calculatePolygonPerimeterMeters } from '@/lib/geo/spatialUtils';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400'
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body) {
      return NextResponse.json(
        { error: 'Cuerpo de petición requerido. Debe enviar una geometría o Feature GeoJSON.' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // Extraer coordenadas del polígono en formato GeoJSON [ [ [lng, lat], ... ] ]
    let polygonCoordinates: number[][][] | null = null;

    if (body.type === 'FeatureCollection' && Array.isArray(body.features) && body.features.length > 0) {
      const feat = body.features[0];
      if (feat.geometry?.type === 'Polygon') {
        polygonCoordinates = feat.geometry.coordinates;
      }
    } else if (body.type === 'Feature' && body.geometry?.type === 'Polygon') {
      polygonCoordinates = body.geometry.coordinates;
    } else if (body.type === 'Polygon' && Array.isArray(body.coordinates)) {
      polygonCoordinates = body.coordinates;
    } else if (Array.isArray(body.coordinates) && Array.isArray(body.coordinates[0])) {
      polygonCoordinates = body.coordinates;
    }

    if (!polygonCoordinates || polygonCoordinates.length === 0 || !Array.isArray(polygonCoordinates[0])) {
      return NextResponse.json(
        {
          error: 'Geometría poligonal inválida. Se requiere GeoJSON Polygon con coordenadas [[[lng, lat], ...]].'
        },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // Convertir de GeoJSON [lng, lat] a [lat, lng] para cálculo esferoidal Shoelace
    const outerRing = polygonCoordinates[0];
    const latLngCoords: [number, number][] = outerRing.map(pt => [pt[1], pt[0]]);

    // Calcular área esferoidal y perímetro WGS84
    const calculatedArea = calculatePolygonAreaHa(latLngCoords);
    const areaHectares = (typeof body.areaHectares === 'number' && body.areaHectares > 0)
      ? body.areaHectares
      : (calculatedArea > 0 ? calculatedArea : 50.0);

    const calculatedPerimeter = calculatePolygonPerimeterMeters(latLngCoords);
    const perimeterMeters = (typeof body.perimeterMeters === 'number' && body.perimeterMeters > 0)
      ? body.perimeterMeters
      : calculatedPerimeter;

    const intersectionResult = evaluateSoilPolygonIntersection(
      polygonCoordinates,
      areaHectares,
      perimeterMeters
    );

    return NextResponse.json(
      {
        success: true,
        source: 'Agrotech Venezuela — Módulo de Suelos MapBiomas',
        timestamp: new Date().toISOString(),
        data: intersectionResult
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
      { error: 'Error al procesar intersección poligonal edafológica', message: error?.message },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
