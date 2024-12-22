import type { Request, Response } from "express";
import {
  addProjectCollaboratorRepo,
  createProjectRepo,
  deleteProjectRepo,
  getAllProjectsRepo,
  getProjectByIdRepo,
  isProjectCollaboratorRepo,
  isUserProjectOwner,
  obtainUserByIdRepo,
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
      .json({ message: "Project Updated Succesfully", data: project });
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


export const addProjectCollaborator = async (req: Request, res: Response) => {
  const { projectId, userId } = req.body;
  const cookie = req.cookies.token as string;

  try {
    const user = await obtainUserByIdRepo(userId as number);
    if (!user) res.status(404).json({ message: "User not found" });

    const project = await isUserProjectOwner(projectId as number, cookie);
    if (!project) res.status(404).json({ message: "Project not found", });

    const isCollaborator = await isProjectCollaboratorRepo({ projectId, userId });
    if (isCollaborator) res.status(400).json({ message: "User is already a collaborator" });

    const projectWithCollaborator = await addProjectCollaboratorRepo({ projectId, userId });
    if (!projectWithCollaborator) res.status(500).json({ message: "Error adding collaborator" });


    res.status(200).json({
      message: `Collaborator added, ${userId} to project ${projectId}`,
      data: projectWithCollaborator,
    });

  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }

}
