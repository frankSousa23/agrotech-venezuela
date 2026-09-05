'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/authContext';
import styles from './page.module.css';
import { InMemParcel } from '@/app/api/parcels/route';
import ParcelDiagnosticModal from '@/components/gis/ParcelDiagnosticModal';
import { ParcelGeometry } from '@/lib/geo/spatialUtils';
import { VENEZUELA_STATES_DATA } from '@/lib/geo/venezuelaData';
import ShimmerSkeleton from '@/components/ui/ShimmerSkeleton';
import EmptyStateCard from '@/components/ui/EmptyStateCard';
import IoTDigitalTwinPanel from '@/components/agronomy/IoTDigitalTwinPanel';
import MachineryExportModal from '@/components/agronomy/MachineryExportModal';
import { 
  Tractor, 
  Plus, 
  MapPin, 
  Sprout, 
  FlaskConical, 
  BookOpen, 
  Sparkles,
  Map,
  Eye,
  Cpu,
  Radio
} from 'lucide-react';

export default function TierrasPage() {
  const { user } = useAuth();
  const [parcels, setParcels] = useState<InMemParcel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedParcelForModal, setSelectedParcelForModal] = useState<ParcelGeometry | null>(null);
  const [selectedParcelForMachinery, setSelectedParcelForMachinery] = useState<InMemParcel | null>(null);

  const fetchParcels = () => {
    setLoading(true);
    fetch(`/api/parcels?userId=${user?.id || 'usr-farmer-01'}`)
      .then(res => res.json())
      .then(data => {
        setParcels(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchParcels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const totalHectares = parcels.reduce((acc, p) => acc + (p.areaHectares || 0), 0);

  const handleOpenDiagnostic = (p: InMemParcel) => {
    const matchedState = VENEZUELA_STATES_DATA.find(s => s.id.toLowerCase() === p.stateId.toLowerCase()) || VENEZUELA_STATES_DATA[0];
    const lat = p.centerLat || matchedState.center[0];
    const lng = p.centerLng || matchedState.center[1];

    const parcelGeom: ParcelGeometry = {
      name: p.name,
      coordinates: [
        [lat - 0.003, lng - 0.003],
        [lat + 0.003, lng - 0.003],
        [lat + 0.003, lng + 0.003],
        [lat - 0.003, lng + 0.003],
      ],
      areaHectares: p.areaHectares,
      perimeterMeters: Math.round(Math.sqrt(p.areaHectares * 10000) * 4),
      centroid: [lat, lng],
      detectedState: matchedState
    };

    setSelectedParcelForModal(parcelGeom);
  };

  return (
    <div className={styles.tierrasContainer}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>
            <Tractor size={28} color="#22c55e" />
            Mis Tierras & Fincas Registradas
          </h1>
          <p className={styles.subtitle}>
            Productor: <b>{user?.name || 'Frank Sousa'}</b> ({user?.email || 'productor@agrotech.ve'})
          </p>
        </div>

        <Link href="/dashboard/mapa?mode=multilevel&intent=draw" className={styles.newParcelBtn}>
          <Plus size={18} /> Delimitar Nueva Parcela en WebGIS
        </Link>
      </div>

      {/* KPI de Superficie Acumulada */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255,255,255,0.1)', padding: '1.2rem', borderRadius: '12px', color: '#fff' }}>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Superficie Total Gestionada</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#4ade80', marginTop: '4px' }}>
            {totalHectares.toFixed(1)} ha
          </div>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255,255,255,0.1)', padding: '1.2rem', borderRadius: '12px', color: '#fff' }}>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Lotes / Tablones Activos</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#38bdf8', marginTop: '4px' }}>
            {parcels.length}
          </div>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255,255,255,0.1)', padding: '1.2rem', borderRadius: '12px', color: '#fff' }}>
          <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Rendimiento Promedio Estimado</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#facc15', marginTop: '4px' }}>
            6.4 Ton/ha
          </div>
        </div>
      </div>

      {/* Grid de Parcelas del Productor */}
      <div>
        <h2 style={{ fontSize: '1.2rem', color: '#fff', margin: '0 0 1rem 0' }}>Tablones y Parcelas Activas</h2>
        
        {loading ? (
          <div className={styles.parcelsGrid}>
            <ShimmerSkeleton height="220px" borderRadius="16px" />
            <ShimmerSkeleton height="220px" borderRadius="16px" />
            <ShimmerSkeleton height="220px" borderRadius="16px" />
          </div>
        ) : parcels.length === 0 ? (
          <EmptyStateCard
            icon={Tractor}
            title="Aún no tienes parcelas delimitadas"
            description="Tus lotes georreferenciados aparecerán aquí con su telemetría edafoclimática y acceso directo a Gemelos Digitales de Gemini AI."
            actionLabel="Abrir WebGIS & Delimitar Mi Primer Lote"
            actionHref="/dashboard/mapa?mode=multilevel&intent=draw"
          />
        ) : (
          <div className={styles.parcelsGrid}>
            {parcels.map(p => (
              <div key={p.id} className={styles.parcelCard}>
                <div>
                  <div className={styles.cardHeader}>
                    <h3 className={styles.parcelName}>{p.name}</h3>
                    <span className={styles.areaBadge}>{p.areaHectares} ha</span>
                  </div>

                  <div className={styles.detailsList} style={{ marginTop: '1rem' }}>
                    <div className={styles.detailItem}>
                      <MapPin size={14} color="#38bdf8" />
                      <span>Estado: <b>{p.stateId.toUpperCase()}</b> ({p.municipalityId})</span>
                    </div>

                    <div className={styles.detailItem}>
                      <Sprout size={14} color="#4ade80" />
                      <span>Cultivo Actual: <b>{p.currentCrop || 'Maíz Blanco'}</b></span>
                    </div>

                    <div className={styles.detailItem}>
                      <FlaskConical size={14} color="#facc15" />
                      <span>Suelo: <b>{p.soilTexture || 'Franco'}</b> | pH: <b>{p.ph || 6.2}</b></span>
                    </div>
                  </div>
                </div>

                <div className={styles.cardActions} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '1.2rem' }}>
                  <button 
                    onClick={() => handleOpenDiagnostic(p)}
                    className={styles.actionBtn}
                    style={{ background: '#16a34a', border: 'none', color: '#fff', cursor: 'pointer', flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                  >
                    <Sparkles size={14} /> Gemelo Digital & IA
                  </button>

                  <Link 
                    href={`/dashboard/recomendaciones?stateId=${p.stateId}&crop=${encodeURIComponent(p.currentCrop || 'Maíz Blanco')}&parcelName=${encodeURIComponent(p.name)}`}
                    className={styles.actionBtn}
                    style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid rgba(56, 189, 248, 0.4)', color: '#38bdf8', flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                    title="Obtener prescripción agronómica detallada con Gemini AI"
                  >
                    <Sparkles size={14} /> Prescripción IA
                  </Link>

                  <Link 
                    href={`/dashboard/mapa?state=${p.stateId}&level=3`} 
                    className={styles.actionBtn}
                    style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                  >
                    <Map size={14} /> Ver en WebGIS
                  </Link>

                  <button 
                    onClick={() => setSelectedParcelForMachinery(p)}
                    className={styles.actionBtn}
                    style={{ background: 'rgba(234, 179, 8, 0.15)', border: '1px solid rgba(234, 179, 8, 0.4)', color: '#facc15', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer' }}
                    title="Exportar archivo VRA para tractor GPS, dron o ficha analógica"
                  >
                    <Tractor size={14} /> Maquinaria & Dron
                  </button>

                  <Link 
                    href={`/dashboard/bitacora?parcelId=${p.id}`} 
                    className={styles.actionBtn}
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                  >
                    <BookOpen size={14} /> Bitácora
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Banner de acceso al Laboratorio Agro-IoT Didáctico */}
      <div style={{
        marginTop: '1.5rem',
        background: 'rgba(15, 23, 42, 0.85)',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        borderRadius: '14px',
        padding: '1rem 1.25rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '10px', borderRadius: '10px' }}>
            <Radio size={24} color="#38bdf8" />
          </div>
          <div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc' }}>
              ¿Deseas experimentar con sensores de suelo y riego en un cultivo pequeño?
            </div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              Abre el nuevo Laboratorio Agro-IoT de Micro-Cultivo con animaciones en vivo, presets de hortalizas y esquemas ESP32.
            </div>
          </div>
        </div>
        <Link
          href="/dashboard/iot"
          className="btn-primary"
          style={{ fontSize: '0.82rem', padding: '8px 16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <Radio size={14} /> Abrir Laboratorio IoT →
        </Link>
      </div>

      {/* Panel de Gemelo Digital IoT In-Situ */}
      <IoTDigitalTwinPanel parcelName={parcels[0]?.name || "Tablón Portuguesa A1"} />

      {/* Modal de Diagnóstico Edafo-Climático & Gemini */}
      {selectedParcelForModal && (
        <ParcelDiagnosticModal
          parcel={selectedParcelForModal}
          onClose={() => setSelectedParcelForModal(null)}
        />
      )}

      {/* Modal de Exportación para Maquinaria y Drones */}
      {selectedParcelForMachinery && (
        <MachineryExportModal
          parcel={selectedParcelForMachinery}
          onClose={() => setSelectedParcelForMachinery(null)}
        />
      )}
    </div>
  );
}

