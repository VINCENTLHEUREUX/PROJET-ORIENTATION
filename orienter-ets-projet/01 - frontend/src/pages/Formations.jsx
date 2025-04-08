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

  const fromOrientation = location.state?.fromOrientation || false;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const formationsResponse = await axios.get('/api/programs');
        
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
          setSortedFormations(programsWithMappedFields);
          
          const userStatusResponse = true
          
            try {
              const orientationResponse = await axios.post('/api/results', {
                email: "admin@projetorientation.com",
                password: "MotDePasseSecurise123"
              });
              
              if (orientationResponse.data) {
                setOrientationResults(orientationResponse.data);
                setShowResults(true);
                
                const sortedByScore = [...programsWithMappedFields].sort((a, b) => {
                  const scoreA = orientationResponse.data[`resultat${a.id.toLowerCase()}`] || 0;
                  const scoreB = orientationResponse.data[`resultat${b.id.toLowerCase()}`] || 0;
                  return scoreB - scoreA;
                });
                
                setSortedFormations(sortedByScore);
              }
            } catch (orientationErr) {
              console.error('Erreur lors de la récupération des résultats d\'orientation:', orientationErr);
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

  const filteredFormations = Array.isArray(sortedFormations) ? sortedFormations.filter(formation => {
    const matchesSearch = formation.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         formation.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'tous' || formation.id === filter;
    return matchesSearch && matchesFilter;
  }) : [];

  const resetSort = () => {
    setSortedFormations([...formations]);
    setShowResults(false);
  };

  const getCompatibilityClass = (formationId) => {
    if (!orientationResults || !showResults) return '';
    
    const score = orientationResults[`resultat${formationId.toLowerCase()}`] || 0;
    if (score >= 20) return 'compatibility-high';
    if (score >= 15) return 'compatibility-medium';
    return 'compatibility-low';
  };

  const getCompatibilityPercentage = (formationId) => {
    if (!orientationResults || !showResults) return null;
    const score = orientationResults[`resultat${formationId.toLowerCase()}`] || 0;
    return Math.round((score / 25) * 100);
  };

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
              <button className="btn-secondary" onClick={resetSort}>Réinitialiser les résultats</button>
            </div>
          )}
          
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