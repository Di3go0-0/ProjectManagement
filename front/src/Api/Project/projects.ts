import { ICreateProject, IUpdateProject } from "../../Interfaces";
import axios from "../axios.ts";


export const GetProjectsRequest = async () => {
  const response = await axios.get('/project');
  return response;
}

export const GetProjectRequest = async (id: string) => {
  const response = await axios.get(`/project/${id}`);
  return response;
}

export const CreateProjectRequest = async (project: ICreateProject) => {
  const response = await axios.post('/project', project);
  return response;
}

export const DeleteProjectRequest = async (id: string) => {
  const response = await axios.delete(`/project/${id}`);
  return response;
}

export const EditProjectRequest = async (id: string, project: IUpdateProject) => {
  const response = await axios.put(`/project/${id}`, project);
  return response;
}
