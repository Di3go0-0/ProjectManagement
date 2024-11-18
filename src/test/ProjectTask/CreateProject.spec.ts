import app from '../../app.ts'
import supertest from 'supertest'
import { faker } from '@faker-js/faker'
import { createProjectRepo } from '../../repository'
import { AuthenticatedUser } from '../HelperTest/AuthenticatedUser'
import { CreateProject } from '../HelperTest/Projects.ts'


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
  createProjectRepo: jest.fn(),
  obtainUserRepo: jest.fn(),
}));

const request = supertest(app);

const clearMocks = () => {
  jest.clearAllMocks()
}

describe(' POST /project', () => {
  describe('Create Project', () => {
    it('should return 400 and error message if no token is provided', async () => {
      const expectedStatusCode = 400;
      const expectedMessage = "No token found by middleware";

      const response = await request.post('/project');

      expect(response.status).toBe(expectedStatusCode);
      expect(response.body.message).toBe(expectedMessage);

      clearMocks()
    })

    it('should return 201 and message "Project Create"', async () => {
      const expectedStatusCode = 201;
      const expectedMessage = "Project created";

      const userId = faker.number.int();
      const title = faker.lorem.words();
      const description = faker.lorem.sentence();
      const project = CreateProject(title, description, userId);

      const token = AuthenticatedUser(userId);

      (createProjectRepo as jest.Mock).mockResolvedValue(project)

      const response = await request
        .post('/project')
        .set('Cookie', `token=${token}`)
        .send({ title, description })

      expect(response.status).toBe(expectedStatusCode);
      expect(response.body.message).toBe(expectedMessage);

      clearMocks()
    })
  })
})



