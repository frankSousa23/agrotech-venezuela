import { NextResponse } from 'next/server';
import { DEMO_USERS, GUEST_USER, verifyPassword, generateToken } from '@/lib/auth/authUtils';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, isGuest } = body;

    // 1. Acceso Invitado (1-Click Guest Login)
    if (isGuest) {
      const token = generateToken(GUEST_USER);
      return NextResponse.json({
        success: true,
        token,
        user: GUEST_USER
      });
    }

    // 2. Validación de credenciales
    if (!email || !password) {
      return NextResponse.json({ error: 'Email y contraseña requeridos' }, { status: 400 });
    }

    const user = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
    }

    // 3. Control de Estado de Aprobación
    if (user.status === 'PENDING') {
      return NextResponse.json({ 
        error: 'Tu cuenta está pendiente de aprobación por el Administrador. Te notificaremos una vez sea validada.',
        status: 'PENDING'
      }, { status: 403 });
    }

    if (user.status === 'REJECTED') {
      return NextResponse.json({ 
        error: 'Tu solicitud de acceso ha sido rechazada por el Administrador.',
        status: 'REJECTED'
      }, { status: 403 });
    }

    const token = generateToken(user);
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        status: user.status,
        phone: user.phone,
        stateId: user.stateId
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error interno en autenticación' }, { status: 500 });
  }
}

