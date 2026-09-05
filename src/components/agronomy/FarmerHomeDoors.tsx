'use client';

import React from 'react';
import Link from 'next/link';
import styles from './FarmerHomeDoors.module.css';
import { useAuth } from '@/lib/auth/authContext';
import { useVoiceAssistant } from '@/lib/hooks/useVoiceAssistant';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  MapPin, 
  Sun, 
  HelpCircle,
  Tractor,
  Droplets
} from 'lucide-react';

interface FarmerHomeDoorsProps {
  onOpenIntentions: () => void;
  parcelsCount?: number;
}

export default function FarmerHomeDoors({ onOpenIntentions, parcelsCount = 1 }: FarmerHomeDoorsProps) {
  const { user } = useAuth();
  const { isSpeaking, speak, stopSpeaking } = useVoiceAssistant();

  const handleAudioSummary = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      const summary = `Hola ${user?.name || 'productor'}. Bienvenido a tu panel sencillo de Agrotech Venezuela. Aquí tienes tus cuatro puertas campesinas: saber cómo está tu tierra, ver si va a llover o secar, medir tu parcela, y anotar lo que hiciste hoy. Tranquilo, tu finca está guardada en este teléfono de forma segura.`;
      speak(summary);
    }
  };

  return (
    <div className={styles.container}>
      {/* Banner de Bienvenida y Disparador de Intenciones */}
      <div className={styles.welcomeCard}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(34, 197, 94, 0.2)', padding: '3px 10px', borderRadius: '9999px', color: '#4ade80', fontSize: '0.78rem', fontWeight: 700, marginBottom: '8px' }}>
            <span>👨‍🌾 Modo Productor Activado</span>
          </div>
          <h1 className={styles.welcomeTitle}>
            ¡Buenos días, {user?.name?.split(' ')[0] || 'Don Productor'}!
          </h1>
          <p className={styles.welcomeSubtitle}>
            Este es tu espacio fácil. Selecciona la tarea que quieres atender hoy en tu tierra o toca el botón verde si necesitas que te guiemos paso a paso.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            type="button"
            className={styles.intentActionBtn}
            onClick={onOpenIntentions}
            aria-label="Abrir asistente de qué necesitas hacer hoy"
          >
            <Sparkles size={18} />
            <span>¿Qué necesitas hacer hoy?</span>
          </button>

          <button
            type="button"
            onClick={handleAudioSummary}
            style={{
              background: isSpeaking ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.1)',
              border: isSpeaking ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.2)',
              color: isSpeaking ? '#f87171' : '#f8fafc',
              padding: '12px 14px',
              borderRadius: '12px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: 600,
              fontSize: '0.88rem'
            }}
            title={isSpeaking ? 'Detener lectura en audio' : 'Escuchar explicación de las 4 tareas'}
            aria-label={isSpeaking ? 'Detener lectura en audio' : 'Escuchar explicación'}
          >
            {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
            <span>{isSpeaking ? 'Detener Audio' : 'Escuchar en Voz'}</span>
          </button>
        </div>
      </div>

      {/* Las 4 Grandes Puertas de Acción del Campo */}
      <div className={styles.doorsGrid}>
        {/* Puerta 1: Saber cómo está mi tierra */}
        <Link href="/dashboard/recomendaciones?intent=soil" className={styles.doorCard} aria-label="Puerta 1: Saber cómo está mi tierra">
          <div>
            <div className={styles.doorHeader}>
              <div className={styles.doorIcon} style={{ background: 'rgba(234, 179, 8, 0.15)', color: '#facc15' }}>
                🧪
              </div>
              <div>
                <span className={styles.doorBadge} style={{ background: 'rgba(234, 179, 8, 0.2)', color: '#facc15' }}>
                  Puerta 1
                </span>
                <h2 className={styles.doorTitle}>Saber cómo está mi tierra</h2>
              </div>
            </div>
            <p className={styles.doorDesc} style={{ marginTop: '0.75rem' }}>
              Diagnóstico en 3 pasos: descubre si tu tierra está dulce o brava (ácida) y cuántos sacos de cal y abono necesita tu siembra.
            </p>
          </div>
          <div className={styles.doorActionRow} style={{ color: '#facc15' }}>
            <span>Pedir receta de abono y cal</span>
            <ArrowRight size={16} />
          </div>
        </Link>

        {/* Puerta 2: Ver si va a llover o secar */}
        <Link href="/dashboard/estadisticas?intent=weather" className={styles.doorCard} aria-label="Puerta 2: Ver si va a llover o secar">
          <div>
            <div className={styles.doorHeader}>
              <div className={styles.doorIcon} style={{ background: 'rgba(2, 132, 199, 0.15)', color: '#38bdf8' }}>
                🌧️
              </div>
              <div>
                <span className={styles.doorBadge} style={{ background: 'rgba(2, 132, 199, 0.2)', color: '#38bdf8' }}>
                  Puerta 2
                </span>
                <h2 className={styles.doorTitle}>Ver si va a llover o secar</h2>
              </div>
            </div>
            <p className={styles.doorDesc} style={{ marginTop: '0.75rem' }}>
              Pronóstico del tiempo satelital NASA POWER y radar SAR para saber si lloverá en los próximos días y si la tierra tiene humedad.
            </p>
          </div>
          <div className={styles.doorActionRow} style={{ color: '#38bdf8' }}>
            <span>Consultar pronóstico del tiempo</span>
            <ArrowRight size={16} />
          </div>
        </Link>

        {/* Puerta 3: Medir mi parcela */}
        <Link href="/dashboard/tierras" className={styles.doorCard} aria-label="Puerta 3: Medir mi parcela">
          <div>
            <div className={styles.doorHeader}>
              <div className={styles.doorIcon} style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}>
                🌾
              </div>
              <div>
                <span className={styles.doorBadge} style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80' }}>
                  Puerta 3
                </span>
                <h2 className={styles.doorTitle}>Medir mi parcela</h2>
              </div>
            </div>
            <p className={styles.doorDesc} style={{ marginTop: '0.75rem' }}>
              Ver la foto satelital de tu potrero, delimitar tus linderos caminando o tocando la pantalla, y saber exactamente cuántas hectáreas tienes.
            </p>
          </div>
          <div className={styles.doorActionRow}>
            <span>Ver mi parcela ({parcelsCount} registrada{parcelsCount === 1 ? '' : 's'})</span>
            <ArrowRight size={16} />
          </div>
        </Link>

        {/* Puerta 4: Anotar lo que hice hoy */}
        <Link href="/dashboard/bitacora?intent=new" className={styles.doorCard} aria-label="Puerta 4: Anotar lo que hice hoy">
          <div>
            <div className={styles.doorHeader}>
              <div className={styles.doorIcon} style={{ background: 'rgba(249, 115, 22, 0.15)', color: '#fb923c' }}>
                📖
              </div>
              <div>
                <span className={styles.doorBadge} style={{ background: 'rgba(249, 115, 22, 0.2)', color: '#fb923c' }}>
                  Puerta 4
                </span>
                <h2 className={styles.doorTitle}>Anotar lo que hice hoy</h2>
              </div>
            </div>
            <p className={styles.doorDesc} style={{ marginTop: '0.75rem' }}>
              Anota en 1 clic lo que hiciste hoy: siembra de semilla, aplicación de veneno a la maleza, jornaleros contratados o kilos cosechados.
            </p>
          </div>
          <div className={styles.doorActionRow} style={{ color: '#fb923c' }}>
            <span>Anotar labor de hoy</span>
            <ArrowRight size={16} />
          </div>
        </Link>
      </div>

      {/* Reaseguro Psicológico para el Campesino */}
      <div className={styles.reassuranceBanner}>
        <ShieldCheck size={22} color="#4ade80" style={{ flexShrink: 0 }} />
        <div>
          <b>🔒 Tranquilo, tu finca está guardada en este teléfono:</b> Toda la información de tus potreros se guarda de forma local y segura incluso sin internet. No tengas miedo de hacer clic o explorar: no puedes dañar ni borrar nada por accidente.
        </div>
      </div>

      {/* Glosario Campesino Llano ("Semáforo de la Tierra") */}
      <div className={styles.glossarySection}>
        <h3 className={styles.glossaryTitle}>
          <HelpCircle size={18} color="#4ade80" />
          <span>Guía del Campo: Cómo entender los números de tu tierra</span>
        </h3>

        <div className={styles.glossaryGrid}>
          <div className={styles.glossaryItem} style={{ borderLeftColor: '#22c55e' }}>
            <div className={styles.glossaryTerm}>🟢 Tierra Mansa o Dulce (pH 6 a 7)</div>
            <p className={styles.glossaryExplanation}>
              Es la tierra ideal. El cultivo come fácilmente todo el abono que le eches y no necesita cal.
            </p>
          </div>

          <div className={styles.glossaryItem} style={{ borderLeftColor: '#eab308' }}>
            <div className={styles.glossaryTerm}>🟡 Tierra Brava o Ácida (pH menor a 5.5)</div>
            <p className={styles.glossaryExplanation}>
              La tierra tiene exceso de acidez y amarra los nutrientes. Requiere cal agrícola antes de sembrar.
            </p>
          </div>

          <div className={styles.glossaryItem} style={{ borderLeftColor: '#38bdf8' }}>
            <div className={styles.glossaryTerm}>🔵 Ojos Satelitales (Radar SAR)</div>
            <p className={styles.glossaryExplanation}>
              Sensores del espacio que pueden ver si tu tierra está húmeda o inundada aunque el cielo esté tapado de nubes.
            </p>
          </div>

          <div className={styles.glossaryItem} style={{ borderLeftColor: '#a855f7' }}>
            <div className={styles.glossaryTerm}>🟣 Medida Exacta (Shoelace)</div>
            <p className={styles.glossaryExplanation}>
              Fórmula matemática que calcula el tamaño exacto de tu potrero en hectáreas sin errores de cinta métrica.
            </p>
          </div>

          <div className={styles.glossaryItem} style={{ borderLeftColor: '#f97316' }}>
            <div className={styles.glossaryTerm}>🟠 Humedad en punto (Retrodispersión de Banda C)</div>
            <p className={styles.glossaryExplanation}>
              Microondas del radar espacial que traspasan la nubosidad para medir si el suelo retiene el agua justa para la siembra o si está seco o anegado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
