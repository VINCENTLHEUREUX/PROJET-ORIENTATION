import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/orientation.css";
import axios from 'axios';

export default function Orientation() {
  const navigate = useNavigate();
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
    experienceProfessionnelle: '',
    evaluationFormations: {
      glo: {
        programmation: 3,
        conceptionLogicielle: 3,
        baseDonnees: 3,
        travailEquipe: 3
      },
      ele: {
        circuits: 3,
        electronique: 3,
        telecommunications: 3,
        automatisation: 3
      },
      mec: {
        conceptionMecanique: 3,
        thermodynamique: 3,
        materiaux: 3,
        fabrication: 3
      },
      civ: {
        structuresGeniesCivil: 3,
        hydraulique: 3,
        environnement: 3,
        gestionProjets: 3
      },
      ind: {
        optimisationSystemes: 3,
        gestionProduction: 3,
        ergonomie: 3,
        qualite: 3
      },
      log: {
        chaineApprovisionnement: 3,
        transportLogistique: 3,
        gestionStocks: 3,
        planificationProduction: 3
      }
    }
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
    'Génie de la construction', 'Génie des opérations et de la logistique'
  ];

  // Configuration des questions d'évaluation pour chaque programme
  const evaluationQuestions = {
    glo: [
      { id: 'programmation', label: 'Votre niveau en programmation et développement de logiciels' },
      { id: 'conceptionLogicielle', label: 'Votre aptitude à concevoir des architectures logicielles' },
      { id: 'baseDonnees', label: 'Votre compréhension des bases de données et systèmes d\'information' },
      { id: 'travailEquipe', label: 'Votre capacité à travailler en équipe sur des projets logiciels' }
    ],
    ele: [
      { id: 'circuits', label: 'Votre compréhension des circuits électriques' },
      { id: 'electronique', label: 'Votre intérêt pour l\'électronique et les composants' },
      { id: 'telecommunications', label: 'Votre connaissance des systèmes de télécommunications' },
      { id: 'automatisation', label: 'Votre aptitude à comprendre les systèmes d\'automatisation' }
    ],
    mec: [
      { id: 'conceptionMecanique', label: 'Votre capacité à concevoir des systèmes mécaniques' },
      { id: 'thermodynamique', label: 'Votre compréhension des principes de thermodynamique' },
      { id: 'materiaux', label: 'Votre connaissance des propriétés des matériaux' },
      { id: 'fabrication', label: 'Votre intérêt pour les procédés de fabrication' }
    ],
    civ: [
      { id: 'structuresGeniesCivil', label: 'Votre compréhension des structures et infrastructures' },
      { id: 'hydraulique', label: 'Votre connaissance en hydraulique et gestion des eaux' },
      { id: 'environnement', label: 'Votre sensibilité aux enjeux environnementaux' },
      { id: 'gestionProjets', label: 'Votre capacité à gérer des projets de construction' }
    ],
    ind: [
      { id: 'optimisationSystemes', label: 'Votre aptitude à optimiser des systèmes complexes' },
      { id: 'gestionProduction', label: 'Votre compréhension des systèmes de production' },
      { id: 'ergonomie', label: 'Votre sensibilité à l\'ergonomie et facteurs humains' },
      { id: 'qualite', label: 'Votre connaissance des méthodes de contrôle de qualité' }
    ],
    log: [
      { id: 'chaineApprovisionnement', label: 'Votre compréhension des chaînes d\'approvisionnement' },
      { id: 'transportLogistique', label: 'Votre connaissance des systèmes de transport et logistique' },
      { id: 'gestionStocks', label: 'Votre aptitude à gérer des inventaires et stocks' },
      { id: 'planificationProduction', label: 'Votre capacité à planifier la production et les ressources' }
    ]
  };

  // Noms des programmes pour l'affichage
  const programmesNoms = {
    glo: 'Génie logiciel',
    ele: 'Génie électrique',
    mec: 'Génie mécanique',
    civ: 'Génie civil',
    ind: 'Génie industriel',
    log: 'Génie logistique'
  };

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

  const handleEvaluationChange = (event, programme, questionId) => {
    const { value } = event.target;
    setFormData(prev => ({
      ...prev,
      evaluationFormations: {
        ...prev.evaluationFormations,
        [programme]: {
          ...prev.evaluationFormations[programme],
          [questionId]: parseInt(value)
        }
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

  // Calcul des scores moyens par programme
  const calculateProgrammeScores = () => {
    const scores = {};

    for (const programme in formData.evaluationFormations) {
      const questions = formData.evaluationFormations[programme];
      let total = 0;
      let count = 0;

      for (const questionId in questions) {
        total += questions[questionId];
        count++;
      }

      scores[programme] = count > 0 ? total / count : 0;
    }

    return scores;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Calcul des scores par programme
    const programmeScores = calculateProgrammeScores();
    
    // Préparation des données à envoyer au backend
    const dataToSend = {
      ...formData,
      programmeScores
    };
    
    try {
      // Envoi des données au backend
      const response = await axios.post('/api/orientation/resultats', dataToSend);
      
      // Redirection vers la page des formations avec indication que l'utilisateur vient de la page d'orientation
      navigate('/formations', { 
        state: { 
          fromOrientation: true
        } 
      });
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi des données:', error);
      alert('Une erreur est survenue lors de la soumission de votre profil. Veuillez réessayer.');
    }
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
      case 5:
        return (
          <section className="form-section">
            <h3>Évaluez vos compétences en Génie logiciel</h3>
            <p>Pour chaque compétence, indiquez votre niveau sur une échelle de 1 à 5</p>
            {evaluationQuestions.glo.map(question => (
              <div key={question.id} className="evaluation-item">
                <div className="evaluation-header">
                  <label>{question.label}</label>
                  <span>{formData.evaluationFormations.glo[question.id]}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.evaluationFormations.glo[question.id]}
                  onChange={(e) => handleEvaluationChange(e, 'glo', question.id)}
                />
                <div className="evaluation-labels">
                  <span>Débutant</span>
                  <span>Expert</span>
                </div>
              </div>
            ))}
          </section>
        );
      case 6:
        return (
          <section className="form-section">
            <h3>Évaluez vos compétences en Génie électrique</h3>
            <p>Pour chaque compétence, indiquez votre niveau sur une échelle de 1 à 5</p>
            {evaluationQuestions.ele.map(question => (
              <div key={question.id} className="evaluation-item">
                <div className="evaluation-header">
                  <label>{question.label}</label>
                  <span>{formData.evaluationFormations.ele[question.id]}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.evaluationFormations.ele[question.id]}
                  onChange={(e) => handleEvaluationChange(e, 'ele', question.id)}
                />
                <div className="evaluation-labels">
                  <span>Débutant</span>
                  <span>Expert</span>
                </div>
              </div>
            ))}
          </section>
        );
      case 7:
        return (
          <section className="form-section">
            <h3>Évaluez vos compétences en Génie mécanique</h3>
            <p>Pour chaque compétence, indiquez votre niveau sur une échelle de 1 à 5</p>
            {evaluationQuestions.mec.map(question => (
              <div key={question.id} className="evaluation-item">
                <div className="evaluation-header">
                  <label>{question.label}</label>
                  <span>{formData.evaluationFormations.mec[question.id]}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.evaluationFormations.mec[question.id]}
                  onChange={(e) => handleEvaluationChange(e, 'mec', question.id)}
                />
                <div className="evaluation-labels">
                  <span>Débutant</span>
                  <span>Expert</span>
                </div>
              </div>
            ))}
          </section>
        );
      case 8:
        return (
          <section className="form-section">
            <h3>Évaluez vos compétences en Génie civil</h3>
            <p>Pour chaque compétence, indiquez votre niveau sur une échelle de 1 à 5</p>
            {evaluationQuestions.civ.map(question => (
              <div key={question.id} className="evaluation-item">
                <div className="evaluation-header">
                  <label>{question.label}</label>
                  <span>{formData.evaluationFormations.civ[question.id]}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.evaluationFormations.civ[question.id]}
                  onChange={(e) => handleEvaluationChange(e, 'civ', question.id)}
                />
                <div className="evaluation-labels">
                  <span>Débutant</span>
                  <span>Expert</span>
                </div>
              </div>
            ))}
          </section>
        );
      case 9:
        return (
          <section className="form-section">
            <h3>Évaluez vos compétences en Génie industriel</h3>
            <p>Pour chaque compétence, indiquez votre niveau sur une échelle de 1 à 5</p>
            {evaluationQuestions.ind.map(question => (
              <div key={question.id} className="evaluation-item">
                <div className="evaluation-header">
                  <label>{question.label}</label>
                  <span>{formData.evaluationFormations.ind[question.id]}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.evaluationFormations.ind[question.id]}
                  onChange={(e) => handleEvaluationChange(e, 'ind', question.id)}
                />
                <div className="evaluation-labels">
                  <span>Débutant</span>
                  <span>Expert</span>
                </div>
              </div>
            ))}
          </section>
        );
      case 10:
        return (
          <section className="form-section">
            <h3>Évaluez vos compétences en Génie logistique</h3>
            <p>Pour chaque compétence, indiquez votre niveau sur une échelle de 1 à 5</p>
            {evaluationQuestions.log.map(question => (
              <div key={question.id} className="evaluation-item">
                <div className="evaluation-header">
                  <label>{question.label}</label>
                  <span>{formData.evaluationFormations.log[question.id]}/5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.evaluationFormations.log[question.id]}
                  onChange={(e) => handleEvaluationChange(e, 'log', question.id)}
                />
                <div className="evaluation-labels">
                  <span>Débutant</span>
                  <span>Expert</span>
                </div>
              </div>
            ))}
          </section>
        );
      default:
        return null;
    }
  };

  const totalSteps = 10; // Nombre total d'étapes

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
              <div className="progress" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
            </div>

            <p className="step-indicator">Étape {currentStep} sur {totalSteps}</p>

            {renderStep()}

            <div className="form-navigation">
              {currentStep > 1 && (
                <button type="button" className="btn-secondary" onClick={handlePrev}>
                  Précédent
                </button>
              )}
              {currentStep < totalSteps ? (
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
