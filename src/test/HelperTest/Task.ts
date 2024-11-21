import { faker } from '@faker-js/faker';

interface ITask {
  id: number;
  title: string;
  description: string;
  done: boolean;
  projectId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
}

const formatDateToISOString = (date: Date) => {
  // Redondea la fecha a segundos eliminando los milisegundos
  return new Date(Math.floor(date.getTime() / 1000) * 1000).toISOString();
};

export const TaskList = (userId: number, projectId: number): ITask[] => {
  return [
    {
      id: faker.number.int(),
      title: faker.lorem.words(),
      description: faker.lorem.words(),
      done: false,
      projectId: projectId,
      userId: userId,
      createdAt: formatDateToISOString(new Date()),
      updatedAt: formatDateToISOString(new Date()),
    },
    {
      id: faker.number.int(),
      title: faker.lorem.words(),
      description: faker.lorem.words(),
      done: false,
      projectId: projectId,
      userId: userId,
      createdAt: formatDateToISOString(new Date()),
      updatedAt: formatDateToISOString(new Date()),
    },
  ];
}

export const TaskById = (taskId: number, userId: number): ITask => ({
  id: taskId,
  title: faker.lorem.words(),
  description: faker.lorem.words(),
  done: false,
  projectId: faker.number.int(),
  userId: userId,
  createdAt: formatDateToISOString(new Date()),
  updatedAt: formatDateToISOString(new Date()),
})
