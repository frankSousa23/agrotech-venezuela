import { NextResponse } from 'next/server';
import { DEMO_USERS, verifyPassword, generateToken } from '@/lib/auth/authUtils';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: 'Email y contraseña requeridos' }, { status: 400 });
    }

    const user = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user || !verifyPassword(password, user.passwordHash)) {
      return NextResponse.json({ error: 'Credenciales inválidas' }, { status: 401 });
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
        phone: user.phone,
        stateId: user.stateId
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Error interno en autenticación' }, { status: 500 });
  }
}
