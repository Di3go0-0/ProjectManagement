import { PrismaClient } from "@prisma/client";
import type { IProject } from "../interfaces";
import { getUserId } from "../helpers";

const prisma = new PrismaClient();

interface projectRepo {
  projectId: number;
  cookie: string;
}

interface createProps {
  title: string;
  description: string;
  cookie: string;
}

interface updateProps {
  projectId: number;
  title?: string;
  description?: string;
  cookie: string;
}

interface deleteProps {
  projectId: number;
  cookie: string;
}

export const getAllProjectsRepo = async (cookie: string,): Promise<IProject[] | null> => {
  try {
    const userId = await getUserId(cookie);
    if (!userId) return null;
    const projects = await prisma.project.findMany({
      where: {
        userId: userId,
      },
    });
    return projects;
  } catch {
    return null;
  }
};

export const getProjectByIdRepo = async ({ projectId, cookie, }: projectRepo): Promise<IProject | null> => {
  try {
    const userId = await getUserId(cookie);
    if (!userId) return null;

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
        userId: userId,
      },
    });
    if (!project) return null;
    return project;
  } catch (error) {
    return null;
  }
};

export const createProjectRepo = async ({ title, description, cookie, }: createProps): Promise<IProject | null> => {
  try {
    const userId = await getUserId(cookie);
    if (!userId) return null;
    const project = await prisma.project.create({
      data: {
        title,
        description,
        userId,
      },
    });
    return project;
  } catch {
    return null;
  }
};

export const updateProjectRepo = async ({ projectId, title, description, cookie, }: updateProps): Promise<IProject | null> => {
  try {
    const userId = await getUserId(cookie);
    if (!userId) return null;
    const project = await prisma.project.update({
      where: {
        id: projectId,
        userId: userId,
      },
      data: {
        title,
        description,
      },
    });
    if (!project) return null;
    return project;
  } catch {
    return null;
  }
};

export const deleteProjectRepo = async ({ projectId, cookie, }: deleteProps): Promise<IProject | null> => {
  try {
    const userId = await getUserId(cookie);
    if (!userId) return null;
    const project = await prisma.project.delete({
      where: {
        id: projectId,
        userId: userId,
      },
    });
    if (!project) return null;
    return project;
  } catch {
    return null;
  }
};

export const projectExists = async (projectId: number): Promise<boolean> => {
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });
  if (!project) return false;
  return true;
};
