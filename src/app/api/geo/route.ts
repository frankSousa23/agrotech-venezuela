import { NextResponse } from 'next/server';
import { VENEZUELA_STATES_DATA, SAMPLE_SOIL_POINTS, MAPBIOMAS_CLASSES, SOIL_PH_RANGES } from '@/lib/geo/venezuelaData';
import { VENEZUELA_GEOJSON } from '@/lib/geo/venezuelaGeoJson';
import { fetchNasaAgroClimate } from '@/lib/geo/nasaPowerService';
import { buildUnifiedTerritorialVector } from '@/lib/geo/mapbiomasTrajectory';
import { detectStateFromCoords, evaluateCropSuitability, calculateSoilAmendments } from '@/lib/geo/spatialUtils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  const stateId = searchParams.get('state');
  const latStr = searchParams.get('lat');
  const lngStr = searchParams.get('lng');

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
    if (stateId) {
      const filtered = SAMPLE_SOIL_POINTS.filter(p => p.stateId.toLowerCase() === stateId.toLowerCase());
      return NextResponse.json(filtered);
    }
    return NextResponse.json(SAMPLE_SOIL_POINTS);
  }

  if (type === 'metadata') {
    return NextResponse.json({
      classes: MAPBIOMAS_CLASSES,
      mapbiomasClasses: MAPBIOMAS_CLASSES,
      phRanges: SOIL_PH_RANGES,
      totalStates: VENEZUELA_STATES_DATA.length,
      samplePointsCount: SAMPLE_SOIL_POINTS.length,
      mapbiomasCollection: 'Colección 3 (1985-2024)',
      mapbiomasAguaCollection: 'Colección 2 (2000-2024)',
      agroclimateSource: 'NASA POWER Agroclimatology API',
    });
  }

  // Si se solicita vector territorial por query params
  if (latStr && lngStr) {
    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);
    if (!isNaN(lat) && !isNaN(lng)) {
      const detectedState = detectStateFromCoords(lat, lng);
      const vector = buildUnifiedTerritorialVector(lat, lng, detectedState.name);
      const agroclimate = await fetchNasaAgroClimate(lat, lng);
      return NextResponse.json({
        ...vector,
        nasaAgroclimateLive: agroclimate,
      });
    }
  }

  return NextResponse.json({
    states: VENEZUELA_STATES_DATA,
    samplePoints: SAMPLE_SOIL_POINTS,
    classes: MAPBIOMAS_CLASSES,
    phRanges: SOIL_PH_RANGES
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { latitude, longitude, areaHectares = 10, ph = 6.2, organicMatter = 2.4, texture = 'Franco', cropTarget = 'Maíz Blanco' } = body;

    if (latitude === undefined || longitude === undefined) {
      return NextResponse.json({ error: 'Latitud y longitud son requeridas' }, { status: 400 });
    }

    const lat = Number(latitude);
    const lng = Number(longitude);

    const detectedState = detectStateFromCoords(lat, lng);
    const territorialVector = buildUnifiedTerritorialVector(lat, lng, detectedState.name, { ph, organicMatter, texture });
    const nasaClimate = await fetchNasaAgroClimate(lat, lng);

    const suitability = evaluateCropSuitability(
      ph,
      organicMatter,
      texture,
      nasaClimate.annualPrecipitationMm,
      {
        lat,
        lng,
        anthropicYears: territorialVector.mapbiomasTrajectory.yearsInAnthropicUse,
        isSouthOfOrinoco: territorialVector.orinocoShield.shieldActive,
        waterPersistence: territorialVector.mapbiomasAgua.waterPersistenceScore,
      }
    );

    const amendments = calculateSoilAmendments(
      ph,
      organicMatter,
      areaHectares,
      cropTarget,
      territorialVector.mapbiomasTrajectory.yearsInAnthropicUse
    );

    return NextResponse.json({
      coordinates: { latitude: lat, longitude: lng },
      state: detectedState,
      territorialVector,
      nasaClimate,
      suitability,
      amendments,
      mapbiomas_lulc: {
        source: 'MAPBIOMAS_VENEZUELA_COLLECTION_3',
        resolution_meters: 30,
        historical_years_tracked: 40,
        trajectory_type: territorialVector.mapbiomasTrajectory.trajectoryType,
        anthropic_years: territorialVector.mapbiomasTrajectory.yearsInAnthropicUse,
        carbon_loss_risk: territorialVector.mapbiomasTrajectory.carbonLossRisk,
      },
      mapbiomas_agua: {
        source: 'MAPBIOMAS_AGUA_COLLECTION_2',
        persistence_score: territorialVector.mapbiomasAgua.waterPersistenceScore,
        regime: territorialVector.mapbiomasAgua.hydrologicalRegime,
      },
      orinoco_shield: territorialVector.orinocoShield,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Error in /api/geo POST:', err);
    return NextResponse.json({ error: 'Error procesando solicitud espacial' }, { status: 500 });
  }
}
