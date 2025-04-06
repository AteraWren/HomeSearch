// src/router.jsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Auth from './components/auth';
import Dashboard from './pages/dashboard';
import Navbar from './components/navbar';
import Login from './components/login';
import Register from './components/register'; 
import PropertySearch from './components/propertySearch'; // Import PropertySearch
import { AuthContext } from './context/authcontext';

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);
  return auth.token ? children : <Navigate to="/auth" />;
};

const AppRouter = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> 
      <Route path="/search" element={<PropertySearch />} /> {/* Add PropertySearch route */}
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
    </Routes>
  </Router>
);

export default AppRouter;