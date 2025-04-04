import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/accueil.css";
import Header from "../components/Header";
import Footer from "../components/Footer";



export default function Accueil() {
  return (
    <div className="page-accueil">
      {/* Header */}
      <Header />

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
      <Footer />
    </div>
  );
}
