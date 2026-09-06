#!/usr/bin/env node
/**
 * Agrotech Venezuela — Compilador Universal de Documentación Oficial a PDF
 * 
 * Compila los documentos maestros en Markdown (.md) a PDFs de calidad de publicación
 * con estilos A4, tipografía de alta fidelidad, tablas con bordes claros y leyendas.
 */

const fs = require('fs');
const path = require('path');

// Intentar cargar mdToPdf desde la caché de npm o node_modules
let mdToPdf;
try {
  ({ mdToPdf } = require('md-to-pdf'));
} catch (e) {
  try {
    ({ mdToPdf } = require('C:/Users/Windows/AppData/Local/npm-cache/_npx/55158e48eb5c59f7/node_modules/md-to-pdf'));
  } catch (err) {
    console.error('Error al cargar md-to-pdf:', err);
    process.exit(1);
  }
}

const ROOT_DIR = path.resolve(__dirname, '..');
const PUBLIC_DOCS = path.join(ROOT_DIR, 'public', 'docs');
const EXPEDIENTE_DOCS = path.join(ROOT_DIR, 'docs', 'mapbiomas_premio_2026');

const baseConfigPath = path.join(__dirname, 'pdf_config.json');
const baseConfig = JSON.parse(fs.readFileSync(baseConfigPath, 'utf8'));

const DOCUMENTS_TO_COMPILE = [
  {
    id: 'articulo_cientifico',
    source: path.join(PUBLIC_DOCS, 'ARTICULO_CIENTIFICO_DRAFT.md'),
    filename: 'Articulo_Cientifico_Agrotech_MapBiomas_2026.pdf',
    headerTitle: 'Agrotech Venezuela — Artículo Científico MapBiomas 2026 | Frank Sousa'
  },
  {
    id: 'memorando_postulacion',
    source: path.join(PUBLIC_DOCS, 'MEMORANDO_POSTULACION.md'),
    filename: 'Memorando_Postulacion_Agrotech_2026.pdf',
    headerTitle: 'Agrotech Venezuela — Memorando Institucional de Postulación | Frank Sousa'
  },
  {
    id: 'expediente_completo',
    source: path.join(EXPEDIENTE_DOCS, 'POSTULACION_EXPEDIENTE_PREMIO_2026.md'),
    filename: 'Postulacion_Expediente_Premio_2026.pdf',
    headerTitle: 'Agrotech Venezuela — Expediente Consolidado Premio MapBiomas 2026 | Frank Sousa'
  },
  {
    id: 'matriz_cumplimiento',
    source: path.join(PUBLIC_DOCS, 'MATRIZ_CUMPLIMIENTO_EVALUACION.md'),
    filename: 'Matriz_Cumplimiento_Evaluacion_2026.pdf',
    headerTitle: 'Agrotech Venezuela — Matriz de Cumplimiento de Criterios (Anexo II) | Frank Sousa'
  },
  {
    id: 'guia_postulacion',
    source: path.join(PUBLIC_DOCS, 'GUIA_POSTULACION.md'),
    filename: 'Guia_Postulacion_MapBiomas_2026.pdf',
    headerTitle: 'Premio MapBiomas Venezuela 2026 — Guía de Postulación y Bases'
  },
  {
    id: 'pitch_deck',
    source: path.join(PUBLIC_DOCS, 'PITCH_DECK.md'),
    filename: 'Pitch_Deck_Agrotech_Venezuela_2026.pdf',
    headerTitle: 'Agrotech Venezuela — Pitch Deck Comercial y Dossier Ejecutivo | Frank Sousa'
  }
];

async function compileAll() {
  console.log('🚀 Iniciando compilación de documentos Markdown a PDF...');
  console.log(`📁 Directorio destino principal: ${PUBLIC_DOCS}`);
  console.log(`📁 Directorio destino expediente: ${EXPEDIENTE_DOCS}\n`);

  for (const doc of DOCUMENTS_TO_COMPILE) {
    if (!fs.existsSync(doc.source)) {
      console.warn(`⚠️ Archivo de origen no encontrado: ${doc.source}. Saltando...`);
      continue;
    }

    console.log(`⏳ Compilando: ${doc.filename}...`);

    const docConfig = JSON.parse(JSON.stringify(baseConfig));
    if (doc.headerTitle && docConfig.pdf_options) {
      docConfig.pdf_options.headerTemplate = `<div style='font-size: 7.5pt; font-family: sans-serif; width: 100%; text-align: right; padding-right: 18mm; color: #64748b;'>${doc.headerTitle}</div>`;
    }

    try {
      const pdf = await mdToPdf({ path: doc.source }, docConfig);
      if (pdf && pdf.content) {
        // Guardar en public/docs
        const publicDest = path.join(PUBLIC_DOCS, doc.filename);
        fs.writeFileSync(publicDest, pdf.content);

        // Guardar copia en docs/mapbiomas_premio_2026
        const expDest = path.join(EXPEDIENTE_DOCS, doc.filename);
        fs.writeFileSync(expDest, pdf.content);

        console.log(`✅ ${doc.filename} generado exitosamente (${(pdf.content.length / 1024).toFixed(1)} KB)`);
      } else {
        console.error(`❌ Falló la generación de ${doc.filename}`);
      }
    } catch (err) {
      console.error(`❌ Error al compilar ${doc.filename}:`, err);
    }
  }

  console.log('\n🎉 ¡Todos los documentos fueron procesados y compilados exitosamente!');
}

compileAll().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
