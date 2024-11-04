import type { Request, Response } from "express";
import {
  createTaskRepo,
  deleteTaskRepo,
  getAllTasksRepo,
  getTaskByIdRepo,
  toggleTaskRepo,
  updateTaskRepo,
} from "../repository";

export const getTasks = async (req: Request, res: Response) => {
  const cookie = req.cookies.token as string;
  try {
    const tasks = await getAllTasksRepo(cookie);
    res.status(200).json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error getting Tasks" });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const cookie = req.cookies.token as string;
  const taskId = Number(id);
  try {
    const task = await getTaskByIdRepo({ taskId, cookie });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error getting Task" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const cookie = req.cookies.token as string;
  try {
    const task = await createTaskRepo({ title, description, cookie });
    res.status(201).json({ data: task, message: "Task created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const cookie = req.cookies.token as string;
  const taskId = Number(id);
  try {
    const task = await updateTaskRepo({ taskId, title, description, cookie });
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
  const cookie = req.cookies.token as string;
  const taskId = Number(id);

  try {
    const task = await deleteTaskRepo({ taskId, cookie });
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
  const cookie = req.cookies.token as string;
  const taskId = Number(id);
  try {
    const task = await toggleTaskRepo({ taskId, cookie });
    if (!task) {
      res.status(404).json({ message: "Task not found" });
    }
    res.status(201).json({ message: "toggleTask", data: task });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
