'use client';

import React from 'react';
import BackButton from '@/components/ui/BackButton';
import DataflowDiagramStudio from '@/components/diagrams/DataflowDiagramStudio';

export default function ArquitecturaPage() {
  return (
    <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <BackButton fallbackHref="/dashboard" label="Volver al Dashboard" />
      </div>
      <DataflowDiagramStudio />
    </div>
  );
}
