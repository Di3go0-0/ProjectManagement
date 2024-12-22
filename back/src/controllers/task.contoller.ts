import type { Request, Response } from "express";
import {
  addTaskCollaboratorRepo,
  createTaskRepo,
  deleteTaskRepo,
  getAllTasksRepo,
  getProjectIdByTaskIdRepo,
  getTaskByIdRepo,
  isTaskCollaboratorRepo,
  isTaskOwnerRepo,
  isUserProjectOwner,
  obtainUserByIdRepo,
  obtainUserRepo,
  projectExists,
  toggleTaskRepo,
  updateTaskRepo,
} from "../repository";

export const getTasks = async (req: Request, res: Response) => {
  const cookie = req.cookies.token as string;
  try {
    const tasks = await getAllTasksRepo({ cookie });
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
      res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error getting Task" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { title, description, projectId } = req.body;
  const cookie = req.cookies.token as string;
  const ProjectId = Number(projectId);
  try {
    const projectExist = await projectExists(ProjectId);
    if (!projectExist) {
      res.status(404).json({ message: "Project not found" });
    }
    const task = await createTaskRepo({
      title,
      description,
      cookie,
      projectId,
    });
    if (!task) res.status(500).json({ message: "Error creating Task" });
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

export const addCollaborator = async (req: Request, res: Response) => {
  const { taskId, userId } = req.body;
  const cookie = req.cookies.token as string;

  try {
    const user = await obtainUserByIdRepo(userId as number);
    if (!user) res.status(404).json({ message: "User not found" })

    const projectId = await getProjectIdByTaskIdRepo(taskId as number);
    if (!projectId) res.status(404).json({ message: "Project not found" });

    const isProjectOwner = await isUserProjectOwner(projectId as number, cookie);
    if (!isProjectOwner) res.status(404).json({ message: "Project not found", });

    const isOwner = await isTaskOwnerRepo(taskId, cookie);
    if (!isOwner) res.status(404).json({ message: "Task not found" });

    const isCollaborator = await isTaskCollaboratorRepo({ taskId, cookie });
    if (isCollaborator) res.status(400).json({ message: "User is already a collaborator" });

    const addCollaborator = await addTaskCollaboratorRepo({ taskId, userId });
    if (!addCollaborator) res.status(500).json({ message: "Error adding collaborator" });

    res.status(200).json({
      message: `Collaborator added`,
    });

  } catch (e) {
    res.status(500).json({
      message: "Internal server error"
    });
  }
} 
