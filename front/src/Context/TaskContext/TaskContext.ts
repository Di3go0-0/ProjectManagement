import { ITask, TaskProps } from "../../Interfaces/Task";
import { createContext, useContext } from "react";


interface TaskContextType {
  tasks: ITask[];
  GetTasks: (projectId: number) => void;
  filter: "all" | "done" | "not done";
  setFilter: (filter: "all" | "done" | "not done") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  FilteredTasks: () => ITask[];
  DeleteTask: (id: number) => Promise<boolean>;
  CreateTask: (data: Partial<TaskProps>) => Promise<boolean>;
  EditTask: (data: Partial<TaskProps>) => Promise<boolean>;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTask = () => {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context;
}
