
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { userService } from '../services/userService';
import './Auth.css';

const RegisterForm = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nom: '',
    prenom: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!userData.email.includes('@')) {
      newErrors.email = 'Email invalide';
    }
    
    if (userData.password.length < 8) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }
    
    if (userData.password !== userData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    if (!userData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setErrors({});

    try {
      // D'abord enregistrer l'utilisateur
      const registrationResult = await authService.register({
        email: userData.email,
        password: userData.password
      });

      if (registrationResult.success) {
        // Ensuite compléter le profil
        const profileResult = await userService.updateUser({
          email: userData.email,
          nom: userData.nom,
          prenom: userData.prenom
        });

        if (profileResult.success) {
          navigate('/login', { 
            state: { 
              registrationSuccess: true,
              email: userData.email 
            } 
          });
        } else {
          setErrors({ form: profileResult.message });
        }
      } else {
        setErrors({ form: registrationResult.message });
      }
    } catch (err) {
      console.error('Registration error:', err);
      setErrors({ form: 'Une erreur est survenue lors de l\'inscription' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      {errors.form && <div className="auth-error">{errors.form}</div>}
      
      <div className="form-group">
        <label>Email :</label>
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          required
          autoComplete="username"
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>Mot de passe :</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />
        {errors.password && <span className="error-message">{errors.password}</span>}
      </div>

      <div className="form-group">
        <label>Confirmer le mot de passe :</label>
        <input
          type="password"
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />
        {errors.confirmPassword && (
          <span className="error-message">{errors.confirmPassword}</span>
        )}
      </div>

      <div className="form-group">
        <label>Nom :</label>
        <input
          type="text"
          name="nom"
          value={userData.nom}
          onChange={handleChange}
          required
        />
        {errors.nom && <span className="error-message">{errors.nom}</span>}
      </div>

      <div className="form-group">
        <label>Prénom :</label>
        <input
          type="text"
          name="prenom"
          value={userData.prenom}
          onChange={handleChange}
          required
        />
      </div>

      <button 
        type="submit" 
        className="auth-button" 
        disabled={isLoading}
      >
        {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
      </button>
    </form>
  );
};

export default RegisterForm;