import { ReactNode, useCallback, useState } from "react";
import { ProjectProps, IProject, ICreateProject } from "../../Interfaces";
import { ProjectContext } from "./ProjectContext";
import { AxiosError } from "axios";
import {
  GetProjectsRequest,
  CreateProjectRequest,
  DeleteProjectRequest,
  EditProjectRequest,
  GetProjectRequest
} from "../../Api";

interface Props {
  children: ReactNode;
}

export const ProjectProvider = ({ children }: Props) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [project, setProject] = useState<IProject | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "complete">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const GetProjects = useCallback(async () => {
    try {
      const res = await GetProjectsRequest();
      setProjects(res.data);
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log("Error getting projects");
      }
      console.error("Unexpected error", e);
    }
  }, []); // Sin dependencias

  const GetProject = async (id: string): Promise<IProject | null> => {
    try {
      const res = await GetProjectRequest(id);
      const project = res.data;
      setProject(project);
      return project; // Devuelve el proyecto cargado
    } catch (e) {
      console.error("Error Getting Project:", e);
      setProject(null); // Asegura que el estado sea null en caso de error
      return null;
    }
  };

  const ProjectExists = async (id: number): Promise<boolean> => {
    setLoading(true);
    await GetProjects();
    const exists = projects.some((project) => project.id === id);
    setLoading(false);
    return exists;
  }

  const CreateProject = async (data: Partial<ProjectProps>): Promise<boolean> => {
    if (!data.project) return false;
    // console.log(data.project);
    try {
      const res = await CreateProjectRequest(data.project as ICreateProject);
      setProjects([...projects, res.data.data]);
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
      setProjects(projects.map(project => project.id === Number(data.id) ? { ...project, ...res.data.data } : project));
      return true;

    } catch (e) {
      if (e instanceof AxiosError) {
        console.log("error Editing Project")
        return false;
      }
      console.log("Unexpected error", e);
      return false;
    }
  }

  const DeleteProject = async (id: number): Promise<boolean> => {
    try {
      const res = await DeleteProjectRequest(id);
      console.log(res.data);
      setProjects(projects.filter(project => project.id !== id));
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

  const FilteredProjects = (): IProject[] => {
    return projects.filter((project) => {
      const titleMatches = project.title?.toLowerCase().includes(searchQuery.trim().toLowerCase()) ?? false;

      const tasksPerforming = project.tasks?.filter(task => task.done === true).length ?? 0;
      const tasksPending = project.tasks?.filter(task => task.done === false).length ?? 0;

      if (filter === "all") return titleMatches;
      if (filter === "active") return titleMatches && (tasksPending > 0 || project.tasks?.length === 0);
      if (filter === "complete") return titleMatches && tasksPending === 0 && tasksPerforming > 0;
    });
  }


  return (
    <ProjectContext.Provider value={{
      projects,
      project, setProject,
      filter, setFilter,
      searchQuery, setSearchQuery,
      GetProjects,
      GetProject,
      EditProject,
      CreateProject,
      DeleteProject,
      FilteredProjects,
      loading, setLoading,
      ProjectExists,
    }}>
      {children}
    </ProjectContext.Provider>
  )
}
