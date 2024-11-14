import app from "../../app";
import supertest from "supertest";
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { getAllProjectsRepo } from "../../repository";
import { generateToken, verifyToken, getUserId } from "../../helpers";
import { obtainUserRepo } from "../../repository";



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

const ProjectList = (userId: number): IProject[] => [
  {
    id: faker.number.int(),
    title: faker.lorem.words(),
    description: faker.lorem.words(),
    userId: userId,
    createdAt: formatDateToISOString(new Date()),
    updatedAt: formatDateToISOString(new Date()),
  },
  {
    id: faker.number.int(),
    title: faker.lorem.words(),
    description: faker.lorem.words(),
    userId: userId,
    createdAt: formatDateToISOString(new Date()),
    updatedAt: formatDateToISOString(new Date()),
  },
];





const AuthenticatedUser = (userID: number): string => {
  const mailFaker = faker.internet.email();

  const fakeUser = {
    id: userID,
    mail: mailFaker,
    name: faker.person.firstName(),
    password: faker.internet.password(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const token = generateToken(fakeUser);

  (verifyToken as jest.Mock).mockResolvedValue(fakeUser);
  (prisma.user.findUnique as jest.Mock).mockResolvedValue(fakeUser);

  (obtainUserRepo as jest.Mock).mockResolvedValue(fakeUser);
  (getUserId as jest.Mock).mockResolvedValue(userID);

  return token;
}

describe(' GET /project - Retrieve Projects', () => {
  describe('getAllProjects', () => {
    it('hould return 400 and an error message if no token is provided', async () => {
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
