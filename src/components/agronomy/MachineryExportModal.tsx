'use client';

import React, { useState } from 'react';
import { InMemParcel } from '@/app/api/parcels/route';
import { 
  generateVraPrescription, 
  generateDroneMission, 
  generateCabinCalibrationSheet,
  MachineryPrescriptionInput 
} from '@/lib/geo/machineryExporter';
import { 
  Tractor, 
  X, 
  Download, 
  Printer, 
  FileCode, 
  Radio, 
  CheckCircle2,
  Gauge
} from 'lucide-react';

interface MachineryExportModalProps {
  parcel: InMemParcel;
  onClose: () => void;
}

export default function MachineryExportModal({ parcel, onClose }: MachineryExportModalProps) {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [showCabinPreview, setShowCabinPreview] = useState(false);

  const lat = parcel.centerLat || 9.324;
  const lng = parcel.centerLng || -69.112;

  const input: MachineryPrescriptionInput = {
    parcelId: parcel.id,
    parcelName: parcel.name,
    areaHectares: parcel.areaHectares || 10.0,
    coordinates: [
      [lat - 0.003, lng - 0.003],
      [lat + 0.003, lng - 0.003],
      [lat + 0.003, lng + 0.003],
      [lat - 0.003, lng + 0.003],
    ],
    targetCrop: parcel.currentCrop || 'Maíz Blanco',
    limeTonHa: parcel.ph && parcel.ph < 5.8 ? 2.0 : 0,
    gypsumTonHa: parcel.ph && parcel.ph >= 7.5 ? 2.5 : 0,
    npkKgHa: 220,
    fertilizerFormula: 'NPK 12-24-12',
    stateName: parcel.stateId,
  };

  const vra = generateVraPrescription(input);
  const drone = generateDroneMission(input);
  const cabin = generateCabinCalibrationSheet(input);

  const handleDownloadFile = (filename: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloadSuccess(`Descargado con éxito: ${filename}`);
    setTimeout(() => setDownloadSuccess(null), 3500);
  };

  const handlePrintCabin = () => {
    const printWindow = window.open('', '_blank', 'width=750,height=600');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Ficha de Cabina - ${parcel.name}</title>
            <style>
              body { margin: 20px; font-family: Arial, sans-serif; }
              @media print { body { -webkit-print-color-adjust: exact; } }
            </style>
          </head>
          <body>
            ${cabin.htmlCard}
            <script>
              window.onload = function() { window.print(); }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1100,
      padding: '1rem'
    }} onClick={onClose} role="dialog" aria-modal="true">
      <div style={{
        background: '#0f172a',
        border: '1px solid rgba(56, 189, 248, 0.3)',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '680px',
        padding: '1.5rem',
        color: '#f8fafc',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'rgba(34, 197, 94, 0.2)', padding: '8px', borderRadius: '10px' }}>
              <Tractor size={24} color="#4ade80" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#f8fafc' }}>
                Exportar Prescripción para Maquinaria & Drones
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                Lote: <b>{parcel.name}</b> ({parcel.areaHectares} ha • {parcel.currentCrop || 'Maíz'})
              </span>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            aria-label="Cerrar modal"
          >
            <X size={20} />
          </button>
        </div>

        {downloadSuccess && (
          <div style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid #22c55e', color: '#86efac', padding: '10px 14px', borderRadius: '8px', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
            <CheckCircle2 size={16} />
            {downloadSuccess}
          </div>
        )}

        {/* 3 Opciones de Exportación */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          {/* Opción 1: Shapefile VRA para GPS */}
          <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.95rem', color: '#38bdf8' }}>
                <FileCode size={18} />
                Prescripción VRA para Tractor con GPS (ESRI Shapefile)
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.78rem', color: '#94a3b8', maxWidth: '420px' }}>
                Compatible con monitores John Deere GreenStar, Case IH AFS y Trimble. Incluye atributos de tasa variable (RATE_LIME, RATE_NPK) y proyección UTM 19N.
              </p>
            </div>
            <button
              type="button"
              className="btn-primary"
              style={{ fontSize: '0.8rem', padding: '8px 14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              onClick={() => handleDownloadFile(
                `VRA_${parcel.name.replace(/\s+/g, '_')}.geojson`, 
                JSON.stringify(vra.geoJsonFeature, null, 2), 
                'application/json'
              )}
            >
              <Download size={14} /> Descargar VRA (.json)
            </button>
          </div>

          {/* Opción 2: Misión de Dron */}
          <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.95rem', color: '#a78bfa' }}>
                <Radio size={18} />
                Misión de Vuelo para Dron Agrícola (KML / GeoJSON)
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.78rem', color: '#94a3b8', maxWidth: '420px' }}>
                Perímetro poligonal y franja de seguridad calibrada para DJI Agras (T40/T50) y XAG. Dosis sugerida de pulverización: {drone.flightParameters.sprayRateLitersHa} L/ha a {drone.flightParameters.recommendedAltitudeMeters}m de altura.
              </p>
            </div>
            <button
              type="button"
              style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', padding: '8px 14px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              onClick={() => handleDownloadFile(
                drone.fileName, 
                drone.kmlContent, 
                'application/vnd.google-earth.kml+xml'
              )}
            >
              <Download size={14} /> Descargar KML Dron
            </button>
          </div>

          {/* Opción 3: Ficha de Cabina Analógica */}
          <div style={{ background: 'rgba(30, 41, 59, 0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.95rem', color: '#facc15' }}>
                <Gauge size={18} />
                Ficha de Cabina para Tractor Convencional (Sin GPS)
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.78rem', color: '#94a3b8', maxWidth: '420px' }}>
                Hoja de ruta en 1 página para el operador: velocidad sugerida ({cabin.spreaderCalibration.targetSpeedKmH} km/h), RPM de toma de fuerza ({cabin.spreaderCalibration.ptoRpm} RPM) y apertura de compuerta.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                style={{ background: 'rgba(250, 204, 21, 0.15)', border: '1px solid rgba(250, 204, 21, 0.4)', color: '#facc15', borderRadius: '8px', padding: '8px 12px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                onClick={() => setShowCabinPreview(!showCabinPreview)}
              >
                {showCabinPreview ? 'Ocultar' : 'Ver Ficha'}
              </button>
              <button
                type="button"
                style={{ background: '#eab308', color: '#0f172a', border: 'none', borderRadius: '8px', padding: '8px 14px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                onClick={handlePrintCabin}
              >
                <Printer size={14} /> Imprimir (1 Pág.)
              </button>
            </div>
          </div>
        </div>

        {/* Vista previa de la Ficha de Cabina */}
        {showCabinPreview && (
          <div style={{ marginTop: '1rem', maxHeight: '250px', overflowY: 'auto', background: '#fff', borderRadius: '8px', padding: '10px' }}>
            <div dangerouslySetInnerHTML={{ __html: cabin.htmlCard }} />
          </div>
        )}

      </div>
    </div>
  );
}
