import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/profil.css';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(user || null);
  const [orientationResults, setOrientationResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Only fetch user info if not already available from auth context
      if (!user) {
        const userResponse = await axios.get('/api/user/info', { headers });
        setUserInfo(userResponse.data);
      }

      // Fetch orientation results using user's email
      const orientationResponse = await axios.post('/api/results', {
        email: user.email,
        password: user.password
      }, { headers });
      setOrientationResults(orientationResponse.data);
    } catch (err) {
      setError('Erreur lors de la récupération des données');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatNomGenie = (nom) => {
    return nom
      .replace('resultat', '')
      .split(/(?=[A-Z])/)
      .join(' ')
      .toLowerCase()
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  const calculatePercentage = (score) => {
    return Math.round((score / 25) * 100);
  };

  if (loading) {
    return (
      <div className="profile-page">
        <Header />
        <main className="profile-main">
          <div className="loading-state">Chargement...</div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <Header />
        <main className="profile-main">
          <div className="error-state">{error}</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Header />
      <main className="profile-main">
        <div className="profile-container">
          {/* Informations du profil */}
          <section className="profile-section">
            <h2 className="section-title">Mon Profil</h2>
            {userInfo && (
              <div className="info-grid">
                <div className="info-row">
                  <div>
                    <p className="info-label">Nom</p>
                    <p className="info-value">{userInfo.nom}</p>
                  </div>
                  <div>
                    <p className="info-label">Email</p>
                    <p className="info-value">{userInfo.email}</p>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Résultats du test d'orientation */}
          <section className="results-section">
            <h2 className="section-title">Résultats du test d'orientation</h2>
            {orientationResults && (
              <div className="space-y-4">
                {Object.entries(orientationResults)
                  .filter(([key]) => key.startsWith('resultat'))
                  .sort(([, a], [, b]) => b - a)
                  .map(([key, value]) => (
                    <div key={key} className="result-item">
                      <div className="result-header">
                        <span className="result-name">
                          {formatNomGenie(key)}
                        </span>
                        <span className="result-score">
                          {calculatePercentage(value)}%
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-value" 
                          style={{ width: `${calculatePercentage(value)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}






