'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './IntentionsModal.module.css';
import { useVoiceAssistant } from '@/lib/hooks/useVoiceAssistant';
import { 
  X, 
  Sparkles, 
  Mic, 
  MicOff, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface IntentionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IntentionItem {
  id: string;
  icon: string;
  bgColor: string;
  title: string;
  subtitle: string;
  url: string;
}

const INTENTIONS: IntentionItem[] = [
  {
    id: 'intent-soil',
    icon: '🧪',
    bgColor: 'rgba(34, 197, 94, 0.15)',
    title: '¿Cómo está mi tierra?',
    subtitle: 'Saber si mi suelo necesita cal o abono antes de sembrar',
    url: '/dashboard/recomendaciones?intent=soil'
  },
  {
    id: 'intent-weather',
    icon: '🌧️',
    bgColor: 'rgba(2, 132, 199, 0.15)',
    title: '¿Va a llover en mi zona?',
    subtitle: 'Ver el pronóstico de lluvias NASA POWER y humedad del suelo',
    url: '/dashboard/estadisticas?intent=weather'
  },
  {
    id: 'intent-measure',
    icon: '📐',
    bgColor: 'rgba(168, 85, 247, 0.15)',
    title: '¿Cuánto mide mi potrero?',
    subtitle: 'Calcular hectáreas caminando el lindero o marcando en la foto satélite',
    url: '/dashboard/mapa?mode=multilevel&intent=draw'
  },
  {
    id: 'intent-crops',
    icon: '🌾',
    bgColor: 'rgba(234, 179, 8, 0.15)',
    title: '¿Qué cultivo rinde más?',
    subtitle: 'Conocer qué matas se dan mejor en mi estado o municipio',
    url: '/dashboard/cultivos?intent=crops'
  },
  {
    id: 'intent-diary',
    icon: '📝',
    bgColor: 'rgba(249, 115, 22, 0.15)',
    title: 'Anotar lo que hice hoy',
    subtitle: 'Registrar siembras, abonos, gastos o fumigaciones en 1 clic',
    url: '/dashboard/bitacora?intent=new'
  },
  {
    id: 'intent-voice',
    icon: '🎙️',
    bgColor: 'rgba(56, 189, 248, 0.15)',
    title: 'Consultar al Ingeniero Virtual',
    subtitle: 'Hacer una pregunta libremente con voz o texto sobre mi cultivo',
    url: '/dashboard/recomendaciones?intent=voice'
  }
];

export default function IntentionsModal({ isOpen, onClose }: IntentionsModalProps) {
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const { 
    isListening, 
    transcript, 
    isSupported, 
    startListening, 
    stopListening 
  } = useVoiceAssistant();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSelectIntention = (url: string) => {
    onClose();
    router.push(url);
  };

  const handleToggleMic = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening((resultText) => {
        if (resultText && resultText.trim().length > 3) {
          onClose();
          router.push(`/dashboard/recomendaciones?intent=voice&query=${encodeURIComponent(resultText)}`);
        }
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="intentions_title">
      <div 
        ref={modalRef} 
        className={styles.modal} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <div>
            <div className={styles.badge}>
              <Sparkles size={14} /> Guía Paso a Paso para el Productor
            </div>
            <h2 id="intentions_title" className={styles.title}>
              👋 ¡Hola! ¿Qué necesitas hacer hoy en tu tierra?
            </h2>
            <p className={styles.subtitle}>
              Toca la tarjeta de lo que quieras revisar o habla directamente con el micrófono.
            </p>
          </div>
          <button 
            type="button" 
            className={styles.closeBtn} 
            onClick={onClose} 
            title="Cerrar ventana"
            aria-label="Cerrar ventana de intenciones"
          >
            <X size={20} />
          </button>
        </div>

        {/* Micrófono de Voz Asistida */}
        <div className={styles.voiceBar}>
          <div className={styles.voiceInfo}>
            <button
              type="button"
              onClick={handleToggleMic}
              style={{
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                background: isListening ? '#ef4444' : '#0284c7',
                border: 'none',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: isListening ? '0 0 15px #ef4444' : '0 2px 8px rgba(2, 132, 199, 0.4)',
                transition: 'all 0.2s ease'
              }}
              title={isListening ? 'Detener micrófono' : 'Hablar por voz'}
              aria-label={isListening ? 'Detener micrófono' : 'Hablar por voz'}
            >
              {isListening ? <MicOff size={22} /> : <Mic size={22} />}
            </button>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#f8fafc' }}>
                {isListening ? '🎙️ Escuchando tu voz... (habla con calma)' : '¿Prefieres hablar? Toca el micrófono'}
              </div>
              <div style={{ fontSize: '0.8rem', color: isListening ? '#4ade80' : '#94a3b8' }}>
                {transcript ? `"${transcript}"` : (isSupported ? 'Ejemplo: "Quiero saber cuánto abono echarle a mi maíz"' : 'Reconocimiento táctil directo disponible')}
              </div>
            </div>
          </div>

          {transcript && (
            <button
              type="button"
              onClick={() => {
                onClose();
                router.push(`/dashboard/recomendaciones?intent=voice&query=${encodeURIComponent(transcript)}`);
              }}
              style={{
                background: '#22c55e',
                color: '#0f172a',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>Consultar esto</span> <ArrowRight size={14} />
            </button>
          )}
        </div>

        {/* Cuadrícula de 6 Intenciones Visuales */}
        <div className={styles.cardsGrid}>
          {INTENTIONS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={styles.intentionCard}
              onClick={() => handleSelectIntention(item.url)}
              aria-label={`${item.title} - ${item.subtitle}`}
            >
              <div className={styles.cardIconBox} style={{ background: item.bgColor }}>
                {item.icon}
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardSubtitle}>{item.subtitle}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Reaseguro Psicológico */}
        <div className={styles.reassuranceBar}>
          <ShieldCheck size={18} color="#4ade80" />
          <span>🔒 Tranquilo: no puedes romper ni borrar nada aquí. Toda tu información se guarda de forma segura.</span>
        </div>
      </div>
    </div>
  );
}
