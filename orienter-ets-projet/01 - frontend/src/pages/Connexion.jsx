import React, { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import '../styles/connexion.css';

export default function Connexion() {
  const [donneesConnexion, setDonneesConnexion] = useState({
    email: '',
    password: '',
  });

  const [erreurs, setErreurs] = useState({});
  const [messageSucces, setMessageSucces] = useState('');

  const gererChangement = (e) => {
    setDonneesConnexion({ ...donneesConnexion, [e.target.name]: e.target.value });
    setErreurs({ ...erreurs, [e.target.name]: '' });
    setMessageSucces('');
  };

  const gererSoumission = (e) => {
    e.preventDefault();
    const nouvellesErreurs = {};

    if (!donneesConnexion.email.trim()) nouvellesErreurs.email = 'L’identifiant est requis';
    if (!donneesConnexion.password.trim()) nouvellesErreurs.password = 'Le mot de passe est requis';

    if (Object.keys(nouvellesErreurs).length > 0) {
      setErreurs(nouvellesErreurs);
    } else {
      fetch("http://localhost:8080/nextgen/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donneesConnexion)
      })
        .then(res => {
          if (res.ok) return res.text();
          return res.json().then(errorData => {
            throw new Error(errorData.message || "Erreur lors de l’inscription");
          });
        })
        .then(message => {
          setMessageSucces(message);
          setErreurs({});
        })
        .catch(err => setErreurs({ global: err.message }));
  }
}

  return (
    <div className="page-connexion">
      <Header />
      <main className="connexion-main">
        <div className="connexion-box">
          <h2 className="connexion-title">Connexion</h2>

          {messageSucces && (
            <div className="message-succes">{messageSucces}</div>
          )}
          {erreurs.global && (
            <div className="message-erreur">{erreurs.global}</div>
          )}

          <form className="connexion-form" onSubmit={gererSoumission}>
            <div>
              <label>Identifiant (email)</label>
              <input
                type="text"
                name="email"
                value={donneesConnexion.email}
                onChange={gererChangement}
                className={`input ${erreurs.email ? 'input-erreur' : ''}`}
              />
              {erreurs.email && <p className="texte-erreur">{erreurs.email}</p>}
            </div>

            <div>
              <label>Mot de passe</label>
              <input
                type="password"
                name="password"
                value={donneesConnexion.password}
                onChange={gererChangement}
                className={`input ${erreurs.password ? 'input-erreur' : ''}`}
              />
              {erreurs.password && <p className="texte-erreur">{erreurs.password}</p>}
            </div>

            <button type="submit" className="bouton-valider">
              Se connecter
            </button>
          </form>

          <p className="lien-inscription">
            Vous n’avez pas de compte ?{' '}
            <Link to="/inscription" className="texte-lien">S’inscrire</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}