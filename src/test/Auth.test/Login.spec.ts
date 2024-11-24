import app from '../../app';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import { obtainUserRepo } from '../../repository';
import bcrypt from "bcrypt";

jest.mock('../../repository');

const request = supertest(app);

describe('[/login]', () => {
  describe('login', () => {
    it('should login a user', async () => {
      const expectedStatusCode = 200;
      const expectedMessage = "Login successful";

      const passwordfaker = faker.internet.password();
      const mailfaker = faker.internet.email();
      const passwordHash = await bcrypt.hash(passwordfaker, 10);

      // Config data
      (obtainUserRepo as jest.Mock).mockResolvedValue({
        mail: mailfaker,
        password: passwordHash,
      })

      const reqbody = {
        mail: mailfaker,
        password: passwordfaker,
      }

      const response = await request.post('/login').send(reqbody);

      expect(response.status).toBe(expectedStatusCode);
      expect(response.body.message).toBe(expectedMessage);
    });
  });
})

