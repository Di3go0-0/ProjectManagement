import app from "../../app";
import supertest from "supertest";
import { generateToken } from "../../helpers";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../../helpers";
import { faker } from "@faker-js/faker";
import { obtainUserRepo } from "../../repository";

// Mockeamos
jest.mock("@prisma/client", () => {
  const mUser = {
    findUnique: jest.fn(),
  };

  return {
    PrismaClient: jest.fn(() => ({
      user: mUser,
    })),
  };
})

jest.mock('../../repository', () => ({
  obtainUserRepo: jest.fn(),
}));

jest.mock('../../helpers');

const request = supertest(app);
const prisma = new PrismaClient();

describe('[/validate]', () => {
  describe('validateUser', () => {
    it('should return "No Token Found" if no cookie', async () => {
      const expectedStatusCode = 400;
      const expectedMessage = "No token found by middleware"; // Ajuste aquí

      const response = await request.post('/validate');

      expect(response.status).toBe(expectedStatusCode);
      expect(response.body.message).toBe(expectedMessage);
    });
    it('should return "Validation successful" to a user', async () => {
      const expectedStatusCode = 200;
      const expectedMessage = "Validation successful";

      const mailFaker = faker.internet.email();

      const fakeUser = {
        id: faker.number.int(),
        mail: mailFaker,
        name: faker.person.firstName(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const token = generateToken(fakeUser);

      (verifyToken as jest.Mock).mockResolvedValue(fakeUser);
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(fakeUser);

      // Mockeamos el retorno de obtainUserRepo
      (obtainUserRepo as jest.Mock).mockResolvedValue(fakeUser);

      const response = await request
        .post('/validate')
        .set('Cookie', `token=${token}`);

      expect(response.status).toBe(expectedStatusCode);
      expect(response.body.message).toBe(expectedMessage);
      expect(response.body.data).toBe(mailFaker)
    })

  })
})
