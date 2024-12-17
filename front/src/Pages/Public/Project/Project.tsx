import { useNavigate, useParams } from "react-router-dom"
import './Project.css'
import { useProject, useTask } from "../../../Context";
import { useEffect, useMemo } from "react";
import { TaskCard, TaskManager } from "../../../Components";

export const ProjectPage = () => {
  const { id } = useParams();
  const { projects } = useProject();
  const { GetTasks, FilteredTasks } = useTask()

  const navigate = useNavigate();

  const project = useMemo(() => {
    return projects.find((project) => project.id === Number(id));
  }, [projects, id]);

  // Obtener las tareas solo si el ID del proyecto cambia
  useEffect(() => {
    if (project?.id) {
      GetTasks(project.id);
    }
  }, [project?.id, GetTasks]);

  // Filtrar tareas
  const tasks = FilteredTasks();

  // Redirigir si el proyecto no existe
  useEffect(() => {
    if (!project) {
      navigate("/private/home");
    }
  }, [project, navigate]);

  return (
    <div className="project-body" >
      <TaskManager Project={project!} />
      <div className='home-body'>
        <main className="projects-grid">
          {(
            tasks.map((task) => (
              <TaskCard key={task.id} Task={task} />
            ))
          )}
        </main>
      </div>
    </div>
  )
}
