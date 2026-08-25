/**
 * ============================================================================
 * AGROTECH VENEZUELA — CLIENTE AGROCLIMÁTICO NASA POWER (nasaPowerService.ts)
 * ============================================================================
 * 
 * Proporciona variables meteorológicas y agroclimáticas de alta fidelidad:
 * 1. Radiación Solar en Superficie (ALLSKY_SFC_SW_DWN) en MJ/m²/día.
 * 2. Temperaturas (T2M Promedio, T2M_MAX, T2M_MIN) en °C.
 * 3. Precipitación Total (PRECTOTCORR) acumulada anual y mensual en mm.
 * 4. Humedad Relativa (RH2M) y estacionalidad (meses secos vs lluviosos).
 * 
 * Mecanismo de Resiliencia:
 * - Consulta la API pública de climatología de 30 años de NASA POWER con timeout de 4.5s.
 * - Implementa memoria caché TTL (24 horas) para optimizar consumo y reducir latencias.
 * - Fallback automático a 'estimateVenezuelaAgroClimate': Malla climatológica offline calibrada
 *   para las regiones venezolanas (Llanos, Andes, Zulia, Guayana, Centro-Norte-Costera).
 * 
 * Interacciones:
 * - Usado por: ParcelDiagnosticModal, RecomendacionesPage, evaluateCropSuitability y Gemini AI.
 */

export interface NasaAgroClimaticData {
  annualPrecipitationMm: number;
  avgTemperatureC: number;
  maxTemperatureC: number;
  minTemperatureC: number;
  avgSolarRadiationMjM2Day: number;
  relativeHumidityPercent: number;
  drySeasonMonths: string[];
  wetSeasonMonths: string[];
  source: 'NASA_POWER_API' | 'LOCAL_AGROCLIMATIC_GRID';
  fetchedAt: string;
}

// Caché en memoria para evitar latencias y optimizar cuotas
const agroClimateCache = new Map<string, { data: NasaAgroClimaticData; timestamp: number }>();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 horas

/**
 * Obtiene parámetros agroclimáticos para una coordenada geográfica en Venezuela.
 * Intenta primero la API de NASA POWER y recurre a la malla local calibrada ante cualquier fallo.
 */
export async function fetchNasaAgroClimate(lat: number, lon: number): Promise<NasaAgroClimaticData> {
  const cacheKey = `${lat.toFixed(2)}_${lon.toFixed(2)}`;
  const cached = agroClimateCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  try {
    // NASA POWER Climatology API (promedios climatológicos de 30 años)
    const url = `https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=T2M,T2M_MAX,T2M_MIN,PRECTOTCORR,ALLSKY_SFC_SW_DWN,RH2M&community=AG&longitude=${lon.toFixed(4)}&latitude=${lat.toFixed(4)}&format=JSON`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500); // 4.5s timeout

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const json = await response.json();
      const params = json?.properties?.parameter;

      if (params && params.T2M && params.PRECTOTCORR) {
        const annualTemp = params.T2M.ANN ?? 27.5;
        const annualTempMax = params.T2M_MAX?.ANN ?? 33.2;
        const annualTempMin = params.T2M_MIN?.ANN ?? 22.1;
        const monthlyRain = params.PRECTOTCORR; // mm/day en cada mes
        
        // Suma de lluvia anual (mm/día * días del mes)
        const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        let totalRainMm = 0;
        const dryMonths: string[] = [];
        const wetMonths: string[] = [];

        months.forEach((m, idx) => {
          const dailyRain = monthlyRain[m] ?? 3.0;
          const monthTotal = dailyRain * daysInMonths[idx];
          totalRainMm += monthTotal;
          if (monthTotal < 60) {
            dryMonths.push(m);
          } else {
            wetMonths.push(m);
          }
        });

        const solarRad = params.ALLSKY_SFC_SW_DWN?.ANN ?? 18.5; // MJ/m^2/day
        const rh = params.RH2M?.ANN ?? 76;

        const result: NasaAgroClimaticData = {
          annualPrecipitationMm: Math.round(totalRainMm),
          avgTemperatureC: Math.round(annualTemp * 10) / 10,
          maxTemperatureC: Math.round(annualTempMax * 10) / 10,
          minTemperatureC: Math.round(annualTempMin * 10) / 10,
          avgSolarRadiationMjM2Day: Math.round(solarRad * 10) / 10,
          relativeHumidityPercent: Math.round(rh),
          drySeasonMonths: dryMonths.length > 0 ? dryMonths : ['ENE', 'FEB', 'MAR'],
          wetSeasonMonths: wetMonths.length > 0 ? wetMonths : ['MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT'],
          source: 'NASA_POWER_API',
          fetchedAt: new Date().toISOString(),
        };

        agroClimateCache.set(cacheKey, { data: result, timestamp: Date.now() });
        return result;
      }
    }
  } catch {
    // Si la API externa no responde o no tiene internet en despliegue sandboxed,
    // usamos la grilla agroclimática calibrada para Venezuela
  }

  const fallback = estimateVenezuelaAgroClimate(lat, lon);
  agroClimateCache.set(cacheKey, { data: fallback, timestamp: Date.now() });
  return fallback;
}

/**
 * Modelo calibrado de agroclima de Venezuela basado en latitud, longitud y pisos térmicos
 */
export function estimateVenezuelaAgroClimate(lat: number, lon: number): NasaAgroClimaticData {
  // Sur del Orinoco (Amazonas, Bolívar)
  if (lat < 7.0) {
    return {
      annualPrecipitationMm: 2450,
      avgTemperatureC: 26.8,
      maxTemperatureC: 32.5,
      minTemperatureC: 22.0,
      avgSolarRadiationMjM2Day: 17.8,
      relativeHumidityPercent: 84,
      drySeasonMonths: ['ENE', 'FEB'],
      wetSeasonMonths: ['ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV'],
      source: 'LOCAL_AGROCLIMATIC_GRID',
      fetchedAt: new Date().toISOString(),
    };
  }

  // Cordillera de Los Andes (Mérida, Táchira, Trujillo)
  if (lon < -70.5 && lat >= 7.5 && lat <= 9.8) {
    return {
      annualPrecipitationMm: 1650,
      avgTemperatureC: 19.5,
      maxTemperatureC: 24.5,
      minTemperatureC: 14.2,
      avgSolarRadiationMjM2Day: 16.2,
      relativeHumidityPercent: 78,
      drySeasonMonths: ['DIC', 'ENE', 'FEB'],
      wetSeasonMonths: ['ABR', 'MAY', 'JUN', 'AGO', 'SEP', 'OCT'],
      source: 'LOCAL_AGROCLIMATIC_GRID',
      fetchedAt: new Date().toISOString(),
    };
  }

  // Llanos Occidentales y Centrales (Portuguesa, Barinas, Guárico, Cojedes)
  if (lat >= 7.5 && lat <= 10.0 && lon >= -70.5 && lon <= -64.5) {
    return {
      annualPrecipitationMm: 1450,
      avgTemperatureC: 27.8,
      maxTemperatureC: 34.5,
      minTemperatureC: 22.4,
      avgSolarRadiationMjM2Day: 19.4,
      relativeHumidityPercent: 75,
      drySeasonMonths: ['DIC', 'ENE', 'FEB', 'MAR', 'ABR'],
      wetSeasonMonths: ['MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT'],
      source: 'LOCAL_AGROCLIMATIC_GRID',
      fetchedAt: new Date().toISOString(),
    };
  }

  // Depresión del Lago de Maracaibo (Zulia)
  if (lon < -71.0 && lat >= 8.5 && lat <= 11.5) {
    return {
      annualPrecipitationMm: 1350,
      avgTemperatureC: 28.5,
      maxTemperatureC: 35.0,
      minTemperatureC: 24.0,
      avgSolarRadiationMjM2Day: 20.1,
      relativeHumidityPercent: 79,
      drySeasonMonths: ['ENE', 'FEB', 'MAR'],
      wetSeasonMonths: ['ABR', 'MAY', 'SEP', 'OCT', 'NOV'],
      source: 'LOCAL_AGROCLIMATIC_GRID',
      fetchedAt: new Date().toISOString(),
    };
  }

  // Oriente y Valles del Centro
  return {
    annualPrecipitationMm: 1150,
    avgTemperatureC: 27.2,
    maxTemperatureC: 33.0,
    minTemperatureC: 22.8,
    avgSolarRadiationMjM2Day: 18.9,
    relativeHumidityPercent: 72,
    drySeasonMonths: ['ENE', 'FEB', 'MAR', 'ABR'],
    wetSeasonMonths: ['JUN', 'JUL', 'AGO', 'SEP', 'OCT'],
    source: 'LOCAL_AGROCLIMATIC_GRID',
    fetchedAt: new Date().toISOString(),
  };
}

export async function getNasaAgroclimateSummary(lat: number, lon: number) {
  const clim = await fetchNasaAgroClimate(lat, lon);
  return {
    annualRainfallMm: clim.annualPrecipitationMm,
    avgTempC: clim.avgTemperatureC,
    maxTempC: clim.maxTemperatureC,
    minTempC: clim.minTemperatureC,
    solarRadiation: clim.avgSolarRadiationMjM2Day,
    relativeHumidity: clim.relativeHumidityPercent
  };
}

