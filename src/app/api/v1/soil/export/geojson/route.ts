import { NextResponse } from 'next/server';
import { CALIBRATED_SOIL_RECORDS } from '@/lib/soil-module/spatialSoilIndex';
import { REGIONAL_SOIL_HYDRAULICS } from '@/lib/agronomy/pedotransferEngine';
import { calculateRegionalLimingNeed } from '@/lib/geo/spatialUtils';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
};

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS
  });
}

export function buildSoilGeoJsonFeatureCollection() {
  const features = CALIBRATED_SOIL_RECORDS.map(soil => {
    const hyd = REGIONAL_SOIL_HYDRAULICS[soil.normalizedTexture];
    const liming = calculateRegionalLimingNeed(
      soil.ph,
      soil.organicMatter,
      soil.state,
      1.0,
      { exchangeableAlMe: soil.exchangeableAlMe }
    );

    return {
      type: 'Feature' as const,
      id: soil.id,
      geometry: {
        type: 'Point' as const,
        coordinates: [soil.longitude, soil.latitude] // [lng, lat] según RFC 7946
      },
      properties: {
        id: soil.id,
        name: soil.name,
        state: soil.state,
        taxonomyOrder: soil.taxonomyOrder,
        texture: soil.texture,
        normalizedTexture: soil.normalizedTexture,
        ph: soil.ph,
        organicMatterPct: soil.organicMatter,
        exchangeableAlMe: soil.exchangeableAlMe ?? 0.0,
        nitrogenKgHa: soil.nitrogenKgHa ?? 0,
        phosphorusPpm: soil.phosphorusPpm ?? 0,
        potassiumPpm: soil.potassiumPpm ?? 0,
        fieldCapacityTheta: hyd.fieldCapacityTheta,
        wiltingPointTheta: hyd.wiltingPointTheta,
        criticalMoistureTheta: hyd.criticalMoistureTheta,
        saturationTheta: hyd.saturationTheta,
        bulkDensityGcm3: hyd.bulkDensityGcm3,
        needsLiming: liming.needsLiming,
        limeTonsPerHa: liming.limeTonsPerHa,
        limeType: liming.limeType,
        gypsumTonsPerHa: liming.gypsumTonsPerHa,
        pedologicalZone: liming.pedologicalZone,
        mapbiomasMetadata: {
          project: 'Agrotech Venezuela — Módulo de Suelos MapBiomas',
          collection: 'Colección 3.0 (1985–2024)',
          license: 'MIT / CC BY 4.0'
        }
      }
    };
  });

  return {
    type: 'FeatureCollection' as const,
    metadata: {
      generatedAt: new Date().toISOString(),
      totalFeatures: features.length,
      spatialReference: 'EPSG:4326 (WGS84)',
      title: 'Módulo de Suelos de MapBiomas Venezuela — Catálogo Edafológico Georreferenciado',
      attribution: 'Agrotech Venezuela (Frank Sousa) — Red MapBiomas Venezuela'
    },
    features
  };
}

export async function GET() {
  try {
    const geoJson = buildSoilGeoJsonFeatureCollection();
    const dateStr = new Date().toISOString().split('T')[0];

    return new Response(JSON.stringify(geoJson, null, 2), {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/geo+json; charset=utf-8',
        'Content-Disposition': `attachment; filename="agrotech_mapbiomas_suelos_${dateStr}.geojson"`
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Error al exportar datos GeoJSON de suelos', message: error?.message },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
