'use client';

import React from 'react';
import DataflowDiagramStudio from '@/components/diagrams/DataflowDiagramStudio';

export default function ArquitecturaPage() {
  return (
    <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
      <DataflowDiagramStudio />
    </div>
  );
}
