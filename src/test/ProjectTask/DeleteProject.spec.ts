import app from "../../app";
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import { deleteProjectRepo } from "../../repository";
import { AuthenticatedUser, ProjectId } from "../HelperTest";

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
  deleteProjectRepo: jest.fn(),
  obtainUserRepo: jest.fn(),
}));

const request = supertest(app);

const clearMocks = () => {
  jest.clearAllMocks()
}


describe('DELETE /project/:id', () => {
  describe('Delete Project', () => {
    it('should return 400 and error message if no token is provided', async () => {
      const expectedStatusCode = 400;
      const expectedMessage = "No token found by middleware";

      const response = await request.delete('/project/1');

      expect(response.status).toBe(expectedStatusCode);
      expect(response.body.message).toBe(expectedMessage);

      clearMocks()
    })

    it('Should return 201 and message "Project Deleted Succesfully"', async () => {
      const expectedStatusCode = 201;
      const expectedMessage = "Project Deleted Succesfully";

      const userId = faker.number.int();
      const projectId = faker.number.int();

      const pojectDeleted = ProjectId(projectId);

      const token = AuthenticatedUser(userId);

      (deleteProjectRepo as jest.Mock).mockResolvedValue(pojectDeleted)

      const response = await request
        .delete(`/project/${projectId}`)
        .set('Cookie', `token=${token}`)

      expect(response.status).toBe(expectedStatusCode);
      expect(response.body.message).toBe(expectedMessage);
    })


  })
})
