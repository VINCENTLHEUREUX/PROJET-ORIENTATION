  import React, { createContext, useState, useContext, useEffect } from 'react';

  const AuthContext = createContext(null);

  export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Vérifier si l'utilisateur est déjà connecté au chargement
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }, []);

    const login = (userData) => {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
    };

    if (loading) {
      return null;
    }

    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export const useAuth = () => useContext(AuthContext);