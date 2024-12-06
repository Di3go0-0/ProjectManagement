import app from "../../app";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import { getTaskByIdRepo } from "../../repository";
import { AuthenticatedUser, TaskById } from "../HelperTest";

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
  getTaskByIdRepo: jest.fn(),
  obtainUserRepo: jest.fn(),
}));

const request = supertest(app);

const clearMocks = () => {
  jest.clearAllMocks()
}



describe(' GET /task/:id', () => {
  describe('Get Task by Id', () => {
    it('should return 400 and an error message if no token is provided', async () => {
      const response = await request.get('/task/1');
      expect(response.status).toBe(400);
      expect(response.body.message).toBe('No token found by middleware');
    })


    it('should return 200 and a task for an authenticated User', async () => {
      const userId = faker.number.int();
      const taskId = faker.number.int();
      const expectedStatusCode = 200;
      const expectBody = TaskById(taskId, userId);

      const token = await AuthenticatedUser(userId);

      (getTaskByIdRepo as jest.Mock).mockResolvedValue(expectBody);

      const response = await request
        .get(`/task/${taskId}`)
        .set('Cookie', `token=${token}`)

      expect(response.status).toBe(expectedStatusCode);
      expect(response.body).toEqual(expectBody);

      clearMocks();
    })


  })
})







