'use client';

import React, { useState } from 'react';
import { 
  Wifi, 
  Droplets, 
  BatteryCharging, 
  Power, 
  CloudRain, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle,
  RefreshCw,
  Gauge,
  Thermometer,
  Zap
} from 'lucide-react';

export interface IoTTelemetry {
  soilMoisturePct: number;
  soilTempC: number;
  ph: number;
  nitrogenMgKg: number;
  phosphorusMgKg: number;
  potassiumMgKg: number;
  ecUsCm: number;
  batteryLevel: number;
  solarVoltage: number;
}

export interface IoTNodeData {
  id: string;
  name: string;
  type: string;
  hardwareUid: string;
  isOnline: boolean;
  telemetry: IoTTelemetry;
}

interface IoTDigitalTwinPanelProps {
  parcelName?: string;
}

export default function IoTDigitalTwinPanel({ parcelName = "Tablón Demostrativo" }: IoTDigitalTwinPanelProps) {
  const [activeTab, setActiveTab] = useState<'TELEMETRY' | 'ACTUATORS' | 'RULES'>('TELEMETRY');
  const [valveState, setValveState] = useState<'CLOSED' | 'OPEN'>('CLOSED');
  const [autoMode, setAutoMode] = useState<boolean>(true);
  const [forecastRainMm, setForecastRainMm] = useState<number>(0.0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Datos reactivos de nodo ESP32
  const [currentTelemetry, setCurrentTelemetry] = useState<IoTTelemetry>({
    soilMoisturePct: 28.5,
    soilTempC: 26.8,
    ph: 6.4,
    nitrogenMgKg: 42.0,
    phosphorusMgKg: 18.0,
    potassiumMgKg: 115.0,
    ecUsCm: 1250,
    batteryLevel: 92,
    solarVoltage: 5.14
  });

  const isMoistureCritical = currentTelemetry.soilMoisturePct < 30.0;
  const isRainImminent = forecastRainMm >= 5.0;

  const handleToggleValve = () => {
    setValveState(prev => prev === 'OPEN' ? 'CLOSED' : 'OPEN');
  };

  const handleSimulateMoistureDrop = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setCurrentTelemetry(prev => ({
        ...prev,
        soilMoisturePct: 24.2,
        soilTempC: 28.4
      }));
      setIsSimulating(false);
    }, 600);
  };

  const handleSimulateRainForecast = () => {
    setForecastRainMm(prev => prev > 0 ? 0.0 : 12.5);
  };

  return (
    <div style={{
      background: 'rgba(15, 23, 42, 0.95)',
      border: '1px solid rgba(56, 189, 248, 0.25)',
      borderRadius: '16px',
      padding: '1.5rem',
      color: '#fff',
      boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
      marginTop: '1.5rem'
    }}>
      {/* Header del Panel IoT */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={22} color="#38bdf8" />
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc' }}>
              Gemelo Digital IoT & Telemetría In-Situ
            </h3>
            <span style={{
              background: 'rgba(34, 197, 94, 0.2)',
              border: '1px solid #22c55e',
              color: '#4ade80',
              padding: '2px 8px',
              borderRadius: '999px',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Wifi size={12} /> Nodo ESP32 Activo (4 Nodos en Campo)
            </span>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#94a3b8' }}>
            Monitoreo en tiempo real de suelo, nutrientes NPK y control hidráulico para: <b>{parcelName}</b>
          </p>
        </div>

        {/* Selector de Pestañas */}
        <div style={{ display: 'flex', background: 'rgba(30, 41, 59, 0.8)', padding: '4px', borderRadius: '8px', gap: '4px' }}>
          <button
            onClick={() => setActiveTab('TELEMETRY')}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'TELEMETRY' ? '#0284c7' : 'transparent',
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            📊 Sensores NPK
          </button>
          <button
            onClick={() => setActiveTab('ACTUATORS')}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'ACTUATORS' ? '#0284c7' : 'transparent',
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            💧 Riego & Actuador
          </button>
          <button
            onClick={() => setActiveTab('RULES')}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: 'none',
              background: activeTab === 'RULES' ? '#0284c7' : 'transparent',
              color: '#fff',
              fontSize: '0.85rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            🧠 IA Predictiva
          </button>
        </div>
      </div>

      {/* Contenido Pestaña 1: Telemetría de Suelo */}
      {activeTab === 'TELEMETRY' && (
        <div style={{ marginTop: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            
            {/* Humedad Volumétrica */}
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', border: `1px solid ${isMoistureCritical ? '#ef4444' : '#22c55e'}`, padding: '1rem', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.8rem' }}>
                <span>Humedad Suelo (VWC)</span>
                <Droplets size={16} color={isMoistureCritical ? '#ef4444' : '#38bdf8'} />
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: isMoistureCritical ? '#f87171' : '#38bdf8', marginTop: '4px' }}>
                {currentTelemetry.soilMoisturePct}%
              </div>
              <div style={{ fontSize: '0.75rem', color: isMoistureCritical ? '#fca5a5' : '#86efac', marginTop: '2px' }}>
                {isMoistureCritical ? '⚠️ Estrés Hídrico Crítico' : '✓ Nivel Hídrico Favorable'}
              </div>
            </div>

            {/* pH del Suelo */}
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.8rem' }}>
                <span>pH In-Situ</span>
                <Gauge size={16} color="#eab308" />
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fde047', marginTop: '4px' }}>
                {currentTelemetry.ph}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                Ligeramente ácido (Óptimo)
              </div>
            </div>

            {/* Nitrógeno Disponible */}
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.8rem' }}>
                <span>Nitrógeno (N)</span>
                <Zap size={16} color="#a855f7" />
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#c084fc', marginTop: '4px' }}>
                {currentTelemetry.nitrogenMgKg} <span style={{ fontSize: '0.9rem' }}>mg/kg</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                Disponibilidad Media
              </div>
            </div>

            {/* Fósforo y Potasio */}
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.8rem' }}>
                <span>Fósforo (P) / Potasio (K)</span>
                <Thermometer size={16} color="#ec4899" />
              </div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f472b6', marginTop: '4px' }}>
                P: {currentTelemetry.phosphorusMgKg} | K: {currentTelemetry.potassiumMgKg}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
                Balance mineral estable
              </div>
            </div>

            {/* Batería & Panel Solar */}
            <div style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.8rem' }}>
                <span>Alimentación Nodo</span>
                <BatteryCharging size={16} color="#22c55e" />
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#4ade80', marginTop: '4px' }}>
                {currentTelemetry.batteryLevel}%
              </div>
              <div style={{ fontSize: '0.75rem', color: '#86efac', marginTop: '2px' }}>
                Panel Solar: {currentTelemetry.solarVoltage}V
              </div>
            </div>

          </div>

          {/* Botón de Simulación Demostrativa */}
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleSimulateMoistureDrop}
              disabled={isSimulating}
              style={{
                background: 'rgba(239, 68, 68, 0.2)',
                border: '1px solid #ef4444',
                color: '#fca5a5',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <RefreshCw size={14} className={isSimulating ? 'spin' : ''} />
              Simular Caída de Humedad In-Situ (Déficit Hídrico)
            </button>

            <button
              onClick={handleSimulateRainForecast}
              style={{
                background: forecastRainMm > 0 ? 'rgba(56, 189, 248, 0.3)' : 'rgba(255,255,255,0.05)',
                border: '1px solid #38bdf8',
                color: '#7dd3fc',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <CloudRain size={14} />
              {forecastRainMm > 0 ? `Lluvia NASA POWER: ${forecastRainMm} mm (Activa)` : 'Simular Alerta de Lluvia NASA POWER'}
            </button>
          </div>
        </div>
      )}

      {/* Contenido Pestaña 2: Control de Actuadores y Electroválvulas */}
      {activeTab === 'ACTUATORS' && (
        <div style={{ marginTop: '1.25rem' }}>
          <div style={{
            background: 'rgba(30, 41, 59, 0.6)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Droplets size={20} color="#38bdf8" />
                <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#f8fafc' }}>
                  Electroválvula Solenoide — Sector Goteo A1
                </h4>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#94a3b8' }}>
                Hardware ID: ESP32-VALVE-01 • Caudal: 30 Litros/min • Estado: <b>{valveState}</b>
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Modo Automático IA</div>
                <button
                  onClick={() => setAutoMode(!autoMode)}
                  style={{
                    background: autoMode ? '#22c55e' : '#64748b',
                    border: 'none',
                    color: '#fff',
                    padding: '4px 10px',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginTop: '2px'
                  }}
                >
                  {autoMode ? 'HABILITADO' : 'MANUAL'}
                </button>
              </div>

              <button
                onClick={handleToggleValve}
                style={{
                  background: valveState === 'OPEN' ? '#ef4444' : '#0284c7',
                  border: 'none',
                  color: '#fff',
                  padding: '10px 18px',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
              >
                <Power size={18} />
                {valveState === 'OPEN' ? 'CERRAR VÁLVULA' : 'ABRIR RIEGO (PULSO 30 MIN)'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contenido Pestaña 3: IA Predictiva (Riego vs Lluvia) */}
      {activeTab === 'RULES' && (
        <div style={{ marginTop: '1.25rem' }}>
          <div style={{
            background: isRainImminent && isMoistureCritical ? 'rgba(56, 189, 248, 0.15)' : 'rgba(30, 41, 59, 0.6)',
            border: `1px solid ${isRainImminent && isMoistureCritical ? '#38bdf8' : 'rgba(255,255,255,0.1)'}`,
            borderRadius: '12px',
            padding: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {isRainImminent && isMoistureCritical ? (
                <CheckCircle2 size={24} color="#38bdf8" />
              ) : isMoistureCritical ? (
                <AlertTriangle size={24} color="#f59e0b" />
              ) : (
                <CheckCircle2 size={24} color="#22c55e" />
              )}
              <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#f8fafc' }}>
                Dictamen del Motor de Riego Predictivo Agrotech
              </h4>
            </div>

            <div style={{ marginTop: '0.75rem', fontSize: '0.9rem', lineHeight: 1.5, color: '#cbd5e1' }}>
              {isMoistureCritical && isRainImminent ? (
                <div>
                  <b style={{ color: '#38bdf8' }}>💡 Riego Automático Pospuesto:</b> El sensor reporta suelo seco ({currentTelemetry.soilMoisturePct}% VWC), pero el satélite <b>NASA POWER</b> pronostica <b>{forecastRainMm} mm de precipitación</b> en las próximas 6 horas.
                  <div style={{ marginTop: '6px', color: '#86efac' }}>
                    🌱 <b>Ahorro Energético & Ambiental:</b> Se evita el gasto innecesario de combustible/electricidad de bombeo y la lixiviación de fertilizantes.
                  </div>
                </div>
              ) : isMoistureCritical ? (
                <div>
                  <b style={{ color: '#f59e0b' }}>⚠️ Riego Requerido:</b> Humedad edáfica por debajo del umbral de reposición ({currentTelemetry.soilMoisturePct}% VWC) y sin pronóstico de lluvia a corto plazo. Se recomienda activar el pulso de riego.
                </div>
              ) : (
                <div>
                  <b style={{ color: '#4ade80' }}>✓ Balance Hídrico Óptimo:</b> La humedad volumétrica actual ({currentTelemetry.soilMoisturePct}% VWC) satisface la demanda hídrica $ET_c$ del cultivo sin necesidad de riego suplementario.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
