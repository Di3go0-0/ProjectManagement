import type { Request, Response } from "express";

export const createTask = async (req: Request, res: Response) => {
  const { title, description } = req.body;

  try {
    console.log("Creating a task");
    res.status(201).json({ message: "Task created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
