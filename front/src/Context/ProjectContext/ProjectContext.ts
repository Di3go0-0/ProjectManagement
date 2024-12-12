import { createContext, useContext } from "react";
import { IProject } from "../../Interfaces";


interface ProjectContextType {
  projects: IProject[];
  GetProjects: () => void;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {

  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context;

}

