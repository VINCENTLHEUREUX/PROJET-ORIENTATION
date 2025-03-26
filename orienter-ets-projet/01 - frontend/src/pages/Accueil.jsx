import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/accueil.css";




export default function Accueil() {
  return (
    <div className="page-accueil">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <Link to="/">
            <img
              src="src/images/ETS-rouge-impr-fond_transparent.png"
              alt="Logo ÉTS"
              className="logo-ets"
            />
          </Link>
          <div className="header-links">
            <Link to="/connexion" className="link-ets">Connexion</Link>
            <Link to="/inscription" className="link-ets">Inscription</Link>
          </div>
        </div>
        <nav className="nav-bar">
          <ul className="nav-list">
            <li><Link to="/" className="nav-item">Accueil</Link></li>
            <li><a href="#" className="nav-item">Premier cycle</a></li>
            <li><a href="#" className="nav-item">Cycles supérieurs</a></li>
            <li><a href="#" className="nav-item">Certificats</a></li>
            <li><a href="#" className="nav-item">Formation continue</a></li>
          </ul>
        </nav>
      </header>

      {/* Contenu principal */}
      <main className="main-content">
        <div className="welcome-box">
          <div className="welcome-header">
            <h1 className="welcome-title">Bienvenue à l'ÉTS</h1>
            <h2 className="welcome-subtitle">Présentation de l'outil</h2>
          </div>
          <div className="welcome-text">
            <p>Bienvenue sur notre application d'orientation pour les étudiants de l'École de technologie supérieure de Montréal !</p>
            <p>Notre application est conçue pour aider les étudiants à naviguer facilement à travers les différents programmes offerts par l'université.</p>
            <p>Pour utiliser notre outil d'orientation, il vous suffit de vous connecter et de remplir le questionnaire.</p>
            <p>Nous sommes ravis de vous offrir cet outil pratique et intuitif pour faciliter votre parcours universitaire.</p>
          </div>
        </div>
      </main>

      {/* Pied de page */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-col">
            <h3>École de technologie supérieure</h3>
            <p>1100, rue Notre-Dame Ouest</p>
            <p>Montréal (Québec) H3C 1K3</p>
            <p>Canada</p>
            <p>Téléphone: 514 396-8800</p>
          </div>
          <div className="footer-col">
            <h3>Liens rapides</h3>
            <ul className="footer-links">
              <li><a href="#">Admission</a></li>
              <li><a href="#">Programmes</a></li>
              <li><a href="#">Bibliothèque</a></li>
              <li><a href="#">Recherche</a></li>
              <li><a href="#">Plan du site</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3>Restez connectés</h3>
            <div className="social-links">
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
            </div>
            <p>Abonnez-vous à notre infolettre pour rester informé des dernières nouvelles et événements.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 École de technologie supérieure. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
