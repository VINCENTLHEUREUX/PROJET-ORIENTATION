import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Link } from 'react-router-dom';

const Inscription = () => {
  const [donneesFormulaire, setDonneesFormulaire] = useState({
    nom: '',
    prenom: '',
    courriel: '',
    motDePasse: '',
  });

  const [erreurs, setErreurs] = useState({});
  const [messageSucces, setMessageSucces] = useState('');

  const validerCourriel = (courriel) => {
    return /\S+@\S+\.\S+/.test(courriel);
  };

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
        body: JSON.stringify({
          nom: donneesFormulaire.nom,
          prenom: donneesFormulaire.prenom,
          courriel: donneesFormulaire.courriel,
          motDePasse: donneesFormulaire.motDePasse
        })
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
    <div className="bg-gray-50 font-sans min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-ets-red">Inscription</h2>

          {messageSucces && (
            <div className="mb-4 text-green-600 text-center font-medium">{messageSucces}</div>
          )}
          {erreurs.global && (
            <div className="mb-4 text-red-600 text-center font-medium">{erreurs.global}</div>
          )}

          <form className="space-y-4" onSubmit={gererSoumission}>
            <div>
              <label className="block text-gray-700">Nom</label>
              <input
                type="text"
                name="nom"
                value={donneesFormulaire.nom}
                onChange={gererChangement}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                  erreurs.nom ? 'border-red-500' : 'focus:ring focus:border-blue-300'
                }`}
              />
              {erreurs.nom && <p className="text-red-500 text-sm">{erreurs.nom}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Prénom</label>
              <input
                type="text"
                name="prenom"
                value={donneesFormulaire.prenom}
                onChange={gererChangement}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                  erreurs.prenom ? 'border-red-500' : 'focus:ring focus:border-blue-300'
                }`}
              />
              {erreurs.prenom && <p className="text-red-500 text-sm">{erreurs.prenom}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Courriel</label>
              <input
                type="email"
                name="courriel"
                value={donneesFormulaire.courriel}
                onChange={gererChangement}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                  erreurs.courriel ? 'border-red-500' : 'focus:ring focus:border-blue-300'
                }`}
              />
              {erreurs.courriel && <p className="text-red-500 text-sm">{erreurs.courriel}</p>}
            </div>

            <div>
              <label className="block text-gray-700">Mot de passe</label>
              <input
                type="password"
                name="motDePasse"
                value={donneesFormulaire.motDePasse}
                onChange={gererChangement}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                  erreurs.motDePasse ? 'border-red-500' : 'focus:ring focus:border-blue-300'
                }`}
              />
              {erreurs.motDePasse && <p className="text-red-500 text-sm">{erreurs.motDePasse}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-ets-red text-white py-2 px-4 rounded hover:bg-ets-darkred transition"
            >
              S'inscrire
            </button>
          </form>

          <p className="mt-4 text-sm text-center">
            Vous avez déjà un compte ?{' '}
            <Link to="/connexion" className="text-ets-red hover:underline">Se connecter</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Inscription;
