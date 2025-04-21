import axios, { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formation } from '../types/formation';
import { Platform } from 'react-native';

// Use the same backend URL as the frontend
const API_URL = 'http://localhost:8080/nextgen';

// For Android emulator, we need to use 10.0.2.2 instead of localhost
const isAndroid = Platform.OS === 'android';
const BASE_URL = isAndroid ? 'http://10.0.2.2:8080/nextgen' : API_URL;

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export interface ApiService {
  getPrograms(): Promise<Formation[]>;
  submitOrientation(results: Record<string, number>): Promise<void>;
  login(email: string, password: string): Promise<void>;
  register(userData: {
    nom: string;
    prenom: string;
    email: string;
    password: string;
  }): Promise<void>;
  getOrientationResults(): Promise<Record<string, number> | null>;
  getUserInfo(): Promise<any>;
}

export const apiService: ApiService = {
  getPrograms: async () => {
    const response = await api.get<Formation[]>('/programs');
    return response.data;
  },
  submitOrientation: async (results: Record<string, number>) => {
    const response = await api.post('/orientation/submit', results);
    return response.data;
  },
  login: async (email: string, password: string) => {
    const response = await api.post('/user/login', { email, password });
    const { token, user } = response.data;
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
  },
  register: async (userData) => {
    const response = await api.post('/user/register', userData);
    const { token, user } = response.data;
    await AsyncStorage.setItem('authToken', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
  },
  getOrientationResults: async () => {
    try {
      const response = await api.post('/nextgen/results', {
        email: "admin@projetorientation.com",
        password: "MotDePasseSecurise123"
      });
      
      // Transform backend response to match the frontend format
      const results = response.data;
      return {
        resultatgpa: results.resultatGPA,
        resultatmec: results.resultatMEC,
        resultatgti: results.resultatGTI,
        resultatctn: results.resultatCTN,
        resultatele: results.resultatELE,
        resultataer: results.resultatAER,
        resultatgol: results.resultatGOL,
        resultatlog: results.resultatLOG
      };
    } catch (error) {
      console.error('Failed to fetch orientation results:', error);
      return null;
    }
  },
  getUserInfo: async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      const response = await api.get('/api/user/info', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user info:', error);
      throw error;
    }
  },
};







