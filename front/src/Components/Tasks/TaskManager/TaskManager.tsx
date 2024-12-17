import { useModal, useTask } from "../../../Context";
import { IProject } from "../../../Interfaces"
import { TaskForm } from "../../CustomForms";
import { Modal } from "../../Modal";

interface Props {
  Project: IProject;
}


export const TaskManager = ({ Project }: Props) => {
  const { setFilter, filter, setSearchQuery, searchQuery } = useTask();
  const { CreateTask } = useTask();
  const { openModal } = useModal();

  const HandleCreateTask = () => {
    openModal('CreateProjectForm');
  }

  return (
    <>
      <Modal modalId='CreateProjectForm'>
        <TaskForm FuntionTask={CreateTask} edit={false}
          projectId={Project.id}
        />
      </Modal>


      <header className="header">
        <div className="header-top">
          <h1>{Project?.title}</h1>
          <div className="header-actions">
            <button className="new-project-btn" onClick={HandleCreateTask} >New Task</button>
          </div>
        </div>
        <nav className="header-nav">
          <div>
            <button
              className={`nav-btn ${filter === "all" ? "active" : ""}`}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={`nav-btn ${filter === "done" ? "active" : ""}`}
              onClick={() => setFilter("done")}
            >
              Done
            </button>
            <button
              className={`nav-btn ${filter === "not done" ? "active" : ""}`}
              onClick={() => setFilter("not done")}
            >
              Not Done
            </button>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search by title"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </nav>
      </header>

    </>
  )

}
