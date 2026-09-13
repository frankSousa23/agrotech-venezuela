'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth/authContext';
import styles from './page.module.css';
import { InMemFieldLog } from '@/app/api/field-logs/route';
import { InMemParcel } from '@/app/api/parcels/route';
import ShimmerSkeleton from '@/components/ui/ShimmerSkeleton';
import EmptyStateCard from '@/components/ui/EmptyStateCard';
import { useToast } from '@/components/ui/ToastProvider';
import { 
  BookOpen, 
  Plus, 
  Calendar, 
  Tag, 
  Sprout, 
  Droplets, 
  FlaskConical, 
  ShieldAlert, 
  CheckCircle,
  TrendingUp,
  FileText,
  Sparkles,
  Map as MapIcon,
  Mic,
  MicOff
} from 'lucide-react';
import { useVoiceAssistant } from '@/lib/hooks/useVoiceAssistant';
import { parseVernacularSpeech } from '@/lib/farmer/vernacularParser';

function BitacoraContent() {
  const { user } = useAuth();
  const toast = useToast();
  const searchParams = useSearchParams();
  const queryParcelId = searchParams.get('parcelId');

  const [logs, setLogs] = useState<InMemFieldLog[]>([]);
  const [parcels, setParcels] = useState<InMemParcel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filterParcelId, setFilterParcelId] = useState<string | null>(queryParcelId);

  // Form states
  const [parcelId, setParcelId] = useState(queryParcelId || '');
  const [logType, setLogType] = useState<'SIEMBRA' | 'ENCALADO' | 'FERTILIZACION' | 'RIEGO' | 'COSECHA' | 'OBSERVACION'>('SIEMBRA');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dosage, setDosage] = useState('');
  const [yieldTonHa, setYieldTonHa] = useState('');
  const [voiceFeedback, setVoiceFeedback] = useState<string | null>(null);

  const { isListening, transcript, startListening, stopListening, resetTranscript } = useVoiceAssistant();

  const applyVernacularSpeech = (speechText: string) => {
    if (!speechText || !speechText.trim()) return;
    const parsed = parseVernacularSpeech(speechText);
    
    // Auto-ajuste de labor
    if (parsed.normalizedAction) {
      if (['SIEMBRA', 'ENCALADO', 'FERTILIZACION', 'RIEGO', 'COSECHA', 'OBSERVACION'].includes(parsed.normalizedAction)) {
        setLogType(parsed.normalizedAction as any);
      } else if (parsed.normalizedAction === 'FITOSANITARIO') {
        setLogType('OBSERVACION');
      }
    }

    // Auto-ajuste de título
    const generatedTitle = `${parsed.actionLabel}${parsed.detectedCrop ? ` en ${parsed.detectedCrop}` : ''}`;
    setTitle(generatedTitle);

    // Auto-ajuste de dosis con conversión métrica vernácula
    if (parsed.metricQuantity && parsed.metricUnit) {
      const doseDesc = parsed.traditionalUnitFound 
        ? `${parsed.traditionalUnitFound} (${parsed.metricQuantity} ${parsed.metricUnit} eq.)`
        : `${parsed.metricQuantity} ${parsed.metricUnit}`;
      setDosage(`${doseDesc}${parsed.detectedInput ? ` • ${parsed.detectedInput}` : ''}`);
    } else if (parsed.detectedInput) {
      setDosage(parsed.detectedInput);
    }

    // Auto-completar descripción
    setDescription(prev => {
      const voiceNote = `[Dictado por Voz]: "${parsed.rawTranscript}"\n→ ${parsed.summary}`;
      return prev ? `${prev}\n\n${voiceNote}` : voiceNote;
    });

    // Vincular parcela si fue detectada en el habla ("en el tablón 2", "parcela norte", etc.)
    if (parsed.detectedParcelName && parcels.length > 0) {
      const match = parcels.find(p => p.name.toLowerCase().includes(parsed.detectedParcelName!.toLowerCase()));
      if (match) {
        setParcelId(match.id);
      }
    }

    setVoiceFeedback(parsed.summary);
    toast.success('Labor Campesina Interpretada', parsed.summary);
  };

  const resetForm = () => {
    setShowModal(false);
    setTitle('');
    setDescription('');
    setDosage('');
    setYieldTonHa('');
    setVoiceFeedback(null);
    resetTranscript();
  };

  const fetchData = () => {
    setLoading(true);
    const uId = user?.id || 'usr-farmer-01';
    
    Promise.all([
      fetch(`/api/field-logs?userId=${uId}`).then(res => res.json()).catch(() => []),
      fetch(`/api/parcels?userId=${uId}`).then(res => res.json()).catch(() => [])
    ])
    .then(([logsData, parcelsData]) => {
      let mergedLogs = Array.isArray(logsData) ? logsData : [];
      // Incorporar registros offline locales pendientes que aún no estén en el servidor
      try {
        if (typeof window !== 'undefined') {
          const localPending = localStorage.getItem('agrotech_offline_field_logs');
          if (localPending) {
            const parsed = JSON.parse(localPending);
            if (Array.isArray(parsed)) {
              const serverIds = new Set(mergedLogs.map((l: any) => l.id || l.clientLogId));
              const unSynced = parsed.filter((p: any) => !serverIds.has(p.id) && !serverIds.has(p.clientLogId));
              mergedLogs = [...unSynced, ...mergedLogs];
            }
          }
        }
      } catch {}

      setLogs(mergedLogs);
      const pList = Array.isArray(parcelsData) ? parcelsData : [];
      setParcels(pList);
      if (pList.length > 0) {
        if (queryParcelId && pList.some(p => p.id === queryParcelId)) {
          setParcelId(queryParcelId);
          setFilterParcelId(queryParcelId);
        } else if (!parcelId) {
          setParcelId(pList[0].id);
        }
      }
      setLoading(false);
    })
    .catch(() => setLoading(false));
  };

  useEffect(() => {
    if (queryParcelId) {
      setFilterParcelId(queryParcelId);
      setParcelId(queryParcelId);
    }
  }, [queryParcelId]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clientLogId = `offline-log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const newLogPayload = {
      id: clientLogId,
      clientLogId,
      parcelId,
      userId: user?.id || 'usr-farmer-01',
      logType,
      title,
      description,
      dosage,
      yieldTonHa: yieldTonHa ? parseFloat(yieldTonHa) : undefined,
      date: new Date().toISOString().split('T')[0],
      isOfflinePending: false
    };

    const saveOfflineFallback = () => {
      try {
        const existingRaw = localStorage.getItem('agrotech_offline_field_logs');
        const list = existingRaw ? JSON.parse(existingRaw) : [];
        const pendingLog = { ...newLogPayload, isOfflinePending: true };
        list.unshift(pendingLog);
        localStorage.setItem('agrotech_offline_field_logs', JSON.stringify(list));
        setLogs(prev => [pendingLog as any, ...prev]);
        toast.info('Guardado Localmente (Modo Finca)', `"${title}" ha sido guardado en el teléfono. Se sincronizará automáticamente al detectar señal.`);
        resetForm();
      } catch (e) {
        toast.error('Error al Guardar', 'No se pudo guardar la labor en el almacenamiento local.');
      }
    };

    // Si no hay red, guardar directamente en la cola offline
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      saveOfflineFallback();
      return;
    }

    try {
      const res = await fetch('/api/field-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLogPayload)
      });

      if (res.ok) {
        toast.success('Labor Registrada con Éxito', `"${title}" ha sido asentada en tu cuaderno de campo.`);
        resetForm();
        fetchData();
      } else {
        saveOfflineFallback();
      }
    } catch (err) {
      console.warn('Fallo de red al enviar bitácora, guardando en cola offline:', err);
      saveOfflineFallback();
    }
  };

  const handleApplyTemplate = (template: {
    logType: 'SIEMBRA' | 'ENCALADO' | 'FERTILIZACION' | 'RIEGO' | 'COSECHA' | 'OBSERVACION';
    title: string;
    description: string;
    dosage: string;
    yieldTonHa?: string;
  }) => {
    setLogType(template.logType);
    setTitle(template.title);
    setDescription(template.description);
    setDosage(template.dosage);
    setYieldTonHa(template.yieldTonHa || '');
    setShowModal(true);
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'SIEMBRA': return { bg: 'rgba(34, 197, 94, 0.2)', text: '#4ade80' };
      case 'ENCALADO': return { bg: 'rgba(234, 179, 8, 0.2)', text: '#facc15' };
      case 'FERTILIZACION': return { bg: 'rgba(56, 189, 248, 0.2)', text: '#38bdf8' };
      case 'COSECHA': return { bg: 'rgba(168, 85, 247, 0.2)', text: '#c084fc' };
      default: return { bg: 'rgba(148, 163, 184, 0.2)', text: '#94a3b8' };
    }
  };

  if (!loading && parcels.length === 0) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
        <EmptyStateCard
          icon={MapIcon}
          title="Falta Delimitar Parcela"
          description="Para llevar el cuaderno de campo y bitácora de cosechas, primero necesitamos saber exactamente dónde está tu terreno."
          actionLabel="Dibujar mi Parcela"
          actionHref="/dashboard/mapa?mode=multilevel&intent=draw"
        />
      </div>
    );
  }

  return (
    <div className={styles.bitacoraContainer}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>
            <BookOpen size={28} color="#38bdf8" />
            Cuaderno de Campo Digital & Bitácora de Cosechas
          </h1>
          <p className={styles.subtitle}>
            Registro de labores agrícolas, dosificaciones de cal/fertilizantes y rendimientos reales obtenidos.
          </p>
        </div>

        <button 
          onClick={() => setShowModal(true)}
          style={{
            background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
            border: 'none',
            borderRadius: '8px',
            padding: '0.75rem 1.25rem',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Plus size={18} /> Nueva Labor o Cosecha
        </button>
      </div>

      {/* Barra de Plantillas Rápidas Fenológicas (1 Clic) */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        background: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(56, 189, 248, 0.25)',
        borderRadius: '12px',
        padding: '12px 16px',
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={15} /> Plantillas Rápidas de Labores (1 Clic):
          </div>
          <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
            Haz clic en cualquier fase para pre-llenar la boleta de campo:
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => handleApplyTemplate({
              logType: 'SIEMBRA',
              title: 'Siembra Mecanizada & Fertilización de Fondo',
              description: 'Siembra a 5.5 semillas/metro lineal con fertilizante NPK 12-24-12 localizado en banda.',
              dosage: '250 kg/ha NPK 12-24-12 + 20 kg semilla/ha'
            })}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(34, 197, 94, 0.4)',
              background: 'rgba(34, 197, 94, 0.15)',
              color: '#4ade80',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            🌱 1. Siembra & Fondo
          </button>

          <button
            type="button"
            onClick={() => handleApplyTemplate({
              logType: 'ENCALADO',
              title: 'Enmienda de Suelo con Cal Dolomítica',
              description: 'Aplicación al voleo e incorporación con rastra para neutralizar acidez e incorporar Ca/Mg.',
              dosage: '1,500 kg/ha Cal Dolomítica (CaCO3 + MgCO3)'
            })}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(234, 179, 8, 0.4)',
              background: 'rgba(234, 179, 8, 0.15)',
              color: '#facc15',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            🧪 2. Encalado Pre-Siembra
          </button>

          <button
            type="button"
            onClick={() => handleApplyTemplate({
              logType: 'FERTILIZACION',
              title: 'Reabono Nitrogenado (Urea al estadio V6)',
              description: 'Fertilización de cobertera con Urea perlada al 46% N en condición de suelo húmedo.',
              dosage: '150 kg/ha Urea 46% N'
            })}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              background: 'rgba(56, 189, 248, 0.15)',
              color: '#38bdf8',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            ⚡ 3. Reabono Urea V6
          </button>

          <button
            type="button"
            onClick={() => handleApplyTemplate({
              logType: 'COSECHA',
              title: 'Cosecha Mecanizada & Pesaje en Tolva',
              description: 'Trilla mecanizada al 14% de humedad de grano y transporte a silo de acopio.',
              dosage: 'Humedad Grano 14.2%',
              yieldTonHa: '6.5'
            })}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              background: 'rgba(168, 85, 247, 0.15)',
              color: '#c084fc',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            🌾 4. Cosecha & Rendimiento
          </button>
        </div>
      </div>

      {/* Filtro Activo de Parcela */}
      {filterParcelId && (
        <div style={{
          background: 'rgba(56, 189, 248, 0.12)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          borderRadius: '10px',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
          color: '#e0f2fe',
          fontSize: '0.85rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📍 Filtrando por parcela:</span>
            <b style={{ color: '#38bdf8' }}>{parcels.find(p => p.id === filterParcelId)?.name || filterParcelId}</b>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>({logs.filter(l => l.parcelId === filterParcelId).length} registros)</span>
          </div>
          <button
            type="button"
            onClick={() => setFilterParcelId(null)}
            style={{
              background: 'rgba(56, 189, 248, 0.2)',
              border: '1px solid rgba(56, 189, 248, 0.5)',
              color: '#38bdf8',
              borderRadius: '6px',
              padding: '4px 10px',
              fontSize: '0.75rem',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            ✕ Mostrar todas las parcelas
          </button>
        </div>
      )}

      {/* Listado de Entradas de la Bitácora */}
      <div className={styles.timeline}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <ShimmerSkeleton height="140px" borderRadius="12px" />
            <ShimmerSkeleton height="140px" borderRadius="12px" />
            <ShimmerSkeleton height="140px" borderRadius="12px" />
          </div>
        ) : (filterParcelId ? logs.filter(l => l.parcelId === filterParcelId) : logs).length === 0 ? (
          <EmptyStateCard
            icon={BookOpen}
            iconColor="#38bdf8"
            title={filterParcelId ? "Sin labores para esta parcela" : "Cuaderno de Campo sin Labores"}
            description={filterParcelId 
              ? `No se han registrado labores aún para la parcela seleccionada (${parcels.find(p => p.id === filterParcelId)?.name || filterParcelId}).`
              : "Registra la siembra, encalado dolomítico, fertilización NPK o cosecha de tus parcelas para monitorear el rendimiento en Ton/ha."
            }
            steps={[
              { number: 1, text: '🌱 Selecciona la parcela o tablón de tu finca' },
              { number: 2, text: '⚖️ Indica el tipo de labor y la dosis/insumo aplicado' },
              { number: 3, text: '🌾 Guarda y genera historial cronológico trazable' }
            ]}
            actionLabel="+ Registrar Primera Labor"
            onActionClick={() => setShowModal(true)}
          />
        ) : (
          (filterParcelId ? logs.filter(l => l.parcelId === filterParcelId) : logs).map(log => {
            const badge = getBadgeColor(log.logType);
            const parcelObj = parcels.find(p => p.id === log.parcelId);
            return (
              <div key={log.id} className={styles.logCard}>
                <div className={styles.logHeader}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span className={styles.typeBadge} style={{ background: badge.bg, color: badge.text }}>
                      {log.logType}
                    </span>
                    {(log as any).isOfflinePending && (
                      <span style={{
                        background: 'rgba(249, 115, 22, 0.18)',
                        color: '#fb923c',
                        border: '1px solid rgba(249, 115, 22, 0.35)',
                        borderRadius: '999px',
                        padding: '2px 8px',
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        🟠 Guardado Local (Pendiente Sync)
                      </span>
                    )}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} /> {log.date}
                  </span>
                </div>

                <h3 className={styles.logTitle}>{log.title}</h3>
                <p className={styles.logDescription}>{log.description}</p>

                <div className={styles.logMeta}>
                  <div>📍 Parcela: <b>{parcelObj?.name || 'Tablón General'}</b></div>
                  {log.dosage && <div>⚖️ Dosis / Insumo: <b>{log.dosage}</b></div>}
                  {log.yieldTonHa && (
                    <div style={{ color: '#4ade80', fontWeight: 700 }}>
                      🌾 Rendimiento Cosechado: <b>{log.yieldTonHa} Ton/ha</b>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal para Registrar Nueva Labor */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '1.2rem', color: '#38bdf8' }}>
              📝 Registrar Labor en Cuaderno de Campo
            </h3>

            {/* Panel de Dictado por Voz y Parser Vernacular Campesino */}
            <div style={{
              background: isListening ? 'rgba(239, 68, 68, 0.12)' : 'rgba(56, 189, 248, 0.08)',
              border: `1px solid ${isListening ? 'rgba(239, 68, 68, 0.4)' : 'rgba(56, 189, 248, 0.25)'}`,
              borderRadius: '10px',
              padding: '10px 14px',
              marginBottom: '14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      if (isListening) {
                        stopListening();
                        if (transcript) applyVernacularSpeech(transcript);
                      } else {
                        startListening((text) => applyVernacularSpeech(text));
                      }
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: isListening ? '#ef4444' : 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '7px 14px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      boxShadow: isListening ? '0 0 12px rgba(239, 68, 68, 0.5)' : 'none'
                    }}
                  >
                    {isListening ? <MicOff size={15} /> : <Mic size={15} />}
                    <span>{isListening ? 'Detener e Interpretar' : '🎙️ Dictar labor campesina'}</span>
                  </button>
                  <span style={{ fontSize: '0.74rem', color: isListening ? '#fca5a5' : '#94a3b8' }}>
                    {isListening ? 'Escuchando tu voz...' : 'Habla natural: "eche 3 sacos de urea" o "2 tambores de cal"'}
                  </span>
                </div>
                {voiceFeedback && (
                  <span style={{ fontSize: '0.72rem', color: '#4ade80', fontWeight: 600 }}>
                    ✓ Interpretado
                  </span>
                )}
              </div>

              {transcript && (
                <div style={{ fontSize: '0.76rem', color: '#e2e8f0', background: 'rgba(0,0,0,0.3)', padding: '6px 10px', borderRadius: '6px' }}>
                  <span style={{ color: '#38bdf8', fontWeight: 600 }}>Voz capturada:</span> &quot;{transcript}&quot;
                </div>
              )}

              {voiceFeedback && (
                <div style={{ fontSize: '0.74rem', color: '#86efac', background: 'rgba(34, 197, 94, 0.12)', padding: '6px 10px', borderRadius: '6px', border: '1px solid rgba(34, 197, 94, 0.25)' }}>
                  🌾 <strong>Interpretación Agronómica:</strong> {voiceFeedback}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Parcela / Lote:</label>
                <select
                  value={parcelId}
                  onChange={e => setParcelId(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--surface-border)', background: 'var(--surface-raised)', color: 'var(--text-main)' }}
                >
                  {parcels.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.areaHectares} ha)</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tipo de Labor:</label>
                  <select
                    value={logType}
                    onChange={e => setLogType(e.target.value as any)}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--surface-border)', background: 'var(--surface-raised)', color: 'var(--text-main)' }}
                  >
                    <option value="SIEMBRA">🌱 Siembra</option>
                    <option value="ENCALADO">🧪 Encalado (Cal)</option>
                    <option value="FERTILIZACION">⚡ Fertilización (NPK/Urea)</option>
                    <option value="RIEGO">💧 Riego</option>
                    <option value="COSECHA">🌾 Cosecha</option>
                    <option value="OBSERVACION">📋 Nota / Muestreo</option>
                  </select>
                </div>

                {logType === 'COSECHA' && (
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Rendimiento (Ton/ha):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={yieldTonHa}
                      onChange={e => setYieldTonHa(e.target.value)}
                      placeholder="ej: 7.2"
                      style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--surface-border)', background: 'var(--surface-raised)', color: 'var(--text-main)' }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Título de la Labor:</label>
                <input
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="ej: Siembra de Maíz Blanco Híbrido"
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--surface-border)', background: 'var(--surface-raised)', color: 'var(--text-main)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Dosis o Fórmula de Insumo:</label>
                <input
                  value={dosage}
                  onChange={e => setDosage(e.target.value)}
                  placeholder="ej: 1.5 Ton/ha Cal Dolomítica o 200 kg/ha NPK 12-24-12"
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--surface-border)', background: 'var(--surface-raised)', color: 'var(--text-main)' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Observaciones Agronómicas / Notas de Manejo:</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Detalla condiciones climáticas, humedad de suelo, vigor de plántulas o incidencias..."
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--surface-border)', background: 'var(--surface-raised)', color: 'var(--text-main)', resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ padding: '10px 18px', borderRadius: '8px', border: '1px solid var(--surface-border)', background: 'var(--surface-raised)', color: 'var(--text-main)', cursor: 'pointer', fontWeight: 600 }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{ padding: '10px 18px', borderRadius: '8px', border: 'none', background: '#0284c7', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
                >
                  Guardar en Bitácora
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BitacoraPage() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', color: '#94a3b8' }}>Cargando bitácora de campo...</div>}>
      <BitacoraContent />
    </Suspense>
  );
}
