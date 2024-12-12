import { ITask } from "./ITask";

export interface IProject {
  id: number;
  title: string;
  description: string;
  userId: number;
  tasks: ITask[];
}
