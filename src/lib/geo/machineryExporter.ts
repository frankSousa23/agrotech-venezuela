/**
 * Exportador Universal de Prescripciones de Precisión y Calibración de Maquinaria Agrícola
 * Genera paquetes descargables para:
 * 1. Computadoras de Cabina con GPS (John Deere GreenStar, Case IH AFS, Trimble) en formato Shapefile VRA.
 * 2. Misiones de Vuelo para Drones de Pulverización (DJI Agras T40/T50, XAG) en GeoJSON / KML.
 * 3. Hoja de Ruta de Cabina Analógica en 1 Página para tractores tradicionales sin GPS.
 */

export interface MachineryPrescriptionInput {
  parcelId: string;
  parcelName: string;
  areaHectares: number;
  coordinates: number[][]; // [[lat, lng], ...]
  targetCrop: string;
  limeTonHa?: number;
  gypsumTonHa?: number;
  npkKgHa?: number;
  nitrogenKgHa?: number;
  phosphorusKgHa?: number;
  potassiumKgHa?: number;
  fertilizerFormula?: string;
  stateName?: string;
}

export interface VraShapefileDescriptor {
  fileName: string;
  projectionPrj: string;
  attributes: {
    LOTE_ID: string;
    AREA_HA: number;
    RATE_LIME: number;
    RATE_GYPS: number;
    RATE_NPK: number;
    CROP_NAME: string;
    UTM_ZONE: string;
  };
  geoJsonFeature: {
    type: 'Feature';
    geometry: {
      type: 'Polygon';
      coordinates: number[][][]; // [lng, lat]
    };
    properties: Record<string, any>;
  };
}

export interface DroneFlightMission {
  fileName: string;
  kmlContent: string;
  geoJsonPayload: any;
  flightParameters: {
    recommendedAltitudeMeters: number;
    recommendedSpeedKmH: number;
    sprayRateLitersHa: number;
    safetyBufferMeters: number;
  };
}

export interface AnalogCabinCalibrationSheet {
  parcelName: string;
  areaHectares: number;
  cropName: string;
  spreaderCalibration: {
    targetSpeedKmH: number;
    tractorGear: string;
    ptoRpm: number;
    gateLevelOpening: string;
    swathWidthMeters: number;
    passesRecommended: string;
  };
  htmlCard: string;
}

// Proyección PRJ estándar WGS 84 / UTM Zone 19N para Venezuela
export const VENEZUELA_UTM19N_PRJ = 
  'PROJCS["WGS_1984_UTM_Zone_19N",GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Transverse_Mercator"],PARAMETER["False_Easting",500000.0],PARAMETER["False_Northing",0.0],PARAMETER["Central_Meridian",-69.0],PARAMETER["Scale_Factor",0.9996],PARAMETER["Latitude_Of_Origin",0.0],UNIT["Meter",1.0]]';

/**
 * 1. Genera la prescripción VRA compatible con consolas de GPS de tractores
 */
export function generateVraPrescription(input: MachineryPrescriptionInput): VraShapefileDescriptor {
  const coordinatesLngLat = input.coordinates.map(([lat, lng]) => [lng, lat]);
  // Asegurar polígono cerrado
  if (coordinatesLngLat.length > 0 && 
      (coordinatesLngLat[0][0] !== coordinatesLngLat[coordinatesLngLat.length - 1][0] ||
       coordinatesLngLat[0][1] !== coordinatesLngLat[coordinatesLngLat.length - 1][1])) {
    coordinatesLngLat.push(coordinatesLngLat[0]);
  }

  const attributes = {
    LOTE_ID: input.parcelName.slice(0, 10).toUpperCase().replace(/\s+/g, '_'),
    AREA_HA: Math.round(input.areaHectares * 100) / 100,
    RATE_LIME: input.limeTonHa || 0,
    RATE_GYPS: input.gypsumTonHa || 0,
    RATE_NPK: input.npkKgHa || 0,
    CROP_NAME: input.targetCrop.slice(0, 10).toUpperCase(),
    UTM_ZONE: '19N',
  };

  const feature: VraShapefileDescriptor['geoJsonFeature'] = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [coordinatesLngLat],
    },
    properties: attributes,
  };

  return {
    fileName: `VRA_${attributes.LOTE_ID}.shp`,
    projectionPrj: VENEZUELA_UTM19N_PRJ,
    attributes,
    geoJsonFeature: feature,
  };
}

/**
 * 2. Genera la misión de vuelo autónomo para Drones de Pulverización Agrícola
 */
export function generateDroneMission(input: MachineryPrescriptionInput): DroneFlightMission {
  const coordinatesLngLat = input.coordinates.map(([lat, lng]) => [lng, lat]);
  const coordsKml = coordinatesLngLat.map(([lng, lat]) => `${lng},${lat},0`).join(' ');

  const kml = `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Misión Dron - ${input.parcelName}</name>
    <description>Misión de pulverización agrícola generada por Agrotech Venezuela</description>
    <Style id="droneBoundary">
      <LineStyle><color>ff00ffff</color><width>3</width></LineStyle>
      <PolyStyle><color>4d00ff00</color></PolyStyle>
    </Style>
    <Placemark>
      <name>${input.parcelName} (${input.areaHectares} ha)</name>
      <styleUrl>#droneBoundary</styleUrl>
      <Polygon>
        <outerBoundaryIs>
          <LinearRing>
            <coordinates>${coordsKml}</coordinates>
          </LinearRing>
        </outerBoundaryIs>
      </Polygon>
    </Placemark>
  </Document>
</kml>`;

  return {
    fileName: `DRONE_${input.parcelName.replace(/\s+/g, '_')}.kml`,
    kmlContent: kml,
    geoJsonPayload: {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [coordinatesLngLat],
        },
        properties: {
          name: input.parcelName,
          crop: input.targetCrop,
          sprayVolumeLHa: 15.0, // Típico en ultra bajo volumen con dron
        }
      }]
    },
    flightParameters: {
      recommendedAltitudeMeters: 3.5,
      recommendedSpeedKmH: 18.0,
      sprayRateLitersHa: 15.0,
      safetyBufferMeters: 5.0,
    }
  };
}

/**
 * 3. Genera la Ficha de Calibración de Cabina en 1 página para tractoristas analógicos
 */
export function generateCabinCalibrationSheet(input: MachineryPrescriptionInput): AnalogCabinCalibrationSheet {
  const rateLime = input.limeTonHa || 0;
  const rateGyps = input.gypsumTonHa || 0;
  const rateTotalEnmienda = rateLime > 0 ? rateLime : rateGyps;
  const enmiendaName = rateLime > 0 ? 'Cal Dolomítica' : (rateGyps > 0 ? 'Yeso Agrícola' : 'Sin enmienda');

  // Calibración mecánica de trompo / encaladora centrífuga estándar
  const spreader = {
    targetSpeedKmH: 8.0,
    tractorGear: '2da Rápida o 3ra Baja (según caja de cambios)',
    ptoRpm: 1750,
    gateLevelOpening: rateTotalEnmienda >= 2.0 ? 'Nivel 5.0 (Compuerta abierta al 65%)' : 'Nivel 3.5 (Compuerta al 40%)',
    swathWidthMeters: 12.0,
    passesRecommended: '2 pases cruzados a 45° para traslape uniforme de abanico',
  };

  const htmlCard = `
<div style="font-family: Arial, sans-serif; max-width: 600px; padding: 16px; border: 2px solid #0f172a; border-radius: 8px; background: #fff; color: #0f172a;">
  <div style="border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
    <div>
      <h2 style="margin: 0; font-size: 1.2rem; color: #0284c7;">🚜 FICHA DE CABINA: CALIBRACIÓN DE TRACTOR</h2>
      <span style="font-size: 0.8rem; color: #64748b;">Agrotech Venezuela • Guía Práctica de Campo</span>
    </div>
    <span style="background: #e0f2fe; color: #0369a1; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: bold;">LOTE: ${input.parcelName.toUpperCase()}</span>
  </div>

  <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; margin-bottom: 12px;">
    <tr>
      <td style="padding: 4px; font-weight: bold; width: 40%;">Superficie del Lote:</td>
      <td style="padding: 4px;">${input.areaHectares} hectáreas</td>
    </tr>
    <tr>
      <td style="padding: 4px; font-weight: bold;">Cultivo Objetivo:</td>
      <td style="padding: 4px;">${input.targetCrop}</td>
    </tr>
    <tr>
      <td style="padding: 4px; font-weight: bold;">Enmienda Prescrita:</td>
      <td style="padding: 4px; color: #059669; font-weight: bold;">${enmiendaName} (${rateTotalEnmienda} Ton/ha)</td>
    </tr>
    <tr>
      <td style="padding: 4px; font-weight: bold;">Fertilización Base NPK:</td>
      <td style="padding: 4px;">${input.fertilizerFormula || '12-24-12'} (${input.npkKgHa || 200} kg/ha)</td>
    </tr>
  </table>

  <div style="background: #f8fafc; border: 1px dashed #94a3b8; border-radius: 6px; padding: 10px; margin-bottom: 12px;">
    <h3 style="margin: 0 0 6px 0; font-size: 0.9rem; color: #0f172a;">⚙️ AJUSTES EN EL TRACTOR Y ABONADORA:</h3>
    <ul style="margin: 0; padding-left: 20px; font-size: 0.82rem; line-height: 1.4;">
      <li><strong>Velocidad del Tractor:</strong> ${spreader.targetSpeedKmH} km/h (Marcha sugerida: ${spreader.tractorGear}).</li>
      <li><strong>Revoluciones de Motor (Toma de Fuerza):</strong> ${spreader.ptoRpm} RPM constante.</li>
      <li><strong>Apertura de Tolva:</strong> ${spreader.gateLevelOpening}.</li>
      <li><strong>Ancho de Voleo / Abanico:</strong> ${spreader.swathWidthMeters} metros entre pasadas.</li>
      <li><strong>Recomendación de Aplicación:</strong> ${spreader.passesRecommended}.</li>
    </ul>
  </div>

  <div style="font-size: 0.75rem; color: #64748b; text-align: center;">
    Coloque esta ficha en el parabrisas del tractor. Diseñado para aplicación precisa sin monitor GPS satelital.
  </div>
</div>`;

  return {
    parcelName: input.parcelName,
    areaHectares: input.areaHectares,
    cropName: input.targetCrop,
    spreaderCalibration: spreader,
    htmlCard,
  };
}
