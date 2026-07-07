import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Implementación de RBAC (Role-Based Access Control)
export function middleware(request: NextRequest) {
  // En un sistema real, aquí decodificaríamos el JWT o sesión (ej. con NextAuth)
  // Por ahora, leemos una cookie simulada, o asumimos un rol por defecto.
  const mockUserRole = request.cookies.get('user_role')?.value || 'AGRONOMIST'; 
  
  // 1. Proteger el Dashboard
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (mockUserRole === 'GUEST') {
      // En producción, si no hay sesión, se redirige al login
      // return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // 2. Proteger la API de modificaciones (CRUD)
  // Todas las peticiones que NO sean GET (ej: POST, PUT, DELETE) requieren permisos.
  if (request.nextUrl.pathname.startsWith('/api') && request.method !== 'GET') {
    // Un productor solo puede consultar datos, no editarlos.
    if (mockUserRole === 'PRODUCER' || mockUserRole === 'GUEST') {
      return NextResponse.json(
        { error: 'Acceso Denegado. Se requieren permisos de Ingeniero Agrónomo o Administrador.' }, 
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  // Definir las rutas donde actuará el middleware
  matcher: ['/dashboard/:path*', '/api/:path*'],
}
