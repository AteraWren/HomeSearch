// src/components/navbar.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/authcontext';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';
import '../styles/common.css';

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar-container">
      <div className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/">Home</Link>
          </li>
          {auth.token && (
            <li className="navbar-item">
              <Link to="/search">Search Properties</Link>
            </li>
          )}
          {auth.token ? (
            <li className="navbar-item">
              <button onClick={handleLogout} className="navbar-button">Logout</button>
            </li>
          ) : (
            <li className="navbar-item">
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;