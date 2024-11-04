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

export const getTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = await prisma.task.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error getting Task" });
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

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const task = await prisma.task.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        description,
      },
    });

    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    res.status(201).json({ data: task, message: "Task update successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.delete({
      where: {
        id: Number(id),
      },
    });
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    res.status(201).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const toggleTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.update({
      where: {
        id: Number(id),
      },
      data: {
        done: true,
      },
    });
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    res.status(201).json({ message: "toggleTask", data: task });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
