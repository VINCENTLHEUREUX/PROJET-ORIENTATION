import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import '../styles/inscription.css';


const Inscription = () => {
  const [donneesFormulaire, setDonneesFormulaire] = useState({
    nom: '',
    prenom: '',
    courriel: '',
    motDePasse: '',
  });

  const [erreurs, setErreurs] = useState({});
  const [messageSucces, setMessageSucces] = useState('');

  const validerCourriel = (courriel) => /\S+@\S+\.\S+/.test(courriel);

  const gererChangement = (e) => {
    setDonneesFormulaire({ ...donneesFormulaire, [e.target.name]: e.target.value });
    setErreurs({ ...erreurs, [e.target.name]: '' });
    setMessageSucces('');
  };

  const gererSoumission = (e) => {
    e.preventDefault();
    const nouvellesErreurs = {};

    if (!donneesFormulaire.nom.trim()) nouvellesErreurs.nom = 'Le nom est requis';
    if (!donneesFormulaire.prenom.trim()) nouvellesErreurs.prenom = 'Le prénom est requis';
    if (!donneesFormulaire.courriel.trim()) nouvellesErreurs.courriel = 'Le courriel est requis';
    else if (!validerCourriel(donneesFormulaire.courriel)) nouvellesErreurs.courriel = 'Format de courriel invalide';
    if (!donneesFormulaire.motDePasse.trim()) nouvellesErreurs.motDePasse = 'Le mot de passe est requis';

    if (Object.keys(nouvellesErreurs).length > 0) {
      setErreurs(nouvellesErreurs);
    } else {
      fetch("http://localhost:8080/nextgen/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(donneesFormulaire)
      })
        .then(res => {
          if (res.ok) return res.text();
          throw new Error("Erreur lors de l’inscription");
        })
        .then(message => {
          setMessageSucces(message);
          setDonneesFormulaire({ nom: '', prenom: '', courriel: '', motDePasse: '' });
          setErreurs({});
        })
        .catch(err => setErreurs({ global: err.message }));
    }
  };

  return (
    <div className="page-inscription">
      <Header />
      <main className="inscription-main">
        <div className="inscription-box">
          <h2 className="inscription-title">Inscription</h2>

          {messageSucces && <div className="message-succes">{messageSucces}</div>}
          {erreurs.global && <div className="message-erreur">{erreurs.global}</div>}

          <form className="inscription-form" onSubmit={gererSoumission}>
            {['nom', 'prenom', 'courriel', 'motDePasse'].map((champ, i) => (
              <div key={i}>
                <label htmlFor={champ}>{champ === 'motDePasse' ? 'Mot de passe' : champ.charAt(0).toUpperCase() + champ.slice(1)}</label>
                <input
                  type={champ === 'motDePasse' ? 'password' : (champ === 'courriel' ? 'email' : 'text')}
                  name={champ}
                  value={donneesFormulaire[champ]}
                  onChange={gererChangement}
                  className={`input ${erreurs[champ] ? 'input-erreur' : ''}`}
                />
                {erreurs[champ] && <p className="texte-erreur">{erreurs[champ]}</p>}
              </div>
            ))}

            <button type="submit" className="bouton-valider">
              S'inscrire
            </button>
          </form>

          <p className="lien-connexion">
            Vous avez déjà un compte ?{' '}
            <Link to="/connexion" className="texte-lien">Se connecter</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Inscription;
