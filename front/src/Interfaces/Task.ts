export interface ITask {
  id: number;
  title: string;
  description: string;
  done: boolean;
  userId: number;
  projectId: number;
}

export interface ICreateTask {
  title: string;
  description: string;
  projectId: number;
}

export interface IUpdateTask {
  title: string;
  description: string;
  done: boolean;
}


export interface TaskProps {
  id: number;
  task: ICreateTask | IUpdateTask;
}
