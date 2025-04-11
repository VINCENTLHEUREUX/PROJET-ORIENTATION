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
  const [profilePicUrl, setProfilePicUrl] = useState('https://i.pinimg.com/1200x/46/72/f8/4672f876389036583190d93a71aa6cb2.jpg');
  const [isEditingPic, setIsEditingPic] = useState(false);
  const [biographie, setBiographie] = useState('');
  const [etudes, setEtudes] = useState('');
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingEtudes, setIsEditingEtudes] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [prenom, setPrenom] = useState(user?.prenom || '');
  const [nom, setNom] = useState(user?.nom || '');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const headers = {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      };
  
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUserInfo(userData);
        if (userData.nom) setNom(userData.nom);
        if (userData.prenom) setPrenom(userData.prenom);
      }
  
      const profileResponse = await axios.post('/api/profil', {
        token: authToken
      }, { headers });
  
      if (profileResponse.data) {
        const profileData = profileResponse.data;
        
        if (profileData.picture_url && profileData.picture_url !== 'calisse') {
          setProfilePicUrl(profileData.picture_url);
        }
        
        if (profileData.biographie) {
          setBiographie(profileData.biographie);
        }
        
        if (profileData.etudes) {
          setEtudes(profileData.etudes);
        }
        
        if (profileData.nom) setNom(profileData.nom);
        if (profileData.prenom) setPrenom(profileData.prenom);
        if (profileData.email) {
          setUserInfo(prevUserInfo => ({
            ...prevUserInfo,
            email: profileData.email
          }));
        }
      }
  
      const orientationResponse = await axios.post('/api/results', {
        token: authToken
      }, { headers });
      
      setOrientationResults(orientationResponse.data);
    } catch (err) {
      setError('Erreur lors de la récupération des données, avez vous fait le test?');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePicChange = (e) => {
    setProfilePicUrl(e.target.value);
    setHasChanges(true);
  };

  const handleBiographieChange = (e) => {
    setBiographie(e.target.value);
    setHasChanges(true);
  };

  const handleEtudesChange = (e) => {
    setEtudes(e.target.value);
    setHasChanges(true);
  };

  const saveAllChanges = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const headers = {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      };

      const response = await axios.put('/api/profil', {
        token: authToken,
        pictureUrl: profilePicUrl,
        biographie,
        etudes
      }, { headers });

      if (response.data) {
        const userData = userInfo ? {...userInfo} : {};
        userData.picture_url = profilePicUrl;
        userData.biographie = biographie;
        userData.etudes = etudes;
        localStorage.setItem('user', JSON.stringify(userData));
        
        setIsEditingPic(false);
        setIsEditingBio(false);
        setIsEditingEtudes(false);
        setHasChanges(false);
      }
    } catch (err) {
      console.error('Erreur lors de la mise à jour du profil:', err);
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
    return Math.round(((score -5)/ 20) * 100);
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
          <section className="profile-section">
            <h2 className="section-title">Mon Profil</h2>
            
            <div className="profile-pic-container">
              <div className="profile-pic-circle">
                <img src={profilePicUrl} alt="Photo de profil" className="profile-pic" onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://i.pinimg.com/1200x/46/72/f8/4672f876389036583190d93a71aa6cb2.jpg";
                }} />
              </div>
              
              {isEditingPic ? (
                <div className="profile-pic-edit">
                  <input 
                    type="text" 
                    value={profilePicUrl} 
                    onChange={handlePicChange} 
                    placeholder="URL de l'image" 
                    className="profile-pic-input"
                  />
                  <div className="profile-pic-buttons">
                    <button onClick={() => setIsEditingPic(false)} className="cancel-pic-btn">Confirmer</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setIsEditingPic(true)} className="edit-pic-btn">
                  Modifier la photo
                </button>
              )}
            </div>
            
            <div className="info-grid">
              <div className="info-row">
                <div>
                  <p className="info-label">Prénom</p>
                  <p className="info-value">{prenom}</p>
                </div>
                <div>
                  <p className="info-label">Nom</p>
                  <p className="info-value">{nom}</p>
                </div>
                <div>
                  <p className="info-label">Email</p>
                  <p className="info-value">{userInfo?.email || ''}</p>
                </div>
              </div>
            </div>

            <div className="bio-section">
              <div className="bio-header">
                <h3 className="bio-title">Biographie</h3>
                {!isEditingBio && (
                  <button onClick={() => setIsEditingBio(true)} className="edit-btn">
                    Modifier
                  </button>
                )}
              </div>
              
              {isEditingBio ? (
                <div className="bio-edit">
                  <textarea 
                    value={biographie} 
                    onChange={handleBiographieChange} 
                    className="bio-textarea"
                    placeholder="Parlez un peu de vous..."
                  />
                  <button onClick={() => setIsEditingBio(false)} className="confirm-btn">
                    Confirmer
                  </button>
                </div>
              ) : (
                <p className="bio-text">{biographie || "Aucune biographie ajoutée."}</p>
              )}
            </div>

            <div className="etudes-section">
              <div className="etudes-header">
                <h3 className="etudes-title">Études</h3>
                {!isEditingEtudes && (
                  <button onClick={() => setIsEditingEtudes(true)} className="edit-btn">
                    Modifier
                  </button>
                )}
              </div>
              
              {isEditingEtudes ? (
                <div className="etudes-edit">
                  <textarea 
                    value={etudes} 
                    onChange={handleEtudesChange} 
                    className="etudes-textarea"
                    placeholder="Décrivez votre parcours académique..."
                  />
                  <button onClick={() => setIsEditingEtudes(false)} className="confirm-btn">
                    Confirmer
                  </button>
                </div>
              ) : (
                <p className="etudes-text">{etudes || "Aucune information sur les études ajoutée."}</p>
              )}
            </div>

            {hasChanges && (
              <div className="save-changes-container">
                <button onClick={saveAllChanges} className="save-all-changes-btn">
                  Enregistrer toutes les modifications
                </button>
              </div>
            )}
          </section>

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