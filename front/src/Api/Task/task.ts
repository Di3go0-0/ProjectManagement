import { ICreateTask, IUpdateTask } from "../../Interfaces/Task";
import axios from "../axios";

export const GetTaskRequest = async () => {
  const response = await axios.get('/task');
  return response;
}

export const CreateTaskRequest = async (task: ICreateTask) => {
  const response = await axios.post('/task', task);
  return response;
}
export const EditTaskRequest = async (id: number, task: IUpdateTask) => {
  const response = await axios.put(`/task/${id}`, task);
  return response;
}

export const DeleteTaskRequest = async (id: number) => {
  const response = await axios.delete(`/task/${id}`);
  return response;
}
