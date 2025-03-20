import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import SearchProperties from './components/SearchProperties';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/navbar';
import Home from './pages/home';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchProperties />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;