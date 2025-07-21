// src/components/layout/Header.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import logo from '../../assets/logo.png';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
        <img src={logo} alt="Logo A Rafeira" height="40" />
        <span className="fw-bold text-light">A Rafeira</span>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active text-warning fw-bold' : ''}`}>Informações Gerais</NavLink>
          </li>

          <li className="nav-item dropdown">
            <span
              className="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              id="dropdownMenuLink"
            >
              O que fazemos?
            </span>
            <ul className="dropdown-menu">
              <li><NavLink className="dropdown-item" to="/what-we-do/artistic-creation">Criação Artística</NavLink></li>
              <li><NavLink className="dropdown-item" to="/what-we-do/training">Formação</NavLink></li>
              <li><NavLink className="dropdown-item" to="/what-we-do/cultural-exchanges">Intercâmbios Culturais</NavLink></li>
              <li><NavLink className="dropdown-item" to="/what-we-do/culture-defense">Defesa da Cultura</NavLink></li>
            </ul>
          </li>

          <li className="nav-item">
            <NavLink to="/how-we-think" className={({ isActive }) => `nav-link ${isActive ? 'active text-warning fw-bold' : ''}`}>Como pensamos</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/who-we-are" className={({ isActive }) => `nav-link ${isActive ? 'active text-warning fw-bold' : ''}`}>Quem somos</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/where-we-will-be" className={({ isActive }) => `nav-link ${isActive ? 'active text-warning fw-bold' : ''}`}>Onde vamos estar?</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active text-warning fw-bold' : ''}`}>Contactos</NavLink>
          </li>

          {isAuthenticated && user?.role === 'admin' && (
            <li className="nav-item">
              <NavLink to="/admin/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active text-warning fw-bold' : ''}`}>Admin</NavLink>
            </li>
          )}
        </ul>

        {isAuthenticated && (
          <button className="btn btn-outline-light ms-lg-3" onClick={logout}>Sair</button>
        )}
      </div>
    </nav>
  );
};

export default Header;



/*

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext'; // Se o menu tiver links para admin, etc.
import '../Styles/Header.css'; // Crie este arquivo CSS para estilização

const Header = () => {
    const { isAuthenticated, user, logout } = useAuth(); // Assume que você tem AuthContext

    return (
        <header className="main-header">
            <div className="logo">
            </div>
            <nav className="main-nav">
                <ul>
                    <li><Link to="/about">Informações Gerais</Link></li> 
                    <li className="dropdown">
                        <Link to="/what-we-do">O que fazemos?</Link>
                        <ul className="dropdown-content">
                            <li><Link to="/what-we-do/artistic-creation">Criação Artística</Link></li>
                            <li><Link to="/what-we-do/training">Formação</Link></li>
                            <li><Link to="/what-we-do/cultural-exchanges">Intercâmbios Culturais</Link></li>
                            <li><Link to="/what-we-do/culture-defense">Defesa da Cultura</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/how-we-think">Como pensamos</Link></li>
                    <li><Link to="/who-we-are">Quem somos</Link></li>
                    <li><Link to="/where-we-will-be">Onde vamos estar?</Link></li>
                    <li><Link to="/contact">Contactos</Link></li> 
                    {isAuthenticated && user?.role === 'admin' && (
                        <li><Link to="/admin/dashboard">Admin</Link></li>
                    )}
                    {isAuthenticated ? (
                        <li><button onClick={logout} className="logout-button">Sair</button></li>
                    ) : (
                        <li><Link to="/admin/login">Login</Link></li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;

*/