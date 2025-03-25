import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import './Auth.css';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await authService.login(credentials.email, credentials.password);
      
      if (result.success) {
        navigate('/dashboard'); // Redirection après connexion réussie
      } else {
        setError(result.message || 'Échec de la connexion');
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la connexion');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {error && <div className="auth-error">{error}</div>}
      
      <div className="form-group">
        <label>Email :</label>
        <input
          type="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          required
          autoComplete="username"
        />
      </div>

      <div className="form-group">
        <label>Mot de passe :</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
        />
      </div>

      <button 
        type="submit" 
        className="auth-button" 
        disabled={isLoading}
      >
        {isLoading ? 'Connexion en cours...' : 'Se connecter'}
      </button>
    </form>
  );
};

export default LoginForm;