import app from '../../app.ts'
import supertest from 'supertest'
import { faker } from '@faker-js/faker'
import { createTaskRepo, projectExists } from '../../repository'
import { AuthenticatedUser } from '../HelperTest/AuthenticatedUser'
import { CreateTask } from '../HelperTest'

jest.mock('../../helpers/', () => ({
  generateToken: jest.fn(),
  verifyToken: jest.fn(),
  getUserId: jest.fn(),
}))

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
  createTaskRepo: jest.fn(),
  projectExists: jest.fn(),
  obtainUserRepo: jest.fn(),
}));

const request = supertest(app);

const clearMocks = () => {
  jest.clearAllMocks()
}

describe(' POST /task', () => {
  describe('Create Task', () => {
    it('should return 400 and error message if no token is provided', async () => {
      const expectedStatusCode = 400;
      const expectedMessage = "No token found by middleware";

      const response = await request.post('/task');

      expect(response.status).toBe(expectedStatusCode);
      expect(response.body.message).toBe(expectedMessage);

      clearMocks()
    })

    it('should return 201 and message "Task Created successfully"', async () => {
      const expectedStatusCode = 201;
      const expectedMessage = "Task created successfully"

      const userId = faker.number.int();
      const title = faker.lorem.words();
      const description = faker.lorem.words();
      const projectId = faker.number.int();

      const task = CreateTask(title, description, userId, projectId);
      const token = AuthenticatedUser(userId);

      (projectExists as jest.Mock).mockResolvedValue(true);
      (createTaskRepo as jest.Mock).mockResolvedValue(task);

      const response = await request
        .post('/task')
        .set('Cookie', `token=${token}`)
        .send({ title, description, projectId })

      expect(response.status).toBe(expectedStatusCode);
      expect(response.body.message).toBe(expectedMessage);

      clearMocks()
    })

  })
})



