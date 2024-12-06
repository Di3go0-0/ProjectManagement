import app from "../../app";
import supertest from "supertest";
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { getAllProjectsRepo } from "../../repository";
import { AuthenticatedUser, ProjectList } from "../HelperTest";



jest.mock('../../helpers', () => ({
  generateToken: jest.fn(),
  verifyToken: jest.fn(),
  getUserId: jest.fn(),
}));

jest.mock("@prisma/client", () => {
  const mUser = {
    findUnique: jest.fn(),
  }
  const mProject = {
    findMany: jest.fn(),
  };

  return {
    PrismaClient: jest.fn(() => ({
      user: mUser,
      project: mProject,
    })),
  };
})

jest.mock('../../repository', () => ({
  getAllProjectsRepo: jest.fn(),
  obtainUserRepo: jest.fn(),
}));

const request = supertest(app);
const prisma = new PrismaClient();

const clearMocks = () => {
  jest.clearAllMocks()
}

describe(' GET /project - Retrieve Projects', () => {
  describe('getAllProjects', () => {
    it('should return 400 and an error message if no token is provided', async () => {
      const expectedStatusCode = 400;
      const expectedMessage = "No token found by middleware"; // Ajuste aquí

      const response = await request.post('/validate');

      expect(response.status).toBe(expectedStatusCode);
      expect(response.body.message).toBe(expectedMessage);

      clearMocks()
    });

    it('should return 200 and a list of projects for an authenticated user', async () => {
      const fakerId = faker.number.int();
      const expectedStatusCode = 200;
      const expectedBody = ProjectList(fakerId);

      const token = AuthenticatedUser(fakerId);

      (getAllProjectsRepo as jest.Mock).mockResolvedValue(expectedBody);

      const response = await request
        .get('/project')
        .set('Cookie', `token=${token}`);

      expect(response.status).toBe(expectedStatusCode);
      expect(response.body).toEqual(expectedBody);

      clearMocks()
    })
  });
})
