import { NextResponse } from 'next/server';
import { DEMO_USERS, hashPassword, UserSession } from '@/lib/auth/authUtils';


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, role = 'FARMER', phone, stateId } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Nombre, email y contraseña requeridos' }, { status: 400 });
    }

    const existingUser = DEMO_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return NextResponse.json({ error: 'El email ya se encuentra registrado' }, { status: 409 });
    }

    const newUser: UserSession & { passwordHash: string } = {
      id: `usr-${Date.now()}`,
      email,
      name,
      role: role as 'FARMER' | 'AGRONOMIST' | 'ADMIN',
      status: 'PENDING', // Requiere aprobación del Administrador
      phone,
      stateId,
      passwordHash: hashPassword(password)
    };

    DEMO_USERS.push(newUser);

    return NextResponse.json({
      success: true,
      message: 'Registro exitoso. Tu cuenta está pendiente de aprobación por el Administrador.',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        status: newUser.status,
        phone: newUser.phone,
        stateId: newUser.stateId
      }
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error al registrar usuario' }, { status: 500 });
  }
}
