'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from './QuickStartWizard.module.css';
import { VENEZUELA_STATES_DATA } from '@/lib/geo/venezuelaData';
import { getMunicipalitiesByState } from '@/lib/geo/venezuelaMunicipalities';
import { useAuth } from '@/lib/auth/authContext';
import { 
  Sparkles, 
  X, 
  Tractor, 
  MapPin, 
  Sprout, 
  CheckCircle2, 
  ArrowRight,
  Compass
} from 'lucide-react';

const COMMON_CROPS = [
  'Maíz Blanco Harinero',
  'Arroz de Riego',
  'Cacao Criollo Porcelana',
  'Café Arábica Especialidad',
  'Caña de Azúcar',
  'Soya Tropical',
  'Plátano Hartón',
  'Pasturas Guinea / Brachiaria'
];

interface QuickStartWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onParcelCreated?: (parcel: any) => void;
}

export default function QuickStartWizard({
  isOpen,
  onClose,
  onParcelCreated
}: QuickStartWizardProps) {
  const { user } = useAuth();
  const [selectedStateId, setSelectedStateId] = useState<string>('portuguesa');
  const [selectedMunicipalityId, setSelectedMunicipalityId] = useState<string>('turen');
  const [selectedCrop, setSelectedCrop] = useState<string>(COMMON_CROPS[0]);
  const [areaHectares, setAreaHectares] = useState<number>(20.0);
  const [farmName, setFarmName] = useState<string>('Lote Principal — Mi Finca');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [createdParcel, setCreatedParcel] = useState<any | null>(null);

  const municipalities = useMemo(() => {
    return getMunicipalitiesByState(selectedStateId);
  }, [selectedStateId]);

  const handleStateChange = (stateId: string) => {
    setSelectedStateId(stateId);
    const munis = getMunicipalitiesByState(stateId);
    if (munis.length > 0) {
      setSelectedMunicipalityId(munis[0].id);
    }
  };

  const currentMunicipality = useMemo(() => {
    return municipalities.find(m => m.id === selectedMunicipalityId) || municipalities[0];
  }, [municipalities, selectedMunicipalityId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const [lat, lng] = currentMunicipality ? currentMunicipality.center : [9.32, -69.11];

    const parcelPayload = {
      name: farmName,
      stateId: selectedStateId,
      municipalityId: selectedMunicipalityId,
      areaHectares: areaHectares,
      centerLat: lat,
      centerLng: lng,
      currentCrop: selectedCrop,
      soilTexture: currentMunicipality?.soilTexture || 'Franco-limoso',
      ph: currentMunicipality?.avgPh || 6.2,
      organicMatter: 3.2
    };

    try {
      const res = await fetch('/api/parcels', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parcelPayload)
      });

      if (res.ok) {
        const saved = await res.json();
        setCreatedParcel(saved);
        if (onParcelCreated) onParcelCreated(saved);
        localStorage.setItem('agrotech-quickstart-dismissed', 'true');
      }
    } catch (err) {
      console.error('Error creating quick parcel:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('agrotech-quickstart-dismissed', 'true');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={handleDismiss}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <div>
            <div className={styles.badge}>
              <Sparkles size={13} /> Asistente de Inicio Rápido (30s)
            </div>
            <h2 className={styles.title}>¡Bienvenido, Colega Agrónomo!</h2>
            <p className={styles.subtitle}>
              Configuremos tu primera unidad de producción para activar de inmediato el radar satelital y el asesor de fertilización.
            </p>
          </div>
          <button className={styles.closeBtn} onClick={handleDismiss} title="Cerrar">
            <X size={18} />
          </button>
        </div>

        {!createdParcel ? (
          <form onSubmit={handleSubmit} className={styles.formGrid}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>Nombre de tu Finca / Lote</label>
              <input
                type="text"
                className={styles.input}
                value={farmName}
                onChange={e => setFarmName(e.target.value)}
                placeholder="Ej. Tablón 1 — Hacienda Santa María"
                required
              />
            </div>

            <div className={styles.row2}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Estado Agrícola</label>
                <select
                  className={styles.select}
                  value={selectedStateId}
                  onChange={e => handleStateChange(e.target.value)}
                >
                  {VENEZUELA_STATES_DATA.map(st => (
                    <option key={st.id} value={st.id}>{st.name}</option>
                  ))}
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Municipio / Polo</label>
                <select
                  className={styles.select}
                  value={selectedMunicipalityId}
                  onChange={e => setSelectedMunicipalityId(e.target.value)}
                >
                  {municipalities.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.row2}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Cultivo Principal</label>
                <select
                  className={styles.select}
                  value={selectedCrop}
                  onChange={e => setSelectedCrop(e.target.value)}
                >
                  {COMMON_CROPS.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Superficie (ha)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  className={styles.input}
                  value={areaHectares}
                  onChange={e => setAreaHectares(parseFloat(e.target.value) || 1)}
                  required
                />
              </div>
            </div>

            <div className={styles.actions}>
              <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                <Tractor size={18} />
                <span>{isSubmitting ? 'Creando Parcela...' : '🚀 Crear Mi Finca en 1 Clic'}</span>
              </button>

              <button type="button" className={styles.skipBtn} onClick={handleDismiss}>
                Explorar el sistema manualmente por mi cuenta
              </button>
            </div>
          </form>
        ) : (
          <div className={styles.successCard}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#4ade80', fontWeight: 700 }}>
              <CheckCircle2 size={20} color="#4ade80" />
              <span>¡Lote &quot;{createdParcel.name}&quot; Registrado con Éxito!</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#cbd5e1', margin: 0 }}>
              Tu parcela de <b>{createdParcel.areaHectares} ha</b> en <b>{selectedStateId}</b> ya está vinculada a tu cuenta con datos edafológicos preliminares.
            </p>

            <div className={styles.successLinks}>
              <Link
                href={`/dashboard/recomendaciones?state=${selectedStateId}&crop=${encodeURIComponent(selectedCrop)}`}
                className={styles.successLinkPrimary}
                onClick={onClose}
              >
                <Sparkles size={16} /> Ver Asesor IA
              </Link>
              <Link
                href="/dashboard/mapa?mode=multilevel&intent=draw"
                className={styles.successLinkSecondary}
                onClick={onClose}
              >
                <Compass size={16} /> Ver en Satélite
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
