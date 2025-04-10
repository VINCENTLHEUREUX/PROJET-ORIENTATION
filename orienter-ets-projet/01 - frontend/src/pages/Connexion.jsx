import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../styles/connexion.css';

export default function Connexion() {
  const { login } = useAuth();
  const [donneesConnexion, setDonneesConnexion] = useState({
    email: '',
    password: ''
  });
  const [erreurs, setErreurs] = useState({});
  const [messageSucces, setMessageSucces] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validerEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const gererChangement = (e) => {
    const { name, value } = e.target;
    setDonneesConnexion(prev => ({ ...prev, [name]: value }));
    
    // Effacer l'erreur quand l'utilisateur corrige
    if (erreurs[name]) {
      setErreurs(prev => ({ ...prev, [name]: '' }));
    }
    setMessageSucces('');
  };

  const gererSoumission = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const nouvellesErreurs = {};
    
    // Validation
    if (!donneesConnexion.email.trim()) {
      nouvellesErreurs.email = 'Email est requis';
    } else if (!validerEmail(donneesConnexion.email)) {
      nouvellesErreurs.email = 'Format d\'email invalide';
    }
    
    if (!donneesConnexion.password.trim()) {
      nouvellesErreurs.password = 'Le mot de passe est requis';
    }

    if (Object.keys(nouvellesErreurs).length > 0) {
      setErreurs(nouvellesErreurs);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donneesConnexion),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Échec de la connexion");
      }

      const data = await response.json();
      
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }

      // Stocker les informations de l'utilisateur
      login({
        email: donneesConnexion.email,
        token: data.token
      });

      setMessageSucces("Connexion réussie ! Redirection...");
      setErreurs({});
      
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err) {
      setErreurs({ 
        global: err.message || "Email ou mot de passe incorrect" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-connexion">
      <Header />
      <main className="connexion-main">
        <div className="connexion-box">
          <h2 className="connexion-title">Connexion</h2>
          
          {messageSucces && (
            <div className="message-succes">
              {messageSucces}
            </div>
          )}
          
          {erreurs.global && (
            <div className="message-erreur">
              {erreurs.global}
            </div>
          )}
          
          <form className="connexion-form" onSubmit={gererSoumission}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={donneesConnexion.email}
                onChange={gererChangement}
                className={`input ${erreurs.email ? 'input-erreur' : ''}`}
                autoComplete="email"
              />
              {erreurs.email && (
                <p className="texte-erreur">{erreurs.email}</p>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                id="password"
                name="password"
                value={donneesConnexion.password}
                onChange={gererChangement}
                className={`input ${erreurs.password ? 'input-erreur' : ''}`}
                autoComplete="current-password"
              />
              {erreurs.password && (
                <p className="texte-erreur">{erreurs.password}</p>
              )}
            </div>
            
            <button 
              type="submit" 
              className="bouton-valider"
              disabled={isLoading}
            >
              {isLoading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>
          
          <div className="connexion-links">
            <p className="lien-inscription">
              Vous n'avez pas de compte ?{' '}
              <Link to="/inscription" className="texte-lien">
                S'inscrire
              </Link>
            </p>
            <p className="lien-motdepasse-oublie">
              <Link to="/mot-de-passe-oublie" className="texte-lien">
                Mot de passe oublié ?
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}



