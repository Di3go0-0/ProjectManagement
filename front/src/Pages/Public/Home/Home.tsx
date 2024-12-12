import { useProject } from "../../../Context"
import './Home.css'
import { ProjectCard } from "../../../Components"


export const Home = () => {
  const { GetProjects, projects } = useProject()
  if (projects.length === 0) {
    GetProjects()
  }
  console.log(projects)

  return (
    <>
      <div className='home-container'>
        < h1 className='title' > Mis Proyectos</h1 >
        <div className='project-cards'>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              Project={project}
              taskCount={project.tasks.length}
            />
          ))}
        </div>
      </div >
    </>
  );
}
