import React, { ReactNode, useCallback, useState } from "react";
import { ICreateTask, ITask, IUpdateTask, TaskProps } from "../../Interfaces";
import { CreateTaskRequest, DeleteTaskRequest, EditTaskRequest, GetTaskRequest, ToggleTaskRequest } from "../../Api";
import { AxiosError } from "axios";
import { TaskContext } from "./TaskContext";

interface Props {
  children: ReactNode;
}

export const TaskProvider = ({ children }: Props) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [filter, setFilter] = useState<"all" | "done" | "not done">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Memoizar GetTasks
  const GetTasks = useCallback(async (projectId: number) => {
    try {
      const res = await GetTaskRequest();
      const filteredTasks = res.data.filter((task: ITask) => task.projectId === projectId);
      setTasks(filteredTasks);
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log("Error getting tasks");
      }
      console.error("Unexpected error", e);
    }
  }, []); // Sin dependencias

  const CreateTask = async (data: Partial<TaskProps>): Promise<boolean> => {
    if (!data.task) return false;
    // console.log(data.project);
    try {
      const res = await CreateTaskRequest(data.task as ICreateTask);
      console.log(res.data);
      setTasks([...tasks, res.data.data]);
      return true;
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log("error Creating Project")
        return false;
      }
      console.log("Unexpected error", e);
      return false;
    }
  }

  const EditTask = async (data: Partial<TaskProps>): Promise<boolean> => {
    if (!data.task || !data.id) return false;
    try {
      const res = await EditTaskRequest(data.id, data.task as IUpdateTask);
      console.log(res.data.data);
      const updatedTasks = tasks.map((task) => {
        if (task.id === data.id) {
          return res.data.data;
        }
        return task;
      });
      setTasks(updatedTasks);
      return true;
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log("error Editing Project")
        return false;
      }
      console.log("Unexpected error", e);
      return false;
    }
  }

  const ToggleTask = async (id: number): Promise<boolean> => {
    try {
      const res = await ToggleTaskRequest(id);
      console.log(res.data.data);
      const updatedTasks = tasks.map((task) => {
        if (task.id === id) {
          return res.data.data;
        }
        return task;
      });
      setTasks(updatedTasks);

      return true

    } catch (e) {
      if (e instanceof AxiosError) {
        console.log("error Deleting Project")
        return false;
      }
      console.log("Unexpected error", e);
      return false;
    }
  }

  const DeleteTask = async (id: number): Promise<boolean> => {
    try {
      const res = await DeleteTaskRequest(id);
      console.log(res.data);
      setTasks(tasks.filter(project => project.id !== id));
      return true
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log("error Deleting Project")
        return false;
      }
      console.log("Unexpected error", e);
      return false;
    }
  }

  const FilteredTasks = (): ITask[] => {
    const filtered = tasks.filter((task) => {
      const titleMatches = task.title.toLowerCase().includes(searchQuery.trim().toLowerCase());

      if (!tasks) return [];
      if (filter === "all") return titleMatches;
      if (filter === "done") return titleMatches && task.done;
      if (filter === "not done") return titleMatches && !task.done;
    });
    return filtered;
  }


  return (
    <TaskContext.Provider value={{
      tasks,
      GetTasks,
      filter,
      setFilter,
      searchQuery,
      setSearchQuery,
      FilteredTasks,
      DeleteTask,
      CreateTask,
      EditTask,
      ToggleTask,
    }}>
      {children}
    </TaskContext.Provider>
  )
}

