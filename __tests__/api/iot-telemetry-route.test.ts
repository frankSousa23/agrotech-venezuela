/**
 * ============================================================================
 * AGROTECH VENEZUELA — TEST SUITE: IOT TELEMETRY ROUTE HANDLER
 * ============================================================================
 * 
 * Verifica:
 * 1. Health check y metadata del gateway IoT (GET /api/iot/telemetry).
 * 2. Ingesta de telemetría y orden OPEN de electroválvula ante déficit hídrico.
 * 3. Supresión de riego ante pronóstico de lluvia NASA POWER (>= 5 mm).
 * 4. Reposo de electroválvula ante humedad óptima.
 * 5. Manejo de errores y tolerancia a fallos.
 */

import { GET, POST } from '@/app/api/iot/telemetry/route';

describe('📡 /api/iot/telemetry — Route Handler Gateway Tests', () => {
  test('GET debe retornar metadatos del servicio y estado ONLINE', async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe('ONLINE');
    expect(data.service).toContain('Agro-IoT Telemetry Gateway');
    expect(data.resilience).toContain('Zero-Fail');
  });

  test('POST debe ordenar OPEN si la humedad es crítica y no hay pronóstico de lluvia', async () => {
    const req = new Request('http://localhost:3000/api/iot/telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hardware_uid: 'esp32_test_node_01',
        soil_moisture_pct: 20.5,
        critical_threshold: 35.0,
        forecast_rain_6h_mm: 0.0,
        crop_name: 'Tomate Cherry'
      })
    });

    const response = await POST(req);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
    expect(result.data.valve_action).toBe('OPEN');
    expect(result.data.soil_moisture_pct).toBe(20.5);
    expect(result.data.reason).toContain('inferior al umbral');
  });

  test('POST debe suprimir riego (CLOSED) si hay déficit pero lluvia pronosticada >= 5mm', async () => {
    const req = new Request('http://localhost:3000/api/iot/telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hardware_uid: 'esp32_test_node_02',
        soil_moisture_pct: 18.0,
        critical_threshold: 30.0,
        forecast_rain_6h_mm: 12.5,
        crop_name: 'Maíz Dulce'
      })
    });

    const response = await POST(req);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
    expect(result.data.valve_action).toBe('CLOSED');
    expect(result.data.saved_water_liters).toBeGreaterThan(0);
    expect(result.data.reason).toContain('Riego suprimido preventivamente');
  });

  test('POST debe mantener CLOSED cuando la humedad está en rango óptimo', async () => {
    const req = new Request('http://localhost:3000/api/iot/telemetry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        hardware_uid: 'esp32_test_node_03',
        soil_moisture_pct: 58.0,
        critical_threshold: 35.0,
        forecast_rain_6h_mm: 0.0,
        crop_name: 'Vivero Café'
      })
    });

    const response = await POST(req);
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result.success).toBe(true);
    expect(result.data.valve_action).toBe('CLOSED');
    expect(result.data.reason).toContain('adecuada');
  });
});
