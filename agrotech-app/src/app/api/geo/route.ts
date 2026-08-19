import { NextResponse } from 'next/server';
import { VENEZUELA_STATES_DATA, SAMPLE_SOIL_POINTS, MAPBIOMAS_CLASSES, SOIL_PH_RANGES } from '@/lib/geo/venezuelaData';
import { VENEZUELA_GEOJSON } from '@/lib/geo/venezuelaGeoJson';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const stateId = searchParams.get('state');

  if (type === 'geojson') {
    if (stateId) {
      const stateFeature = VENEZUELA_GEOJSON.features.find(f => f.properties.id === stateId);
      if (!stateFeature) {
        return NextResponse.json({ error: 'Estado no encontrado' }, { status: 404 });
      }
      return NextResponse.json({
        type: 'FeatureCollection',
        features: [stateFeature]
      });
    }
    return NextResponse.json(VENEZUELA_GEOJSON);
  }

  if (type === 'points') {
    return NextResponse.json(SAMPLE_SOIL_POINTS);
  }

  if (type === 'metadata') {
    return NextResponse.json({
      classes: MAPBIOMAS_CLASSES,
      phRanges: SOIL_PH_RANGES,
      totalStates: VENEZUELA_STATES_DATA.length,
      samplePointsCount: SAMPLE_SOIL_POINTS.length
    });
  }

  return NextResponse.json({
    states: VENEZUELA_STATES_DATA,
    samplePoints: SAMPLE_SOIL_POINTS,
    classes: MAPBIOMAS_CLASSES,
    phRanges: SOIL_PH_RANGES
  });
}
