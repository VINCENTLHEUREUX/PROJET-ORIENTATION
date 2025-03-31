import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/inscription.css';

const Inscription = () => {
  const [donneesFormulaire, setDonneesFormulaire] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
  });
  const [erreurs, setErreurs] = useState({});
  const [messageSucces, setMessageSucces] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validerEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validerPassword = (password) => password.length >= 6;

  const gererChangement = (e) => {
    const { name, value } = e.target;
    setDonneesFormulaire(prev => ({ ...prev, [name]: value }));
    
    // Effacer l'erreur spécifique quand l'utilisateur corrige
    if (erreurs[name]) {
      setErreurs(prev => ({ ...prev, [name]: '' }));
    }
    setMessageSucces('');
  };

  const gererSoumission = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const nouvellesErreurs = {};

    // Validation des champs
    if (!donneesFormulaire.nom.trim()) {
      nouvellesErreurs.nom = 'Le nom est requis';
    }
    if (!donneesFormulaire.prenom.trim()) {
      nouvellesErreurs.prenom = 'Le prénom est requis';
    }
    if (!donneesFormulaire.email.trim()) {
      nouvellesErreurs.email = 'L\'email est requis';
    } else if (!validerEmail(donneesFormulaire.email)) {
      nouvellesErreurs.email = 'Format d\'email invalide';
    }
    if (!donneesFormulaire.password.trim()) {
      nouvellesErreurs.password = 'Le mot de passe est requis';
    } else if (!validerPassword(donneesFormulaire.password)) {
      nouvellesErreurs.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (Object.keys(nouvellesErreurs).length > 0) {
      setErreurs(nouvellesErreurs);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/nextgen/user", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(donneesFormulaire)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de l'inscription");
      }

      const data = await response.json();
      setMessageSucces("Inscription réussie ! Redirection...");
      setDonneesFormulaire({ nom: '', prenom: '', email: '', password: '' });
      setErreurs({});
      
      // Redirection après 2 secondes
      setTimeout(() => {
        navigate('/connexion');
      }, 2000);
    } catch (err) {
      setErreurs({ 
        global: err.message || "Une erreur est survenue lors de l'inscription" 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-inscription">
      <Header />
      <main className="inscription-main">
        <div className="inscription-box">
          <h2 className="inscription-title">Inscription</h2>
          
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
          
          <form className="inscription-form" onSubmit={gererSoumission}>
            {['nom', 'prenom', 'email', 'password'].map((champ) => (
              <div className="form-group" key={champ}>
                <label htmlFor={champ}>
                  {champ === 'password' 
                    ? 'Mot de passe' 
                    : champ === 'email'
                    ? 'Email'
                    : champ.charAt(0).toUpperCase() + champ.slice(1)}
                </label>
                <input
                  type={champ === 'password' ? 'password' : 'text'}
                  id={champ}
                  name={champ}
                  value={donneesFormulaire[champ]}
                  onChange={gererChangement}
                  className={`input ${erreurs[champ] ? 'input-erreur' : ''}`}
                  autoComplete={champ === 'password' ? 'new-password' : 'off'}
                />
                {erreurs[champ] && (
                  <p className="texte-erreur">{erreurs[champ]}</p>
                )}
              </div>
            ))}
            
            <button 
              type="submit" 
              className="bouton-valider"
              disabled={isLoading}
            >
              {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
            </button>
          </form>
          
          <p className="lien-connexion">
            Vous avez déjà un compte ?{' '}
            <Link to="/connexion" className="texte-lien">
              Se connecter
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Inscription;
