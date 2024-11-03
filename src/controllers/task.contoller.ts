import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error getting Tasks" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  try {
    const tasks = await prisma.task.create({
      data: {
        title,
        description,
      },
    });
    res.status(201).json({ data: tasks, message: "Task created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
