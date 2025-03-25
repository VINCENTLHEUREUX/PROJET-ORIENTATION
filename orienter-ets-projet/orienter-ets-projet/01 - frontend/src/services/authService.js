import api from './api';

const AUTH_BASE_URL = '/api/auth'; // Adaptez selon vos endpoints Spring

export const authService = {
  // Connexion de l'utilisateur
  login: async (email, password) => {
    try {
      const response = await api.post(`${AUTH_BASE_URL}/login`, {
        email,
        password
      });

      if (response.data.token) {
        // Stockage du token dans le localStorage
        localStorage.setItem('token', response.data.token);
        // Stockage des infos utilisateur si nécessaires
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return {
        success: true,
        user: response.data.user,
        token: response.data.token
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Identifiants incorrects'
      };
    }
  },

  // Inscription de l'utilisateur
  register: async (userData) => {
    try {
      const response = await api.post(`${AUTH_BASE_URL}/register`, {
        email: userData.email,
        password: userData.password,
        nom: userData.lastName,
        prenom: userData.firstName
      });

      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: error.response?.data?.message || "Erreur lors de l'inscription"
      };
    }
  },

  // Déconnexion de l'utilisateur
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Optionnel : appel API pour invalider le token côté serveur
  },

  // Vérification de l'état d'authentification
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token; // Retourne true si le token existe
  },

  // Récupération du token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Récupération des infos utilisateur
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Rafraîchissement du token
  refreshToken: async () => {
    try {
      const response = await api.post(`${AUTH_BASE_URL}/refresh-token`, {
        token: authService.getToken()
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      return false;
    }
  },

  // Vérification de la validité du token
  validateToken: async () => {
    if (!authService.isAuthenticated()) return false;

    try {
      const response = await api.get(`${AUTH_BASE_URL}/validate`, {
        headers: {
          Authorization: `Bearer ${authService.getToken()}`
        }
      });
      return response.data.valid;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }
};

export default authService;