import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FormulaireDOrientation from '../../components/FormulaireDOrientation/FormulaireDOrientation';
import './Orientation.css';

function Orientation() {
  const handleSubmit = (formData) => {
    console.log('Données soumises:', formData);
    // Ici vous pourriez envoyer les données à votre API
    // et rediriger vers une page de résultats
  };

  return (
    <div className="page-container">
      <Header />
      <main className="orientation-main">
        <div className="orientation-container">
          <h1>Découvrez votre orientation professionnelle</h1>
          <p className="intro-text">
            Répondez à ce questionnaire pour recevoir des suggestions de carrières
            adaptées à votre profil.
          </p>
          <FormulaireDOrientation onSubmit={handleSubmit} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Orientation;