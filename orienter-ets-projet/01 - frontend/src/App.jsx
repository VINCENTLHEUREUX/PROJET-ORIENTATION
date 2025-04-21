import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Accueil from "./pages/Accueil";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import Orientation from "./pages/Orientation";
import Formations from "./pages/Formations";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/orientation" element={<Orientation />} />
          <Route path="/formations" element={<Formations />} />
          <Route path="/profil" element={<PrivateRoute> <Profile /> </PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute requireAdmin={true}> <Admin /> </PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;


