export interface ITask {
  id: number;
  title: string;
  description: string;
  done: boolean;
  projectId: number;
  userId: number;
}
