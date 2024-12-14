import { createContext, useContext } from "react";
import { ProjectProps, ICreateProject, IProject } from "../../Interfaces";


interface ProjectContextType {
  projects: IProject[];
  GetProjects: () => void;
  CreateProject: (data: Partial<ProjectProps>) => Promise<boolean>;
  DeleteProject: (id: string) => Promise<boolean>;
  EditProject: (data: Partial<ProjectProps>) => Promise<boolean>;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {

  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context;

}

