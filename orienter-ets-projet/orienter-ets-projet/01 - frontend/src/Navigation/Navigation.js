import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="main-nav">
      <Link to="/">Accueil</Link>
      <Link to="/login">Connexion</Link>
      <Link to="/register">Inscription</Link>
      <Link to="/orientation">Test d'orientation</Link>
    </nav>
  );
}

export default Navigation;