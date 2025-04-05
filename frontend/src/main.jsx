import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router';
import './styles/index.css';
import { AuthProvider } from './context/authcontext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>
);
