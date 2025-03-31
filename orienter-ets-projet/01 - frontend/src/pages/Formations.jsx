import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
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
  const [sortedFormations, setSortedFormations] = useState([...formations]);
  const [orientationResults, setOrientationResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const location = useLocation();

  // Vérifie si l'utilisateur vient de la page d'orientation
  const fromOrientation = location.state?.fromOrientation || false;

  // Récupérer les résultats du test d'orientation depuis le backend lors du chargement
  useEffect(() => {
    const fetchOrientationResults = async () => {
      // Si l'utilisateur vient de terminer le test d'orientation
      if (fromOrientation) {
        setLoading(true);
        setError(null);
        
        try {
          // Récupérer les résultats du backend
          const response = await axios.get('/api/orientation/resultats');
          
          if (response.data && response.data.scores) {
            setOrientationResults(response.data);
            setShowResults(true);
            
            // Trier les formations en fonction des scores
            const sortedByScore = [...formations].sort((a, b) => {
              const scoreA = response.data.scores[a.id] || 0;
              const scoreB = response.data.scores[b.id] || 0;
              return scoreB - scoreA; // Tri décroissant par score
            });
            
            setSortedFormations(sortedByScore);
          }
        } catch (err) {
          console.error('Erreur lors de la récupération des résultats:', err);
          setError('Impossible de récupérer vos résultats d\'orientation. Veuillez réessayer.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrientationResults();
  }, [fromOrientation]);

  // Filtrer les formations en fonction de la recherche et du filtre
  const filteredFormations = sortedFormations.filter(formation => {
    const matchesSearch = formation.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         formation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'tous' || formation.id === filter;
    return matchesSearch && matchesFilter;
  });

  // Réinitialiser le tri des formations
  const resetSort = () => {
    setSortedFormations([...formations]);
    setShowResults(false);
  };

  // Calculer la classe CSS pour la compatibilité (pour l'indicateur visuel)
  const getCompatibilityClass = (formationId) => {
    if (!orientationResults || !showResults) return '';
    
    const score = orientationResults.scores[formationId] || 0;
    if (score >= 4) return 'compatibility-high';
    if (score >= 3) return 'compatibility-medium';
    return 'compatibility-low';
  };

  // Calculer le pourcentage de compatibilité
  const getCompatibilityPercentage = (formationId) => {
    if (!orientationResults || !showResults) return null;
    const score = orientationResults.scores[formationId] || 0;
    return Math.round((score / 5) * 100); // Convertir le score sur 5 en pourcentage
  };

  return (
    <div className="page-formations">
      {/* Header (identique à Orientation.js) */}
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
        <div className="formations-container">
          <h1>Nos programmes de formation</h1>
          
          {/* Affichage du chargement */}
          {loading && (
            <div className="loading-indicator">
              <p>Chargement des résultats de votre test d'orientation...</p>
            </div>
          )}
          
          {/* Affichage des erreurs */}
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
          
          {/* Bannière des résultats du test d'orientation */}
          {showResults && !loading && !error && (
            <div className="orientation-results-banner">
              <h2>Résultats de votre test d'orientation</h2>
              <p>Voici les programmes qui correspondent le mieux à votre profil :</p>
              <div className="results-legend">
                <span className="legend-item"><span className="legend-color compatibility-high"></span> Compatibilité élevée (80-100%)</span>
                <span className="legend-item"><span className="legend-color compatibility-medium"></span> Compatibilité moyenne (60-79%)</span>
                <span className="legend-item"><span className="legend-color compatibility-low"></span> Compatibilité faible (0-59%)</span>
              </div>
              <button className="btn-secondary" onClick={resetSort}>Réinitialiser les résultats</button>
            </div>
          )}
          
          {/* Barre de recherche et filtres */}
          <div className="search-filter-container">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Rechercher une formation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-options">
              <label>Filtrer par :</label>
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="tous">Tous les programmes</option>
                <option value="glo">Génie logiciel</option>
                <option value="ele">Génie électrique</option>
                <option value="mec">Génie mécanique</option>
                <option value="civ">Génie civil</option>
                <option value="ind">Génie industriel</option>
                <option value="log">Génie logistique</option>
              </select>
            </div>
            {!showResults && !loading && (
              <div className="orientation-cta">
                <Link to="/orientation" className="btn-primary">Faire le test d'orientation</Link>
              </div>
            )}
          </div>
          
          {/* Liste des formations */}
          <div className="formations-list">
            {filteredFormations.length > 0 ? (
              filteredFormations.map((formation) => (
                <div key={formation.id} className={`formation-card ${getCompatibilityClass(formation.id)}`}>
                  <div className="formation-header">
                    <h2>{formation.titre}</h2>
                    <span className="formation-code">{formation.code}</span>
                  </div>
                  <div className="formation-content">
                    <p className="formation-description">{formation.description}</p>
                    <div className="formation-details">
                      <span><strong>Durée:</strong> {formation.duree}</span>
                      <span><strong>Crédits:</strong> {formation.credits}</span>
                    </div>
                    {showResults && (
                      <div className="compatibility-indicator">
                        <div className="compatibility-bar">
                          <div 
                            className="compatibility-fill" 
                            style={{width: `${getCompatibilityPercentage(formation.id)}%`}}
                          ></div>
                        </div>
                        <span className="compatibility-percentage">{getCompatibilityPercentage(formation.id)}% de compatibilité</span>
                      </div>
                    )}
                  </div>
                  <div className="formation-actions">
                    <a href={formation.url} target="_blank" rel="noopener noreferrer" className="btn-secondary">En savoir plus</a>
                    <Link to={`/admission/${formation.id}`} className="btn-primary">Postuler</Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>Aucune formation ne correspond à votre recherche.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer (identique à Orientation.js) */}
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
