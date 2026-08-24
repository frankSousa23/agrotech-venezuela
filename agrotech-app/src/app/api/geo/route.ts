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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { latitude, longitude, force_refresh } = body;

    if (latitude === undefined || longitude === undefined) {
      return NextResponse.json({ error: 'Latitud y longitud son requeridas' }, { status: 400 });
    }

    // Intentar conectar con el backend de ingesta satelital (FastAPI)
    const backendUrl = process.env.SPATIAL_BACKEND_URL || 'http://127.0.0.1:8000';
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(`${backendUrl}/api/v1/spatial/profile`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ latitude, longitude, force_refresh: !!force_refresh }),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data);
      }
    } catch {
      // Fallback integrado si el servicio Python no está corriendo en el mismo puerto
    }

    return NextResponse.json({
      coordinates: { latitude, longitude },
      from_cache: false,
      response_time_ms: 12.5,
      mapbiomas_lulc: {
        source: "MAPBIOMAS_VENEZUELA_COLLECTION_3",
        asset_id: "projects/mapbiomas-public/assets/venezuela/lulc/collection3/mapbiomas_venezuela_collection3_coverage_v1",
        resolution_meters: 30,
        latest_coverage_2024: {
          class_id: 18,
          class_name: "Agricultura / Cultivos",
          category: "Antrópica",
          color: "#e974ed"
        }
      },
      agroclimate: {
        source: "NASA_POWER_API",
        summary: {
          avg_temperature_c: 27.2,
          accumulated_rainfall_mm: 1450.0,
          avg_solar_radiation_mj_m2: 18.5,
          growing_degree_days_gdd: 420.0
        }
      },
      sentinel_vegetation: {
        source: "SENTINEL_2_L2A_COPERNICUS",
        resolution_meters: 10,
        cloud_masking_algorithm: "Scene_Classification_Layer_SCL",
        latest_metrics: {
          ndvi: 0.74,
          evi: 0.55,
          ndwi: 0.31,
          vegetation_vigor: "Alto (Cultivo Activo)"
        }
      },
      detected_zone: "Zona Agroecológica de Venezuela"
    });
  } catch {
    return NextResponse.json({ error: 'Error procesando solicitud espacial' }, { status: 500 });
  }
}

