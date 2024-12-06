import app from "../../app";
import supertest from "supertest";
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { getAllTasksRepo } from "../../repository";
import { AuthenticatedUser, TaskList } from "../HelperTest";


jest.mock('../../helpers', () => ({
  generateToken: jest.fn(),
  verifyToken: jest.fn(),
  getUserId: jest.fn(),
}));


jest.mock("@prisma/client", () => {
  const mUser = {
    findUnique: jest.fn(),
  }
  const mTask = {
    findMany: jest.fn(),
  };

  return {
    PrismaClient: jest.fn(() => ({
      user: mUser,
      project: mTask,
    })),
  };
})

jest.mock('../../repository', () => ({
  getAllTasksRepo: jest.fn(),
  obtainUserRepo: jest.fn(),
}))

const request = supertest(app);
const prisma = new PrismaClient();

const clearMocks = () => {
  jest.clearAllMocks()
}


describe(' GET /task - Get All Tasks', () => {
  describe('getAllTasks', () => {
    it('should return 400 and an error message if no token is provided', async () => {
      const expectedStatusCode = 400;
      const expectedMessage = "No token found by middleware"; // Ajuste aquí

      const response = await request.get('/task')

      expect(response.status).toBe(expectedStatusCode)
      expect(response.body.message).toBe(expectedMessage)

      clearMocks()
    })
    it('should return 200 and a list of tasks for an authenticated user', async () => {
      const fakerId = faker.number.int()
      const fakerProjectId = faker.number.int()
      const expectedStatusCode = 200;
      const expectedBody = TaskList(fakerId, fakerProjectId)

      const token = AuthenticatedUser(fakerId);

      (getAllTasksRepo as jest.Mock).mockResolvedValue(expectedBody)

      const response = await request
        .get('/task')
        .set('Cookie', `token=${token}`);

      expect(response.status).toBe(expectedStatusCode)
      expect(response.body).toEqual(expectedBody)

      clearMocks()

    })
  })
})










