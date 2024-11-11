import { PrismaClient } from "@prisma/client";
import { getUserId } from "../helpers";
import type { ITask } from "../interfaces";

const prisma = new PrismaClient();

interface taskRepo {
  taskId: number;
  cookie: string;
}

interface createProps {
  title: string;
  description: string;
  cookie: string;
  projectId: number;
}

interface updateProps {
  taskId: number;
  title?: string;
  description?: string;
  cookie: string;
}

interface deleteProps {
  taskId: number;
  cookie: string;
}

interface allTaskProps {
  cookie: string;
}

export const getAllTasksRepo = async ({
  cookie,
}: allTaskProps): Promise<ITask[] | null> => {
  try {
    const userId = await getUserId(cookie);
    if (!userId) return null;
    const tasks = await prisma.task.findMany({
      where: {
        userId: userId,
      },
    });
    return tasks;
  } catch {
    return null;
  }
};

export const getTaskByIdRepo = async ({
  taskId,
  cookie,
}: taskRepo): Promise<ITask | null> => {
  try {
    const userId = await getUserId(cookie);
    if (!userId) return null;
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
        userId: userId,
      },
    });
    if (!task) return null;
    return task;
  } catch (error) {
    return null;
  }
};

export const createTaskRepo = async ({
  title,
  description,
  cookie,
  projectId,
}: createProps): Promise<ITask | null> => {
  try {
    const userId = await getUserId(cookie);
    if (!userId) return null;
    const task = await prisma.task.create({
      data: {
        title,
        description,
        userId,
        projectId: projectId,
      },
    });
    return task;
  } catch (error) {
    return null;
  }
};

export const updateTaskRepo = async ({
  taskId,
  title,
  description,
  cookie,
}: updateProps): Promise<ITask | null> => {
  try {
    const userId = await getUserId(cookie);
    if (!userId) return null;
    const task = await prisma.task.update({
      where: {
        id: taskId,
        userId: userId,
      },
      data: {
        title,
        description,
      },
    });
    if (!task) return null;
    return task;
  } catch {
    return null;
  }
};

export const deleteTaskRepo = async ({
  taskId,
  cookie,
}: deleteProps): Promise<ITask | null> => {
  try {
    const userId = await getUserId(cookie);
    if (!userId) return null;
    const task = await prisma.task.delete({
      where: {
        id: taskId,
        userId: userId,
      },
    });
    if (!task) return null;
    return task;
  } catch {
    return null;
  }
};

export const toggleTaskRepo = async ({
  taskId,
  cookie,
}: taskRepo): Promise<ITask | null> => {
  try {
    const userId = await getUserId(cookie);
    if (!userId) return null;
    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
        userId: userId,
      },
    });
    if (!task) return null;
    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        done: !task.done,
      },
    });
    return updatedTask;
  } catch (error) {
    return null;
  }
};
