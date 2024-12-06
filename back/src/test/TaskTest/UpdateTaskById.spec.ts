import app from '../../app.ts'
import supertest from 'supertest'
import { faker } from '@faker-js/faker'
import { updateTaskRepo } from '../../repository'
import { AuthenticatedUser, UpdatedTask } from '../HelperTest'


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
  updateTaskRepo: jest.fn(),
  obtainUserRepo: jest.fn(),
}));

const request = supertest(app);

const clearMocks = () => {
  jest.clearAllMocks()
}

describe(' PUT /task', () => {
  describe('Create Project', () => {
    it('should return 400 and error message if no token is provided', async () => {
      const expectedStatusCode = 400;
      const expectedMessage = "No token found by middleware";

      const response = await request.post('/task');

      expect(response.status).toBe(expectedStatusCode);
      expect(response.body.message).toBe(expectedMessage);

      clearMocks()
    })

    it('should return 201 and message "Task updated successfully"', async () => {
      const expectedStatusCode = 201;
      const expectedMessage = "Task update successfully";

      const userId = faker.number.int();
      const taskId = faker.number.int();
      const projectId = faker.number.int();
      const title = faker.lorem.words();
      const description = faker.lorem.words();

      const taskUpdated = UpdatedTask(taskId, title, description, userId, projectId);

      const token = AuthenticatedUser(userId);

      (updateTaskRepo as jest.Mock).mockResolvedValue(taskUpdated)

      const response = await request
        .put(`/task/${taskId}`)
        .set('Cookie', `token=${token}`)
        .send({ title, description, projectId })

      expect(response.status).toBe(expectedStatusCode);
      expect(response.body.message).toBe(expectedMessage);

      clearMocks()
    })
  })
})



