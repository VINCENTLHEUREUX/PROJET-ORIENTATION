import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "../styles/orientation.css";

const genies = {
  genie_construction: [
    "J'aime les chantiers et voir concrètement ce que je bâtis.",
    "J'aime les structures, les ponts, les bâtiments.",
    "Je m'intéresse aux matériaux comme le béton, l'acier ou le bois.",
    "Je veux contribuer à rendre les infrastructures durables et sécuritaires.",
    "Je suis à l'aise avec les normes, les plans et les devis techniques.",
  ],
  genie_electrique: [
    "J'aime comprendre comment fonctionnent les circuits électriques.",
    "L'électronique et les systèmes embarqués m'attirent.",
    "J'aimerais travailler dans les énergies renouvelables ou les télécommunications.",
    "J'aime les mathématiques appliquées aux signaux ou aux champs électromagnétiques.",
    "Je suis curieux de savoir comment fonctionnent les capteurs, les moteurs et les réseaux électriques.",
  ],
  genie_logiciel: [
    "J'aime coder et créer des logiciels utiles.",
    "Je m'intéresse au développement d'applications Web, mobiles ou de jeux.",
    "Je suis rigoureux et j'aime résoudre des bugs.",
    "J'aimerais travailler dans le domaine de la cybersécurité ou de l'intelligence artificielle.",
    "J'aime travailler en équipe sur des projets de programmation.",
  ],
  genie_mecanique: [
    "Je suis fasciné par les machines, les moteurs et les systèmes mécaniques.",
    "J'aime dessiner, concevoir ou modéliser des objets.",
    "Je veux comprendre comment les choses bougent, roulent ou volent.",
    "J'aime les matières comme la dynamique, la thermodynamique et la résistance des matériaux.",
    "J'aimerais participer à la fabrication de prototypes ou de robots.",
  ],
  genie_production_automatisee: [
    "Je suis attiré par l'automatisation et les robots industriels.",
    "J'aime optimiser les processus pour les rendre plus efficaces.",
    "Je veux apprendre à programmer des systèmes automatisés.",
    "J'aime l'électronique, la mécanique et l'informatique combinées.",
    "Je veux travailler dans l'industrie manufacturière ou la haute technologie.",
  ],
  genie_technologies_information: [
    "J'aime l'informatique, mais avec une approche plus orientée systèmes.",
    "Je m'intéresse aux réseaux, bases de données et à la cybersécurité.",
    "J'aime comprendre comment les systèmes communiquent entre eux.",
    "Je veux travailler en TI, mais pas nécessairement comme programmeur pur.",
    "Je veux pouvoir toucher à plein de domaines en entreprise : infra, web, support, etc.",
  ],
  genie_operations_logistique: [
    "J'aime planifier, organiser et optimiser les ressources.",
    "Je suis intéressé par les chaînes d'approvisionnement et la gestion des stocks.",
    "J'aime les systèmes complexes et le défi de les améliorer.",
    "Je veux apprendre à utiliser des logiciels de gestion et de planification.",
    "J'ai un bon sens de l'organisation et de l'analyse.",
  ],
  genie_aerospatial: [
    "L'aéronautique me passionne : avions, drones, satellites.",
    "J'aime les sciences appliquées au vol, comme l'aérodynamique.",
    "Je suis rigoureux et méticuleux dans les détails techniques.",
    "J'aimerais travailler pour des entreprises comme Airbus, Bombardier ou l'Agence spatiale.",
    "Je veux contribuer à l'innovation dans l'espace ou l'aviation.",
  ],
};

export default function FormulaireOrientation() {
  const navigate = useNavigate();
  const cles = Object.keys(genies);
  const [etape, setEtape] = useState(0);
  const [reponses, setReponses] = useState({});
  const [envoye, setEnvoye] = useState(false);
  const [resultats, setResultats] = useState(null);
  const [erreur, setErreur] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const handleChange = (genie, index, value) => {
    setReponses((prev) => ({
      ...prev,
      [genie]: {
        ...(prev[genie] || {}),
        [index]: Number(value),
      },
    }));
  };

  const calculerResultats = () => {
    const resultats = {};
    
    Object.keys(reponses).forEach((genie) => {
      const reponseGenie = reponses[genie];
      const total = Object.values(reponseGenie).reduce((sum, note) => sum + note, 0);
      resultats[genie] = total;
    });
    
    const resultatgpa = resultats["genie_production_automatisee"] || 0;
    const resultatmec = resultats["genie_mecanique"] || 0;
    const resultatgti = resultats["genie_technologies_information"] || 0;
    const resultatctn = resultats["genie_construction"] || 0;
    const resultatele = resultats["genie_electrique"] || 0;
    const resultataer = resultats["genie_aerospatial"] || 0;
    const resultatgol = resultats["genie_operations_logistique"] || 0;
    const resultatlog = resultats["genie_logiciel"] || 0;
    
    return { 
      resultats,
      resultatgpa,
      resultatmec, 
      resultatgti, 
      resultatctn, 
      resultatele, 
      resultataer, 
      resultatgol, 
      resultatlog
    };
  };

  const envoyer = async () => {
    setIsSubmitting(true);
    setErreur("");
    
    const { 
      resultats,
      resultatgpa,
      resultatmec, 
      resultatgti, 
      resultatctn, 
      resultatele, 
      resultataer, 
      resultatgol, 
      resultatlog
    } = calculerResultats();
    
    setResultats(resultats);
    
    const requestPayload = {
      email: "admin@projetorientation.com",
      password: "MotDePasseSecurise123",
      resultatgpa: Number(resultatgpa || 0),
      resultatmec: Number(resultatmec || 0), 
      resultatgti: Number(resultatgti || 0), 
      resultatctn: Number(resultatctn || 0), 
      resultatele: Number(resultatele || 0), 
      resultataer: Number(resultataer || 0), 
      resultatgol: Number(resultatgol || 0), 
      resultatlog: Number(resultatlog || 0)
    };
    
    console.log("Sending data to server:", requestPayload);
    
    try {
      const response = await fetch('http://localhost:8080/nextgen/result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        credentials: 'include',
        body: JSON.stringify({
          "email": "admin@projetorientation.com",
          "password": "MotDePasseSecurise123",
          "resultatGPA": Number(resultatgpa || 0),
          "resultatMEC": Number(resultatmec || 0), 
          "resultatGTI": Number(resultatgti || 0), 
          "resultatCTN": Number(resultatctn || 0), 
          "resultatELE": Number(resultatele || 0), 
          "resultatAER": Number(resultataer || 0), 
          "resultatGOL": Number(resultatgol || 0), 
          "resultatLOG": Number(resultatlog || 0)
        })
      });
      
      // Log response information for debugging
      console.log("Response status:", response.status);
      const responseData = await response.text();
      console.log("Response body:", responseData);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${responseData || 'Unknown error'}`);
      }
      
      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi des résultats');
      }
      
      setEnvoye(true);
      setCountdown(5);
      
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate('/formations', { 
              state: { 
                fromOrientation: true,
                orientationResults: {
                  scores: resultats
                }
              } 
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setErreur(error.message || "Une erreur est survenue");
      setIsSubmitting(false);
    }
  };

  const suivant = () => {
    const reponseEtapeActuelle = reponses[cles[etape]] || {};
    const toutesRepondues = genies[cles[etape]].every((_, idx) => 
      reponseEtapeActuelle[idx] !== undefined && reponseEtapeActuelle[idx] !== ""
    );
    
    if (!toutesRepondues) {
      setErreur("Veuillez répondre à toutes les questions avant de continuer.");
      return;
    }
    
    setErreur("");
    if (etape < cles.length - 1) {
      setEtape(etape + 1);
    } else {
      envoyer();
    }
  };

  const precedent = () => {
    if (etape > 0) {
      setEtape(etape - 1);
      setErreur("");
    }
  };

  const allerAuxFormations = () => {
    navigate('/formations', { 
      state: { 
        fromOrientation: true,
        orientationResults: {
          scores: resultats
        }
      } 
    });
  };

  const getGenieRecommande = () => {
    if (!resultats) return null;
    
    let maxScore = 0;
    let genieRecommande = "";
    
    Object.entries(resultats).forEach(([genie, score]) => {
      if (score > maxScore) {
        maxScore = score;
        genieRecommande = genie;
      }
    });
    
    return genieRecommande.replace('_', ' ');
  };

  const formatNomGenie = (nom) => {
    return nom.replace('genie_', 'Génie ').replace(/_/g, ' ');
  };

  return (
    <div className="page-orientation">
      <Header />
      <main className="main-content">
        {!envoye ? (
          <div className="quiz-container">
            <div className="quiz-header">
              <h1>Questionnaire d'orientation</h1>
              <p>Découvrez le programme qui vous correspond le mieux</p>
            </div>

            <div className="question-section">
              <div className="question-header">
                <span className="question-number">
                  Section {etape + 1} sur {cles.length}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold mb-6">
                {formatNomGenie(cles[etape])}
              </h3>

              {genies[cles[etape]].map((q, idx) => (
                <div key={idx} className="mb-6">
                  <p className="question-text">
                    {etape * 5 + idx + 1}. {q}
                  </p>
                  <div className="answer-options">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <label
                        key={n}
                        className={`answer-option ${
                          reponses[cles[etape]]?.[idx] === n ? 'selected' : ''
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${idx}`}
                          value={n}
                          checked={reponses[cles[etape]]?.[idx] === n}
                          onChange={(e) =>
                            handleChange(cles[etape], idx, e.target.value)
                          }
                          className="hidden"
                        />
                        <span className="answer-value">
                          {n} - {n === 1 ? "Pas du tout d'accord" : 
                               n === 2 ? "Plutôt pas d'accord" :
                               n === 3 ? "Neutre" :
                               n === 4 ? "Plutôt d'accord" :
                               "Tout à fait d'accord"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              {erreur && <div className="error-message">{erreur}</div>}

              <div className="progress-container">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${((etape + 1) / cles.length) * 100}%` }}
                  />
                </div>
                <p className="progress-text">
                  {Math.round(((etape + 1) / cles.length) * 100)}% complété
                </p>
              </div>

              <div className="navigation-buttons">
                {etape > 0 && (
                  <button
                    onClick={precedent}
                    className="nav-button button-previous"
                    disabled={isSubmitting}
                  >
                    Précédent
                  </button>
                )}
                <button
                  onClick={suivant}
                  className="nav-button button-next"
                  disabled={isSubmitting}
                >
                  {etape < cles.length - 1 ? "Suivant" : "Terminer"}
                  {isSubmitting && "..."}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="results-container">
            <div className="results-header">
              <h1 className="text-2xl font-bold text-ets-red mb-2">
                Résultats de votre orientation
              </h1>
              <p className="text-gray-600">
                Voici les programmes qui correspondent le mieux à votre profil
              </p>
            </div>

            <div className="results-list">
              {Object.entries(resultats)
                .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
                .map(([genie, score]) => (
                  <div key={genie} className="result-item">
                    <span className="program-name">{formatNomGenie(genie)}</span>
                    <span className="program-score">{score} points</span>
                  </div>
                ))}
            </div>

            <div className="recommendation-section">
              <h3 className="text-lg font-semibold mb-2">
                Programme recommandé
              </h3>
              <p className="mb-4">
                Selon vos réponses, le programme qui pourrait vous convenir le mieux est :
              </p>
              <div className="text-xl font-bold text-ets-red">
                {formatNomGenie(getGenieRecommande())}
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={allerAuxFormations}
                className="nav-button button-next"
              >
                Voir les détails des formations
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}