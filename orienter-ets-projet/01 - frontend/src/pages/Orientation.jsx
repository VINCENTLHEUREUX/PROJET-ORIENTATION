import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/accueil.css"; // pour unifier le style avec les autres pages

const genies = {
  genie_construction: [
    "J’aime les chantiers et voir concrètement ce que je bâtis.",
    "J’aime les structures, les ponts, les bâtiments.",
    "Je m’intéresse aux matériaux comme le béton, l’acier ou le bois.",
    "Je veux contribuer à rendre les infrastructures durables et sécuritaires.",
    "Je suis à l’aise avec les normes, les plans et les devis techniques.",
  ],
  genie_electrique: [
    "J’aime comprendre comment fonctionnent les circuits électriques.",
    "L’électronique et les systèmes embarqués m’attirent.",
    "J’aimerais travailler dans les énergies renouvelables ou les télécommunications.",
    "J’aime les mathématiques appliquées aux signaux ou aux champs électromagnétiques.",
    "Je suis curieux de savoir comment fonctionnent les capteurs, les moteurs et les réseaux électriques.",
  ],
  genie_logiciel: [
    "J’aime coder et créer des logiciels utiles.",
    "Je m’intéresse au développement d’applications Web, mobiles ou de jeux.",
    "Je suis rigoureux et j’aime résoudre des bugs.",
    "J’aimerais travailler dans le domaine de la cybersécurité ou de l’intelligence artificielle.",
    "J’aime travailler en équipe sur des projets de programmation.",
  ],
  genie_mecanique: [
    "Je suis fasciné par les machines, les moteurs et les systèmes mécaniques.",
    "J’aime dessiner, concevoir ou modéliser des objets.",
    "Je veux comprendre comment les choses bougent, roulent ou volent.",
    "J’aime les matières comme la dynamique, la thermodynamique et la résistance des matériaux.",
    "J’aimerais participer à la fabrication de prototypes ou de robots.",
  ],
  genie_production_automatisee: [
    "Je suis attiré par l’automatisation et les robots industriels.",
    "J’aime optimiser les processus pour les rendre plus efficaces.",
    "Je veux apprendre à programmer des systèmes automatisés.",
    "J’aime l’électronique, la mécanique et l’informatique combinées.",
    "Je veux travailler dans l’industrie manufacturière ou la haute technologie.",
  ],
  genie_technologies_information: [
    "J’aime l’informatique, mais avec une approche plus orientée systèmes.",
    "Je m’intéresse aux réseaux, bases de données et à la cybersécurité.",
    "J’aime comprendre comment les systèmes communiquent entre eux.",
    "Je veux travailler en TI, mais pas nécessairement comme programmeur pur.",
    "Je veux pouvoir toucher à plein de domaines en entreprise : infra, web, support, etc.",
  ],
  genie_operations_logistique: [
    "J’aime planifier, organiser et optimiser les ressources.",
    "Je suis intéressé par les chaînes d’approvisionnement et la gestion des stocks.",
    "J’aime les systèmes complexes et le défi de les améliorer.",
    "Je veux apprendre à utiliser des logiciels de gestion et de planification.",
    "J’ai un bon sens de l’organisation et de l’analyse.",
  ],
  genie_aerospatial: [
    "L’aéronautique me passionne : avions, drones, satellites.",
    "J’aime les sciences appliquées au vol, comme l’aérodynamique.",
    "Je suis rigoureux et méticuleux dans les détails techniques.",
    "J’aimerais travailler pour des entreprises comme Airbus, Bombardier ou l’Agence spatiale.",
    "Je veux contribuer à l’innovation dans l’espace ou l’aviation.",
  ],
};

export default function FormulaireOrientation() {
  const cles = Object.keys(genies);
  const [etape, setEtape] = useState(0);
  const [reponses, setReponses] = useState({});
  const [envoye, setEnvoye] = useState(false);

  const handleChange = (genie, index, value) => {
    setReponses((prev) => ({
      ...prev,
      [genie]: {
        ...(prev[genie] || {}),
        [index]: Number(value),
      },
    }));
  };

  const envoyer = () => {
    setEnvoye(true);
  };

  const suivant = () => {
    if (etape < cles.length - 1) {
      setEtape(etape + 1);
    } else {
      envoyer();
    }
  };

  const precedent = () => {
    if (etape > 0) {
      setEtape(etape - 1);
    }
  };

  return (
    <div className="page-accueil">
      <Header />

      <main className="main-content">
        <div className="welcome-box">
          {envoye ? (
            <>
              <h1 className="welcome-title">Merci !</h1>
              <p className="welcome-subtitle">
                Vos réponses ont été soumises avec succès.
              </p>
            </>
          ) : (
            <>
              <div className="welcome-header">
                <h1 className="welcome-title">Formulaire d’orientation</h1>
                <h2 className="welcome-subtitle">
                  Page {etape + 1} sur {cles.length}
                </h2>
              </div>

              <form className="formulaire-box">
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
                      >
                        <option value="">Choisir une note</option>
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </form>

              <div className="submit-box">
                {etape > 0 && (
                  <button onClick={precedent} className="submit-button">
                    Précédent
                  </button>
                )}
                <button onClick={suivant} className="submit-button">
                  {etape < cles.length - 1 ? "Suivant" : "Terminer"}
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
