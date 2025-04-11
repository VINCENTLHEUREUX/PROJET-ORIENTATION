import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import '../styles/formations.css';

export default function Formations() {
  const [formations, setFormations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('compatibility');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filter, setFilter] = useState('tous');
  const [orientationResults, setOrientationResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const location = useLocation();

  const fromOrientation = location.state?.fromOrientation || false;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const formationsResponse = await axios.get('api/programs');
        
        if (formationsResponse.data && formationsResponse.data.programs) {
          const programsWithMappedFields = formationsResponse.data.programs.map(program => ({
            id: program.sigle,
            titre: program.nom,
            description: program.description,
            code: program.sigle,
            credits: program.credits || "N/A",
            url: program.url || "#"
          }));
          
          setFormations(programsWithMappedFields);
          
          const userToken = localStorage.getItem('authToken');

          if (userToken) {
            try {
              
                const orientationResponse = await axios.post('api/results', {
                  token: userToken  
                });
                
                if (orientationResponse.data) {
                  setOrientationResults(orientationResponse.data);
                  setShowResults(true);
                }
            } catch (orientationErr) {
              console.error('Erreur lors de la récupération des résultats d\'orientation:', orientationErr);
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
  
  const getCompatibilityPercentage = (formationId) => {
    if (!orientationResults || !showResults) return 0;
    const score = orientationResults[`resultat${formationId.toLowerCase()}`] || 0;
    return Math.round(((score-5)/ 20) * 100); 
  };
  
  const getCompatibilityClass = (formationId) => {
    if (!orientationResults || !showResults) return '';
    
    const score = orientationResults[`resultat${formationId.toLowerCase()}`] || 0;
    if (score >= 20) return 'compatibility-high';
    if (score >= 15) return 'compatibility-medium';
    return 'compatibility-low';
  };

  const filteredFormations = useMemo(() => {
    if (!Array.isArray(formations)) return [];
    
    return formations.filter(formation => {
      const matchesSearch = formation.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           formation.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filter === 'tous' || formation.id === filter;
      return matchesSearch && matchesFilter;
    });
  }, [formations, searchTerm, filter]);
  
  const sortedFormations = useMemo(() => {
    if (!filteredFormations.length) return [];
    
    return [...filteredFormations].sort((a, b) => {
      let valueA, valueB;
      
      switch (sortBy) {
        case 'nom':
          valueA = a.titre.toLowerCase();
          valueB = b.titre.toLowerCase();
          break;
        case 'credits':
          valueA = typeof a.credits === 'number' ? a.credits : 0;
          valueB = typeof b.credits === 'number' ? b.credits : 0;
          break;
        case 'compatibility':
          valueA = getCompatibilityPercentage(a.id);
          valueB = getCompatibilityPercentage(b.id);
          break;
        default:
          valueA = a.titre.toLowerCase();
          valueB = b.titre.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  }, [filteredFormations, sortBy, sortOrder]);
  
  const handleSortChange = (critere) => {
    if (sortBy === critere) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(critere);
      setSortOrder(critere === 'compatibility' ? 'desc' : 'asc');
    }
  };
  
  const resetSort = () => {
    setSortBy('compatibility');
    setSortOrder('desc');
    setFilter('tous');
    setSearchTerm('');
    setShowResults(false);
  };

  return (
    <div className="page-formations">
      <Header />

      <main className="main-content">
        <div className="formations-container">
          <h1>Nos programmes de formation</h1>
          
          {loading && (
            <div className="loading-indicator">
              <p>Chargement des programmes de formation...</p>
            </div>
          )}
          
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
          
          {showResults && !loading && !error && (
            <div className="orientation-results-banner">
              <h2>Résultats de votre test d'orientation</h2>
              <p>Voici les programmes qui correspondent le mieux à votre profil :</p>
              <div className="results-legend">
                <span className="legend-item"><span className="legend-color compatibility-high"></span> Compatibilité élevée (80-100%)</span>
                <span className="legend-item"><span className="legend-color compatibility-medium"></span> Compatibilité moyenne (60-79%)</span>
                <span className="legend-item"><span className="legend-color compatibility-low"></span> Compatibilité faible (0-59%)</span>
              </div>
            </div>
          )}
          
          {!loading && !error && (
            <div className="search-filter-container">
              <div className="search-bar">
                <div className="search-icon">🔍</div>
                <input
                  type="text"
                  placeholder="Rechercher une formation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="filter-controls">
                <div className="filter-options">
                  <label>Filtrer par :</label>
                  <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)}>
                    <option value="nom">Nom</option>
                    <option value="credits">Crédits</option>
                    {showResults && (
                      <option value="compatibility">Compatibilité</option>
                    )}
                  </select>
                  <button 
                    className="sort-order-button" 
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </button>
                </div>
                
                {showResults && (
                  <button className="btn-secondary results-toggle" onClick={resetSort}>
                    Masquer les résultats
                  </button>
                )}
              </div>
              
              {!showResults && (
                <div className="orientation-cta">
                  <Link to="/orientation" className="btn-primary">Faire le test d'orientation</Link>
                </div>
              )}
            </div>
          )}
          
          {!loading && !error && (
            <div className="formations-list">
              {sortedFormations.length > 0 ? (
                sortedFormations.map((formation) => (
                  <div key={formation.id} className={`formation-card ${getCompatibilityClass(formation.id)}`}>
                    <div className="formation-header">
                      <h2>{formation.titre}</h2>
                      <span className="formation-code">{formation.code}</span>
                    </div>
                    <div className="formation-content">
                      <p className="formation-description">{formation.description}</p>
                      <div className="formation-details">
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
                    <div className="formation-actions" style={{marginTop: '20px'}}>
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

      <Footer />
    </div>
  );
}