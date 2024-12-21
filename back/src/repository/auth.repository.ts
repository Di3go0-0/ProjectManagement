import { PrismaClient } from "@prisma/client";
import { getUserId } from "../helpers";
import bcrypt from "bcrypt";
import type { IUser } from "../interfaces";

const prisma = new PrismaClient();

interface RegisterProps {
  mail: string;
  name: string;
  password: string;
}

export const registerRepo = async ({ mail, name, password, }: RegisterProps): Promise<IUser | null> => {
  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { mail, name, password: passwordHash },
    });
    if (!user) return null;
    return user;
  } catch {
    return null;
  }
};

export const obtainUserRepo = async (mail: string): Promise<IUser | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        mail: mail,
      },
    });
    if (!user) return null;
    return user;
  } catch {
    return null;
  }
};

export const obtainUserByIdRepo = async (id: number): Promise<IUser | null> => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: id }
    })
    if (!user) return null;
    return user;
  } catch (e) {
    return null;
  }
}
