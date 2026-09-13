import type { Metadata } from 'next';
import InteractiveManualViewer from '@/components/manual/InteractiveManualViewer';

export const metadata: Metadata = {
  title: 'Manual de Usuario & Guía de Campo | Agrotech Venezuela',
  description: 'Guía operativa de campo, fichas de calibración de maquinaria, radar SAR Sentinel-1 y factores vernaculares campesinos de Venezuela.',
};

export default function ManualPage() {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0.5rem 0' }}>
      <InteractiveManualViewer />
    </div>
  );
}
