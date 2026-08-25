import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/authUtils';

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const session = verifyToken(token);

    if (!session) {
      return NextResponse.json({ error: 'Token inválido o expirado' }, { status: 401 });
    }

    return NextResponse.json({ user: session });
  } catch (error) {
    return NextResponse.json({ error: 'Error al verificar sesión' }, { status: 500 });
  }
}
