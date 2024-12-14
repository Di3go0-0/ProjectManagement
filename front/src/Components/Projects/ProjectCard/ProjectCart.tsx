import { Settings } from 'lucide-react';
import './ProjectCard.css';
import { IProject } from '../../../Interfaces';
import { useState } from 'react';
import { useModal, useProject } from '../../../Context';
import { Modal } from '../../Modal';
import { ConfirmDelete } from '../ConfirmDelete/ConfirmDelete';

interface Props {
  Project: IProject;
}

export const ProjectCard = ({ Project }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { openModal } = useModal();
  const { DeleteProject } = useProject();

  const title = Project.title;
  const id = Project.id.toString();
  const description = Project.description;
  const tasksPerforming = Project.tasks.filter(task => task.done === true).length;
  const tasksPending = Project.tasks.filter(task => task.done === false).length;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const modalId = `modalConfirmDeleteProject${id}`;
  const handleDelete = () => {
    openModal(modalId);
  }

  const messageDelete = `Are you sure you want to delete this project "${title}"?`
  return (
    <>
      {/* {state && ( */}
      <Modal modalId={modalId}>
        <ConfirmDelete
          ConfirmDelete={DeleteProject}
          message={messageDelete}
          id={id}
        />
      </Modal>
      {/* )} */}
      <div className="project-card">
        <div className="card-header">
          <h2>{title}</h2>
          <div className='settings-menu-container'>
            <button className="settings-btn" onClick={toggleMenu}>
              <Settings size={20} />
            </button>
            {isMenuOpen && (
              <div className="settings-menu">
                <button className="menu-item edit">Edit</button>
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
      </div>
    </>
  )
}
