import { ICreateProject } from "../../Interfaces/Project.ts";
import axios from "../axios.ts";


export const GetProjectsRequest = async () => {
  const response = await axios.get('/project');
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
