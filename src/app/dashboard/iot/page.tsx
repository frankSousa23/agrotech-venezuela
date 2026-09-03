'use client';

import React from 'react';
import BackButton from '@/components/ui/BackButton';
import MicrocropIoTLab from '@/components/agronomy/MicrocropIoTLab';
import styles from './page.module.css';

export default function IoTPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.topBar}>
        <BackButton fallbackHref="/dashboard" label="Volver al Dashboard" />
      </div>
      <MicrocropIoTLab />
    </div>
  );
}
