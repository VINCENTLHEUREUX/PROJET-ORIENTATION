import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/">
          <img src="/ETS-rouge-impr-fond_transparent.png" alt="Logo ÉTS" className="logo-ets" />
        </Link>
        <div className="header-links">
          <Link to="/connexion" className="link-ets">Connexion</Link>
          <Link to="/inscription" className="link-ets">Inscription</Link>
        </div>
      </div>
      <nav className="nav-bar">
        <ul className="nav-list">
          <li><Link to="/" className="nav-item">Accueil</Link></li>
          <li><Link to="/orientation" className="nav-item">Orientation</Link></li>
          <li><Link to="/formations" className="nav-item">Formations</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;



