import type { Request, Response } from "express";
import {
  addProjectCollaboratorRepo,
  isCollaboratorRepo,
  isUserProjectOwner,
  obtainUserByIdRepo
} from "../repository";

export const addProjectCollaborator = async (req: Request, res: Response) => {
  const { projectId, userId } = req.body;
  const cookie = req.cookies.token as string;

  try {
    const user = await obtainUserByIdRepo(userId as number);
    if (!user) res.status(404).json({ message: "User not found" });

    const project = await isUserProjectOwner(projectId as number, cookie);
    if (!project) res.status(404).json({ message: "Project not found", });

    const isCollaborator = await isCollaboratorRepo({ projectId, userId });
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
