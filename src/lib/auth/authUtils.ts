import crypto from 'crypto';

export interface UserSession {
  id: string;
  email: string;
  name: string;
  role: 'FARMER' | 'AGRONOMIST' | 'ADMIN';
  phone?: string;
  stateId?: string;
}

const JWT_SECRET = process.env.JWT_SECRET || 'agrotech_venezuela_secure_secret_key_2026';

export function hashPassword(password: string): string {
  return crypto.createHmac('sha256', JWT_SECRET).update(password).digest('hex');
}

export function verifyPassword(password: string, hash: string): boolean {
  const calculated = hashPassword(password);
  return calculated === hash;
}

export function generateToken(user: UserSession): string {
  const payload = {
    ...user,
    exp: Date.now() + 1000 * 60 * 60 * 24 * 7 // 7 días
  };
  const base64Payload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(base64Payload).digest('base64url');
  return `${base64Payload}.${signature}`;
}

export function verifyToken(token: string): UserSession | null {
  try {
    const [base64Payload, signature] = token.split('.');
    if (!base64Payload || !signature) return null;

    const expectedSignature = crypto.createHmac('sha256', JWT_SECRET).update(base64Payload).digest('base64url');
    if (signature !== expectedSignature) return null;

    const payload = JSON.parse(Buffer.from(base64Payload, 'base64url').toString('utf8'));
    if (payload.exp && payload.exp < Date.now()) return null;

    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      role: payload.role,
      phone: payload.phone,
      stateId: payload.stateId
    };
  } catch (err) {
    return null;
  }
}

// Usuarios iniciales del sistema para acceso inmediato
export const DEMO_USERS: (UserSession & { passwordHash: string })[] = [
  {
    id: "usr-farmer-01",
    email: "productor@agrotech.ve",
    name: "Frank Sousa (Productor Agrícola)",
    role: "FARMER",
    phone: "+58 412 1234567",
    stateId: "portuguesa",
    passwordHash: hashPassword("Agro2026*")
  },
  {
    id: "usr-agronomist-01",
    email: "agronomo@agrotech.ve",
    name: "Ing. Agr. Carlos Mendoza (Asesor Técnico)",
    role: "AGRONOMIST",
    phone: "+58 414 7654321",
    stateId: "guarico",
    passwordHash: hashPassword("Agro2026*")
  },
  {
    id: "usr-admin-01",
    email: "admin@agrotech.ve",
    name: "Administrador Agrotech",
    role: "ADMIN",
    phone: "+58 416 9998877",
    stateId: "portuguesa",
    passwordHash: hashPassword("Agro2026*")
  }
];
