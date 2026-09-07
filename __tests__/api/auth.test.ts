import { hashPassword, verifyPassword, generateToken, verifyToken, DEMO_USERS } from '@/lib/auth/authUtils';

describe('Auth Cryptographic & Session Suite', () => {
  it('debe generar hashes criptográficos consistentes para contraseñas', () => {
    const pwd = 'MiPasswordSeguro2026*';
    const hash1 = hashPassword(pwd);
    const hash2 = hashPassword(pwd);

    expect(hash1).toBe(hash2);
    expect(verifyPassword(pwd, hash1)).toBe(true);
    expect(verifyPassword('PasswordEquivocado', hash1)).toBe(false);
  });

  it('debe generar y verificar tokens de sesión JWT válidos', () => {
    const userSession = {
      id: 'usr-test-123',
      email: 'test@agrotech.ve',
      name: 'Tester Agrónomo',
      role: 'AGRONOMIST' as const,
      status: 'APPROVED' as const,
      phone: '+58 412 0000000',
      stateId: 'portuguesa'
    };

    const token = generateToken(userSession);
    expect(typeof token).toBe('string');
    expect(token.includes('.')).toBe(true);

    const verified = verifyToken(token);
    expect(verified).not.toBeNull();
    expect(verified?.id).toBe('usr-test-123');
    expect(verified?.email).toBe('test@agrotech.ve');
    expect(verified?.role).toBe('AGRONOMIST');
  });

  it('debe rechazar tokens manipulados o alterados', () => {
    const token = generateToken({
      id: 'usr-fake',
      email: 'fake@agrotech.ve',
      name: 'Fake User',
      role: 'FARMER',
      status: 'APPROVED'
    });

    const tamperedToken = token + 'tampered';
    const result = verifyToken(tamperedToken);
    expect(result).toBeNull();
  });

  it('debe incluir los perfiles demo requeridos por el sistema con sus estados', () => {
    expect(DEMO_USERS.length).toBeGreaterThanOrEqual(3);
    const farmer = DEMO_USERS.find(u => u.role === 'FARMER' && u.status === 'APPROVED');
    const agronomist = DEMO_USERS.find(u => u.role === 'AGRONOMIST');
    const admin = DEMO_USERS.find(u => u.role === 'ADMIN');
    const pendingFarmer = DEMO_USERS.find(u => u.status === 'PENDING');

    expect(farmer).toBeDefined();
    expect(agronomist).toBeDefined();
    expect(admin).toBeDefined();
    expect(pendingFarmer).toBeDefined();
  });

  it('debe generar y verificar tokens para el usuario Invitado (1-Click Guest)', () => {
    const guestUser = {
      id: 'usr-guest-demo',
      email: 'invitado@agrotech.ve',
      name: 'Usuario Invitado',
      role: 'FARMER' as const,
      status: 'GUEST' as const,
      isGuest: true
    };

    const token = generateToken(guestUser);
    const verified = verifyToken(token);

    expect(verified).not.toBeNull();
    expect(verified?.status).toBe('GUEST');
    expect(verified?.isGuest).toBe(true);
  });

  it('debe validar la autenticación exitosa para todos los roles demostrativos', () => {
    const rolesToTest = ['productor@agrotech.ve', 'agronomo@agrotech.ve', 'admin@agrotech.ve', 'solicitante.turen@agrotech.ve'];
    
    rolesToTest.forEach(email => {
      const user = DEMO_USERS.find(u => u.email === email);
      expect(user).toBeDefined();
      if (user) {
        expect(verifyPassword('Agro2026*', user.passwordHash)).toBe(true);
        const token = generateToken(user);
        const verified = verifyToken(token);
        expect(verified?.email).toBe(email);
        expect(verified?.role).toBe(user.role);
        expect(verified?.status).toBe(user.status);
      }
    });
  });

  describe('Hardening de Entorno y Producción', () => {
    const originalEnv = process.env.NODE_ENV;
    const originalSecret = process.env.JWT_SECRET;

    afterEach(() => {
      (process.env as any).NODE_ENV = originalEnv;
      process.env.JWT_SECRET = originalSecret;
    });

    it('debe rechazar la generación de tokens en producción si no hay JWT_SECRET seguro configurado', () => {
      (process.env as any).NODE_ENV = 'production';
      delete process.env.JWT_SECRET;

      expect(() => {
        generateToken({
          id: 'usr-test',
          email: 'test@agrotech.ve',
          name: 'Test',
          role: 'FARMER',
          status: 'APPROVED'
        });
      }).toThrow(/FATAL: En producción se DEBE configurar la variable JWT_SECRET/);
    });

    it('debe permitir generación y verificación en producción cuando existe un JWT_SECRET explícito', () => {
      (process.env as any).NODE_ENV = 'production';
      process.env.JWT_SECRET = 'clave_produccion_ultra_segura_de_alta_entropia_2026';

      const token = generateToken({
        id: 'usr-prod',
        email: 'prod@agrotech.ve',
        name: 'Productor Prod',
        role: 'FARMER',
        status: 'APPROVED'
      });

      const verified = verifyToken(token);
      expect(verified?.id).toBe('usr-prod');
    });

    it('debe aislar el token demo (demo_jwt_token_frank) para que sea rechazado en producción', () => {
      // En entorno de test (actual), debe ser válido
      const testVerified = verifyToken('demo_jwt_token_frank');
      expect(testVerified?.id).toBe('usr-farmer-01');

      // En producción, debe ser rechazado
      (process.env as any).NODE_ENV = 'production';
      process.env.JWT_SECRET = 'clave_produccion_ultra_segura_de_alta_entropia_2026';
      const prodVerified = verifyToken('demo_jwt_token_frank');
      expect(prodVerified).toBeNull();
    });
  });
});
