import { faker } from '@faker-js/faker';

interface IProject {
  id: number;
  title: string;
  description: string;
  userId: number;
  createdAt: string,
  updatedAt: string,
}

const formatDateToISOString = (date: Date) => {
  // Redondea la fecha a segundos eliminando los milisegundos
  return new Date(Math.floor(date.getTime() / 1000) * 1000).toISOString();
};

export const Project = (Id: number, userId: number): IProject => ({
  id: Id,
  title: faker.lorem.words(),
  description: faker.lorem.sentence(),
  userId: userId,
  createdAt: formatDateToISOString(new Date()),
  updatedAt: formatDateToISOString(new Date()),
})

export const ProjectList = (userId: number): IProject[] => [
  {
    id: faker.number.int(),
    title: faker.lorem.words(),
    description: faker.lorem.words(),
    userId: userId,
    createdAt: formatDateToISOString(new Date()),
    updatedAt: formatDateToISOString(new Date()),
  },
  {
    id: faker.number.int(),
    title: faker.lorem.words(),
    description: faker.lorem.words(),
    userId: userId,
    createdAt: formatDateToISOString(new Date()),
    updatedAt: formatDateToISOString(new Date()),
  },
];


export const CreateProject = (title: string, description: string, userId: number): IProject => ({
  id: userId,
  title: title,
  description: description,
  userId: faker.number.int(),
  createdAt: formatDateToISOString(new Date()),
  updatedAt: formatDateToISOString(new Date()),
})
