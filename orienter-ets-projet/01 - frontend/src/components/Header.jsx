import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const leftLinks = [
    { to: '/', label: 'Accueil' },
    { to: '#', label: 'Profil' },
    { to: '#', label: 'Programmes' },
    { to: '/formulaire', label: 'Orientation' }, 
  ];
  

  const rightLinks = [
    { to: '/connexion', label: 'Connexion' },
    { to: '/inscription', label: 'Inscription' },
  ];

  return (
    <header className="shadow-md">
      <nav className="bg-[#b91c1c]">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex justify-between items-center">
          {}
          <ul className="flex flex-wrap gap-2">
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

          {}
          <ul className="flex gap-2">
            {rightLinks.map(({ to, label }, index) => (
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
        </div>
      </nav>
    </header>
  );
};

export default Header;
