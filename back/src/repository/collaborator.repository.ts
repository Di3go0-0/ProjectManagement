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
  userId: number
}

interface addTaskCollaborator {
  taskId: number;
  userId: number;
}

export const addProjectCollaboratorRepo = async ({ projectId, userId }: addCollaboratorProps): Promise<IProject | null> => {
  try {
    const collaborator = await prisma.projectCollaborator.create({
      data: {
        projectId,
        userId,
      },
    })

    if (!collaborator) return null;

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
  const collaborator = await prisma.projectCollaborator.findFirst({
    where: {
      projectId,
      userId,
    },
  });

  return !!collaborator;
}

export const isTaskCollaboratorRepo = async ({ taskId, userId }: isTaskCollaborator): Promise<boolean> => {
  try {
    const collaborator = await prisma.taskCollaborator.findFirst({
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
    const collaborators = await prisma.projectCollaborator.findMany({
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
    const task = await prisma.taskCollaborator.create({
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

export const getProjectsForCollaboratorRepo = async (userId: number): Promise<any | null> => {
  try {
    const projects = await prisma.project.findMany({
      where: {
        collaborators: {
          some: {
            userId: userId,
          },
        },
      },
      include: {
        user: true,
      }
    })

    return projects;

  } catch {
    return null
  }
}

interface getTasksForCollaboratorRepoProps {
  projectId: number;
  cookie: string;
}

export const getTasksForCollaboratorRepo = async ({ projectId, cookie }: getTasksForCollaboratorRepoProps): Promise<any | null> => {
  try {
    const userId = await getUserId(cookie);
    if (!userId) return null;

    const tasks = await prisma.task.findMany({
      where: {
        projectId: projectId,
        collaborators: {
          some: {
            userId: userId,
          },
        },
        NOT: {
          userId: userId,
        },
      },
      include: {
        user: true,
      }
    })
    return tasks;

  } catch {
    return null
  }
}

