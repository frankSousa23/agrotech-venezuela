"use client";

import React, { useState } from 'react';
import { Download, Code, Globe, FileCode, Check, Copy, ExternalLink, Sparkles } from 'lucide-react';

export default function MapBiomasExportHub() {
  const [selectedLang, setSelectedLang] = useState<'curl' | 'python' | 'js'>('curl');
  const [copied, setCopied] = useState(false);

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://agrotech.venezuela.org';

  const snippets = {
    curl: `# 1. Consulta edafológica por coordenadas (Polo de Turén, Portuguesa)
curl -X GET "${baseUrl}/api/v1/soil/point?lat=9.324&lon=-69.112" \\
     -H "Accept: application/json"

# 2. Descarga del catálogo nacional de suelos en GeoJSON
curl -O "${baseUrl}/api/v1/soil/export/geojson"`,

    python: `import requests

# Consulta de física de suelos Saxton-Rawls y dosis Kamprath
url = "${baseUrl}/api/v1/soil/point"
params = {"lat": 9.324, "lon": -69.112}

response = requests.get(url, params=params)
soil_data = response.json()

print(f"Textura: {soil_data['data']['interpolated']['texture']}")
print(f"PAW Hídrico: {soil_data['data']['hydraulics']['plantAvailableWaterPct']}%")
print(f"Enmienda: {soil_data['data']['recommendations']['notes']}")`,

    js: `// Consulta federada desde JavaScript / Node.js
async function fetchSoilDiagnosis(lat, lon) {
  const res = await fetch(\`${baseUrl}/api/v1/soil/point?lat=\${lat}&lon=\${lon}\`, {
    headers: { 'Accept': 'application/json' }
  });
  const { data } = await res.json();
  
  console.log("Capacidad de Campo:", data.hydraulics.fieldCapacityTheta);
  console.log("Dosis Cal Kamprath:", data.recommendations.limeTonsPerHa, "t/ha");
  return data;
}

fetchSoilDiagnosis(9.324, -69.112);`
  };

  const handleCopy = (text: string) => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const iframeSnippet = `<iframe 
  src="${baseUrl}/embed/soil-module?lat=9.324&lon=-69.112&theme=dark" 
  width="100%" 
  height="450" 
  frameborder="0"
  style="border-radius: 12px; border: 1px solid rgba(255,255,255,0.1);">
</iframe>`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Tarjetas de Descarga y Formatos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
        {/* GeoJSON FeatureCollection */}
        <div className="glass-panel" style={{ padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Globe size={18} color="#06b6d4" />
              <h4 style={{ margin: 0, fontSize: '0.95rem' }}>GeoJSON RFC 7946</h4>
            </div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.4 }}>
              Catálogo completo con 1.245 perfiles georreferenciados, atributos Saxton-Rawls y dosis Kamprath para QGIS o ArcGIS.
            </p>
          </div>
          <div style={{ marginTop: '14px' }}>
            <a href="/api/v1/soil/export/geojson" download className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem', padding: '8px' }}>
              <Download size={14} />
              <span>Descargar GeoJSON</span>
            </a>
          </div>
        </div>

        {/* Script Google Earth Engine */}
        <div className="glass-panel" style={{ padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <FileCode size={18} color="#10b981" />
              <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Google Earth Engine</h4>
            </div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.4 }}>
              Módulo JavaScript (<code>mapbiomas_soil_engine.js</code>) para procesar rásteres en el GEE Code Editor de MapBiomas.
            </p>
          </div>
          <div style={{ marginTop: '14px' }}>
            <a href="/api/v1/soil/export/gee-script" download className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem', padding: '8px' }}>
              <Download size={14} />
              <span>Descargar Script GEE</span>
            </a>
          </div>
        </div>

        {/* CSV Tabular Tradicional */}
        <div className="glass-panel" style={{ padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Download size={18} color="#f59e0b" />
              <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Matriz CSV / Excel</h4>
            </div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.4 }}>
              Planilla tabular de fertilidad y análisis de laboratorio para hojas de cálculo agronómicas.
            </p>
          </div>
          <div style={{ marginTop: '14px' }}>
            <a href="/api/export/stats?format=csv" download className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem', padding: '8px' }}>
              <Download size={14} />
              <span>Descargar CSV</span>
            </a>
          </div>
        </div>
      </div>

      {/* Snippet para Embeber en MapBiomas */}
      <div className="glass-panel" style={{ padding: '16px', borderRadius: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="#38bdf8" />
            <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Código Embebible para venezuela.mapbiomas.org</h4>
          </div>
          <button
            type="button"
            className="btn-secondary"
            style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            onClick={() => handleCopy(iframeSnippet)}
          >
            {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
            <span>{copied ? 'Copiado' : 'Copiar Iframe'}</span>
          </button>
        </div>
        <pre style={{ margin: 0, padding: '12px', background: 'rgba(0,0,0,0.4)', borderRadius: '8px', fontSize: '0.78rem', color: '#94a3b8', overflowX: 'auto', fontFamily: 'monospace' }}>
          {iframeSnippet}
        </pre>
      </div>

      {/* Consola de Código API para Desarrolladores */}
      <div className="glass-panel" style={{ padding: '16px', borderRadius: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Code size={18} color="#a855f7" />
            <h4 style={{ margin: 0, fontSize: '0.95rem' }}>API REST Geoespacial Federada</h4>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            {(['curl', 'python', 'js'] as const).map(lang => (
              <button
                key={lang}
                type="button"
                className={selectedLang === lang ? 'btn-primary' : 'btn-secondary'}
                style={{ fontSize: '0.75rem', padding: '3px 9px', textTransform: 'uppercase' }}
                onClick={() => setSelectedLang(lang)}
              >
                {lang}
              </button>
            ))}
            <button
              type="button"
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '3px 9px' }}
              onClick={() => handleCopy(snippets[selectedLang])}
            >
              <Copy size={13} />
            </button>
          </div>
        </div>
        <pre style={{ margin: 0, padding: '14px', background: 'rgba(0,0,0,0.5)', borderRadius: '8px', fontSize: '0.8rem', color: '#cbd5e1', overflowX: 'auto', fontFamily: 'monospace', lineHeight: 1.5 }}>
          {snippets[selectedLang]}
        </pre>
      </div>
    </div>
  );
}
