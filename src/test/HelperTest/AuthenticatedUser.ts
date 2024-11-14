
import { faker } from '@faker-js/faker';
import { generateToken, verifyToken, getUserId } from "../../helpers";
import { PrismaClient } from "@prisma/client";
import { obtainUserRepo } from "../../repository";

const prisma = new PrismaClient();

export const AuthenticatedUser = async (userID: number): Promise<string> => {
  const mailFaker = faker.internet.email();

  const fakeUser = {
    id: userID,
    mail: mailFaker,
    name: faker.person.firstName(),
    password: faker.internet.password(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const token = generateToken({ id: fakeUser.id, mail: fakeUser.mail });
  // if (!token) throw new Error("Failed to generate token for user authentication");

  (verifyToken as jest.Mock).mockResolvedValue(fakeUser);
  (prisma.user.findUnique as jest.Mock).mockResolvedValue(fakeUser);

  (obtainUserRepo as jest.Mock).mockResolvedValue(fakeUser);
  (getUserId as jest.Mock).mockResolvedValue(userID);

  return token;
};
