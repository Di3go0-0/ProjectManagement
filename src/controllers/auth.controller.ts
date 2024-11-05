import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { generateToken, verifyToken } from "../helpers";
import { obtainUserRepo, registerRepo } from "../repository";
import { verifyPassword } from "../services";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { mail, name, password } = req.body;
  try {
    const user = await registerRepo({ mail, name, password });
    if (!user) {
      return res.status(400).json({ message: "Error creating user" });
    }
    res.status(201).json({ data: user, message: "User created syccessfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { mail, password } = req.body;
  try {
    const user = await obtainUserRepo(mail);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const userPassword = user.password as string;

    const passwordMatch = await verifyPassword({ password, userPassword });

    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken({ id: user.id, mail: user.mail });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging in" });
  }
};

export const logout = async (req: Request, res: Response) => {
  const cookie = req.cookies.token;
  if (!cookie) {
    res.status(400).json({ message: "No token found" });
    return;
  }
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};

export const validateUser = async (req: Request, res: Response) => {
  const cookie = req.cookies.token as string;
  if (!cookie) {
    res.status(400).json({ message: "No token found" });
    return;
  }

  const token = verifyToken(cookie);
  if (token === null) {
    res.status(400).json({ message: "Invalid token" });
    return;
  }

  try {
    const user = await obtainUserRepo(token.mail);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "Validation successful", data: user.mail });
  } catch (error) {
    res.status(500).json({ message: "Error validating user" });
  }
};
