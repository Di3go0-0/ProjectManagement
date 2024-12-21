import { PrismaClient } from "@prisma/client";
import type { IProject } from "../interfaces";

const prisma = new PrismaClient();

interface addCollaboratorProps {
  projectId: number;
  userId: number;
}

export const addProjectCollaboratorRepo = async ({ projectId, userId }: addCollaboratorProps): Promise<IProject | null> => {
  try {
    const colaborator = await prisma.projectColaborator.create({
      data: {
        projectId,
        userId,
      },
    })

    if (!colaborator) return null;

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        tasks: true,
        collaborators: true,
      },
    });

    return project;

  } catch {
    return null;
  }
}


export const isCollaboratorRepo = async ({ projectId, userId }: addCollaboratorProps): Promise<boolean> => {
  const collaborator = await prisma.projectColaborator.findFirst({
    where: {
      projectId,
      userId,
    },
  });

  return !!collaborator;
}

