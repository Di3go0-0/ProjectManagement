import { createContext, useContext } from "react";
import { ICreateProject, IProject } from "../../Interfaces";


interface ProjectContextType {
  projects: IProject[];
  GetProjects: () => void;
  CreateProject: (project: ICreateProject) => Promise<boolean>;
  DeleteProject: (id: string) => Promise<boolean>;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {

  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context;

}

