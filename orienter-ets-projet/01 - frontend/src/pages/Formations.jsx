import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import '../styles/formations.css';

export default function Formations() {
  const [formations, setFormations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('tous');
  const [sortedFormations, setSortedFormations] = useState([]);
  const [orientationResults, setOrientationResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const location = useLocation();

  // Vérifie si l'utilisateur vient de la page d'orientation
  const fromOrientation = location.state?.fromOrientation || false;

  // Récupérer les formations et les résultats du test d'orientation lors du chargement
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Récupérer la liste des baccalauréats depuis le backend
        const formationsResponse = await axios.get('/api/formations');
        
        if (formationsResponse.data) {
          setFormations(formationsResponse.data);
          
          // Par défaut, sans résultats d'orientation, on affiche les formations dans l'ordre reçu
          setSortedFormations(formationsResponse.data);
          
          // Vérifier si l'utilisateur a déjà fait le test d'orientation
          const userStatusResponse = await axios.get('/api/user/orientation-status');
          
          // Si l'utilisateur vient de terminer le test ou a déjà fait le test
          if (fromOrientation || (userStatusResponse.data && userStatusResponse.data.hasCompletedOrientation)) {
            try {
              // Récupérer les résultats du test d'orientation
              const orientationResponse = await axios.get('/api/orientation/resultats');
              
              if (orientationResponse.data && orientationResponse.data.scores) {
                setOrientationResults(orientationResponse.data);
                setShowResults(true);
                
                // Trier les formations en fonction des scores
                const sortedByScore = [...formationsResponse.data].sort((a, b) => {
                  const scoreA = orientationResponse.data.scores[a.id] || 0;
                  const scoreB = orientationResponse.data.scores[b.id] || 0;
                  return scoreB - scoreA; // Tri décroissant par score
                });
                
                setSortedFormations(sortedByScore);
              }
            } catch (orientationErr) {
              console.error('Erreur lors de la récupération des résultats d\'orientation:', orientationErr);
              // Si erreur avec l'orientation, on garde l'ordre par défaut des formations
            }
          }
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);
        setError('Impossible de récupérer les informations. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    // Récupérer à nouveau les formations sans tri par orientation
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

  // Génération dynamique des options de filtre basée sur les formations disponibles
  const generateFilterOptions = () => {
    return [
      <option key="tous" value="tous">Tous les programmes</option>,
      ...formations.map(formation => (
        <option key={formation.id} value={formation.id}>{formation.titre}</option>
      ))
    ];
  };

  return (
    <div className="page-formations">
      {/* Header (identique à Orientation.js) */}
      <Header />

      {/* Contenu principal */}
      <main className="main-content">
        <div className="formations-container">
          <h1>Nos programmes de formation</h1>
          
          {/* Affichage du chargement */}
          {loading && (
            <div className="loading-indicator">
              <p>Chargement des programmes de formation...</p>
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
          {!loading && !error && (
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
                  {generateFilterOptions()}
                </select>
              </div>
              {!showResults && (
                <div className="orientation-cta">
                  <Link to="/orientation" className="btn-primary">Faire le test d'orientation</Link>
                </div>
              )}
            </div>
          )}
          
          {/* Liste des formations */}
          {!loading && !error && (
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
          )}
        </div>
      </main>

      {/* Footer*/ }
        <Footer />
    </div>
  );
}
