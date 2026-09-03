/**
 * ============================================================================
 * AGROTECH VENEZUELA — AGRO-IOT TELEMETRY ROUTE HANDLER (/api/iot/telemetry)
 * ============================================================================
 * 
 * Gateway de telemetría bidireccional entre el cliente WebGIS/Laboratorio IoT
 * y el microservicio espacial FastAPI (Python 3.13):
 * 1. Ingesta lecturas de humedad, temperatura, pH y NPK de nodos ESP32.
 * 2. Reenvía hacia FastAPI (puerto 8000) si el microservicio está activo.
 * 3. Ejecuta fallback de cálculo agronómico in-situ con tolerancia a fallos
 *    cuando el backend está apagado o en modo rural offline.
 */

import { NextResponse } from 'next/server';

export interface IoTTelemetryInput {
  hardware_uid?: string;
  soil_moisture_pct: number;
  soil_temp_c?: number;
  ph?: number;
  nitrogen_mg_kg?: number;
  phosphorus_mg_kg?: number;
  potassium_mg_kg?: number;
  battery_voltage?: number;
  forecast_rain_6h_mm?: number;
  crop_name?: string;
  critical_threshold?: number;
}

export async function GET() {
  return NextResponse.json({
    status: 'ONLINE',
    service: 'Agrotech Venezuela — Agro-IoT Telemetry Gateway',
    version: '1.0.0',
    target_backend: process.env.SPATIAL_BACKEND_URL || 'http://localhost:8000',
    protocol: 'REST / JSON',
    resilience: 'Zero-Fail / Local Fallback Enabled'
  });
}

export async function POST(request: Request) {
  const startTime = Date.now();

  try {
    const body: IoTTelemetryInput = await request.json();

    const moisture = typeof body.soil_moisture_pct === 'number' ? body.soil_moisture_pct : 35;
    const temp = typeof body.soil_temp_c === 'number' ? body.soil_temp_c : 24.5;
    const rainForecast = typeof body.forecast_rain_6h_mm === 'number' ? body.forecast_rain_6h_mm : 0.0;
    const threshold = typeof body.critical_threshold === 'number' ? body.critical_threshold : 35;
    const hardwareUid = body.hardware_uid || 'esp32_microcrop_lab_01';
    const battery = typeof body.battery_voltage === 'number' ? body.battery_voltage : 4.12;

    const backendUrl = process.env.SPATIAL_BACKEND_URL || 'http://localhost:8000';
    const targetEndpoint = `${backendUrl}/api/v1/iot/telemetry?x_device_token=sec_iot_node_turen_001&forecast_rain_6h_mm=${rainForecast}`;

    // 1. Intento de reenvío al microservicio FastAPI con timeout de 2.5s
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const fastapiPayload = {
        hardware_uid: hardwareUid,
        soil_moisture_pct: moisture,
        soil_temp_c: temp,
        ph: body.ph ?? 6.2,
        nitrogen_mg_kg: body.nitrogen_mg_kg ?? 45,
        phosphorus_mg_kg: body.phosphorus_mg_kg ?? 18,
        potassium_mg_kg: body.potassium_mg_kg ?? 120,
        battery_voltage: battery,
        ec_us_cm: 1.2
      };

      const response = await fetch(targetEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(fastapiPayload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        const latencyMs = Date.now() - startTime;
        return NextResponse.json({
          success: true,
          source: 'FASTAPI_LIVE',
          latency_ms: latencyMs,
          data
        });
      }
    } catch {
      // Si FastAPI no responde o timeout, procede al fallback local transparente
    }

    // 2. Fallback Agronómico Local Deterministico (Modo Offline o Microservicio Apagado)
    const isCritical = moisture < threshold;
    const rainAlert = rainForecast >= 5.0;

    let valveAction: 'OPEN' | 'CLOSED' = 'CLOSED';
    let reason = 'Humedad edáfica adecuada. Riego en espera.';
    let savedWaterL = 0;
    let savedKwh = 0;

    if (isCritical && !rainAlert) {
      valveAction = 'OPEN';
      reason = `Humedad (${moisture.toFixed(1)}%) inferior al umbral (${threshold}%). Activando electroválvula.`;
    } else if (isCritical && rainAlert) {
      valveAction = 'CLOSED';
      reason = `Riego suprimido preventivamente: lluvia pronosticada (${rainForecast.toFixed(1)} mm en 6h).`;
      savedWaterL = 45;
      savedKwh = 0.38;
    }

    const latencyMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      source: 'LOCAL_FALLBACK',
      latency_ms: latencyMs,
      data: {
        status: 'PROCESSED_OFFLINE',
        telemetry_id: `tel_local_${Date.now()}`,
        hardware_uid: hardwareUid,
        soil_moisture_pct: moisture,
        soil_temp_c: temp,
        valve_action: valveAction,
        reason,
        forecast_rain_6h_mm: rainForecast,
        saved_water_liters: savedWaterL,
        saved_kwh: savedKwh,
        timestamp: new Date().toISOString()
      }
    });

  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: 'Error al procesar telemetría IoT',
        details: err?.message || 'Payload inválido'
      },
      { status: 400 }
    );
  }
}
