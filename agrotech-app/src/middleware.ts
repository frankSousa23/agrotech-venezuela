import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Implementación de RBAC (Role-Based Access Control)
export function middleware(request: NextRequest) {
  // Mockeamos la sesión. En producción esto vendría de JWT/NextAuth.
  const mockUserRole = request.cookies.get('user_role')?.value || 'AGRONOMIST'; 
  
  // Proteger la API de modificaciones (CRUD)
  // GET es lectura, permitido para todos (ADMIN, AGRONOMIST, PRODUCER)
  if (request.nextUrl.pathname.startsWith('/api') && request.method !== 'GET') {
    
    // Si no es admin ni agrónomo (es decir, productor o invitado), bloqueamos cualquier mutación
    if (mockUserRole === 'PRODUCER' || mockUserRole === 'GUEST') {
      return NextResponse.json(
        { error: 'Acceso Denegado. El Rol Productor solo tiene permisos de lectura y descarga.' }, 
        { status: 403 }
      );
    }

    // Si es un Agrónomo, puede crear (POST) o editar (PUT), pero el borrado (DELETE) es exclusivo del Admin
    if (request.method === 'DELETE' && mockUserRole !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Acceso Denegado. Solo los Administradores tienen permiso para eliminar registros.' }, 
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
}
