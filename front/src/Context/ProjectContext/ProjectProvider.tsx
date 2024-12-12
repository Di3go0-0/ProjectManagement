import { ReactNode, useState } from "react";
import { IProject } from "../../Interfaces";
import { ProjectContext } from "./ProjectContext";
import { GetProjectsRequest } from "../../Api/Auth/projects";

interface Props {
  children: ReactNode;
}

export const ProjectProvider = ({ children }: Props) => {
  const [projects, setProjects] = useState<IProject[]>([]);

  const GetProjects = async () => {
    try {
      const response = await GetProjectsRequest();
      // setProjects(response.data.data)
      // console.log(response.data)
      setProjects(response.data)
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <ProjectContext.Provider value={{ projects, GetProjects }}>
      {children}
    </ProjectContext.Provider>
  )
}
