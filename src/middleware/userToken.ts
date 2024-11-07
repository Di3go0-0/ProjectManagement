import type { NextFunction, Response, Request } from "express";
import { verifyToken } from "../helpers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const userToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const cookie = req.cookies.token as string;
  if (!cookie) {
    res.status(400).json({ message: "No token found by middleware" });
    return;
  }

  const token = await verifyToken(cookie);
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: token.id },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (user.mail !== token.mail) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Error validating user" });
  }
};
