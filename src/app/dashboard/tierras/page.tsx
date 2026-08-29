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
  Cpu
} from 'lucide-react';

export default function TierrasPage() {
  const { user } = useAuth();
  const [parcels, setParcels] = useState<InMemParcel[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedParcelForModal, setSelectedParcelForModal] = useState<ParcelGeometry | null>(null);

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

        <Link href="/dashboard/mapa" className={styles.newParcelBtn}>
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
            actionHref="/dashboard/mapa"
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
                    href={`/dashboard/mapa?state=${p.stateId}&level=3`} 
                    className={styles.actionBtn}
                    style={{ flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                  >
                    <Map size={14} /> Ver en WebGIS
                  </Link>

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

      {/* Panel de Gemelo Digital IoT In-Situ */}
      <IoTDigitalTwinPanel parcelName={parcels[0]?.name || "Tablón Portuguesa A1"} />

      {/* Modal de Diagnóstico Edafo-Climático & Gemini */}
      {selectedParcelForModal && (
        <ParcelDiagnosticModal
          parcel={selectedParcelForModal}
          onClose={() => setSelectedParcelForModal(null)}
        />
      )}
    </div>
  );
}

