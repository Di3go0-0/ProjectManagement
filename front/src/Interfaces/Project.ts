import { ITask } from "./Task";

export interface IProject {
  id: number;
  title: string;
  description: string;
  userId: number;
  tasks: ITask[]
}
