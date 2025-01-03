import type { Request, Response } from "express";
import { getCollaboratorsByProjectId, getProjectsForCollaboratorRepo, getTasksForCollaboratorRepo, isProjectCollaboratorRepo, isUserProjectOwner, obtainUserByIdRepo } from "../repository";
import { getUserId } from "../helpers";



export const getCollaboratorsProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const cookie = req.cookies.token as string;

  try {
    if (!projectId) res.status(400).json({ message: "Project ID is required" });


    const projectIdNumber = Number(projectId);
    if (isNaN(projectIdNumber)) res.status(400).json({ message: "Project ID must be a number" });


    const project = await isUserProjectOwner(projectIdNumber, cookie);
    if (!project) res.status(404).json({ message: "Project not found" });

    const collaborators = await getCollaboratorsByProjectId(projectIdNumber);
    if (!collaborators) res.status(404).json({ message: "Collaborators not found" });


    res.status(200).json(collaborators);

  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getAllProjectsForCollaborator = async (req: Request, res: Response) => {
  const cookie = req.cookies.token as string;

  try {
    const userId = await getUserId(cookie);
    if (!userId) res.status(401).json({ message: "Unauthorized" });

    if (!userId) res.status(400).json({ message: "User ID is required" });

    const user = await obtainUserByIdRepo(Number(userId));
    if (!user) res.status(404).json({ message: "User not found" });

    const projects = await getProjectsForCollaboratorRepo(Number(userId));
    if (!projects) res.status(404).json({ message: "Projects not found" });

    res.status(200).json(projects);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getAllTasksForCollaborator = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const cookie = req.cookies.token as string;

  try {
    if (!projectId) res.status(400).json({ message: "project ID is required" });

    const userId = await getUserId(cookie);
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const isCollaborator = await isProjectCollaboratorRepo({ projectId: Number(projectId), userId });
    if (!isCollaborator) res.status(400).json({ message: "User is not collaborator" });

    const tasks = await getTasksForCollaboratorRepo({ projectId: Number(projectId), cookie });
    if (!tasks) res.status(404).json({ message: "Projects not found" });

    res.status(200).json(tasks);
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }

}
