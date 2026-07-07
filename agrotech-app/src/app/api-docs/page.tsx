"use client";

import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import swaggerSpec from '@/lib/swagger.json';

// Cargamos dinámicamente Swagger UI para evitar errores de hidratación de React y problemas con window
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function ApiDocs() {
  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh', padding: '1rem' }}>
      <SwaggerUI spec={swaggerSpec} />
    </div>
  );
}
