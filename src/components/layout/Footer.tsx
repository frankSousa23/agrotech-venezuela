'use client';

import React from 'react';
import Link from 'next/link';
import { Sprout, ShieldCheck, Scale, ExternalLink } from 'lucide-react';

interface FooterProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function Footer({ className, style }: FooterProps) {
  return (
    <footer 
      className={className} 
      style={{
        background: 'rgba(11, 19, 41, 0.95)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '2rem 1.5rem 1.5rem',
        color: 'var(--text-muted, #94a3b8)',
        fontSize: '0.85rem',
        ...style
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '2rem',
        marginBottom: '1.5rem'
      }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: 800, marginBottom: '0.6rem' }}>
            <Sprout size={20} color="#10b981" />
            <span style={{ fontSize: '1.1rem' }}>Agrotech Venezuela</span>
          </div>
          <p style={{ margin: 0, lineHeight: 1.5, fontSize: '0.8rem', color: '#94a3b8' }}>
            Inteligencia Agro-Territorial con datos abiertos de MapBiomas Venezuela, radar SAR Sentinel-1 y agroclima NASA POWER. Ciencia abierta y soberanía alimentaria.
          </p>
        </div>

        {/* Legal & Governance */}
        <div>
          <div style={{ color: '#f8fafc', fontWeight: 700, marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Scale size={16} color="#38bdf8" />
            Gobernanza & Marco Legal
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem' }}>
            <li>
              <Link 
                href="/docs/DATA_PROVENANCE_AND_LEGAL_FRAMEWORK.md" 
                target="_blank"
                style={{ color: '#38bdf8', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
              >
                <ShieldCheck size={13} /> Procedencia de Datos & Marco Legal
              </Link>
            </li>
            <li>
              <a 
                href="https://dataspace.copernicus.eu" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#94a3b8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                Copernicus Sentinel (Reglamento UE 1159/2013) <ExternalLink size={11} />
              </a>
            </li>
            <li>
              <a 
                href="https://power.larc.nasa.gov" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#94a3b8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                NASA POWER (NPD 2230.1 / Open Science) <ExternalLink size={11} />
              </a>
            </li>
            <li>
              <a 
                href="https://venezuela.mapbiomas.org" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#94a3b8', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                MapBiomas Venezuela (Licencia CC BY 4.0) <ExternalLink size={11} />
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <div style={{ color: '#f8fafc', fontWeight: 700, marginBottom: '0.6rem' }}>Accesos Rápidos</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem' }}>
            <li><Link href="/dashboard" style={{ color: '#94a3b8', textDecoration: 'none' }}>Dashboard Principal</Link></li>
            <li><Link href="/dashboard/postulacion" style={{ color: '#94a3b8', textDecoration: 'none' }}>Expediente & Documentación TRL 4</Link></li>
            <li><Link href="/dashboard/mapa" style={{ color: '#94a3b8', textDecoration: 'none' }}>Visor Cartográfico WebGIS</Link></li>
            <li><Link href="/api-docs" style={{ color: '#94a3b8', textDecoration: 'none' }}>Documentación OpenAPI 3.0</Link></li>
          </ul>
        </div>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        paddingTop: '1rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.5rem',
        fontSize: '0.75rem',
        color: '#64748b'
      }}>
        <span>© 2024–2026 Agrotech Venezuela • Frank Alfonso Sousa Mota (Licencia MIT)</span>
        <span>Copernicus Sentinel-1/2 • NASA POWER • MapBiomas Venezuela 3.0</span>
      </div>
    </footer>
  );
}
