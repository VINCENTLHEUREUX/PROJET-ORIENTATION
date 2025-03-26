import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from "./pages/Accueil";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import Orientation from "./pages/Orientation";
import Formations from "./pages/Formations";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/orientation" element = {<Orientation/>} />
        <Route path="/formations" element = {<Formations/>} />
      </Routes>
    </Router>
  );
};

export default App;
