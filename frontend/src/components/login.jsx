// src/components/login.jsx
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/authcontext';
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import '../styles/common.css';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (isLogin) {
        await login(email, password);
        setSuccess('Login successful! Redirecting to search properties...');
        console.log('Login successful, redirecting...');
        setTimeout(() => {
          navigate('/search');
        }, 500); // Redirect after 0.5 seconds
      } else {
        await register(username, email, password);
        setSuccess('Registration successful! Redirecting to login...');
        console.log('Registration successful, redirecting...');
        setTimeout(() => {
          setIsLogin(true);
          navigate('/login');
        }, 2000); // Redirect after 2 seconds
      }
    } catch (err) {
      console.error('Error during submission:', err);
      const errorMessage = err.response?.data?.error || 'An unexpected error occurred';
      setError(errorMessage);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <button type="submit" className="button">{isLogin ? 'Login' : 'Register'}</button>
        <button type="button" onClick={() => setIsLogin(!isLogin)} className="button register-button">
          {isLogin ? 'Register now!' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;