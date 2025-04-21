import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState('https://i.pinimg.com/1200x/46/72/f8/4672f876389036583190d93a71aa6cb2.jpg');
  const [userEmail, setUserEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    const checkAdmin = () => {
      try {
        const storedData = localStorage.getItem('user');
        if (storedData) {
          const userData = JSON.parse(storedData);
          if (userData && userData.role === 'Administrateur') {
            setIsAdmin(true);
          }
        }
      } catch (e) {}
    };
    
    checkAdmin();
    
    if (user && user.token) {
      fetchProfileData();
    } else if (user) {
      setUserEmail(user.email);
    }
  }, [user]);
  
  const fetchProfileData = async () => {
    try {
      let token;
      try {
        const storedData = localStorage.getItem('user');
        if (storedData) {
          const userData = JSON.parse(storedData);
          token = userData.token;
        }
      } catch (e) {}
      
      if (!token && user) {
        token = user.token;
      }
      
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
      
      const response = await axios.post('api/profil', {
        token: token
      }, { headers });
      
      if (response.data && response.data.picture_url) {
        setProfilePicUrl(response.data.picture_url);
      }
      
      if (response.data && response.data.email) {
        setUserEmail(response.data.email);
      } else if (user) {
        setUserEmail(user.email);
      }
    } catch (error) {
      if (user) {
        setUserEmail(user.email);
      }
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const leftLinks = [
    { to: '/', label: 'Accueil' },
    { to: '/formations', label: 'Programmes' },
    { to: '/orientation', label: 'Orientation' },
  ];
  
  return (
    <header className="shadow-md" role="banner">
      <nav className="bg-[#b91c1c]" aria-label="Navigation principale">
        <div className="max-w-[1200px] mx-auto px-4 py-3">
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Menu principal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-16 6h16"/>
            </svg>
          </button>
          <div className={`flex flex-col md:flex-row justify-between items-center ${isMenuOpen ? 'block' : 'hidden'} md:flex`}>
            <ul className="flex flex-col md:flex-row gap-2">
              {leftLinks.map(({ to, label }, index) => (
                <li key={index}>
                  <Link
                    to={to}
                    className="text-white px-4 py-2 inline-block hover:bg-[#7f1d1d] transition-colors duration-300 font-medium"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="relative">
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-white">Bienvenue, {userEmail || user.email}</span>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded transition-colors duration-300"
                    >
                      Menu Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="btn-secondary"
                  >
                    Déconnexion
                  </button>
                  <Link to="/profil" className="ml-2">
                    <img
                      src={profilePicUrl}
                      alt="Profil"
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://i.pinimg.com/1200x/46/72/f8/4672f876389036583190d93a71aa6cb2.jpg";
                      }}
                    />
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/connexion"
                    className="btn-primary"
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/inscription"
                    className="btn-secondary"
                  >
                    Inscription
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;