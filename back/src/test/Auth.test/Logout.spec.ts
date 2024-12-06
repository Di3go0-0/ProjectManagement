import app from '../../app';
import supertest from 'supertest';
import { generateToken } from '../../helpers';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '../../helpers';
import { faker } from '@faker-js/faker';

// Mockeamos el cliente de Prisma completo
jest.mock('@prisma/client', () => {
  const mUser = {
    findUnique: jest.fn(),  // Mockeamos findUnique
  };

  return {
    PrismaClient: jest.fn(() => ({
      user: mUser,  // Asignamos el mock de user
    })),
  };
});

jest.mock('../../repository');
jest.mock('../../helpers');

const request = supertest(app);
const prisma = new PrismaClient();


describe('[/logout]', () => {
  describe('logout', () => {
    it('should return "No Token Found" if no cookie', async () => {
      const expectedStatusCode = 400;
      const expectedMessage = "No token found by middleware"; // Ajuste aquí

      const response = await request.post('/logout');

      expect(response.status).toBe(expectedStatusCode);
      expect(response.body.message).toBe(expectedMessage);
    });

    it('should clear the token in cookie and return "Logout successful"', async () => {
      // Configuración de usuario y token de prueba
      const fakeUser = {
        id: faker.number.int(),
        mail: faker.internet.email(),
        name: faker.person.firstName(),  // Cambiado para evitar la deprecación
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const token = generateToken(fakeUser);

      // Mockeamos verifyToken para que devuelva el fakeUser cuando se le pase el token
      (verifyToken as jest.Mock).mockResolvedValue(fakeUser);

      // Mockeamos findUnique para que devuelva el fakeUser
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(fakeUser);

      // Hacemos la petición al endpoint /logout con el token en la cookie
      const response = await request
        .post('/logout')
        .set('Cookie', `token=${token}`);

      // Verificaciones
      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Logout successful");
      expect(response.headers['set-cookie'][0]).toMatch(/token=;/); // Verifica si el token se eliminó

      // Asegurarse de que el método fue llamado con los parámetros correctos
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: fakeUser.id } });
    });

  });
});
