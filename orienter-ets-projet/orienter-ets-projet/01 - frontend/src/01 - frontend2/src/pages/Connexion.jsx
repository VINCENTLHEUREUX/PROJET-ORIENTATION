import React, { useState } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import '../styles/connexion.css';

export default function Connexion() {
  const [donneesConnexion, setDonneesConnexion] = useState({
    userId: '',
    motDePasse: '',
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

    if (!donneesConnexion.userId.trim()) nouvellesErreurs.userId = 'L’identifiant est requis';
    if (!donneesConnexion.motDePasse.trim()) nouvellesErreurs.motDePasse = 'Le mot de passe est requis';

    if (Object.keys(nouvellesErreurs).length > 0) {
      setErreurs(nouvellesErreurs);
    } else {
      fetch(`http://localhost:8080/nextgen/user/${donneesConnexion.userId}`)
        .then(res => {
          if (!res.ok) throw new Error("Utilisateur non trouvé");
          return res.json();
        })
        .then(user => {
          if (user.motDePasse === donneesConnexion.motDePasse) {
            setMessageSucces("Connexion réussie !");
            setErreurs({});
            setDonneesConnexion({ userId: '', motDePasse: '' });
          } else {
            throw new Error("Mot de passe incorrect");
          }
        })
        .catch(err => {
          setErreurs({ global: err.message });
        });
    }
  };

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
              <label>Identifiant (userId)</label>
              <input
                type="text"
                name="userId"
                value={donneesConnexion.userId}
                onChange={gererChangement}
                className={`input ${erreurs.userId ? 'input-erreur' : ''}`}
              />
              {erreurs.userId && <p className="texte-erreur">{erreurs.userId}</p>}
            </div>

            <div>
              <label>Mot de passe</label>
              <input
                type="password"
                name="motDePasse"
                value={donneesConnexion.motDePasse}
                onChange={gererChangement}
                className={`input ${erreurs.motDePasse ? 'input-erreur' : ''}`}
              />
              {erreurs.motDePasse && <p className="texte-erreur">{erreurs.motDePasse}</p>}
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