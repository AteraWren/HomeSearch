// src/pages/home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

const Home = () => (
  <div className="home-container">
    <h1 className="home-title">Welcome to HomeSearch!</h1>
    <div className="home-buttons">
      <Link to="/login" className="home-button">Login</Link>
    </div>
  </div>
);

export default Home;