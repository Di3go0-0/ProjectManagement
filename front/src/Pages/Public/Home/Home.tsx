import { useEffect } from "react"
import { useAuth, useProject } from "../../../Context"
import './Home.css'
import { Navbar, ProjectCard } from "../../../Components"


export const Home = () => {
  const { Logout } = useAuth()
  const { GetProjects, projects } = useProject()

  useEffect(() => {
    GetProjects()
  }, [GetProjects])

  // console.log(projects)

  return (
    <>
      <Navbar />
      <div className='home-container'>
        < h1 className='title' > Mis Proyectos</h1 >
        <div className='project-cards'>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              Project={project}
              taskCount={10}
            />
          ))}
        </div>
      </div >
    </>
  );
}
