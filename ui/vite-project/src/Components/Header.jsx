import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Patrimoine Économique
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/patrimoine">
                Patrimoine
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/possession">
                Possessions
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;