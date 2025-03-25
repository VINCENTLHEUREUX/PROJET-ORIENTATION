import React from 'react';
import { Link } from 'react-router-dom';

export default function Accueil() {
  return (
    <div className="bg-gray-50 font-sans min-h-screen flex flex-col">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Link to="/">
            <img
              src="src/images/ETS-rouge-impr-fond_transparent.png"
              alt="Logo ÉTS"
              className="h-12"
            />
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/connexion" className="text-ets-red hover:text-ets-darkred font-medium">
              Connexion
            </Link>
            <Link to="/inscription" className="text-ets-red hover:text-ets-darkred font-medium">
              Inscription
            </Link>
          </div>
        </div>
        <nav className="bg-ets-red">
          <div className="container mx-auto px-4">
            <ul className="flex overflow-x-auto whitespace-nowrap">
              <li><Link to="/" className="text-white px-4 py-3 inline-block hover:bg-ets-darkred">Accueil</Link></li>
              <li><a href="#" className="text-white px-4 py-3 inline-block hover:bg-ets-darkred">Premier cycle</a></li>
              <li><a href="#" className="text-white px-4 py-3 inline-block hover:bg-ets-darkred">Cycles supérieurs</a></li>
              <li><a href="#" className="text-white px-4 py-3 inline-block hover:bg-ets-darkred">Certificats</a></li>
              <li><a href="#" className="text-white px-4 py-3 inline-block hover:bg-ets-darkred">Formation continue</a></li>
            </ul>
          </div>
        </nav>
      </header>
      <main className="flex-grow">
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-8">
          <div className="bg-ets-red py-4 px-6" id="acceuil">
            <h1 className="text-2xl font-bold text-white">Bienvenue à l'ÉTS</h1>
            <h2 className="text-xl font-bold text-white">Présentation de l'outil</h2>
          </div>
          <div className="p-6 space-y-4">
            <p>Bienvenue sur notre application d'orientation pour les étudiants de l'École de technologie supérieure de Montréal !</p>
            <p>Notre application est conçue pour aider les étudiants à naviguer facilement à travers les différents programmes offerts par l'université.</p>
            <p>Pour utiliser notre outil d'orientation, il vous suffit de vous connecter et de remplir le questionnaire.</p>
            <p>Nous sommes ravis de vous offrir cet outil pratique et intuitif pour faciliter votre parcours universitaire.</p>
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">École de technologie supérieure</h3>
              <p className="mb-2">1100, rue Notre-Dame Ouest</p>
              <p className="mb-2">Montréal (Québec) H3C 1K3</p>
              <p className="mb-2">Canada</p>
              <p className="mb-2">Téléphone: 514 396-8800</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-ets-red">Admission</a></li>
                <li><a href="#" className="hover:text-ets-red">Programmes</a></li>
                <li><a href="#" className="hover:text-ets-red">Bibliothèque</a></li>
                <li><a href="#" className="hover:text-ets-red">Recherche</a></li>
                <li><a href="#" className="hover:text-ets-red">Plan du site</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Restez connectés</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="hover:text-ets-red">Facebook</a>
                <a href="#" className="hover:text-ets-red">Twitter</a>
                <a href="#" className="hover:text-ets-red">Instagram</a>
                <a href="#" className="hover:text-ets-red">LinkedIn</a>
              </div>
              <p>Abonnez-vous à notre infolettre pour rester informé des dernières nouvelles et événements.</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
            <p>&copy; 2025 École de technologie supérieure. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
