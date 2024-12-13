import { ReactNode, useState } from "react";
import { ICreateProject, IProject } from "../../Interfaces";
import { ProjectContext } from "./ProjectContext";
import { AxiosError } from "axios";
import { GetProjectsRequest, CreateProjectRequest } from "../../Api";

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

  const CreateProject = async (project: ICreateProject): Promise<boolean> => {
    console.log(project);
    try {
      const res = await CreateProjectRequest(project);
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


  return (
    <ProjectContext.Provider value={{ projects, GetProjects, CreateProject }}>
      {children}
    </ProjectContext.Provider>
  )
}
