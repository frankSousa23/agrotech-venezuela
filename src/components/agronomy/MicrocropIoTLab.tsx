'use client';

import React, { useState, useEffect } from 'react';
import styles from './MicrocropIoTLab.module.css';
import { 
  Radio, 
  Droplets, 
  CloudRain, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  Power, 
  RefreshCw, 
  Copy, 
  Check, 
  Zap, 
  Gauge, 
  Thermometer, 
  Sliders, 
  Layers, 
  Info,
  Sprout
} from 'lucide-react';

export interface MicrocropPreset {
  id: 'TOMATO' | 'CORN' | 'COFFEE';
  name: string;
  category: string;
  icon: string;
  criticalThreshold: number;
  optimalRange: [number, number];
  dripRateLph: number;
  description: string;
  recommendedSubstrate: string;
}

const PRESETS: MicrocropPreset[] = [
  {
    id: 'TOMATO',
    name: 'Tomate Cherry & Hortalizas',
    category: 'Mesa de Cultivo Urbana / Invernadero',
    icon: '🍅',
    criticalThreshold: 35.0,
    optimalRange: [40.0, 65.0],
    dripRateLph: 1.5,
    description: 'Alta sensibilidad a estrés hídrico. Requiere pulsos cortos diarios para evitar rajado de fruto.',
    recommendedSubstrate: '60% Fibra de coco + 30% Compost vegetal + 10% Perlita'
  },
  {
    id: 'CORN',
    name: 'Micro-Bancal de Maíz Dulce',
    category: 'Bancal Elevado Demostrativo (1.2m x 0.8m)',
    icon: '🌽',
    criticalThreshold: 28.0,
    optimalRange: [35.0, 55.0],
    dripRateLph: 2.0,
    description: 'Respuesta vigorosa a fertilización NPK in-situ. Tolerancia moderada a oscilación hídrica.',
    recommendedSubstrate: 'Suelo Franco-Arcilloso de Portuguesa + Humus de Lombriz'
  },
  {
    id: 'COFFEE',
    name: 'Vivero de Café & Cacao',
    category: 'Camas de Propagación de Esquejes',
    icon: '🌿',
    criticalThreshold: 45.0,
    optimalRange: [50.0, 75.0],
    dripRateLph: 3.0,
    description: 'Humedad edáfica constante y nebulización foliar. Sustrato ácido con alto drenaje.',
    recommendedSubstrate: 'Tierra negra vegetal tamizada + Cascarilla de arroz + pH 5.5'
  }
];

export default function MicrocropIoTLab() {
  const [activePreset, setActivePreset] = useState<MicrocropPreset>(PRESETS[0]);
  const [activeTab, setActiveTab] = useState<'SIMULATOR' | 'TELEMETRY' | 'HARDWARE' | 'FIRMWARE' | 'CALIBRATION'>('SIMULATOR');

  // Estado del Simulador
  const [moisturePct, setMoisturePct] = useState<number>(29.5);
  const [soilTempC, setSoilTempC] = useState<number>(27.2);
  const [phValue, setPhValue] = useState<number>(6.3);
  const [rainForecastMm, setRainForecastMm] = useState<number>(0.0);
  const [valveState, setValveState] = useState<'CLOSED' | 'OPEN'>('CLOSED');
  const [autoMode, setAutoMode] = useState<boolean>(true);
  const [waterSavedLiters, setWaterSavedLiters] = useState<number>(45.0);
  const [energySavedKWh, setEnergySavedKWh] = useState<number>(0.28);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const [adcAir, setAdcAir] = useState<number>(3200);
  const [adcWater, setAdcWater] = useState<number>(1350);
  const [adcCurrent, setAdcCurrent] = useState<number>(2650);

  // Estado de Transmisión E2E hacia FastAPI
  const [isTransmitting, setIsTransmitting] = useState<boolean>(false);
  const [transmissionResult, setTransmissionResult] = useState<{
    source: string;
    latency_ms: number;
    valve_action: string;
    reason: string;
    timestamp: string;
  } | null>(null);

  // Evaluación automática de riego predictivo
  const isDeficient = moisturePct < activePreset.criticalThreshold;
  const isRainImminent = rainForecastMm >= 5.0;

  useEffect(() => {
    if (autoMode) {
      if (isDeficient && !isRainImminent) {
        setValveState('OPEN');
      } else {
        setValveState('CLOSED');
        if (isDeficient && isRainImminent) {
          // Cada vez que la lluvia suprime el riego, acumulamos ahorro simulado
          setWaterSavedLiters(prev => Number((prev + 0.5).toFixed(1)));
          setEnergySavedKWh(prev => Number((prev + 0.003).toFixed(3)));
        }
      }
    }
  }, [moisturePct, rainForecastMm, autoMode, activePreset, isDeficient, isRainImminent]);

  // Si la válvula está abierta, la humedad se eleva gradualmente
  useEffect(() => {
    let interval: any = null;
    if (valveState === 'OPEN') {
      interval = setInterval(() => {
        setMoisturePct(prev => {
          if (prev >= 65.0) {
            if (autoMode) setValveState('CLOSED');
            return prev;
          }
          return Number((prev + 1.2).toFixed(1));
        });
      }, 800);
    }
    return () => clearInterval(interval);
  }, [valveState, autoMode]);

  const handleToggleValve = () => {
    setValveState(prev => prev === 'OPEN' ? 'CLOSED' : 'OPEN');
  };

  const handleSimulateMoistureDrop = () => {
    setMoisturePct(22.4);
  };

  const handleToggleRainForecast = () => {
    setRainForecastMm(prev => prev > 0 ? 0.0 : 14.2);
  };

  const handleTransmitTelemetry = async () => {
    setIsTransmitting(true);
    try {
      const res = await fetch('/api/iot/telemetry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hardware_uid: 'esp32_microcrop_lab_01',
          soil_moisture_pct: moisturePct,
          soil_temp_c: soilTempC,
          ph: phValue,
          forecast_rain_6h_mm: rainForecastMm,
          critical_threshold: activePreset.criticalThreshold,
          crop_name: activePreset.name
        })
      });

      const result = await res.json();
      if (result.success && result.data) {
        setTransmissionResult({
          source: result.source,
          latency_ms: result.latency_ms || 12,
          valve_action: result.data.valve_action,
          reason: result.data.reason,
          timestamp: new Date().toLocaleTimeString()
        });

        if (result.data.valve_action) {
          setValveState(result.data.valve_action);
        }
      }
    } catch {
      // Fallback en caso de desconexión absoluta
      setTransmissionResult({
        source: 'OFFLINE_CACHE',
        latency_ms: 0,
        valve_action: isDeficient && !isRainImminent ? 'OPEN' : 'CLOSED',
        reason: 'Telemetría resuelta en caché offline del navegador.',
        timestamp: new Date().toLocaleTimeString()
      });
    } finally {
      setIsTransmitting(false);
    }
  };

  const handleCopyCode = () => {
    const code = getArduinoCode();
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Cálculo de calibración ADC a %
  const calculatedVWC = Math.max(0, Math.min(100, Math.round(((adcAir - adcCurrent) / (adcAir - adcWater)) * 100)));

  const getArduinoCode = () => {
    return `// ================================================================
// AGROTECH VENEZUELA — NODO IOT ESP32 PARA MICRO-CULTIVO Y RIEGO
// ================================================================
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "TU_WIFI_RURAL";
const char* password = "TU_PASSWORD";
const char* serverUrl = "http://192.168.1.50:8000/api/v1/iot/telemetry";
const char* deviceToken = "sec_iot_node_microcrop_01";

// Asignación de Pines
const int SENSOR_PIN = 34;   // ADC1_CH6: Sensor Capacitivo VWC
const int VALVE_PIN = 23;    // GPIO 23: Relé Electroválvula 12V

void setup() {
  Serial.begin(115200);
  pinMode(VALVE_PIN, OUTPUT);
  digitalWrite(VALVE_PIN, LOW); // Normalmente apagado

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\\nWiFi Conectado a Agrotech Gateway!");
}

void loop() {
  int rawADC = analogRead(SENSOR_PIN);
  // Calibración local: 3200 (seco) a 1350 (saturado)
  float moisturePct = constrain(map(rawADC, 3200, 1350, 0, 100), 0, 100);

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");
    http.addHeader("X-Device-Token", deviceToken);

    StaticJsonDocument<256> doc;
    doc["hardware_uid"] = "ESP32-MICROCROP-01";
    doc["soil_moisture_pct"] = moisturePct;
    doc["soil_temp_c"] = 26.5;
    doc["battery_voltage"] = 4.12;

    String jsonString;
    serializeJson(doc, jsonString);

    int httpCode = http.POST(jsonString);
    if (httpCode > 0) {
      String payload = http.getString();
      Serial.println(payload);
      // Procesar decisión de riego recibida del backend
      if (payload.indexOf("ACTIVATE_IRRIGATION") > 0) {
        digitalWrite(VALVE_PIN, HIGH);
      } else {
        digitalWrite(VALVE_PIN, LOW);
      }
    }
    http.end();
  }
  delay(15000); // Muestreo cada 15s en laboratorio
}`;
  };

  return (
    <div className={styles.container}>
      {/* Cabecera del Laboratorio */}
      <section className={styles.heroHeader}>
        <div className={styles.headerTop}>
          <div className={styles.titleArea}>
            <h2>
              <Radio size={28} color="#38bdf8" />
              Laboratorio Agro-IoT de Micro-Cultivo & Riego de Precisión
            </h2>
            <p className={styles.subtitle}>
              Banco de pruebas didáctico para ensayar sensores edáficos, calibración de señales analógicas ESP32 y algoritmos de riego predictivo vinculados a la telemetría satelital NASA POWER.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span className={styles.badgePill}>
              <Cpu size={14} /> ESP32 Edge Core Activo
            </span>
          </div>
        </div>

        {/* Barra de Presets de Micro-Cultivo */}
        <div className={styles.presetBar}>
          <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sprout size={14} color="#38bdf8" /> Presets de Cultivo Didáctico:
          </span>
          {PRESETS.map(preset => (
            <button
              key={preset.id}
              onClick={() => {
                setActivePreset(preset);
                setMoisturePct(preset.criticalThreshold - 3);
              }}
              className={`${styles.presetBtn} ${activePreset.id === preset.id ? styles.presetBtnActive : ''}`}
            >
              <span>{preset.icon}</span>
              <span>{preset.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Pestañas de Navegación del Laboratorio */}
      <div className={styles.tabNav}>
        <button
          onClick={() => setActiveTab('SIMULATOR')}
          className={`${styles.tabBtn} ${activeTab === 'SIMULATOR' ? styles.tabBtnActive : ''}`}
        >
          <Layers size={16} /> 1. Simulador & Corte Transversal Animado
        </button>
        <button
          onClick={() => setActiveTab('TELEMETRY')}
          className={`${styles.tabBtn} ${activeTab === 'TELEMETRY' ? styles.tabBtnActive : ''}`}
        >
          <Gauge size={16} /> 2. Telemetría Multivariable NPK
        </button>
        <button
          onClick={() => setActiveTab('HARDWARE')}
          className={`${styles.tabBtn} ${activeTab === 'HARDWARE' ? styles.tabBtnActive : ''}`}
        >
          <Cpu size={16} /> 3. Esquema de Hardware & Cableado
        </button>
        <button
          onClick={() => setActiveTab('FIRMWARE')}
          className={`${styles.tabBtn} ${activeTab === 'FIRMWARE' ? styles.tabBtnActive : ''}`}
        >
          <Zap size={16} /> 4. Código Firmware ESP32
        </button>
        <button
          onClick={() => setActiveTab('CALIBRATION')}
          className={`${styles.tabBtn} ${activeTab === 'CALIBRATION' ? styles.tabBtnActive : ''}`}
        >
          <Sliders size={16} /> 5. Calculadora de Calibración ADC
        </button>
      </div>

      {/* PESTAÑA 1: SIMULADOR & CORTE TRANSVERSAL */}
      {activeTab === 'SIMULATOR' && (
        <div className={styles.labGrid}>
          {/* Ilustración SVG Interactiva en Corte Transversal */}
          <div className={styles.viewportCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Corte Transversal Vivo: {activePreset.name}
              </span>
              <span style={{ fontSize: '0.75rem', color: valveState === 'OPEN' ? '#38bdf8' : '#94a3b8' }}>
                {valveState === 'OPEN' ? '💧 Pulso de Goteo en Curso' : '⏸️ Válvula Cerrada'}
              </span>
            </div>

            <div className={styles.svgContainer}>
              <svg viewBox="0 0 600 375" style={{ width: '100%', height: '100%' }}>
                <defs>
                  {/* Gradiente dinámico de suelo según humedad */}
                  <linearGradient id="soilGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop 
                      offset="0%" 
                      stopColor={moisturePct < 30 ? '#5a2e12' : moisturePct > 65 ? '#172554' : '#271e17'} 
                    />
                    <stop 
                      offset="100%" 
                      stopColor={moisturePct < 30 ? '#381a07' : moisturePct > 65 ? '#1e3a8a' : '#140f0c'} 
                    />
                  </linearGradient>

                  {/* Halo de hidratación radicular */}
                  <radialGradient id="rootHydration" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity={valveState === 'OPEN' ? '0.7' : moisturePct > 35 ? '0.3' : '0.05'} />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* 1. Atmósfera y Cielo */}
                <rect x="0" y="0" width="600" height="150" fill="#0b1329" opacity="0.8" />

                {/* Nubes y Lluvia si está activa */}
                {rainForecastMm > 0 && (
                  <g>
                    <path d="M120 40 Q140 20 170 30 Q200 15 230 35 Q250 25 270 45 Q280 65 250 70 L130 70 Z" fill="#475569" opacity="0.85" />
                    <path d="M330 45 Q350 25 380 35 Q410 20 440 40 Q460 30 480 50 Q490 70 460 75 L340 75 Z" fill="#475569" opacity="0.85" />
                    {/* Gotas de lluvia NASA */}
                    <line x1="160" y1="80" x2="155" y2="120" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 6" opacity="0.8" />
                    <line x1="210" y1="85" x2="205" y2="125" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 6" opacity="0.8" />
                    <line x1="380" y1="85" x2="375" y2="125" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 6" opacity="0.8" />
                    <line x1="430" y1="80" x2="425" y2="120" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 6" opacity="0.8" />
                    <text x="210" y="25" fill="#38bdf8" fontSize="11" fontWeight="bold">🌧️ Alerta NASA POWER: {rainForecastMm} mm</text>
                  </g>
                )}

                {/* 2. Perfil de Suelo (Corte transversal) */}
                <rect x="0" y="150" width="600" height="225" fill="url(#soilGradient)" />

                {/* Líneas de estratos edáficos */}
                <line x1="0" y1="210" x2="600" y2="210" stroke="rgba(255,255,255,0.1)" strokeDasharray="6 6" />
                <text x="15" y="175" fill="#94a3b8" fontSize="10">Capa Superficial (0-10cm) — Humus & Sustrato</text>
                <line x1="0" y1="300" x2="600" y2="300" stroke="rgba(255,255,255,0.06)" strokeDasharray="6 6" />
                <text x="15" y="245" fill="#64748b" fontSize="10">Zona Radicular Principal (10-25cm)</text>

                {/* Halo de Hidratación en la raíz */}
                <ellipse cx="300" cy="240" rx="140" ry="70" fill="url(#rootHydration)" />

                {/* 3. Tubo de Micro-Riego en Superficie */}
                <line x1="40" y1="148" x2="560" y2="148" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" />
                {/* Gotero 1 */}
                <rect x="230" y="146" width="10" height="8" rx="2" fill="#38bdf8" />
                {/* Gotero 2 (Centro) */}
                <rect x="295" y="146" width="10" height="8" rx="2" fill="#38bdf8" />
                {/* Gotero 3 */}
                <rect x="360" y="146" width="10" height="8" rx="2" fill="#38bdf8" />

                {/* Gotas de Riego Animadas */}
                {valveState === 'OPEN' && (
                  <g>
                    <circle cx="235" cy="158" r="3.5" fill="#38bdf8" className={styles.dripDrop} />
                    <circle cx="300" cy="158" r="4" fill="#38bdf8" className={styles.dripDropDelayed} />
                    <circle cx="365" cy="158" r="3.5" fill="#38bdf8" className={styles.dripDrop} />
                  </g>
                )}

                {/* 4. Planta en Crecimiento (Animada) */}
                <g className={styles.animatedPlant}>
                  {/* Tallo */}
                  <path d="M300 150 Q295 100 300 60" stroke="#22c55e" strokeWidth="5" fill="none" strokeLinecap="round" />
                  {/* Hojas */}
                  <path d="M300 115 Q260 100 250 80 Q280 85 300 110" fill={moisturePct < 25 ? '#a16207' : '#4ade80'} />
                  <path d="M300 95 Q340 80 350 60 Q320 65 300 90" fill={moisturePct < 25 ? '#a16207' : '#22c55e'} />
                  <path d="M300 65 Q275 45 285 25 Q300 45 300 60" fill={moisturePct < 25 ? '#ca8a04' : '#86efac'} />
                  <path d="M300 65 Q325 45 315 25 Q300 45 300 60" fill={moisturePct < 25 ? '#ca8a04' : '#4ade80'} />
                  {/* Fruto / Flor según preset */}
                  {activePreset.id === 'TOMATO' && (
                    <g>
                      <circle cx="270" cy="100" r="8" fill="#ef4444" />
                      <circle cx="330" cy="85" r="7" fill="#ef4444" />
                    </g>
                  )}
                  {activePreset.id === 'CORN' && (
                    <rect x="295" y="80" width="10" height="25" rx="5" fill="#eab308" />
                  )}
                  {activePreset.id === 'COFFEE' && (
                    <circle cx="280" cy="95" r="6" fill="#dc2626" />
                  )}
                </g>

                {/* Raíces bajo tierra */}
                <path d="M300 152 Q285 190 270 235 M300 152 Q315 190 330 235 M280 180 Q250 210 240 250 M320 180 Q350 210 360 250 M290 210 Q280 250 275 270" stroke="#fcd34d" strokeWidth="2.5" fill="none" opacity="0.85" />

                {/* 5. Sonda de Humedad Capacitiva en el Suelo */}
                <g>
                  {/* Cuerpo PCB del sensor */}
                  <rect x="420" y="160" width="16" height="75" rx="3" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                  {/* Puntas de medición */}
                  <line x1="424" y1="235" x2="424" y2="280" stroke="#cbd5e1" strokeWidth="2.5" />
                  <line x1="432" y1="235" x2="432" y2="280" stroke="#cbd5e1" strokeWidth="2.5" />
                  {/* Cable hacia el ESP32 */}
                  <path d="M428 160 Q440 130 480 120" stroke="#38bdf8" strokeWidth="2" fill="none" strokeDasharray="3 3" />
                  <text x="445" y="180" fill="#38bdf8" fontSize="10" fontWeight="bold">Sonda VWC</text>
                  <text x="445" y="195" fill="#f8fafc" fontSize="12" fontWeight="bold">{moisturePct}%</text>
                </g>

                {/* 6. Nodo Controlador ESP32 en Poste */}
                <g>
                  {/* Caja estanca */}
                  <rect x="480" y="85" width="80" height="55" rx="6" fill="#0f172a" stroke="#22c55e" strokeWidth="2" />
                  <text x="492" y="105" fill="#4ade80" fontSize="11" fontWeight="bold">ESP32 Core</text>
                  <text x="492" y="122" fill="#94a3b8" fontSize="9">Pin 34: ADC</text>
                  <text x="492" y="132" fill="#94a3b8" fontSize="9">Pin 23: Válvula</text>
                  {/* Antena y Pulso de Radio */}
                  <line x1="550" y1="85" x2="550" y2="65" stroke="#22c55e" strokeWidth="2" />
                  <circle cx="550" cy="65" r="4" fill="#22c55e" />
                  <circle cx="550" cy="65" r="6" stroke="#22c55e" fill="none" className={styles.pulseRing} />
                </g>
              </svg>
            </div>

            {/* Banner de Decisión Predictiva */}
            <div className={`${styles.bannerDecision} ${
              isDeficient && isRainImminent ? styles.bannerBlue :
              isDeficient ? styles.bannerAmber : styles.bannerGreen
            }`}>
              {isDeficient && isRainImminent ? (
                <>
                  <CheckCircle2 size={24} color="#38bdf8" style={{ flexShrink: 0 }} />
                  <div>
                    <b style={{ color: '#38bdf8' }}>💡 Supresión Inteligente de Riego Activada:</b> Humedad baja ({moisturePct}%), pero el satélite <b>NASA POWER</b> pronostica <b>{rainForecastMm} mm de lluvia</b> en las próximas 6h. El sistema cancela el pulso de agua para evitar desperdicio y lixiviación.
                  </div>
                </>
              ) : isDeficient ? (
                <>
                  <AlertTriangle size={24} color="#f59e0b" style={{ flexShrink: 0 }} />
                  <div>
                    <b style={{ color: '#f59e0b' }}>⚠️ Déficit Hídrico Detectado:</b> La humedad ({moisturePct}%) está por debajo del umbral crítico ({activePreset.criticalThreshold}%). Sin pronóstico de lluvia a corto plazo. <b>Electroválvula activada</b>.
                  </div>
                </>
              ) : (
                <>
                  <CheckCircle2 size={24} color="#22c55e" style={{ flexShrink: 0 }} />
                  <div>
                    <b style={{ color: '#4ade80' }}>✓ Suelo en Rango Óptimo:</b> Humedad ({moisturePct}% VWC) en zona ideal para {activePreset.name}. Goteros en reposo.
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Panel Lateral de Controles Interactivos */}
          <div className={styles.controlCard}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sliders size={18} color="#38bdf8" /> Controles del Simulador
              </h3>
              <button
                onClick={() => setAutoMode(!autoMode)}
                style={{
                  background: autoMode ? '#22c55e' : '#64748b',
                  border: 'none',
                  color: '#fff',
                  padding: '4px 10px',
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {autoMode ? 'MODO AUTO' : 'MANUAL'}
              </button>
            </div>

            {/* KPI Cards de Ahorro */}
            <div className={styles.kpiRow}>
              <div className={styles.kpiCard}>
                <span className={styles.kpiLabel}>
                  <Droplets size={14} color="#38bdf8" /> Agua Ahorrada
                </span>
                <div className={styles.kpiValue} style={{ color: '#38bdf8' }}>
                  {waterSavedLiters} L
                </div>
                <div className={styles.kpiMeta}>Por supresión de lluvia</div>
              </div>

              <div className={styles.kpiCard}>
                <span className={styles.kpiLabel}>
                  <Zap size={14} color="#eab308" /> Energía Ahorrada
                </span>
                <div className={styles.kpiValue} style={{ color: '#fde047' }}>
                  {energySavedKWh} kWh
                </div>
                <div className={styles.kpiMeta}>Bomba en reposo</div>
              </div>
            </div>

            {/* Slider de Humedad */}
            <div className={styles.sliderGroup}>
              <div className={styles.sliderHeader}>
                <span>Humedad del Suelo (VWC)</span>
                <span style={{ color: isDeficient ? '#f87171' : '#4ade80' }}>{moisturePct}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="85"
                step="0.5"
                value={moisturePct}
                onChange={(e) => setMoisturePct(parseFloat(e.target.value))}
                className={styles.rangeInput}
              />
              <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                Umbral crítico de recarga: <b>{activePreset.criticalThreshold}%</b>
              </span>
            </div>

            {/* Slider / Toggle de Lluvia NASA */}
            <div className={styles.sliderGroup}>
              <div className={styles.sliderHeader}>
                <span>Pronóstico Lluvia NASA POWER (6h)</span>
                <span style={{ color: rainForecastMm > 0 ? '#38bdf8' : '#94a3b8' }}>
                  {rainForecastMm} mm
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="0.5"
                value={rainForecastMm}
                onChange={(e) => setRainForecastMm(parseFloat(e.target.value))}
                className={styles.rangeInput}
              />
            </div>

            {/* Botones de Acción de Laboratorio */}
            <div className={styles.actionButtonRow}>
              <button
                onClick={handleToggleValve}
                className={`${styles.btnAction} ${valveState === 'OPEN' ? styles.btnDanger : styles.btnPrimary}`}
              >
                <Power size={16} />
                {valveState === 'OPEN' ? 'Cerrar Electroválvula' : 'Abrir Riego Manual'}
              </button>

              <button
                onClick={handleSimulateMoistureDrop}
                className={`${styles.btnAction} ${styles.btnSecondary}`}
              >
                <RefreshCw size={15} /> Caída de Humedad
              </button>
            </div>

            <button
              onClick={handleToggleRainForecast}
              className={`${styles.btnAction} ${styles.btnSecondary}`}
              style={{ width: '100%', borderColor: rainForecastMm > 0 ? '#38bdf8' : 'rgba(255,255,255,0.15)' }}
            >
              <CloudRain size={16} color="#38bdf8" />
              {rainForecastMm > 0 ? 'Desactivar Lluvia Satelital' : 'Simular Lluvia NASA (14 mm)'}
            </button>

            {/* Transmisión E2E hacia FastAPI */}
            <button
              onClick={handleTransmitTelemetry}
              disabled={isTransmitting}
              className={`${styles.btnAction} ${styles.btnPrimary}`}
              style={{ 
                width: '100%', 
                marginTop: '10px', 
                background: 'linear-gradient(135deg, #0284c7 0%, #16a34a 100%)',
                boxShadow: '0 0 14px rgba(2, 132, 199, 0.4)'
              }}
            >
              <Radio size={16} />
              {isTransmitting ? 'Transmitiendo Telemetría...' : '📡 Transmitir a Servidor FastAPI'}
            </button>

            {/* Recibo de Telemetría E2E */}
            {transmissionResult && (
              <div style={{
                marginTop: '10px',
                padding: '10px 12px',
                borderRadius: '8px',
                background: 'rgba(15, 23, 42, 0.85)',
                border: `1px solid ${transmissionResult.source === 'FASTAPI_LIVE' ? 'rgba(34, 197, 94, 0.4)' : 'rgba(245, 158, 11, 0.4)'}`,
                fontSize: '0.78rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', alignItems: 'center' }}>
                  <span style={{ 
                    color: transmissionResult.source === 'FASTAPI_LIVE' ? '#4ade80' : '#f59e0b', 
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    ● {transmissionResult.source === 'FASTAPI_LIVE' ? 'FastAPI Conectado (P. 8000)' : 'Modo Fallback Resiliente'}
                  </span>
                  <span style={{ color: '#94a3b8', fontSize: '0.72rem' }}>⏱️ {transmissionResult.latency_ms} ms</span>
                </div>
                <div style={{ color: '#f8fafc', marginBottom: '2px' }}>
                  <b>Orden Actuador:</b> <span style={{ color: transmissionResult.valve_action === 'OPEN' ? '#38bdf8' : '#cbd5e1', fontWeight: 700 }}>{transmissionResult.valve_action}</span>
                </div>
                <div style={{ color: '#94a3b8', fontSize: '0.72rem', lineHeight: '1.3' }}>
                  {transmissionResult.reason}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* PESTAÑA 2: TELEMETRÍA MULTIVARIABLE NPK */}
      {activeTab === 'TELEMETRY' && (
        <div className={styles.guideCard}>
          <h3 style={{ margin: 0, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Gauge size={22} color="#38bdf8" /> Matriz de Sensores In-Situ (Lecturas en Tiempo Real)
          </h3>
          <p style={{ margin: '4px 0 1rem 0', fontSize: '0.88rem', color: '#94a3b8' }}>
            Telemetría transmitida por el nodo ESP32 mediante protocolo HTTP REST hacia el backend de Agrotech Venezuela.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div className={styles.kpiCard}>
              <span className={styles.kpiLabel}><Droplets size={16} color="#38bdf8" /> Humedad Volumétrica (VWC)</span>
              <div className={styles.kpiValue} style={{ color: '#38bdf8' }}>{moisturePct}%</div>
              <div className={styles.kpiMeta}>Sonda capacitiva v1.2</div>
            </div>

            <div className={styles.kpiCard}>
              <span className={styles.kpiLabel}><Thermometer size={16} color="#ec4899" /> Temperatura del Suelo</span>
              <div className={styles.kpiValue} style={{ color: '#f472b6' }}>{soilTempC} °C</div>
              <div className={styles.kpiMeta}>Sonda DS18B20 a 15cm</div>
            </div>

            <div className={styles.kpiCard}>
              <span className={styles.kpiLabel}><Zap size={16} color="#c084fc" /> Nitrógeno Disponible (N)</span>
              <div className={styles.kpiValue} style={{ color: '#c084fc' }}>38 mg/kg</div>
              <div className={styles.kpiMeta}>Sensor RS485 Modbus</div>
            </div>

            <div className={styles.kpiCard}>
              <span className={styles.kpiLabel}><Zap size={16} color="#fde047" /> Fósforo (P) / Potasio (K)</span>
              <div className={styles.kpiValue} style={{ color: '#fde047' }}>P: 22 | K: 110</div>
              <div className={styles.kpiMeta}>Macronutrientes en mg/kg</div>
            </div>

            <div className={styles.kpiCard}>
              <span className={styles.kpiLabel}><Gauge size={16} color="#4ade80" /> pH In-Situ Calibrado</span>
              <div className={styles.kpiValue} style={{ color: '#4ade80' }}>6.3 pH</div>
              <div className={styles.kpiMeta}>Ligeramente ácido (Favorable)</div>
            </div>

            <div className={styles.kpiCard}>
              <span className={styles.kpiLabel}><Zap size={16} color="#38bdf8" /> Estado de la Batería</span>
              <div className={styles.kpiValue} style={{ color: '#38bdf8' }}>94% (4.15V)</div>
              <div className={styles.kpiMeta}>Carga solar estabilizada</div>
            </div>
          </div>
        </div>
      )}

      {/* PESTAÑA 3: HARDWARE Y CABLEADO */}
      {activeTab === 'HARDWARE' && (
        <div className={styles.guideCard}>
          <h3 style={{ margin: 0, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={22} color="#38bdf8" /> Diagrama de Conexiones y Pinout para Micro-Cultivo
          </h3>
          <p style={{ margin: '4px 0 1rem 0', fontSize: '0.88rem', color: '#94a3b8' }}>
            Guía de integración física con componentes comerciales de bajo costo disponibles en Venezuela (Presupuesto total &lt; $35 USD).
          </p>

          <table className={styles.pinoutTable}>
            <thead>
              <tr>
                <th>Componente</th>
                <th>Pin ESP32</th>
                <th>Tipo de Señal</th>
                <th>Descripción Técnica</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Sensor Humedad Capacitivo v1.2</b></td>
                <td><code style={{ color: '#38bdf8' }}>Pin 34 (ADC1_CH6)</code></td>
                <td>Analógica (0 - 3.3V)</td>
                <td>Medición por constante dieléctrica sin electrólisis ni desgaste galvánico.</td>
              </tr>
              <tr>
                <td><b>Termistor DS18B20 Sumergible</b></td>
                <td><code style={{ color: '#38bdf8' }}>Pin 4 (GPIO)</code></td>
                <td>Digital OneWire</td>
                <td>Lectura digital precisa con resistencia pull-up de 4.7kΩ entre VCC y Datos.</td>
              </tr>
              <tr>
                <td><b>Módulo Relé 5V Optoacoplado</b></td>
                <td><code style={{ color: '#38bdf8' }}>Pin 23 (GPIO)</code></td>
                <td>Salida Digital (HIGH/LOW)</td>
                <td>Conmuta la alimentación de 12V DC hacia la electroválvula con aislamiento óptico.</td>
              </tr>
              <tr>
                <td><b>Electroválvula 12V DC (1/2")</b></td>
                <td>Terminal COM / NO del Relé</td>
                <td>Potencia 12V DC (500mA)</td>
                <td>Normalmente Cerrada (NC). Abre el caudal de la micro-manguera al activarse el pulso.</td>
              </tr>
              <tr>
                <td><b>Alimentación General</b></td>
                <td>VIN (5V) &amp; GND</td>
                <td>Alimentación</td>
                <td>Fuente de 12V 2A con módulo reductor Buck Step-Down (LM2596) regulado a 5V para el ESP32.</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* PESTAÑA 4: CÓDIGO FIRMWARE ARDUINO */}
      {activeTab === 'FIRMWARE' && (
        <div className={styles.guideCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Zap size={22} color="#38bdf8" /> Firmware Arduino C++ para ESP32
              </h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#94a3b8' }}>
                Sketch listo para compilar en Arduino IDE y flashear al microcontrolador.
              </p>
            </div>
            <button onClick={handleCopyCode} className={styles.copyButton}>
              {copiedCode ? <Check size={14} color="#4ade80" /> : <Copy size={14} />}
              {copiedCode ? '¡Copiado!' : 'Copiar Código'}
            </button>
          </div>

          <pre className={styles.codeBlock}>
            <code>{getArduinoCode()}</code>
          </pre>
        </div>
      )}

      {/* PESTAÑA 5: MINI-CALCULADORA DE CALIBRACIÓN ADC */}
      {activeTab === 'CALIBRATION' && (
        <div className={styles.guideCard}>
          <h3 style={{ margin: 0, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={22} color="#38bdf8" /> Calculadora de Calibración de Sensor Capacitivo
          </h3>
          <p style={{ margin: '4px 0 1rem 0', fontSize: '0.88rem', color: '#94a3b8' }}>
            El conversor analógico-digital (ADC) de 12 bits del ESP32 entrega valores de 0 a 4095. Para calibrar tu sonda en campo:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                1. Valor ADC en Aire Seco (0% Humedad):
              </label>
              <input
                type="number"
                value={adcAir}
                onChange={(e) => setAdcAir(parseInt(e.target.value) || 3200)}
                style={{ width: '100%', background: '#1e293b', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '8px 12px', borderRadius: '8px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                2. Valor ADC en Agua / Saturado (100% Humedad):
              </label>
              <input
                type="number"
                value={adcWater}
                onChange={(e) => setAdcWater(parseInt(e.target.value) || 1350)}
                style={{ width: '100%', background: '#1e293b', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '8px 12px', borderRadius: '8px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                3. Valor ADC Actual Leído por el ESP32:
              </label>
              <input
                type="number"
                value={adcCurrent}
                onChange={(e) => setAdcCurrent(parseInt(e.target.value) || 2600)}
                style={{ width: '100%', background: '#1e293b', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '8px 12px', borderRadius: '8px' }}
              />
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid #38bdf8', padding: '1.25rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Humedad Volumétrica Resultante (VWC):</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#38bdf8' }}>{calculatedVWC}% VWC</div>
            </div>
            <div style={{ fontSize: '0.8rem', color: '#cbd5e1', maxWidth: '400px' }}>
              Fórmula de mapeo inverso: <br />
              <code style={{ color: '#4ade80' }}>VWC = ((ADC_Aire - ADC_Actual) / (ADC_Aire - ADC_Agua)) * 100</code>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
