export interface ITask {
  id: number;
  title: string;
  description: string;
  done: boolean;
  userId: number;
  projectId: number;
}
