import { Settings } from 'lucide-react';
import './ProjectCard.css';
import { IProject } from '../../../Interfaces';

interface Props {
  Project: IProject;
}

interface ProjectCardProps {
  title: string;
  description: string;
  tasksPerforming: number;
  tasksPending: number;
}

export const ProjectCard = ({ title, description, tasksPerforming, tasksPending }: ProjectCardProps) => {

  // const title = Project.title;
  // const description = Project.description;
  // const tasksPerforming = () => {
  //   return Project.tasks.filter(task => task.done === 'false').length;
  // }

  return (
    <div className="project-card">
      <div className="card-header">
        <h2>{title}</h2>
        <button className="settings-btn">
          <Settings size={20} />
        </button>
      </div>
      <div className="card-divider" />
      <div className="card-content">
        <p className="description">{description}</p>
        <div className="task-status">
          {tasksPending === 0 ? (
            <div className="status-item complete">
              <span>Project Completed</span>
            </div>
          ) : (
            <>
              <div className="status-item performing">
                <span>{tasksPerforming} Tasks Completed</span>
              </div>
              <div className="status-item pending">
                <span>{tasksPending} Tasks Pending</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
