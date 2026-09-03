import { NextResponse } from 'next/server';
import { DEMO_USERS, extractUserFromRequest } from '@/lib/auth/authUtils';

export async function GET(req: Request) {
  try {
    const session = extractUserFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'No autorizado. Se requiere token de sesión.' }, { status: 401 });
    }

    if (session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Acceso denegado. Se requiere rol de Administrador.' }, { status: 403 });
    }

    const users = DEMO_USERS.map(u => ({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role,
      status: u.status,
      phone: u.phone,
      stateId: u.stateId
    }));

    const stats = {
      total: users.length,
      pending: users.filter(u => u.status === 'PENDING').length,
      approved: users.filter(u => u.status === 'APPROVED').length,
      rejected: users.filter(u => u.status === 'REJECTED').length
    };

    return NextResponse.json({ users, stats });
  } catch (error) {
    return NextResponse.json({ error: 'Error al consultar lista de usuarios' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const session = extractUserFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: 'No autorizado. Se requiere token de sesión.' }, { status: 401 });
    }

    if (session.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Acceso denegado. Se requiere rol de Administrador.' }, { status: 403 });
    }

    const body = await req.json();
    const { userId, newStatus } = body;

    if (!userId || !newStatus) {
      return NextResponse.json({ error: 'userId y newStatus requeridos' }, { status: 400 });
    }

    const user = DEMO_USERS.find(u => u.id === userId);
    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
    }

    user.status = newStatus;

    return NextResponse.json({
      success: true,
      message: `Usuario ${user.name} actualizado a estado ${newStatus}`,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error al actualizar estado del usuario' }, { status: 500 });
  }
}
