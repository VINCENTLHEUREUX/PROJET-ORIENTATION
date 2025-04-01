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
    
    return resultats;
  };

  const envoyer = async () => {
    setIsSubmitting(true);
    setErreur("");
    
    const scoresFinals = calculerResultats();
    setResultats(scoresFinals);
    
    try {
      const response = await fetch('/api/orientation-resultats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reponses: reponses,
          resultats: scoresFinals,
          date: new Date().toISOString()
        }),
      });
      
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
                  scores: scoresFinals
                }
              } 
            });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
    } catch (error) {
      console.error('Erreur:', error);
      setErreur("Une erreur s'est produite lors de l'envoi des résultats. Veuillez réessayer.");
    } finally {
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
    <div className="page-accueil">
      <Header />

      <main className="main-content">
        <div className="welcome-box">
          {envoye ? (
            <>
              <h1 className="welcome-title">Merci pour vos réponses !</h1>
              <p className="welcome-subtitle">
                Vos résultats ont été soumis avec succès.
              </p>
              
              {resultats && (
                <div className="resultats-box">
                  <h2>Vos scores par programme</h2>
                  <ul className="resultats-liste">
                    {Object.entries(resultats)
                      .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
                      .map(([genie, score]) => (
                        <li key={genie} className="resultat-item">
                          <span className="nom-genie">{formatNomGenie(genie)}:</span>
                          <span className="score-genie">{score} points</span>
                        </li>
                      ))
                    }
                  </ul>
                  
                  <div className="recommendation-box">
                    <h3>Programme recommandé</h3>
                    <p>Selon vos réponses, le programme qui pourrait vous convenir le mieux est:</p>
                    <div className="programme-recommande">
                      {formatNomGenie(getGenieRecommande())}
                    </div>
                  </div>
                  
                  <div className="redirection-box">
                    {countdown !== null ? (
                      <p className="redirection-message">
                        Vous serez redirigé vers la page des formations dans {countdown} secondes...
                      </p>
                    ) : (
                      <button onClick={allerAuxFormations} className="submit-button">
                        Voir les formations recommandées
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="welcome-header">
                <h1 className="welcome-title">Formulaire d'orientation</h1>
                <h2 className="welcome-subtitle">
                  Page {etape + 1} sur {cles.length}
                </h2>
              </div>

              <form className="formulaire-box">
                <h3 className="categorie-titre">{formatNomGenie(cles[etape])}</h3>
                <div className="bloc-questionnaire">
                  {genies[cles[etape]].map((q, idx) => (
                    <div key={idx} className="question-bloc">
                      <div className="question-numero">
                        Question {etape * 5 + idx + 1}
                      </div>
                      <label className="question-label">{q}</label>
                      <select
                        className="question-select"
                        value={reponses[cles[etape]]?.[idx] || ""}
                        onChange={(e) =>
                          handleChange(cles[etape], idx, e.target.value)
                        }
                        required
                      >
                        <option value="">Choisir une note</option>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n} - {n === 1 ? "Pas du tout" : n === 5 ? "Tout à fait" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </form>

              {erreur && <div className="erreur-message">{erreur}</div>}

              <div className="progression-bar">
                <div 
                  className="progression-complete" 
                  style={{width: `${(etape / (cles.length - 1)) * 100}%`}}
                ></div>
              </div>

              <div className="submit-box">
                {etape > 0 && (
                  <button onClick={precedent} className="submit-button" disabled={isSubmitting}>
                    Précédent
                  </button>
                )}
                <button onClick={suivant} className="submit-button" disabled={isSubmitting}>
                  {etape < cles.length - 1 ? "Suivant" : "Terminer"}
                  {isSubmitting && " ..."}
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
