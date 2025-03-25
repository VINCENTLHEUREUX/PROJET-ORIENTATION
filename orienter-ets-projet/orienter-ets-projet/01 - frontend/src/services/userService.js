import api from './api';

const USER_BASE_URL = '/nextgen/user';
const USERS_BASE_URL = '/nextgen/users';

export const userService = {
  // Récupérer un utilisateur par son ID
  getUserById: async (userId) => {
    try {
      const response = await api.get(`${USER_BASE_URL}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  // Récupérer tous les utilisateurs
  getAllUsers: async () => {
    try {
      const response = await api.get(USERS_BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Créer un nouvel utilisateur
  createUser: async (userData) => {
    try {
      const response = await api.post(USER_BASE_URL, userData);
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      console.error('Error creating user:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la création du compte',
        status: error.response?.status || 500
      };
    }
  },

  // Mettre à jour un utilisateur
  updateUser: async (userData) => {
    try {
      const response = await api.put(USER_BASE_URL, userData);
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      console.error('Error updating user:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la mise à jour du compte',
        status: error.response?.status || 500
      };
    }
  },

  // Supprimer un utilisateur
  deleteUser: async (userData) => {
    try {
      const response = await api.delete(USER_BASE_URL, { data: userData });
      return {
        success: true,
        data: response.data,
        status: response.status
      };
    } catch (error) {
      console.error('Error deleting user:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Erreur lors de la suppression du compte',
        status: error.response?.status || 500
      };
    }
  },

  // Vérifier si un email existe déjà
  checkEmailExists: async (email) => {
    try {
      // Note: Cette fonctionnalité n'est pas exposée directement dans votre contrôleur
      // mais pourrait être utile côté frontend
      const response = await api.get(`${USER_BASE_URL}/email/${email}`);
      return response.data.exists;
    } catch (error) {
      console.error('Error checking email:', error);
      return false;
    }
  }
};

export default userService;