import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/admin.css";
import axios from 'axios';

const initialProgramState = { sigle: '', nom: '', description: '', credits: '', url: '' };
const initialQuestionState = { id: '', sigle: '', description: '' };
const initialResultState = { resultId: null, email: '', resultatGOL: 0, resultatELE: 0, resultatMEC: 0, resultatLOG: 0, resultatAER: 0, resultatCTN: 0, resultatGPA: 0, resultatGTI: 0 };
const initialUserState = { userId: null, nom: '', prenom: '', email: '', password: '', role: 'Utilisateur', date: null };
const initialProfilState = { email: '', biographie: '', etudes: '', pictureUrl: '' };

export default function Admin() {
  const [selectedTable, setSelectedTable] = useState(null);
  const [programsData, setProgramsData] = useState([]);
  const [questionsData, setQuestionsData] = useState([]);
  const [profilsData, setProfilsData] = useState([]);
  const [resultsData, setResultsData] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showProgramForm, setShowProgramForm] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [showResultForm, setShowResultForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showProfilForm, setShowProfilForm] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);

  const [newProgram, setNewProgram] = useState(initialProgramState);
  const [newQuestion, setNewQuestion] = useState(initialQuestionState);
  const [newResult, setNewResult] = useState(initialResultState);
  const [newUser, setNewUser] = useState(initialUserState);
  const [newProfil, setNewProfil] = useState(initialProfilState);

  // Gère la sélection d'une table dans la sidebar et lance la récupération des données correspondantes
  const handleTableSelect = (table) => {
    setSelectedTable(table);
    setShowProgramForm(false);
    setShowQuestionForm(false);
    setShowResultForm(false);
    setShowUserForm(false);
    setShowProfilForm(false);
    setIsEditMode(false);
    setError(null);

    if (table === 'ProgramInfo') fetchProgramsData();
    else if (table === 'Question') fetchQuestionsData();
    else if (table === 'Profil') fetchProfilsData();
    else if (table === 'ResultatQuizz') fetchResultsData();
    else if (table === 'User') fetchUsersData();
  };

  // Récupère les données des programmes depuis l'API
  const fetchProgramsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('api/programs');
      setProgramsData(response.data?.programs || []);
    } catch (err) {
      console.error('Erreur lors de la récupération des programmes:', err);
      setError('Impossible de récupérer les données des programmes');
    } finally {
      setLoading(false);
    }
  };

  // Récupère les questions
  const fetchQuestionsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('api/questions');
      setQuestionsData(response.data?.questions || []);
    } catch (err) {
      console.error('Erreur lors de la récupération des questions:', err);
      setError('Impossible de récupérer les questions');
    } finally {
      setLoading(false);
    }
  };

  // Récupère tous les profils utilisateurs (Nécéssite token admin valide)
  const fetchProfilsData = async () => {
    setLoading(true);
    setError(null);
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      setError('Vous devez être connecté pour accéder aux profils');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post('api/profils', { token: authToken });
      setProfilsData(response.data?.profils || []);
    } catch (err) {
      console.error('Erreur lors de la récupération des profils:', err);
      setError('Impossible de récupérer les profils, vérifiez vos permissions');
    } finally {
      setLoading(false);
    }
  };

  // Récupère tous les résultats des quiz (Nécéssite token admin valide)
  const fetchResultsData = async () => {
    setLoading(true);
    setError(null);
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      setError('Vous devez être connecté pour accéder aux résultats');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post('api/allresults', { token: authToken });
      setResultsData(response.data?.results || []);
    } catch (err) {
      console.error('Erreur lors de la récupération des résultats:', err);
      setError('Impossible de récupérer les résultats des tests, vérifiez vos permissions');
    } finally {
      setLoading(false);
    }
  };

  // Récupère la liste de tous les utilisateurs (Nécéssite token admin valide)
  const fetchUsersData = async () => {
    setLoading(true);
    setError(null);
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      setError('Vous devez être connecté comme Admin pour accéder aux utilisateurs');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post('api/users', { token: authToken });
      setUsersData(response.data?.users || []);
    } catch (err) {
      console.error('Erreur lors de la récupération des utilisateurs:', err);
      setError('Impossible de récupérer les utilisateurs, vérifiez vos permissions');
    } finally {
      setLoading(false);
    }
  };

  // Détermine si le bouton Ajouter doit être affiché pour la table sélectionnée
  const shouldShowAddButton = (table) => {
    return table !== 'Profil';
  };

  // Formate une chaîne de date en format local fr-FR
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Date invalide';
      }
      return date.toLocaleDateString('fr-FR');
    } catch (e) {
      console.error("Error formatting date:", dateString, e);
      return 'Date invalide';
    }
  };

  // Met à jour l'état du formulaire programme lors de la saisie
  const handleProgramFormChange = (e) => {
    const { name, value } = e.target;
    setNewProgram(prev => ({ ...prev, [name]: value }));
  };

  // Affiche le formulaire pour ajouter un programme
  const handleAddProgramClick = () => {
    setIsEditMode(false);
    setNewProgram(initialProgramState);
    setShowQuestionForm(false); setShowResultForm(false); setShowUserForm(false); setShowProfilForm(false);
    setShowProgramForm(true);
  };

  // Cache le formulaire programme
  const handleCancelProgramForm = () => {
    setShowProgramForm(false);
    setIsEditMode(false);
    setNewProgram(initialProgramState);
  };

  // Affiche le formulaire pour modifier un programme
  const handleEditProgramClick = (program) => {
    setNewProgram({
      sigle: program.sigle,
      nom: program.nom,
      description: program.description || '',
      credits: program.credits || '',
      url: program.url || ''
    });
    setIsEditMode(true);
    setShowQuestionForm(false); setShowResultForm(false); setShowUserForm(false); setShowProfilForm(false);
    setShowProgramForm(true);
  };

  // Soumet le formulaire programme pour l'ajout ou la modification
  const handleSubmitProgram = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const authToken = localStorage.getItem('authToken');
    if (!authToken) { setError('Authentification requise'); setLoading(false); return; }
    if (!newProgram.sigle || !newProgram.nom) { setError('Le sigle et le nom sont obligatoires'); setLoading(false); return; }

    try {
      const formattedProgram = {
        ...newProgram,
        token: authToken,
        credits: newProgram.credits ? parseInt(newProgram.credits, 10) : null
      };
      const endpoint = 'api/program';
      if (isEditMode) {
        await axios.put(endpoint, formattedProgram);
      } else {
        await axios.post(endpoint, formattedProgram);
      }
      setShowProgramForm(false);
      setNewProgram(initialProgramState);
      setIsEditMode(false);
      fetchProgramsData();
    } catch (err) {
      console.error(`Erreur lors de ${isEditMode ? 'la modification' : 'l\'ajout'} du programme:`, err);
      setError(err.response?.data?.message || `Impossible de ${isEditMode ? 'modifier' : 'ajouter'} le programme`);
    } finally {
      setLoading(false);
    }
  };

  // Gère la suppression d'un programme
  const handleDeleteProgram = async (sigle) => {
      setLoading(true);
      setError(null);
      const authToken = localStorage.getItem('authToken');
      if (!authToken) { setError('Authentification requise'); setLoading(false); return; }
      try {
        await axios.delete('api/program', { data: { sigle: sigle, token: authToken } });
        fetchProgramsData();
      } catch (err) {
        console.error('Erreur lors de la suppression du programme:', err);
        setError(err.response?.data?.message || 'Impossible de supprimer le programme');
      } finally {
        setLoading(false);
      }
  };

  // Met à jour l'état du formulaire question lors de la saisie
  const handleQuestionFormChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion(prev => ({ ...prev, [name]: value }));
  };

  // Affiche le formulaire pour ajouter une nouvelle question
  const handleAddQuestionClick = () => {
    setIsEditMode(false);
    setNewQuestion(initialQuestionState);
    setShowProgramForm(false); setShowResultForm(false); setShowUserForm(false); setShowProfilForm(false);
    setShowQuestionForm(true);
  };

  // Cache le formulaire question
  const handleCancelQuestionForm = () => {
    setShowQuestionForm(false);
    setIsEditMode(false);
    setNewQuestion(initialQuestionState);
  };

  // Affiche le formulaire pour modifier une question existante
  const handleEditQuestionClick = (question) => {
    setNewQuestion({
      id: question.id,
      sigle: question.sigle,
      description: question.description || ''
    });
    setIsEditMode(true);
    setShowProgramForm(false); setShowResultForm(false); setShowUserForm(false); setShowProfilForm(false);
    setShowQuestionForm(true);
  };

  // Soumet le formulaire question pour modification ou ajout
  const handleSubmitQuestion = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const authToken = localStorage.getItem('authToken');
    if (!authToken) { setError('Authentification requise'); setLoading(false); return; }
    if (!newQuestion.sigle || !newQuestion.description) { setError('Le sigle du programme et la description sont obligatoires'); setLoading(false); return; }

    try {
      const formattedQuestion = {
        ...(isEditMode && { id: newQuestion.id }),
        sigle: newQuestion.sigle,
        question: newQuestion.description,
        token: authToken
      };
      const endpoint = 'api/question';
      let response;
      if (isEditMode) {
        response = await axios.put(endpoint, formattedQuestion);
      } else {
        response = await axios.post(endpoint, formattedQuestion);
      }

      if (response.status >= 200 && response.status < 300) {
          setShowQuestionForm(false);
          setNewQuestion(initialQuestionState);
          setIsEditMode(false);
          fetchQuestionsData();
      } else {
          setError("Erreur inattendue du serveur: " + (response.data?.message || response.statusText));
      }
    } catch (err) {
      console.error(`Erreur lors de ${isEditMode ? 'la modification' : 'l\'ajout'} de la question:`, err);
      setError(err.response?.data?.message || `Impossible de ${isEditMode ? 'modifier' : 'ajouter'} la question`);
    } finally {
      setLoading(false);
    }
  };

  // Gère la suppression des questions
  const handleDeleteQuestion = async (id) => {
      setLoading(true);
      setError(null);
      const authToken = localStorage.getItem('authToken');
      if (!authToken) { setError('Authentification requise'); setLoading(false); return; }
      try {
        const response = await axios.delete('api/question', { data: { id: id, token: authToken } });
        if (response.status === 200) {
          fetchQuestionsData();
        } else {
           setError('Erreur lors de la suppression: ' + (response.data?.message || 'Erreur inconnue'));
        }
      } catch (err) {
        console.error('Erreur lors de la suppression de la question:', err);
        setError(err.response?.data?.message || 'Impossible de supprimer la question');
      } finally {
        setLoading(false);
      }
  };

  // Met à jour formulaire résultat
  const handleResultFormChange = (e) => {
    const { name, value } = e.target;
    const numericValue = name !== 'email' ? (parseInt(value, 10) || 0) : value;
    setNewResult(prev => ({ ...prev, [name]: numericValue }));
  };

  // Affiche le formulaire pour ajouter un résultat
  const handleAddResultClick = () => {
    setIsEditMode(false);
    setNewResult(initialResultState);
    setShowProgramForm(false); setShowQuestionForm(false); setShowUserForm(false); setShowProfilForm(false);
    setShowResultForm(true);
  };

  // Cache le formulaire résultat
  const handleCancelResultForm = () => {
    setShowResultForm(false);
    setIsEditMode(false);
    setNewResult(initialResultState);
  };

  // Affiche le formulaire pour modifier les résultats d'un test
  const handleEditResultClick = (result) => {
    setNewResult({
        resultId: result.resultId,
        email: result.email,
        resultatGOL: result.resultatGOL ?? 0,
        resultatELE: result.resultatELE ?? 0,
        resultatMEC: result.resultatMEC ?? 0,
        resultatLOG: result.resultatLOG ?? 0,
        resultatAER: result.resultatAER ?? 0,
        resultatCTN: result.resultatCTN ?? 0,
        resultatGPA: result.resultatGPA ?? 0,
        resultatGTI: result.resultatGTI ?? 0
    });
    setIsEditMode(true);
    setShowProgramForm(false); setShowQuestionForm(false); setShowUserForm(false); setShowProfilForm(false);
    setShowResultForm(true);
  };

  // Soumet le formulaire résultat (modification et ajout)
  const handleSubmitResult = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const authToken = localStorage.getItem('authToken');
    if (!authToken) { setError('Authentification requise'); setLoading(false); return; }
    if (!newResult.email) { setError('L email est obligatoire'); setLoading(false); return; }

    try {
      const formattedResult = { ...newResult, token: authToken };
      const endpoint = 'api/result';
      if (isEditMode) {
        await axios.put(endpoint, formattedResult);
      } else {
        const { resultId, ...createData } = formattedResult;
        await axios.post(endpoint, createData);
      }
      setShowResultForm(false);
      setNewResult(initialResultState);
      setIsEditMode(false);
      fetchResultsData();
    } catch (err) {
      console.error(`Erreur lors de ${isEditMode ? 'la modification' : 'l\'ajout'} du résultat:`, err);
      setError(err.response?.data?.message || `Impossible de ${isEditMode ? 'modifier' : 'ajouter'} le résultat`);
    } finally {
      setLoading(false);
    }
  };

  // Gère la suppression des résultats d'un test
  const handleDeleteResult = async (resultId) => {
      setLoading(true);
      setError(null);
      const authToken = localStorage.getItem('authToken');
      if (!authToken) { setError('Authentification requise'); setLoading(false); return; }
      try {
        await axios.delete('api/result', { data: { resultId: resultId, token: authToken } });
        fetchResultsData();
      } catch (err) {
        console.error('Erreur lors de la suppression du résultat:', err);
        setError(err.response?.data?.message || 'Impossible de supprimer le résultat');
      } finally {
        setLoading(false);
      }
  };

  // Met à jour le formulaire utilisateur
  const handleUserFormChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  // Affiche le formulaire pour ajouter un utilisateur
  const handleAddUserClick = () => {
    setNewUser(initialUserState);
    setIsEditMode(false);
    setShowProgramForm(false); setShowQuestionForm(false); setShowResultForm(false); setShowProfilForm(false);
    setShowUserForm(true);
  };

  // Cache le formulaire utilisateur
  const handleCancelUserForm = () => {
    setShowUserForm(false);
    setIsEditMode(false);
    setNewUser(initialUserState);
  };

  // Affiche le formulaire pour modifier un utilisateur
  const handleEditUserClick = (user) => {
    setNewUser({
        userId: user.userId,
        nom: user.nom || '',
        prenom: user.prenom || '',
        email: user.email || '',
        password: '',
        role: user.role || 'Utilisateur',
        date: user.date
    });
    setIsEditMode(true);
    setShowProgramForm(false); setShowQuestionForm(false); setShowResultForm(false); setShowProfilForm(false);
    setShowUserForm(true);
  };

  // Soumet le formulaire utilisateur (modification ou ajout)
  const handleSubmitUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const authToken = localStorage.getItem('authToken');
    if (!authToken) { setError('Authentification requise'); setLoading(false); return; }

    if (!newUser.email || !newUser.nom || !newUser.prenom) {
        setError('Le nom le prénom et l email sont obligatoires'); setLoading(false); return;
    }
    if (!isEditMode && !newUser.password) {
        setError('Le mot de passe est obligatoire pour créer un nouvel utilisateur'); setLoading(false); return;
    }

    try {
        const userData = {
            token: authToken,
            nom: newUser.nom,
            prenom: newUser.prenom,
            email: newUser.email,
            role: isEditMode ? newUser.role : 'Utilisateur',
        };

        if (isEditMode) {
            userData.userId = newUser.userId;
            if (newUser.password) {
                userData.password = newUser.password;
            }
        } else {
            userData.password = newUser.password;
            userData.date = newUser.date || new Date().toISOString().split('T')[0];
        }

        const endpoint = 'api/user';
        if (isEditMode) {
            await axios.put(endpoint, userData);
        } else {
            await axios.post(endpoint, userData);
        }

        setShowUserForm(false);
        setNewUser(initialUserState);
        setIsEditMode(false);
        fetchUsersData();
    } catch (err) {
        console.error(`Erreur lors de ${isEditMode ? 'la modification' : 'l\'ajout'} de l'utilisateur:`, err);
        setError(err.response?.data?.message || `Impossible de ${isEditMode ? 'modifier' : 'ajouter'} l'utilisateur`);
    } finally {
        setLoading(false);
    }
  };

  // Gère la suppression d'un utilisateur
  const handleDeleteUser = async (userId) => {
    const userToDelete = usersData.find(u => u.userId === userId);
    if (!userToDelete) {
        setError('Utilisateur non trouvé');
        return;
    }

    setLoading(true);
    setError(null);
    const authToken = localStorage.getItem('authToken');
    if (!authToken) { setError('Authentification requise'); setLoading(false); return; }

    try {
        const endpoint = 'api/user';
        await axios.delete(endpoint, { data: { email: userToDelete.email, token: authToken } });
        fetchUsersData();
    } catch (err) {
        console.error('Erreur lors de la suppression de l\'utilisateur:', err);
        setError(err.response?.data?.message || 'Impossible de supprimer l\'utilisateur');
    } finally {
        setLoading(false);
    }
  };

  // Met à jour le formulaire profil
  const handleProfilFormChange = (e) => {
    const { name, value } = e.target;
    setNewProfil(prev => ({ ...prev, [name]: value }));
  };

  // Affiche le formulaire pour modifier un profil
  const handleEditProfilClick = (profil) => {
    setNewProfil({
      email: profil.email,
      biographie: profil.biographie || '',
      etudes: profil.etudes || '',
      pictureUrl: profil.pictureUrl || ''
    });
    setIsEditMode(true);
    setShowProgramForm(false); setShowQuestionForm(false); setShowResultForm(false); setShowUserForm(false);
    setShowProfilForm(true);
  };

  // Cache le formulaire profil
  const handleCancelProfilForm = () => {
    setShowProfilForm(false);
    setIsEditMode(false);
    setNewProfil(initialProfilState);
  };

  // Soumet le formulaire du profil (Modification uniquement)
  const handleSubmitProfil = async (e) => {
    e.preventDefault();
    if (!isEditMode) return;

    setLoading(true);
    setError(null);
    const authToken = localStorage.getItem('authToken');
    if (!authToken) { setError('Authentification requise'); setLoading(false); return; }

    try {
      const profilDataToUpdate = {
        token: authToken,
        email: newProfil.email,
        biographie: newProfil.biographie,
        etudes: newProfil.etudes,
        pictureUrl: newProfil.pictureUrl
      };
      const endpoint = 'api/profil';
      await axios.put(endpoint, profilDataToUpdate);

      setShowProfilForm(false);
      setIsEditMode(false);
      setNewProfil(initialProfilState);
      fetchProfilsData();
    } catch (err) {
      console.error(`Erreur lors de la modification du profil:`, err);
      setError(err.response?.data?.message || `Impossible de modifier le profil`);
    } finally {
      setLoading(false);
    }
  };


  // Montre le contenu des differentes pages selon ce qui est retourné par le backend
  const renderTableContent = () => {
    if (!selectedTable) return <div className="no-selection">Veuillez sélectionner une table à afficher dans le menu de gauche</div>;
    if (loading) return <div className="loading">Chargement des données...</div>;
    if (error) return <div className="error-container"><p className="error">{error}</p></div>;

    if (selectedTable === 'ProgramInfo') {
      return (
        <div className="table-container">
          <div className="table-header">
            <h2>{selectedTable}</h2>
            {shouldShowAddButton(selectedTable) && (<button className="btn-rouge" onClick={handleAddProgramClick}>Ajouter Programme</button>)}
          </div>
          {showProgramForm && (
            <div className="form-overlay">
              <div className="form-container">
                <h3>{isEditMode ? 'Modifier Programme' : 'Ajouter Programme'}</h3>
                <form onSubmit={handleSubmitProgram}>
                  <div className="form-group"><label htmlFor="sigle">Sigle:</label><input type="text" id="sigle" name="sigle" value={newProgram.sigle} onChange={handleProgramFormChange} required readOnly={isEditMode}/></div>
                  <div className="form-group"><label htmlFor="nom">Nom:</label><input type="text" id="nom" name="nom" value={newProgram.nom} onChange={handleProgramFormChange} required /></div>
                  <div className="form-group"><label htmlFor="description">Description:</label><textarea id="description" name="description" value={newProgram.description} onChange={handleProgramFormChange}></textarea></div>
                  <div className="form-group"><label htmlFor="credits">Crédits:</label><input type="number" id="credits" name="credits" value={newProgram.credits} onChange={handleProgramFormChange}/></div>
                  <div className="form-group"><label htmlFor="url">URL:</label><input type="url" id="url" name="url" value={newProgram.url} onChange={handleProgramFormChange} placeholder="https://examplecom"/></div>
                  <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={handleCancelProgramForm}>Annuler</button>
                    <button type="submit" className="btn-confirmer" disabled={loading}>{loading ? 'Chargement...' : 'Confirmer'}</button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <div className="table-content">
            <table className="data-table">
              <thead><tr><th>Sigle</th><th>Nom</th><th>Description</th><th>Crédits</th><th>URL</th><th>Actions</th></tr></thead>
              <tbody>
                {programsData.length > 0 ? programsData.map(program => (
                  <tr key={program.sigle}>
                    <td>{program.sigle}</td>
                    <td>{program.nom}</td>
                    <td className="description-cell">{program.description || 'N/A'}</td>
                    <td>{program.credits ?? 'N/A'}</td>
                    <td>{program.url ? <a href={program.url} target="_blank" rel="noopener noreferrer">Lien</a> : 'N/A'}</td>
                    <td className="actions">
                      <button className="btn-rouge" onClick={() => handleEditProgramClick(program)}>Modifier</button>
                      <button className="btn-delete" onClick={() => handleDeleteProgram(program.sigle)}>✕</button>
                    </td>
                  </tr>
                )) : (<tr><td colSpan="6">Aucun programme trouvé</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (selectedTable === 'Question') {
      return (
        <div className="table-container">
          <div className="table-header">
            <h2>{selectedTable}</h2>
            {shouldShowAddButton(selectedTable) && (<button className="btn-rouge" onClick={handleAddQuestionClick}>Ajouter Question</button>)}
          </div>
          {showQuestionForm && (
            <div className="form-overlay">
              <div className="form-container">
                <h3>{isEditMode ? 'Modifier Question' : 'Ajouter Question'}</h3>
                <form onSubmit={handleSubmitQuestion}>
                  {isEditMode && (<div className="form-group"><label htmlFor="id">ID:</label><input type="text" id="id" name="id" value={newQuestion.id} readOnly /></div>)}
                  <div className="form-group"><label htmlFor="sigle">Programme (Sigle):</label><input type="text" id="sigle" name="sigle" value={newQuestion.sigle} onChange={handleQuestionFormChange} required /></div>
                  <div className="form-group"><label htmlFor="question-description">Question:</label><textarea id="question-description" name="description" value={newQuestion.description} onChange={handleQuestionFormChange} required></textarea></div>
                  <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={handleCancelQuestionForm}>Annuler</button>
                    <button type="submit" className="btn-confirmer" disabled={loading}>{loading ? 'Chargement...' : 'Confirmer'}</button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <div className="table-content">
            <table className="data-table">
              <thead><tr><th>ID</th><th>Programme (Sigle)</th><th>Question</th><th>Actions</th></tr></thead>
              <tbody>
                {questionsData.length > 0 ? questionsData.map((question) => (
                  <tr key={question.id}>
                    <td>{question.id}</td>
                    <td>{question.sigle}</td>
                    <td className="description-cell">{question.description}</td>
                    <td className="actions">
                      <button className="btn-rouge" onClick={() => handleEditQuestionClick(question)}>Modifier</button>
                      <button className="btn-delete" onClick={() => handleDeleteQuestion(question.id)}>✕</button>
                    </td>
                  </tr>
                )) : (<tr><td colSpan="4">Aucune question trouvée</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (selectedTable === 'Profil') {
        return (
            <div className="table-container">
            <div className="table-header"><h2>{selectedTable}</h2></div>
            {showProfilForm && isEditMode && (
                <div className="form-overlay">
                <div className="form-container">
                    <h3>Modifier le profil de {newProfil.email}</h3>
                    <form onSubmit={handleSubmitProfil}>
                    <div className="form-group"><label htmlFor="profil-email">Email:</label><input type="email" id="profil-email" name="email" value={newProfil.email} readOnly /></div>
                    <div className="form-group"><label htmlFor="profil-biographie">Biographie:</label><textarea id="profil-biographie" name="biographie" value={newProfil.biographie} onChange={handleProfilFormChange}></textarea></div>
                    <div className="form-group"><label htmlFor="profil-etudes">Études:</label><textarea id="profil-etudes" name="etudes" value={newProfil.etudes} onChange={handleProfilFormChange}></textarea></div>
                    <div className="form-group"><label htmlFor="profil-pictureUrl">URL Photo:</label><input type="url" id="profil-pictureUrl" name="pictureUrl" value={newProfil.pictureUrl} onChange={handleProfilFormChange} placeholder="https://examplecom/imagejpg"/></div>
                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={handleCancelProfilForm}>Annuler</button>
                        <button type="submit" className="btn-confirmer" disabled={loading}>{loading ? 'Chargement...' : 'Confirmer'}</button>
                    </div>
                    </form>
                </div>
                </div>
            )}
            <div className="table-content">
                <table className="data-table">
                <thead><tr><th>Email</th><th>Biographie</th><th>Études</th><th>Photo</th><th>Actions</th></tr></thead>
                <tbody>
                    {profilsData.length > 0 ? profilsData.map((profil) => (
                    <tr key={profil.email}>
                        <td>{profil.email}</td>
                        <td className="description-cell">{profil.biographie || 'N/A'}</td>
                        <td className="description-cell">{profil.etudes || 'N/A'}</td>
                        <td>
                        {profil.pictureUrl ? (
                            <a href={profil.pictureUrl} target="_blank" rel="noopener noreferrer">
                            <img src={profil.pictureUrl} alt="Profil" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }}/>
                            </a>
                        ) : 'Aucune'}
                        </td>
                        <td className="actions">
                          <button className="btn-rouge" onClick={() => handleEditProfilClick(profil)}>Modifier</button>
                        </td>
                    </tr>
                    )) : (<tr><td colSpan="5">Aucun profil trouvé</td></tr>)}
                </tbody>
                </table>
            </div>
            </div>
        );
    }

    if (selectedTable === 'ResultatQuizz') {
       return (
        <div className="table-container">
          <div className="table-header">
            <h2>{selectedTable}</h2>
            {shouldShowAddButton(selectedTable) && (<button className="btn-rouge" onClick={handleAddResultClick}>Ajouter Résultat</button>)}
          </div>
          {showResultForm && (
            <div className="form-overlay">
              <div className="form-container large">
                <h3>{isEditMode ? 'Modifier Résultat' : 'Ajouter Résultat'}</h3>
                <form onSubmit={handleSubmitResult}>
                  <div className="form-grid">
                    {isEditMode && (<div className="form-group grid-span-2"><label htmlFor="resultId">ID:</label><input type="text" id="resultId" name="resultId" value={newResult.resultId ?? ''} readOnly /></div>)}
                    <div className="form-group grid-span-2"><label htmlFor="email">Email Utilisateur:</label><input type="email" id="email" name="email" value={newResult.email} onChange={handleResultFormChange} required readOnly={isEditMode} /></div>
                    <div className="form-group"><label htmlFor="resultatGOL">GOL:</label><input type="number" id="resultatGOL" name="resultatGOL" min="0" max="100" value={newResult.resultatGOL} onChange={handleResultFormChange}/></div>
                    <div className="form-group"><label htmlFor="resultatELE">ELE:</label><input type="number" id="resultatELE" name="resultatELE" min="0" max="100" value={newResult.resultatELE} onChange={handleResultFormChange}/></div>
                    <div className="form-group"><label htmlFor="resultatMEC">MEC:</label><input type="number" id="resultatMEC" name="resultatMEC" min="0" max="100" value={newResult.resultatMEC} onChange={handleResultFormChange}/></div>
                    <div className="form-group"><label htmlFor="resultatLOG">LOG:</label><input type="number" id="resultatLOG" name="resultatLOG" min="0" max="100" value={newResult.resultatLOG} onChange={handleResultFormChange}/></div>
                    <div className="form-group"><label htmlFor="resultatAER">AER:</label><input type="number" id="resultatAER" name="resultatAER" min="0" max="100" value={newResult.resultatAER} onChange={handleResultFormChange}/></div>
                    <div className="form-group"><label htmlFor="resultatCTN">CTN:</label><input type="number" id="resultatCTN" name="resultatCTN" min="0" max="100" value={newResult.resultatCTN} onChange={handleResultFormChange}/></div>
                    <div className="form-group"><label htmlFor="resultatGPA">GPA:</label><input type="number" id="resultatGPA" name="resultatGPA" min="0" max="100" value={newResult.resultatGPA} onChange={handleResultFormChange}/></div>
                    <div className="form-group"><label htmlFor="resultatGTI">GTI:</label><input type="number" id="resultatGTI" name="resultatGTI" min="0" max="100" value={newResult.resultatGTI} onChange={handleResultFormChange}/></div>
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={handleCancelResultForm}>Annuler</button>
                    <button type="submit" className="btn-confirmer" disabled={loading}>{loading ? 'Chargement...' : 'Confirmer'}</button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <div className="table-content">
            <table className="data-table result-table">
              <thead><tr><th>ID</th><th>Email</th><th>Date</th><th>GOL</th><th>ELE</th><th>MEC</th><th>LOG</th><th>AER</th><th>CTN</th><th>GPA</th><th>GTI</th><th>Actions</th></tr></thead>
              <tbody>
                {resultsData.length > 0 ? resultsData.map((result) => (
                  <tr key={result.resultId}>
                    <td>{result.resultId}</td>
                    <td>{result.email}</td>
                    <td>{formatDate(result.time)}</td>
                    <td>{result.resultatGOL ?? 0}</td>
                    <td>{result.resultatELE ?? 0}</td>
                    <td>{result.resultatMEC ?? 0}</td>
                    <td>{result.resultatLOG ?? 0}</td>
                    <td>{result.resultatAER ?? 0}</td>
                    <td>{result.resultatCTN ?? 0}</td>
                    <td>{result.resultatGPA ?? 0}</td>
                    <td>{result.resultatGTI ?? 0}</td>
                    <td className="actions">
                      <button className="btn-rouge" onClick={() => handleEditResultClick(result)}>Modifier</button>
                      <button className="btn-delete" onClick={() => handleDeleteResult(result.resultId)}>✕</button>
                    </td>
                  </tr>
                )) : (<tr><td colSpan="12">Aucun résultat trouvé</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (selectedTable === 'User') {
      return (
        <div className="table-container">
          <div className="table-header">
            <h2>{selectedTable}</h2>
            {shouldShowAddButton(selectedTable) && (<button className="btn-rouge" onClick={handleAddUserClick}>Ajouter Utilisateur</button>)}
          </div>
          {showUserForm && (
            <div className="form-overlay">
              <div className="form-container">
                <h3>{isEditMode ? 'Modifier Utilisateur' : 'Ajouter Utilisateur'}</h3>
                <form onSubmit={handleSubmitUser}>
                  {isEditMode && newUser.userId && (<div className="form-group"><label htmlFor="userId">ID:</label><input type="text" id="userId" name="userId" value={newUser.userId} readOnly /></div>)}
                  <div className="form-group"><label htmlFor="nom">Nom:</label><input type="text" id="nom" name="nom" value={newUser.nom} onChange={handleUserFormChange} required /></div>
                  <div className="form-group"><label htmlFor="prenom">Prénom:</label><input type="text" id="prenom" name="prenom" value={newUser.prenom} onChange={handleUserFormChange} required /></div>
                  <div className="form-group"><label htmlFor="email">Email:</label><input type="email" id="email" name="email" value={newUser.email} onChange={handleUserFormChange} required readOnly={isEditMode} /></div>
                  <div className="form-group"><label htmlFor="password">Mot de passe:</label><input type="password" id="password" name="password" value={newUser.password} onChange={handleUserFormChange} placeholder={isEditMode ? 'Laisser vide pour ne pas changer' : ''} required={!isEditMode} /></div>
                  {isEditMode && (
                    <div className="form-group"><label htmlFor="role">Rôle:</label>
                      <select id="role" name="role" value={newUser.role} onChange={handleUserFormChange} required>
                        <option value="Utilisateur">Utilisateur</option>
                        <option value="Administrateur">Administrateur</option>
                      </select>
                    </div>
                  )}
                  <div className="form-group">
                      <label htmlFor="date">Date d'inscription:</label>
                      <input
                          type="date" id="date" name="date"
                          value={newUser.date ? newUser.date.split('T')[0] : ''}
                          onChange={handleUserFormChange}
                          required={!isEditMode}
                          readOnly={isEditMode}
                      />
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn-cancel" onClick={handleCancelUserForm}>Annuler</button>
                    <button type="submit" className="btn-confirmer" disabled={loading}>{loading ? 'Chargement...' : 'Confirmer'}</button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <div className="table-content">
            <table className="data-table">
              <thead><tr><th>ID</th><th>Nom</th><th>Prénom</th><th>Email</th><th>Rôle</th><th>Inscrit le</th><th>Actions</th></tr></thead>
              <tbody>
                {usersData.length > 0 ? usersData.map((user) => (
                  <tr key={user.userId}>
                    <td>{user.userId}</td>
                    <td>{user.nom}</td>
                    <td>{user.prenom}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{formatDate(user.date)}</td>
                    <td className="actions">
                      <button className="btn-rouge" onClick={() => handleEditUserClick(user)}>Modifier</button>
                      <button className="btn-delete" onClick={() => handleDeleteUser(user.userId)}>✕</button>
                    </td>
                  </tr>
                )) : (<tr><td colSpan="7">Aucun utilisateur trouvé</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    return (
      <div className="table-container">
        <div className="table-header"><h2>{selectedTable}</h2></div>
        <div className="table-content"><p>Sélection de table non gérée : {selectedTable}</p></div>
      </div>
    );
  };


  return (
    <div className="admin-page">
      <Header />
      <main className="admin-content">
        <div className="admin-sidebar">
          <h2>Administration</h2>
          <div className="admin-nav">
            <button className={selectedTable === 'ProgramInfo' ? 'active' : ''} onClick={() => handleTableSelect('ProgramInfo')}>Programmes</button>
            <button className={selectedTable === 'Question' ? 'active' : ''} onClick={() => handleTableSelect('Question')}>Questions Quiz</button>
            <button className={selectedTable === 'ResultatQuizz' ? 'active' : ''} onClick={() => handleTableSelect('ResultatQuizz')}>Résultats Quiz</button>
            <button className={selectedTable === 'User' ? 'active' : ''} onClick={() => handleTableSelect('User')}>Utilisateurs</button>
            <button className={selectedTable === 'Profil' ? 'active' : ''} onClick={() => handleTableSelect('Profil')}>Profils</button>
          </div>
        </div>
        <div className="admin-main">
          {renderTableContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
}