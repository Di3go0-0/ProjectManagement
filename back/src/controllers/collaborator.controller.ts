import type { Request, Response } from "express";
import { getCollaboratorsByProjectId, isUserProjectOwner } from "../repository";



export const getCollaboratorsProject = async (req: Request, res: Response) => {
  const { projectId } = req.query;
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
