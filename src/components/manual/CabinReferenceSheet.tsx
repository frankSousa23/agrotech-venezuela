'use client';

import React from 'react';
import styles from './CabinReferenceSheet.module.css';
import { Printer, ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import { VERNACULAR_FACTORS } from '@/lib/manual/manualContent';

interface CabinReferenceSheetProps {
  onBack?: () => void;
}

export default function CabinReferenceSheet({ onBack }: CabinReferenceSheetProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.sheetContainer} id="cabin_reference_sheet">
      {/* Barra de Acciones (No imprimible) */}
      <div className={styles.actionToolbar}>
        {onBack && (
          <button 
            type="button" 
            onClick={onBack}
            className="btn-secondary"
            style={{ fontSize: '0.8rem', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowLeft size={16} />
            <span>Volver al Manual Completo</span>
          </button>
        )}
        <button 
          type="button" 
          id="btn_print_cabin_sheet"
          onClick={handlePrint} 
          className={styles.printBtn}
          title="Imprimir o Guardar en PDF para la Cabina"
        >
          <Printer size={16} />
          <span>🖨️ Imprimir Ficha de Cabina (1 Página)</span>
        </button>
      </div>

      {/* Cabecera Oficial de la Ficha */}
      <div className={styles.sheetHeader}>
        <div>
          <h1 className={styles.mainTitle}>Agrotech Venezuela — Ficha de Cabina & Guía de Campo</h1>
          <p className={styles.subtitle}>
            Hoja de Referencia Operativa para Tractoristas, Maquinaria Agrícola y Técnicos de Finca
          </p>
        </div>
        <div className={styles.headerMeta}>
          <div>Edición: 2026 • TRL 4</div>
          <div>Zona: Venezuela (UTM 19N)</div>
        </div>
      </div>

      {/* Rejilla de Información Crítica */}
      <div className={styles.gridContent}>
        {/* Bloque 1: Conversión Campesina Vernacular */}
        <div className={styles.cardBlock}>
          <h3 className={styles.cardTitle}>
            <span>⚖️ 1. Unidades Campesinas ↔ Métricas</span>
          </h3>
          <table className={styles.tableUnits}>
            <thead>
              <tr>
                <th>Unidad</th>
                <th>Equivalencia Métrica</th>
                <th>Uso Típico</th>
              </tr>
            </thead>
            <tbody>
              {VERNACULAR_FACTORS.map((f, idx) => (
                <tr key={idx}>
                  <td><strong>{f.unit}</strong></td>
                  <td>{f.metric}</td>
                  <td>{f.useCase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bloque 2: Calibración Rápida de Maquinaria */}
        <div className={styles.cardBlock}>
          <h3 className={styles.cardTitle}>
            <span>🚜 2. Calibración de Tolva de Encalado</span>
          </h3>
          <ul className={styles.ruleList}>
            <li><strong>Velocidad de Avance:</strong> 6.0 km/h constantes (Marcha 2da Media a 1,800 RPM de motor / 540 RPM en TDF).</li>
            <li><strong>Dosis Estándar Sabana Ácida:</strong> 30 a 40 sacos de cal por hectárea (1.5 a 2.0 t/ha).</li>
            <li><strong>Distribución Uniforme:</strong> Traslape de 1 metro entre pasadas consecutivas para evitar franjas sin corregir.</li>
            <li><strong>Verificación de Tolva:</strong> Comprobar descarga en los primeros 50 metros de guardarraya.</li>
          </ul>
        </div>
      </div>

      {/* Bloque 3: Reglas de Oro de Fertilidad y Suelo */}
      <div className={styles.fullWidthBlock}>
        <h3 className={styles.cardTitle}>
          <span>🧪 3. Reglas de Oro Edafológicas (pH y Enmiendas)</span>
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#dc2626', marginBottom: '2px' }}>
              🔴 Suelo Ácido (pH &lt; 5.5) — Sabanas de Monagas, Anzoátegui, Guárico, Portuguesa:
            </div>
            <p style={{ fontSize: '0.72rem', margin: 0, color: '#334155', lineHeight: 1.35 }}>
              El aluminio tóxico atrapa hasta el <strong>70% del fertilizante fosfatado</strong> si no se neutraliza primero. Aplicar cal agrícola 30 días antes de la siembra.
            </p>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#d97706', marginBottom: '2px' }}>
              🟡 Suelo Alcalino / Salino-Sódico (pH ≥ 7.4) — Valle de Quíbor / Lara:
            </div>
            <p style={{ fontSize: '0.72rem', margin: 0, color: '#334155', lineHeight: 1.35 }}>
              <strong>¡PROHIBIDO APLICAR CAL!</strong> Usar <strong>Yeso Agrícola (CaSO₄·2H₂O) a 50 sacos/ha (2.5 t/ha)</strong> para lixiviar el exceso de sodio.
            </p>
          </div>
        </div>
        <div className={styles.alertBox}>
          <strong>📡 ¿Días con Nubes o Lluvias Fuertes?</strong> No confíes en imágenes ópticas. Usa la capa de <strong>Radar SAR Sentinel-1 Banda C</strong> de Agrotech, la cual traspasa nubes para medir humedad de siembra.
        </div>
      </div>

      {/* Bloque 4: Protocolo de Finca Offline */}
      <div className={styles.fullWidthBlock} style={{ marginBottom: '0.5rem' }}>
        <h3 className={styles.cardTitle}>
          <span>📶 4. Operación sin Internet en la Finca (Modo Rural)</span>
        </h3>
        <ul className={styles.ruleList} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <li>
            <strong>1. Registro Automático:</strong> Puedes dictar notas de voz o trazar tablones sin conexión; el teléfono guarda todo en su memoria interna (IndexedDB).
          </li>
          <li>
            <strong>2. Sincronización Segura:</strong> Al regresar a la casa de hacienda con señal WiFi o celular, los datos se sincronizan solos sin perder nada.
          </li>
        </ul>
      </div>

      {/* Pie de Página */}
      <div className={styles.sheetFooter}>
        <span>Agrotech Venezuela • Código Abierto con Licencia MIT • Datos MapBiomas CC BY 4.0</span>
        <span>Recomendación: Plastificar y guardar en la cabina del tractor</span>
      </div>
    </div>
  );
}
