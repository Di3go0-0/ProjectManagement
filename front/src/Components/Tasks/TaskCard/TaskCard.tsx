import { Settings } from 'lucide-react';
import { useState } from 'react';
import './TaskCard.css';
import { ITask } from '../../../Interfaces/Task';
import { useModal, useTask } from '../../../Context';
import { Modal } from '../../Modal';
import { ConfirmDelete } from '../../ConfirmDelete/ConfirmDelete';
import { TaskForm } from '../../CustomForms';

interface Props {
  Task: ITask;
}

export const TaskCard = ({ Task }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { openModal } = useModal();
  const { DeleteTask, EditTask, ToggleTask } = useTask();


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }


  const modalDeleteId = `modalConfirmDeleteTask${Task.id}`;
  const modalEditId = `modalEditTask${Task.id}`;

  const handleDelete = () => {
    openModal(modalDeleteId);
    setIsMenuOpen(false);
  }

  const handleEditTask = () => {
    openModal(modalEditId);
    setIsMenuOpen(false);
  }
  const handleToggleTask = () => {
    ToggleTask(Task.id);
  }


  const messageDelete = `Are you sure you want to delete this task "${Task.title}"?`
  return (
    <>
      <Modal modalId={modalDeleteId}>
        <ConfirmDelete
          ConfirmDelete={DeleteTask}
          message={messageDelete}
          id={Task.id}
        />
      </Modal>
      <Modal modalId={modalEditId}>
        <TaskForm FuntionTask={EditTask} edit={true} task={Task} projectId={Task.projectId} />
      </Modal>

      <div className={`task-card ${Task.done ? 'done' : 'not-done'}`} >
        {/* {Task.done ? <p> Task Done </p> : <p> Task Not Done </p>} */}
        <div className="card-header">
          <h2>{Task.title}</h2>
          <div className='settings-menu-container' onClick={(e) => e.stopPropagation()}>
            <button className="settings-btn" onClick={toggleMenu}>
              <Settings size={20} />
            </button>
            {isMenuOpen && (
              <div className="settings-menu">
                <button className="menu-item edit" onClick={handleEditTask} >Edit</button>
                {/* <button className="menu-item delete" >Delete</button> */}
                <button className="menu-item delete" onClick={handleDelete}>Delete</button>
              </div>
            )}
          </div>
        </div >
        <div className="card-divider" />
        <div className="card-content">
          <p className="description">{Task.description}</p>
          <div className="btns">
            <button className={`btn-handler ` + (Task.done ? 'done' : 'not-done')}
              onClick={handleToggleTask} >{Task.done ? 'not-done' : 'done'}</button>
          </div>
        </div>
      </div >
    </>
  )
}
