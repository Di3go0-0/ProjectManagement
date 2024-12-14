import { ReactNode, useState } from "react";
import { ProjectProps, ICreateProject, IProject, IUpdateProject } from "../../Interfaces";
import { ProjectContext } from "./ProjectContext";
import { AxiosError } from "axios";
import { GetProjectsRequest, CreateProjectRequest, DeleteProjectRequest, EditProjectRequest } from "../../Api";

interface Props {
  children: ReactNode;
}

export const ProjectProvider = ({ children }: Props) => {
  const [projects, setProjects] = useState<IProject[]>([]);

  const GetProjects = async () => {
    try {
      const response = await GetProjectsRequest();
      // console.log(response.data)
      setProjects(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  const CreateProject = async (data: Partial<ProjectProps>): Promise<boolean> => {
    if (!data.project) return false;
    // console.log(data.project);
    try {
      const res = await CreateProjectRequest(data.project);
      console.log(res.data);
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

  const EditProject = async (data: Partial<ProjectProps>): Promise<boolean> => {
    if (!data.project || !data.id) return false;
    try {
      const res = await EditProjectRequest(data.id, data.project);
      console.log(res.data);
      return true;

    } catch (e) {
      if (e instanceof AxiosError) {
        console.log("error Editing Project")
        return false;
      }
      console.log("Unexpected error", e);
      return false;
    }

    console.log(data.project);
    console.log(data.id);
    return true;
  }

  const DeleteProject = async (id: string): Promise<boolean> => {
    try {
      const res = await DeleteProjectRequest(id);
      console.log(res.data);
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


  return (
    <ProjectContext.Provider value={{ projects, GetProjects, EditProject, CreateProject, DeleteProject }}>
      {children}
    </ProjectContext.Provider>
  )
}
