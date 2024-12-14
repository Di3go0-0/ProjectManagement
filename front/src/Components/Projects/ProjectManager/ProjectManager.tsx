import { useModal, useProject } from '../../../Context';
import { ProjectForm } from '../../CustomForms';
import { Modal } from '../../Modal';
import './ProjectManager.css';

interface Props {
  setFilter: (filter: "all" | "active" | "complete") => void;
  filter: "all" | "active" | "complete";
  setSearchQuery: (query: string) => void;
  searchQuery: string;
}

export const ProjectManager = ({ setFilter, filter, setSearchQuery, searchQuery }: Props) => {
  const { openModal } = useModal();
  const { CreateProject } = useProject();

  const HandleCreateProject = () => {
    openModal('CreateProjectForm');
  }

  return (
    <>
      {/* {state && ( */}
      <Modal modalId='CreateProjectForm'>
        <ProjectForm FunctionProject={CreateProject} edit={false} />
      </Modal>
      {/* )} */}
      <header className="header">
        <div className="header-top">
          <h1>Project Manager</h1>
          <div className="header-actions">
            <button className="new-project-btn" onClick={HandleCreateProject}>New Project</button>
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
              className={`nav-btn ${filter === "active" ? "active" : ""}`}
              onClick={() => setFilter("active")}
            >
              Active
            </button>
            <button
              className={`nav-btn ${filter === "complete" ? "active" : ""}`}
              onClick={() => setFilter("complete")}
            >
              Complete
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
  );
};

