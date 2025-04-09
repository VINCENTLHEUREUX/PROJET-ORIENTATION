import axios, { AxiosInstance } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Formation } from '../types/formation';

const API_URL = 'http://10.0.2.2:8080/nextgen'; // Android emulator localhost

export const api: AxiosInstance = axios.create({
  baseURL: API_URL,
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
        email: await AsyncStorage.getItem('email'),
        password: await AsyncStorage.getItem('password')
      });
      
      // Transform backend response to match the expected format
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
};




