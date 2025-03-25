import React from 'react';
import './Header.css';
import Navigation from '../Navigation/Navigation';

function Header() {
  return (
    <header className="app-header">
      <h1>Simulateur de Carrières</h1>
      <Navigation />
    </header>
  );
}

export default Header;