import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/formations.css';

// Données des formations (baccalauréats)
const formations = [
  {
    id: 'glo',
    titre: 'Génie logiciel',
    code: 'GLO',
    description: 'Formation complète en conception, développement et maintenance de systèmes logiciels complexes.',
    duree: '4 ans',
    credits: '120 crédits',
    url: 'https://www.etsmtl.ca/programmes/baccalaureat/genie-logiciel'
  },
  {
    id: 'ele',
    titre: 'Génie électrique',
    code: 'ELE',
    description: 'Programme couvrant les systèmes électriques, électroniques et les technologies de l\'information.',
    duree: '4 ans',
    credits: '120 crédits',
    url: 'https://www.etsmtl.ca/programmes/baccalaureat/genie-electrique'
  },
  {
    id: 'mec',
    titre: 'Génie mécanique',
    code: 'MEC',
    description: 'Formation en conception et analyse de systèmes mécaniques et thermodynamiques.',
    duree: '4 ans',
    credits: '120 crédits',
    url: 'https://www.etsmtl.ca/programmes/baccalaureat/genie-mecanique'
  },
  {
    id: 'civ',
    titre: 'Génie civil',
    code: 'CIV',
    description: 'Programme axé sur la conception, la construction et la gestion des infrastructures.',
    duree: '4 ans',
    credits: '120 crédits',
    url: 'https://www.etsmtl.ca/programmes/baccalaureat/genie-civil'
  },
  {
    id: 'ind',
    titre: 'Génie industriel',
    code: 'IND',
    description: 'Optimisation des systèmes de production et des processus industriels.',
    duree: '4 ans',
    credits: '120 crédits',
    url: 'https://www.etsmtl.ca/programmes/baccalaureat/genie-industriel'
  },
  {
    id: 'log',
    titre: 'Génie logistique',
    code: 'LOG',
    description: 'Gestion des chaînes d\'approvisionnement et optimisation des flux logistiques.',
    duree: '4 ans',
    credits: '120 crédits',
    url: 'https://www.etsmtl.ca/programmes/baccalaureat/genie-logistique'
  }
];

export default function Formations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('tous');

  const filteredFormations = formations.filter(formation => {
    const matchesSearch = formation.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         formation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'tous' || formation.code.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="page-formations">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <Link to="/">
            <img
              src="/images/ETS-rouge-impr-fond_transparent.png"
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
            <li><Link to="/formations" className="nav-item">Formations</Link></li>
            <li><a href="#" className="nav-item">Cycles supérieurs</a></li>
            <li><a href="#" className="nav-item">Certificats</a></li>
            <li><a href="#" className="nav-item">Formation continue</a></li>
          </ul>
        </nav>
      </header>

      {/* Contenu principal */}
      <main className="main-content">
        <div className="formations-container">
          <h1>Formations en génie</h1>
          <p className="intro-text">
            Découvrez les programmes de baccalauréat offerts à l'ÉTS. Cliquez sur un programme pour voir
            les détails complets sur le site officiel de l'ÉTS.
          </p>

          {/* Barre de recherche et filtres */}
          <div className="search-filter-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Rechercher un programme..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search"></i>
            </div>
            <div className="filter-box">
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="tous">Tous les programmes</option>
                {formations.map(formation => (
                  <option key={formation.code} value={formation.code}>{formation.code}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Liste des formations */}
          <div className="formations-grid">
            {filteredFormations.length > 0 ? (
              filteredFormations.map(formation => (
                <div key={formation.id} className="formation-card">
                  <div className="formation-header">
                    <h2>{formation.titre}</h2>
                    <span className="formation-code">{formation.code}</span>
                  </div>
                  <div className="formation-body">
                    <p>{formation.description}</p>
                    <div className="formation-meta">
                      <span><i className="far fa-clock"></i> {formation.duree}</span>
                      <span><i className="fas fa-graduation-cap"></i> {formation.credits}</span>
                    </div>
                  </div>
                  <div className="formation-footer">
                    <a 
                      href={formation.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="formation-link"
                    >
                      Voir sur le site de l'ÉTS <i className="fas fa-external-link-alt"></i>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <i className="fas fa-search"></i>
                <p>Aucun programme ne correspond à votre recherche</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
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
