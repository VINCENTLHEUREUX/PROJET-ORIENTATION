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
        const formationsResponse = await axios.get('https://springboot-projetorientation-ddapbxdnhkatfgdc.canadaeast-01.azurewebsites.net/nextgen/programs');

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
          let initialSortBy = 'nom';
          let initialSortOrder = 'asc';


          if (userToken) {
            try {

                const orientationResponse = await axios.post('https://springboot-projetorientation-ddapbxdnhkatfgdc.canadaeast-01.azurewebsites.net/nextgen/results', {
                  token: userToken
                });

                if (orientationResponse.data) {
                  setOrientationResults(orientationResponse.data);
                  initialSortBy = 'compatibility';
                  initialSortOrder = 'desc';
                  if (fromOrientation) {
                    setShowResults(true);
                  }
                }
            } catch (orientationErr) {
              console.error('Erreur lors de la récupération des résultats d\'orientation:', orientationErr);
            }
          }
          setSortBy(initialSortBy);
          setSortOrder(initialSortOrder);

        } else {
           setError('Format de données invalide reçu pour les programmes.');
           setSortBy('nom');
           setSortOrder('asc');
        }
      } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);
        setError('Impossible de récupérer les informations. Veuillez réessayer plus tard.');
        setSortBy('nom');
        setSortOrder('asc');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fromOrientation]);

  const getCompatibilityPercentage = (formationId) => {
    if (!orientationResults || !formationId) return 0;
    const key = `resultat${formationId.toLowerCase()}`;
    const score = orientationResults[key] || 0;
    const clampedScore = Math.max(5, Math.min(score, 25));
    return Math.round(((clampedScore - 5) / 20) * 100);
  };

  const getCompatibilityClass = (formationId) => {
    if (!orientationResults || !showResults || !formationId) return '';
    const key = `resultat${formationId.toLowerCase()}`;
    const score = orientationResults[key] || 0;
    if (score >= 20) return 'compatibility-high';
    if (score >= 15) return 'compatibility-medium';
    return 'compatibility-low';
  };

  const filteredFormations = useMemo(() => {
    if (!Array.isArray(formations)) return [];

    return formations.filter(formation => {
      const titleMatch = formation.titre?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
      const descriptionMatch = formation.description?.toLowerCase().includes(searchTerm.toLowerCase()) || false;
      const matchesSearch = titleMatch || descriptionMatch;
      const matchesFilter = filter === 'tous' || formation.id === filter; // Assuming filter uses id
      return matchesSearch && matchesFilter;
    });
  }, [formations, searchTerm, filter]);

  const sortedFormations = useMemo(() => {
    if (!filteredFormations.length) return [];

    return [...filteredFormations].sort((a, b) => {
      let valueA, valueB;

      switch (sortBy) {
        case 'nom':
          valueA = a.titre?.toLowerCase() || '';
          valueB = b.titre?.toLowerCase() || '';
          break;
        case 'credits':
          valueA = typeof a.credits === 'number' ? a.credits : 0;
          valueB = typeof b.credits === 'number' ? b.credits : 0;
          break;
        case 'compatibility':
          if (orientationResults) {
            valueA = getCompatibilityPercentage(a.id);
            valueB = getCompatibilityPercentage(b.id);
          } else {
            valueA = a.titre?.toLowerCase() || '';
            valueB = b.titre?.toLowerCase() || '';
          }
          break;
        default:
          valueA = a.titre?.toLowerCase() || '';
          valueB = b.titre?.toLowerCase() || '';
      }

      if (valueA < valueB) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredFormations, sortBy, sortOrder, orientationResults]);

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
  };

  const resetSort = () => {
    const defaultSort = orientationResults ? 'compatibility' : 'nom';
    const defaultOrder = orientationResults ? 'desc' : 'asc';
    setSortBy(defaultSort);
    setSortOrder(defaultOrder);
    setFilter('tous');
    setSearchTerm('');
    setShowResults(false);
  };

  const toggleShowResults = () => {
    if (showResults) {
      resetSort();
    } else {
      setShowResults(true);
      setSortBy('compatibility');
      setSortOrder('desc');
    }
  };


  return (
    <div className="page-formations">
      <Header />

      <main className="main-content">
        <div className="formations-container">
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

          {showResults && !loading && !error && orientationResults && (
            <div className="orientation-results-banner">
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
                  <label>Trier par :</label>
                  <select value={sortBy} onChange={(e) => handleSortChange(e.target.value)}>
                    <option value="nom">Nom</option>
                    <option value="credits">Crédits</option>
                    {orientationResults && (
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

                {orientationResults && (
                  <button className="btn-secondary results-toggle" onClick={toggleShowResults}>
                    {showResults ? 'Masquer les résultats' : 'Afficher les résultats'}
                  </button>
                )}
              </div>

              {!orientationResults && (
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
                      {showResults && orientationResults && (
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
                      <a href={formation.url} target="_blank" rel="noopener noreferrer" className="btn-primary">En savoir plus</a>
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