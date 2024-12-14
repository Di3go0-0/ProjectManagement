import React from 'react';
import './nav.css';
import { useAuth } from '../../Context';

export const Navbar: React.FC = () => {
  const { user, Logout } = useAuth();


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-user">
            <h1>Wellcome </h1>
            <h1>{" " + user?.name}</h1>
          </div>
          <button className="logout-button" onClick={Logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}



