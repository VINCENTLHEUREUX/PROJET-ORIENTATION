import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const leftLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/formations', label: 'Programmes' },
    { to: '/orientation', label: 'Orientation' },
  ];

  return (
    <header className="shadow-md" role="banner">
      <nav className="bg-[#b91c1c]" aria-label="Navigation principale">
        <div className="max-w-[1200px] mx-auto px-4 py-3">
          {/* Bouton menu mobile */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Menu principal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-16 6h16"/>
            </svg>
          </button>

          <div className={`flex flex-col md:flex-row justify-between items-center ${isMenuOpen ? 'block' : 'hidden'} md:flex`}>
            {/* Navigation links */}
            <ul className="flex flex-col md:flex-row gap-2">
              {leftLinks.map(({ to, label }, index) => (
                <li key={index}>
                  <Link
                    to={to}
                    className="text-white px-4 py-2 inline-block hover:bg-[#7f1d1d] transition-colors duration-300 font-medium"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* User menu */}
            <div className="relative">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-white">Bienvenue, {user.email}</span>
                  <button
                    onClick={logout}
                    className="btn-secondary"
                    aria-label="Se déconnecter"
                  >
                    Déconnexion
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link
                    to="/connexion"
                    className="btn-primary"
                    aria-label="Se connecter"
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/inscription"
                    className="btn-secondary"
                    aria-label="S'inscrire"
                  >
                    Inscription
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;



