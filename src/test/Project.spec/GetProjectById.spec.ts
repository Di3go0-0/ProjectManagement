import app from "../../app";
import supertest from "supertest";
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { getProjectByIdRepo } from "../../repository";
import { AuthenticatedUser } from "../HelperTest/AuthenticatedUser";


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
  getProjectByIdRepo: jest.fn(),
  obtainUserRepo: jest.fn(),
}));

const request = supertest(app);
const prisma = new PrismaClient();

const clearMocks = () => {
  jest.clearAllMocks()
}

interface IProject {
  id: number;
  title: string;
  description: string;
  userId: number;
  createdAt: string,
  updatedAt: string,
}

const formatDateToISOString = (date: Date) => {
  // Redondea la fecha a segundos eliminando los milisegundos
  return new Date(Math.floor(date.getTime() / 1000) * 1000).toISOString();
};

const Project = (Id: number, userId: number): IProject => ({
  id: Id,
  title: faker.lorem.words(),
  description: faker.lorem.sentence(),
  userId: userId,
  createdAt: formatDateToISOString(new Date()),
  updatedAt: formatDateToISOString(new Date()),
})

describe(' GET /projects/:id', () => {
  describe('When the user is not authenticated', () => {
    it('should return 400 and an error message if no token is provided', async () => {
      const response = await request.get('/project/1');
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('No token found by middleware');
    })

    it('should return 200 and a project for an authenticated user', async () => {
      const userId = faker.number.int();
      const projectId = faker.number.int();
      const expectedStatusCode = 200;
      const expectBody = Project(projectId, userId);

      const token = await AuthenticatedUser(userId);

      (getProjectByIdRepo as jest.Mock).mockResolvedValue(expectBody);

      const response = await request
        .get(`/project/${projectId}`)
        .set('Cookie', `token=${token}`);

      expect(response.status).toBe(expectedStatusCode);
      expect(response.body).toEqual(expectBody);

      clearMocks();

    })
  })
})



