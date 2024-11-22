import app from "../../app";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import { updateProjectRepo } from "../../repository";
import { AuthenticatedUser, UpdatedProject } from '../HelperTest'


jest.mock('../../helpers/', () => ({
  generateToken: jest.fn(),
  verifyToken: jest.fn(),
  getUserId: jest.fn(),
}))

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
  updateProjectRepo: jest.fn(),
  obtainUserRepo: jest.fn(),
}));

const request = supertest(app);

const clearMocks = () => {
  jest.clearAllMocks()
}

describe(' PUT /project/:id', () => {
  describe('Update Project', () => {
    it('should return 400 and error message if no token is provided', async () => {
      const expectedStatusCode = 400;
      const expectedMessage = "No token found by middleware";

      const response = await request.put('/project/1');

      expect(response.status).toBe(expectedStatusCode);
      expect(response.body.message).toBe(expectedMessage);

      clearMocks()
    })

    it('should return 201 and message "Project Updated Succesfully"', async () => {
      const expectedStatusCode = 201;
      const expectedMessage = "Project Updated Succesfully";

      const userId = faker.number.int();
      const title = faker.lorem.word();
      const description = faker.lorem.words();
      const projectId = faker.number.int();

      const projectUpdated = UpdatedProject(projectId, title, description, userId);

      const token = AuthenticatedUser(userId);

      (updateProjectRepo as jest.Mock).mockResolvedValue(projectUpdated)

      const response = await request
        .put(`/project/${projectId}`)
        .set('Cookie', `token=${token}`)
        .send({ title, description })

      expect(response.status).toBe(expectedStatusCode);
      expect(response.body.message).toBe(expectedMessage);

      clearMocks()
    })
  })
})
