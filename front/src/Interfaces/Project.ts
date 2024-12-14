import { ITask } from "./Task";

export interface IProject {
  id: number;
  title: string;
  description: string;
  userId: number;
  tasks: ITask[]
}

export interface ICreateProject {
  title: string;
  description: string;
}

export interface IUpdateProject {
  title: string;
  description: string;
}

export interface ProjectProps {
  id: string;
  project: ICreateProject | IUpdateProject;
}
