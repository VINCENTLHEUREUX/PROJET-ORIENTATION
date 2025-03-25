import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Link to="/">
            <img
              src="/images/ETS-rouge-impr-fond_transparent.png" // Modifié pour utiliser le chemin public
              alt="Logo ÉTS"
              className="h-12"
            />
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/connexion" className="text-red-600 hover:text-red-800 font-medium">
              Connexion
            </Link>
            <Link to="/inscription" className="text-red-600 hover:text-red-800 font-medium">
              Inscription
            </Link>
          </div>
        </div>
        <nav className="bg-red-600">
          <div className="container mx-auto px-4">
            <ul className="flex overflow-x-auto whitespace-nowrap">
              <li><Link to="/" className="text-white px-4 py-3 inline-block hover:bg-red-800">Accueil</Link></li>
              <li><a href="#" className="text-white px-4 py-3 inline-block hover:bg-red-800">Premier cycle</a></li>
              <li><a href="#" className="text-white px-4 py-3 inline-block hover:bg-red-800">Cycles supérieurs</a></li>
              <li><a href="#" className="text-white px-4 py-3 inline-block hover:bg-red-800">Certificats</a></li>
              <li><a href="#" className="text-white px-4 py-3 inline-block hover:bg-red-800">Formation continue</a></li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-red-600 py-4 px-6">
            <h1 className="text-2xl font-bold text-white">Bienvenue à l'ÉTS</h1>
            <h2 className="text-xl font-bold text-white">Présentation de l'outil</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-gray-700">Bienvenue sur notre application d'orientation pour les étudiants de l'École de technologie supérieure de Montréal !</p>
            <p className="text-gray-700">Notre application est conçue pour aider les étudiants à naviguer facilement à travers les différents programmes offerts par l'université.</p>
            <p className="text-gray-700">Pour utiliser notre outil d'orientation, il vous suffit de vous connecter et de remplir le questionnaire.</p>
            <p className="text-gray-700">Nous sommes ravis de vous offrir cet outil pratique et intuitif pour faciliter votre parcours universitaire.</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">École de technologie supérieure</h3>
              <p className="mb-2 text-gray-300">1100, rue Notre-Dame Ouest</p>
              <p className="mb-2 text-gray-300">Montréal (Québec) H3C 1K3</p>
              <p className="mb-2 text-gray-300">Canada</p>
              <p className="mb-2 text-gray-300">Téléphone: 514 396-8800</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 hover:text-red-400">Admission</a></li>
                <li><a href="#" className="text-gray-300 hover:text-red-400">Programmes</a></li>
                <li><a href="#" className="text-gray-300 hover:text-red-400">Bibliothèque</a></li>
                <li><a href="#" className="text-gray-300 hover:text-red-400">Recherche</a></li>
                <li><a href="#" className="text-gray-300 hover:text-red-400">Plan du site</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Restez connectés</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-300 hover:text-red-400">Facebook</a>
                <a href="#" className="text-gray-300 hover:text-red-400">Twitter</a>
                <a href="#" className="text-gray-300 hover:text-red-400">Instagram</a>
                <a href="#" className="text-gray-300 hover:text-red-400">LinkedIn</a>
              </div>
              <p className="text-gray-300">Abonnez-vous à notre infolettre pour rester informé des dernières nouvelles et événements.</p>
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
