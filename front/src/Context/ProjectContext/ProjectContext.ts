import { createContext, useContext } from "react";
import { ProjectProps, IProject } from "../../Interfaces";


interface ProjectContextType {
  projects: IProject[];
  project: IProject | null;
  setProject: (project: IProject | null) => void;
  filter: "all" | "active" | "complete";
  setFilter: (filter: "all" | "active" | "complete") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  GetProjects: () => void;
  GetProject: (id: string) => Promise<IProject | null>;
  CreateProject: (data: Partial<ProjectProps>) => Promise<boolean>;
  DeleteProject: (id: number) => Promise<boolean>;
  EditProject: (data: Partial<ProjectProps>) => Promise<boolean>;
  FilteredProjects: () => IProject[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  ProjectExists: (id: number) => Promise<boolean>;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {

  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider')
  }
  return context;

}

