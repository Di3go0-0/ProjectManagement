import type { Request, Response } from "express";
import {
  createProjectRepo,
  deleteProjectRepo,
  getAllProjectsRepo,
  getProjectByIdRepo,
  updateProjectRepo,
} from "../repository";

export const getProjects = async (req: Request, res: Response) => {
  const cookie = req.cookies.token as string;
  try {
    const projects = await getAllProjectsRepo(cookie);
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: "Error getting Projects" });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const cookie = req.cookies.token as string;
  const projectId = Number(id);
  try {
    const project = await getProjectByIdRepo({ projectId, cookie });

    if (!project) res.status(404).json({ message: "Project not found" });

    res.status(200).json(project);
    project;
  } catch (err) {
    res.status(500).json({ message: "Error getting Project" });
  }
};

export const createProject = async (req: Request, res: Response) => {
  const { title, description } = req.body;
  const cookie = req.cookies.token as string;

  try {
    const project = await createProjectRepo({ title, description, cookie });

    if (!project) res.status(500).json({ message: "Error creating Project" });
    res.status(201).json({ data: project, message: "Project created" });
  } catch (err) {
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const cookie = req.cookies.token as string;
  const projectId = Number(id);

  try {
    const project = await updateProjectRepo({
      projectId,
      title,
      description,
      cookie,
    });

    if (!project) res.status(404).json({ message: "Project Not Fount" });
    res
      .status(201)
      .json({ message: "Project Updated Succesfully", Data: project });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const cookie = req.cookies.token as string;
  const projectId = Number(id);

  try {
    const project = await deleteProjectRepo({ projectId, cookie });

    if (!project) res.status(404).json({ message: "Project Not Found" });

    res.status(201).json({ message: "Project Deleted Succesfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
