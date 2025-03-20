// src/context/authcontext.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth({ token });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', { email, password });
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      setAuth({ token: access_token });
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Throw the error to be caught in the handleSubmit function
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/register', { username, email, password });
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      setAuth({ token: access_token });
    } catch (error) {
      console.error('Registration failed:', error);
      throw error; // Throw the error to be caught in the handleSubmit function
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };