import { Settings } from 'lucide-react';
import './ProjectCard.css';
import { IProject } from '../../../Interfaces';
import { useState } from 'react';
import { useModal, useProject } from '../../../Context';
import { Modal } from '../../Modal';
import { ProjectForm } from '../../CustomForms';
import { useNavigate } from 'react-router-dom';
import { ConfirmDelete } from '../../ConfirmDelete/ConfirmDelete';

interface Props {
  Project: IProject;
}

export const ProjectCard = ({ Project }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { openModal } = useModal();
  const { DeleteProject, EditProject } = useProject();

  const navigate = useNavigate();

  const title = Project.title;
  const description = Project.description;
  const tasksPerforming = Project.tasks.filter(task => task.done === true).length;
  const tasksPending = Project.tasks.filter(task => task.done === false).length;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const modalDeleteId = `modalConfirmDeleteProject${Project.id}`;
  const modalEditId = `modalEditProject${Project.id}`;

  const handleDelete = () => {
    openModal(modalDeleteId);
    setIsMenuOpen(false);
  }

  const handleEditProject = () => {
    openModal(modalEditId);
    setIsMenuOpen(false);
  }

  const handleProjectPage = () => {
    navigate(`/private/project/${Project.id}`);
  }


  const messageDelete = `Are you sure you want to delete this project "${title}"?`
  return (
    <>
      <Modal modalId={modalDeleteId}>
        <ConfirmDelete
          ConfirmDelete={DeleteProject}
          message={messageDelete}
          id={Project.id}
        />
      </Modal>
      <Modal modalId={modalEditId}>
        <ProjectForm FunctionProject={EditProject} edit={true} project={Project} />
      </Modal>

      <div className="project-card" onClick={handleProjectPage}>
        <div className="card-header">
          <h2>{title}</h2>
          <div className='settings-menu-container' onClick={(e) => e.stopPropagation()}>
            <button className="settings-btn" onClick={toggleMenu}>
              <Settings size={20} />
            </button>
            {isMenuOpen && (
              <div className="settings-menu">
                <button className="menu-item edit" onClick={handleEditProject}>Edit</button>
                <button className="menu-item delete" onClick={handleDelete}>Delete</button>
                {/* <button className="menu-item delete" onClick={() => console.log(id)}>Delete</button> */}
              </div>
            )}
          </div>
        </div>
        <div className="card-divider" />
        <div className="card-content">
          <p className="description">{description}</p>
          <div className="task-status">
            {tasksPending === 0 ? (
              tasksPerforming === 0 ? (
                <div className="status-item withoutTask">
                  <span>Project without Task</span>
                </div>
              ) : (
                <div className="status-item complete">
                  <span>Project Completed</span>
                </div>
              )
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
      </div >
    </>
  )
}
