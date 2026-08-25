'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/authContext';
import styles from './page.module.css';
import { InMemParcel } from '@/app/api/parcels/route';
import { 
  Tractor, 
  Plus, 
  MapPin, 
  Sprout, 
  FlaskConical, 
  BookOpen, 
  Sparkles,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export default function TierrasPage() {
  const { user } = useAuth();
  const [parcels, setParcels] = useState<InMemParcel[]>([]);
  const [loading, setLoading] = useState(true);

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
          <div style={{ color: '#94a3b8', padding: '2rem', textAlign: 'center' }}>Cargando tus tierras...</div>
        ) : parcels.length === 0 ? (
          <div style={{ background: 'rgba(15, 23, 42, 0.5)', border: '1px dashed rgba(255,255,255,0.15)', borderRadius: '12px', padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🚜</div>
            <h3>Aún no tienes parcelas delimitadas</h3>
            <p style={{ fontSize: '0.88rem' }}>Ve al Visor WebGIS interactivo para trazar los polígonos de tu finca con cálculo de hectáreas Shoelace.</p>
            <Link href="/dashboard/mapa" className={styles.newParcelBtn} style={{ display: 'inline-flex', marginTop: '1rem' }}>
              Abrir WebGIS & Trazar Mi Parcela
            </Link>
          </div>
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

                <div className={styles.cardActions}>
                  <Link href={`/dashboard/bitacora?parcelId=${p.id}`} className={styles.actionBtn}>
                    <BookOpen size={14} style={{ display: 'inline', marginRight: 4 }} /> Ver Cuaderno
                  </Link>
                  <Link href={`/dashboard/recomendaciones?state=${p.stateId}&ph=${p.ph || 6.2}`} className={styles.actionBtn} style={{ background: '#16a34a', border: 'none' }}>
                    <Sparkles size={14} style={{ display: 'inline', marginRight: 4 }} /> Diagnóstico IA
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
