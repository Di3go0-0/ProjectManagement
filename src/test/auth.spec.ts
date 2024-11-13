import app from '../app';
import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import { registerRepo, obtainUserRepo } from '../repository';
import bcrypt from "bcrypt";

jest.mock('../repository');

let request = supertest(app);

describe('[/register]', () => {
  describe('register', () => {
    it('should register a new user', async () => {
      const expectedStatusCode = 201;
      const expectedMessage = "User created syccessfully";


      // fake data
      const passwordfaker = faker.internet.password();
      const mailfaker = faker.internet.email();
      const namefaker = faker.person.firstName();


      // Config data
      (registerRepo as jest.Mock).mockResolvedValue({
        mail: mailfaker,
        name: namefaker,
        password: passwordfaker,
      })

      const reqbody = {
        name: namefaker,
        mail: mailfaker,
        password: passwordfaker,
        confirmPassword: passwordfaker,
      }

      const response = await request.post('/register').send(reqbody);

      expect(response.status).toBe(expectedStatusCode);
      expect(response.body.message).toBe(expectedMessage);

    });
  });
});


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

// describe('Register', () => {
//   test('should return 400 if email is not provided', async () => {
//     const expected = 400;
//     const result = 400;
//
//     expect(result).toBe(expected);
//   })
// });
