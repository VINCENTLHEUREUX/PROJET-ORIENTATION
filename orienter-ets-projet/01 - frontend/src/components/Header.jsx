
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
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
        <Link to="/" className="text-ets-red hover:text-ets-darkred font-medium">
          Accueil
        </Link>
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
);

export default Header;
