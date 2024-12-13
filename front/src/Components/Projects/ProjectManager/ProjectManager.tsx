import './ProjectManager.css';

interface Props {
  setFilter: (filter: "all" | "active" | "complete") => void;
  filter: "all" | "active" | "complete";
  setSearchQuery: (query: string) => void;
  searchQuery: string;
}

export const ProjectManager = ({ setFilter, filter, setSearchQuery, searchQuery }: Props) => {
  return (
    <>
      <header className="header">
        <div className="header-top">
          <h1>Project Manager</h1>
          <div className="header-actions">
            <button className="new-project-btn">New Project</button>
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

