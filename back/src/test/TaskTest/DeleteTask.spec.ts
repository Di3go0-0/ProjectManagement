import app from "../../app";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import { deleteTaskRepo } from "../../repository";
import { AuthenticatedUser, TaskById } from "../HelperTest";

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
  deleteTaskRepo: jest.fn(),
  obtainUserRepo: jest.fn(),
}));

const request = supertest(app);

const clearMocks = () => {
  jest.clearAllMocks()
}


describe('DELETE /task/:id', () => {
  describe('Delete Project', () => {
    it('should return 400 and error message if no token is provided', async () => {
      const expectedStatusCode = 400;
      const expectedMessage = "No token found by middleware";

      const response = await request.delete('/task/1');

      expect(response.status).toBe(expectedStatusCode);
      expect(response.body.message).toBe(expectedMessage);

      clearMocks()
    })
    it('Should return 201 and message "Task Deleted Succesfully"', async () => {
      const expectedStatusCode = 201;
      const expectedMessage = "Task deleted successfully";

      const userId = faker.number.int();
      const projectId = faker.number.int();

      const pojectDeleted = TaskById(projectId, userId);

      const token = AuthenticatedUser(userId);

      (deleteTaskRepo as jest.Mock).mockResolvedValue(pojectDeleted)

      const response = await request
        .delete(`/task/${projectId}`)
        .set('Cookie', `token=${token}`)

      expect(response.status).toBe(expectedStatusCode);
      expect(response.body.message).toBe(expectedMessage);

      clearMocks()
    })


  })
})
