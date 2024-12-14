import { ReactNode, useState } from "react";
import { ProjectProps, IProject } from "../../Interfaces";
import { ProjectContext } from "./ProjectContext";
import { AxiosError } from "axios";
import {
  GetProjectsRequest,
  CreateProjectRequest,
  DeleteProjectRequest,
  EditProjectRequest,
  GetProjectRequest
} from "../../Api";
import { set } from "react-hook-form";

interface Props {
  children: ReactNode;
}

export const ProjectProvider = ({ children }: Props) => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [project, setProject] = useState<IProject | null>(null);
  const [filter, setFilter] = useState<"all" | "active" | "complete">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const GetProjects = async () => {
    try {
      const response = await GetProjectsRequest();
      // console.log(response.data)
      setProjects(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  const GetProject = async (id: string): Promise<IProject | null> => {
    try {
      const res = await GetProjectRequest(id);
      const project = res.data;
      setProject(project);
      // console.log(project)
      return project;
    } catch (e) {
      if (e instanceof AxiosError) {
        console.log("error Getting Project")
        setProject(null);
        return null;
      }
      setProject(null);
      return null;
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

  const FilteredProjects = (): IProject[] => {
    return projects.filter((project) => {
      const titleMatches = project.title.toLowerCase().includes(searchQuery.trim().toLowerCase());

      const tasksPerforming = project.tasks.filter(task => task.done === true).length;
      const tasksPending = project.tasks.filter(task => task.done === false).length;

      if (filter === "all") return titleMatches;
      if (filter === "active") return titleMatches && (tasksPending > 0 || project.tasks.length === 0);
      if (filter === "complete") return titleMatches && tasksPending === 0 && tasksPerforming > 0;
    });
  }

  return (
    <ProjectContext.Provider value={{
      projects,
      project,
      filter, setFilter,
      searchQuery, setSearchQuery,
      GetProjects,
      GetProject,
      EditProject,
      CreateProject,
      DeleteProject,
      FilteredProjects,
    }}>
      {children}
    </ProjectContext.Provider>
  )
}
