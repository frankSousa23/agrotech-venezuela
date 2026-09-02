'use client';

import { useState, useEffect } from 'react';
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
  Map as MapIcon
} from 'lucide-react';

export default function BitacoraPage() {
  const { user } = useAuth();
  const toast = useToast();
  const [logs, setLogs] = useState<InMemFieldLog[]>([]);
  const [parcels, setParcels] = useState<InMemParcel[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [parcelId, setParcelId] = useState('');
  const [logType, setLogType] = useState<'SIEMBRA' | 'ENCALADO' | 'FERTILIZACION' | 'RIEGO' | 'COSECHA' | 'OBSERVACION'>('SIEMBRA');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dosage, setDosage] = useState('');
  const [yieldTonHa, setYieldTonHa] = useState('');

  const fetchData = () => {
    setLoading(true);
    const uId = user?.id || 'usr-farmer-01';
    
    Promise.all([
      fetch(`/api/field-logs?userId=${uId}`).then(res => res.json()),
      fetch(`/api/parcels?userId=${uId}`).then(res => res.json())
    ])
    .then(([logsData, parcelsData]) => {
      setLogs(Array.isArray(logsData) ? logsData : []);
      const pList = Array.isArray(parcelsData) ? parcelsData : [];
      setParcels(pList);
      if (pList.length > 0 && !parcelId) {
        setParcelId(pList[0].id);
      }
      setLoading(false);
    })
    .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/field-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parcelId,
          userId: user?.id || 'usr-farmer-01',
          logType,
          title,
          description,
          dosage,
          yieldTonHa: yieldTonHa ? parseFloat(yieldTonHa) : undefined
        })
      });

      if (res.ok) {
        toast.success('Labor Registrada con Éxito', `"${title}" ha sido asentada en tu cuaderno de campo.`);
        setShowModal(false);
        setTitle('');
        setDescription('');
        setDosage('');
        setYieldTonHa('');
        fetchData();
      } else {
        toast.error('Error al Guardar', 'No se pudo registrar la labor. Intenta nuevamente.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error de Conexión', 'Ocurrió un problema al sincronizar con el servidor.');
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

      {/* Listado de Entradas de la Bitácora */}
      <div className={styles.timeline}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <ShimmerSkeleton height="140px" borderRadius="12px" />
            <ShimmerSkeleton height="140px" borderRadius="12px" />
            <ShimmerSkeleton height="140px" borderRadius="12px" />
          </div>
        ) : logs.length === 0 ? (
          <EmptyStateCard
            icon={BookOpen}
            iconColor="#38bdf8"
            title="Cuaderno de Campo sin Labores"
            description="Registra la siembra, encalado dolomítico, fertilización NPK o cosecha de tus parcelas para monitorear el rendimiento en Ton/ha."
            steps={[
              { number: 1, text: '🌱 Selecciona la parcela o tablón de tu finca' },
              { number: 2, text: '⚖️ Indica el tipo de labor y la dosis/insumo aplicado' },
              { number: 3, text: '🌾 Guarda y genera historial cronológico trazable' }
            ]}
            actionLabel="+ Registrar Primera Labor"
            onActionClick={() => setShowModal(true)}
          />
        ) : (
          logs.map(log => {
            const badge = getBadgeColor(log.logType);
            const parcelObj = parcels.find(p => p.id === log.parcelId);
            return (
              <div key={log.id} className={styles.logCard}>
                <div className={styles.logHeader}>
                  <span className={styles.typeBadge} style={{ background: badge.bg, color: badge.text }}>
                    {log.logType}
                  </span>
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
