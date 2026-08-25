'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/authContext';
import styles from './page.module.css';
import { InMemFieldLog } from '@/app/api/field-logs/route';
import { InMemParcel } from '@/app/api/parcels/route';
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
  FileText
} from 'lucide-react';

export default function BitacoraPage() {
  const { user } = useAuth();
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
      fetch(`/api/field-logs?userId=${uId}`).then(r => r.json()),
      fetch(`/api/parcels?userId=${uId}`).then(r => r.json())
    ]).then(([logsData, parcelsData]) => {
      setLogs(Array.isArray(logsData) ? logsData : []);
      const pList = Array.isArray(parcelsData) ? parcelsData : [];
      setParcels(pList);
      if (pList.length > 0 && !parcelId) {
        setParcelId(pList[0].id);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
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
        setShowModal(false);
        setTitle('');
        setDescription('');
        setDosage('');
        setYieldTonHa('');
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
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

      {/* Listado de Entradas de la Bitácora */}
      <div className={styles.timeline}>
        {loading ? (
          <div style={{ color: '#94a3b8', padding: '2rem', textAlign: 'center' }}>Cargando bitácora...</div>
        ) : logs.length === 0 ? (
          <div style={{ background: 'rgba(15, 23, 42, 0.5)', border: '1px dashed rgba(255,255,255,0.15)', borderRadius: '12px', padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
            <FileText size={40} style={{ margin: '0 auto 0.5rem auto', opacity: 0.6 }} />
            <h3>No hay registros de labores en el cuaderno</h3>
            <p style={{ fontSize: '0.88rem' }}>Comienza registrando la siembra, encalado dolomítico o cosecha de tus parcelas.</p>
          </div>
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
                <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Parcela / Lote:</label>
                <select
                  value={parcelId}
                  onChange={e => setParcelId(e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }}
                >
                  {parcels.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.areaHectares} ha)</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Tipo de Labor:</label>
                  <select
                    value={logType}
                    onChange={e => setLogType(e.target.value as any)}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }}
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
                    <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Rendimiento (Ton/ha):</label>
                    <input
                      type="number"
                      step="0.1"
                      value={yieldTonHa}
                      onChange={e => setYieldTonHa(e.target.value)}
                      placeholder="ej: 7.2"
                      style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Título de la Labor:</label>
                <input
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="ej: Siembra de Maíz Blanco Híbrido"
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Dosis o Fórmula de Insumo:</label>
                <input
                  value={dosage}
                  onChange={e => setDosage(e.target.value)}
                  placeholder="ej: 1.5 Ton/ha Cal Dolomítica o 200 kg/ha NPK 12-24-12"
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #334155', background: '#1e293b', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Observaciones Agronómicas / Notas de Manejo:</label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Detalla condiciones climáticas, humedad de suelo, vigor de plántulas o incidencias..."
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #334155', background: '#1e293b', color: '#fff', resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#334155', color: '#fff', cursor: 'pointer' }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 16px', borderRadius: '6px', border: 'none', background: '#0284c7', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
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
