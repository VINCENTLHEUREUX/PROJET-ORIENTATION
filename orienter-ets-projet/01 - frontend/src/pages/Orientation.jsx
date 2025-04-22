import React, { useState, useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { useNavigate } from "react-router-dom"
import "../styles/orientation.css"

export default function FormulaireOrientation() {
  const navigate = useNavigate()
  
  const [etape, setEtape] = useState(0)
  const [reponses, setReponses] = useState({})
  const [envoye, setEnvoye] = useState(false)
  const [resultats, setResultats] = useState(null)
  const [erreur, setErreur] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [countdown, setCountdown] = useState(null)
  const [genies, setGenies] = useState(null)
  const [cles, setCles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchQuestions()
  }, [])

  // Récupère les questions
const fetchQuestions = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://springboot-projetorientation-ddapbxdnhkatfgdc.canadaeast-01.azurewebsites.net/nextgen/questions')
      if (!response.ok) {
        throw new Error(`Error ${response.status}`)
      }
      const data = await response.json()
      
      const questionsByProgram = {}
      data.questions.forEach(q => {
        if (!questionsByProgram[q.sigle]) {
          questionsByProgram[q.sigle] = []
        }
        questionsByProgram[q.sigle].push(q.description)
      })
      
      setGenies(questionsByProgram)
      setCles(Object.keys(questionsByProgram))
      setLoading(false)
    } catch (error) {
      setErreur("Erreur lors du chargement des questions")
      setLoading(false)
    }
  }

  // Enregistre les réponses
const handleChange = (genie, index, value) => {
    setReponses((prev) => ({
      ...prev,
      [genie]: {
        ...(prev[genie] || {}),
        [index]: Number(value),
      },
    }))
  }

  // Calcule les scores pour chaque programme d'ingénierie, a mettre a jour si modification des programmes
const calculerResultats = () => {
    const resultats = {}
    
    Object.keys(reponses).forEach((genie) => {
      const reponseGenie = reponses[genie]
      const total = Object.values(reponseGenie).reduce((sum, note) => sum + note, 0)
      resultats[genie] = total
    })
    
    const resultatgpa = resultats["GPA"] || 0
    const resultatmec = resultats["MEC"] || 0
    const resultatgti = resultats["GTI"] || 0
    const resultatctn = resultats["CTN"] || 0
    const resultatele = resultats["ELE"] || 0
    const resultataer = resultats["AER"] || 0
    const resultatgol = resultats["GOL"] || 0
    const resultatlog = resultats["LOG"] || 0
    
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
    }
  }

  // Envoie les résultats au serveur, a mettre a jour si modification des programmes
const envoyer = async () => {
    let userToken = localStorage.getItem('authToken')
    
    setIsSubmitting(true)
    setErreur("")
    
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
    } = calculerResultats()
    
    setResultats(resultats)
    
    try {
      const response = await fetch('https://springboot-projetorientation-ddapbxdnhkatfgdc.canadaeast-01.azurewebsites.net/nextgen/result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${userToken || ''}`
        },
        body: JSON.stringify({
          "token": userToken,
          "resultatGPA": Number(resultatgpa || 0),
          "resultatMEC": Number(resultatmec || 0), 
          "resultatGTI": Number(resultatgti || 0), 
          "resultatCTN": Number(resultatctn || 0), 
          "resultatELE": Number(resultatele || 0), 
          "resultatAER": Number(resultataer || 0), 
          "resultatGOL": Number(resultatgol || 0), 
          "resultatLOG": Number(resultatlog || 0)
        })
      })
      
      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi des résultats")
      }
      
      setEnvoye(true)
      setCountdown(5)
      
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer)
            navigate('/formations', { 
              state: { 
                fromOrientation: true,
                orientationResults: {
                  scores: resultats
                }
              } 
            })
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (error) {
      setErreur("Une erreur est survenue")
      setIsSubmitting(false)
    }
  }

  // Passe à la section suivante ou finalise le questionnaire
const suivant = () => {
    if (!genies || !cles.length) return
    
    const reponseEtapeActuelle = reponses[cles[etape]] || {}
    const toutesRepondues = genies[cles[etape]].every((_, idx) => 
      reponseEtapeActuelle[idx] !== undefined && reponseEtapeActuelle[idx] !== ""
    )
    
    if (!toutesRepondues) {
      setErreur("Veuillez répondre à toutes les questions avant de continuer")
      return
    }
    
    setErreur("")
    if (etape < cles.length - 1) {
      setEtape(etape + 1)
    } else {
      envoyer()
    }
  }

  // Retourne à la section précédente
const precedent = () => {
    if (etape > 0) {
      setEtape(etape - 1)
      setErreur("")
    }
  }

  // Navigue vers la page des détails de formation avec les résultats
const allerAuxFormations = () => {
    navigate('/formations', { 
      state: { 
        fromOrientation: true,
        orientationResults: {
          scores: resultats
        }
      } 
    })
  }

  // Convertit les codes de programme en noms complets de programme (a mettre a jour si update du backend)
  
const formatNomGenie = (code) => {
    const mapping = {
      "LOG": "Génie logiciel",
      "GOL": "Génie des opérations et de la logistique",
      "GPA": "Génie de la production automatisée",
      "MEC": "Génie mécanique",
      "CTN": "Génie de la construction",
      "GTI": "Génie des technologies de l'information",
      "AER": "Génie aérospatial",
      "ELE": "Génie électrique"
    }
    
    return mapping[code] || code
  }

  if (loading) {
    return (
      <div className="page-orientation">
        <Header />
        <main className="main-content">
          <div className="loading">Chargement du questionnaire...</div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!genies || !cles.length) {
    return (
      <div className="page-orientation">
        <Header />
        <main className="main-content">
          <div className="error">
            <p>{erreur || "Impossible de charger les questions. Veuillez réessayer plus tard."}</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

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
              
              <h3 className="section-title">
                {formatNomGenie(cles[etape])}
              </h3>

              {genies[cles[etape]].map((q, idx) => (
                <div key={idx} className="question-item">
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

              {erreur && <div className="error-inline">{erreur}</div>}

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
              <h1>Résultat de votre orientation</h1>
              <p>Voici le programme qui correspond le mieux à votre profil</p>
            </div>

            <div className="results-list">
              {(() => {
                const maxEntry = Object.entries(resultats)
                  .reduce((max, current) => 
                    current[1] > max[1] ? current : max
                  )
                const [genie, score] = maxEntry
                const pourcentage = Math.round((score / 25) * 100)
                
                return (
                  <div key={genie} className="result-item">
                    <span className="program-name">{formatNomGenie(genie)}</span>
                    <span className="program-score">{pourcentage}%</span>
                  </div>
                )
              })()}
            </div>

            <div className="recommendation-section">
              <h3>Programme recommandé</h3>
              <p>
                Selon vos réponses, ce programme correspond le mieux à votre profil
                Nous vous encourageons à explorer les détails de ce programme ainsi que d'autres
                qui pourraient vous intéresser
              </p>
            </div>

            <div className="action-buttons">
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
  )
}