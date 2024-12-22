import { PrismaClient } from "@prisma/client";
import type { IProject, IUser } from "../interfaces";
import { getUserId } from "../helpers";

const prisma = new PrismaClient();

interface addCollaboratorProps {
  projectId: number;
  userId: number;
}

interface isTaskCollaborator {
  taskId: number;
  cookie: string;
}

interface addTaskCollaborator {
  taskId: number;
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


export const isProjectCollaboratorRepo = async ({ projectId, userId }: addCollaboratorProps): Promise<boolean> => {
  const collaborator = await prisma.projectColaborator.findFirst({
    where: {
      projectId,
      userId,
    },
  });

  return !!collaborator;
}

export const isTaskCollaboratorRepo = async ({ taskId, cookie }: isTaskCollaborator): Promise<boolean> => {
  try {
    const userId = await getUserId(cookie);
    if (!userId) return false;
    const collaborator = await prisma.taskColaborator.findFirst({
      where: {
        taskId,
        userId,
      },
    });

    return !!collaborator;
  } catch {
    return false;
  }
}


export const getCollaboratorsByProjectId = async (projectId: number): Promise<IUser[] | null> => {
  try {
    const collaborators = await prisma.projectColaborator.findMany({
      where: { projectId },
      include: {
        user: true, // Incluye los datos del usuario
      },
    });

    const users: IUser[] = collaborators.map(collaborator => collaborator.user);
    return users;
  } catch (error) {
    console.error("Error fetching collaborators:", error);
    throw new Error("Could not fetch collaborators for the project");
  }
};


export const addTaskCollaboratorRepo = async ({ taskId, userId }: addTaskCollaborator): Promise<boolean> => {
  try {
    const task = await prisma.taskColaborator.create({
      data: {
        taskId,
        userId,
      },
    });


    return !!task;
  } catch {
    return false;
  }
}
