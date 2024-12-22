import type { Request, Response } from "express";
import {
  addProjectCollaboratorRepo,
  getCollaboratorsByProjectId,
  isProjectCollaboratorRepo,
  isUserProjectOwner,
  obtainUserByIdRepo
} from "../repository";




export const getProjectCollaborators = async (req: Request, res: Response) => {
  const { projectId } = req.body;
  const cookie = req.cookies.token as string;

  try {
    // const isOwner = await isUserProjectOwner(projectId as number, cookie);
    // if (!isOwner) res.status(404).json({ message: "Project not found" });
    //
    // const collaborators = await getCollaboratorsByProjectId(projectId as number);
    //
    // if (!collaborators) res.status(404).json({ message: "Collaborators not found" });
    //
    // res.status(200).json(collaborators);

    res.status(200).json({ message: "Collaborators found" });

  } catch (e) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
