import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Link } from 'react-router-dom';

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
    <div className="bg-gray-50 font-sans min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mt-8">
          <h2 className="text-2xl font-bold mb-4 text-center text-ets-red">Connexion</h2>

          {messageSucces && (
            <div className="mb-4 text-green-600 text-center font-medium">{messageSucces}</div>
          )}
          {erreurs.global && (
            <div className="mb-4 text-red-600 text-center font-medium">{erreurs.global}</div>
          )}

          <form className="space-y-4" onSubmit={gererSoumission}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Identifiant (userId)</label>
              <input
                type="text"
                name="userId"
                value={donneesConnexion.userId}
                onChange={gererChangement}
                className={`mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none ${
                  erreurs.userId ? 'border-red-500' : 'focus:ring focus:border-ets-red'
                }`}
              />
              {erreurs.userId && <p className="text-red-500 text-sm">{erreurs.userId}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
              <input
                type="password"
                name="motDePasse"
                value={donneesConnexion.motDePasse}
                onChange={gererChangement}
                className={`mt-1 block w-full px-4 py-2 border rounded-md focus:outline-none ${
                  erreurs.motDePasse ? 'border-red-500' : 'focus:ring focus:border-ets-red'
                }`}
              />
              {erreurs.motDePasse && <p className="text-red-500 text-sm">{erreurs.motDePasse}</p>}
            </div>

            <button type="submit" className="w-full bg-ets-red hover:bg-ets-darkred text-white py-2 px-4 rounded-md">
              Se connecter
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Vous n’avez pas de compte ?{' '}
            <Link to="/inscription" className="text-ets-red hover:underline">S’inscrire</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
