import { createContext, useContext } from "react";
import { ProjectProps, IProject } from "../../Interfaces";


interface ProjectContextType {
  projects: IProject[];
  project: IProject | null;
  filter: "all" | "active" | "complete";
  setFilter: (filter: "all" | "active" | "complete") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  GetProjects: () => void;
  GetProject: (id: string) => Promise<IProject | null>;
  CreateProject: (data: Partial<ProjectProps>) => Promise<boolean>;
  DeleteProject: (id: string) => Promise<boolean>;
  EditProject: (data: Partial<ProjectProps>) => Promise<boolean>;
  FilteredProjects: () => IProject[];
}

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {

  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context;

}

