import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/orientation.css";

export default function Orientation() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    interets: [],
    competences: [],
    personalite: {
      extraversion: 3,
      ouverture: 3,
      conscienciosite: 3,
      amabilite: 3,
      stabiliteEmotionnelle: 3
    },
    niveauEducation: '',
    domainePreference: '',
    experienceProfessionnelle: ''
  });

  const interetsOptions = [
    'Sciences', 'Technologie', 'Ingénierie', 'Mathématiques',
    'Arts', 'Communication', 'Santé', 'Éducation',
    'Affaires', 'Droit', 'Sciences sociales', 'Service public'
  ];

  const competencesOptions = [
    'Programmation', 'Analyse de données', 'Conception', 'Résolution de problèmes',
    'Communication', 'Leadership', 'Gestion de projet', 'Recherche',
    'Créativité', 'Organisation', 'Travail d\'équipe', 'Prise de décision'
  ];

  const personaliteTraits = [
    { id: 'extraversion', label: 'Extraversion' },
    { id: 'ouverture', label: 'Ouverture' },
    { id: 'conscienciosite', label: 'Conscienciosité' },
    { id: 'amabilite', label: 'Amabilité' },
    { id: 'stabiliteEmotionnelle', label: 'Stabilité émotionnelle' }
  ];

  const niveauEducationOptions = [
    'Secondaire', 'Collégial', 'Baccalauréat', 'Maîtrise', 'Doctorat'
  ];

  const domainePreferenceOptions = [
    'Génie logiciel', 'Génie électrique', 'Génie mécanique', 'Génie civil',
    'Architecture', 'Technologies de l\'information', 'Génie industriel',
    'Génie de la construction', 'Génie de la production automatisée',
    'Génie des opérations et de la logistique'
  ];

  const handleCheckboxChange = (event, category) => {
    const { value, checked } = event.target;
    setFormData(prev => ({
      ...prev,
      [category]: checked
        ? [...prev[category], value]
        : prev[category].filter(item => item !== value)
    }));
  };

  const handleRangeChange = (event, trait) => {
    const { value } = event.target;
    setFormData(prev => ({
      ...prev,
      personalite: {
        ...prev.personalite,
        [trait]: parseInt(value)
      }
    }));
  };

  const handleSelectChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => setCurrentStep(prev => prev + 1);
  const handlePrev = () => setCurrentStep(prev => prev - 1);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Données soumises:', formData);
    // Ici vous pourriez envoyer les données à votre API
    // et rediriger vers une page de résultats
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <section className="form-section">
            <h3>Vos intérêts professionnels</h3>
            <p>Sélectionnez les domaines qui vous intéressent</p>
            <div className="checkbox-grid">
              {interetsOptions.map(option => (
                <div key={option} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={`interet-${option}`}
                    value={option}
                    checked={formData.interets.includes(option)}
                    onChange={(e) => handleCheckboxChange(e, 'interets')}
                  />
                  <label htmlFor={`interet-${option}`}>{option}</label>
                </div>
              ))}
            </div>
          </section>
        );
      case 2:
        return (
          <section className="form-section">
            <h3>Vos compétences</h3>
            <p>Indiquez vos compétences acquises</p>
            <div className="checkbox-grid">
              {competencesOptions.map(option => (
                <div key={option} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={`competence-${option}`}
                    value={option}
                    checked={formData.competences.includes(option)}
                    onChange={(e) => handleCheckboxChange(e, 'competences')}
                  />
                  <label htmlFor={`competence-${option}`}>{option}</label>
                </div>
              ))}
            </div>
          </section>
        );
      case 3:
        return (
          <section className="form-section">
            <h3>Votre profil de personnalité</h3>
            <p>Évaluez-vous sur ces dimensions</p>
            {personaliteTraits.map(trait => (
              <div key={trait.id} className="personality-trait">
                <div className="trait-header">
                  <label>{trait.label}</label>
                  <span>{formData.personalite[trait.id]}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.personalite[trait.id]}
                  onChange={(e) => handleRangeChange(e, trait.id)}
                />
                <div className="trait-labels">
                  <span>Peu</span>
                  <span>Beaucoup</span>
                </div>
              </div>
            ))}
          </section>
        );
      case 4:
        return (
          <section className="form-section">
            <h3>Informations complémentaires</h3>
            <div className="form-group">
              <label>Niveau d'éducation</label>
              <select
                name="niveauEducation"
                value={formData.niveauEducation}
                onChange={handleSelectChange}
                required
              >
                <option value="">Sélectionnez votre niveau</option>
                {niveauEducationOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Domaine de préférence</label>
              <select
                name="domainePreference"
                value={formData.domainePreference}
                onChange={handleSelectChange}
                required
              >
                <option value="">Sélectionnez un domaine</option>
                {domainePreferenceOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Expérience professionnelle</label>
              <textarea
                name="experienceProfessionnelle"
                value={formData.experienceProfessionnelle}
                onChange={handleSelectChange}
                placeholder="Décrivez brièvement votre parcours professionnel"
                rows="4"
              />
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="page-orientation">
      {/* Header (identique à Accueil.js) */}
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

      {/* Contenu principal avec le formulaire */}
      <main className="main-content">
        <div className="orientation-container">
          <h1>Test d'orientation professionnelle</h1>
          <p className="intro-text">
            Répondez à ce questionnaire pour recevoir des suggestions de carrières
            adaptées à votre profil.
          </p>
          
          <form className="formulaire-orientation" onSubmit={handleSubmit}>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
            </div>

            <p className="step-indicator">Étape {currentStep} sur 4</p>

            {renderStep()}

            <div className="form-navigation">
              {currentStep > 1 && (
                <button type="button" className="btn-secondary" onClick={handlePrev}>
                  Précédent
                </button>
              )}
              {currentStep < 4 ? (
                <button type="button" className="btn-primary" onClick={handleNext}>
                  Suivant
                </button>
              ) : (
                <button type="submit" className="btn-primary">
                  Soumettre mon profil
                </button>
              )}
            </div>
          </form>
        </div>
      </main>

      {/* Footer (identique à Accueil.js) */}
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
