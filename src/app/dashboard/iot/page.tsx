'use client';

import React, { useState } from 'react';
import BackButton from '@/components/ui/BackButton';
import MicrocropIoTLab from '@/components/agronomy/MicrocropIoTLab';
import SoilMoistureCard from '@/components/iot/SoilMoistureCard';
import { SoilTextureType } from '@/lib/agronomy/pedotransferEngine';
import styles from './page.module.css';

export default function IoTPage() {
  const [moisture, setMoisture] = useState<number>(30.0);
  const [texture, setTexture] = useState<SoilTextureType>('arcilloso');

  return (
    <div className={styles.pageContainer}>
      <div className={styles.topBar}>
        <BackButton fallbackHref="/dashboard" label="Volver al Dashboard" />
      </div>

      {/* Monitor de Calibración Pedotranferencial y Potencial Mátrico */}
      <div style={{ marginBottom: '1.5rem' }}>
        <SoilMoistureCard
          moisturePct={moisture}
          texture={texture}
          onTextureChange={setTexture}
          isInteractive={true}
          onMoistureChange={setMoisture}
          cropName="Laboratorio de Calibración de Suelo & Potencial Mátrico (Saxton-Rawls)"
        />
      </div>

      <MicrocropIoTLab />
    </div>
  );
}
