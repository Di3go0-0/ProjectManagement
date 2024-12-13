import './Home.css'
import { useProject } from "../../../Context"
import { ProjectCard, ProjectManager } from "../../../Components"
import { useEffect, useState } from "react"

export const Home = () => {
  const { GetProjects, projects } = useProject();
  const [filter, setFilter] = useState<"all" | "active" | "complete">("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    GetProjects();
  }, [GetProjects]);

  // Filtrado de proyectos
  const filteredProjects = projects.filter((project) => {
    const titleMatches = project.title.toLowerCase().includes(searchQuery.toLowerCase());

    const tasksPerforming = project.tasks.filter(task => task.done === true).length;
    const tasksPending = project.tasks.filter(task => task.done === false).length;

    if (filter === "all") return titleMatches;
    if (filter === "active") return titleMatches && (tasksPending > 0 || project.tasks.length === 0);
    if (filter === "complete") return titleMatches && tasksPending === 0 && tasksPerforming > 0;

    return true;
  });

  return (
    <>
      <div className="app">
        <ProjectManager
          setFilter={setFilter}
          filter={filter}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
        <main className="projects-grid">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} Project={project} />
          ))}
        </main>
      </div>
    </>
  );
};

