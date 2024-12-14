import './Home.css'
import { useProject } from "../../../Context"
import { ProjectCard, ProjectManager } from "../../../Components"
import { useEffect } from "react"

export const Home = () => {
  const { GetProjects, FilteredProjects } = useProject();

  useEffect(() => {
    GetProjects();
  }, [GetProjects]);

  const projects = FilteredProjects();

  return (
    <>
      <div className="app">
        <ProjectManager />
        <div className='home-body'>
          <main className="projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} Project={project} />
            ))}
          </main>
        </div>
      </div>
    </>
  );
};

