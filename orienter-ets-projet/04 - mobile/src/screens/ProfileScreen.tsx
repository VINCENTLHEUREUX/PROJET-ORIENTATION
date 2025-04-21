import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import { apiService } from '../services/api';
import { theme } from '../theme/theme';

const ProfileScreen = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(user || null);
  const [orientationResults, setOrientationResults] = useState<Record<string, number> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      await AsyncStorage.getItem('authToken');
    

      // Only fetch user info if not already available from auth context
      if (!user) {
        const userResponse = await apiService.getUserInfo();
        setUserInfo(userResponse.data);
      }

      // Fetch orientation results
      const orientationResponse = await apiService.getOrientationResults();
      if (orientationResponse?.data) {
        setOrientationResults(orientationResponse.data as unknown as Record<string, number>);
      }
    } catch (err) {
      setError('Erreur lors de la récupération des données');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatNomGenie = (nom: string) => {
    return nom
      .replace('resultat', '')
      .split(/(?=[A-Z])/)
      .join(' ')
      .toLowerCase()
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  const calculatePercentage = (score: number) => {
    return Math.round((score / 25) * 100);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mon Profil</Text>
          {userInfo && (
            <View style={styles.infoContainer}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Nom</Text>
                <Text style={styles.infoValue}>{userInfo.nom}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoValue}>{userInfo.email}</Text>
              </View>
            </View>
          )}
        </View>

        {/* Orientation Results Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Résultats du test d'orientation</Text>
          {orientationResults && (
            <View style={styles.resultsContainer}>
              {Object.entries(orientationResults)
                .filter(([key]) => key.startsWith('resultat'))
                .sort(([, a], [, b]) => Number(b) - Number(a))
                .map(([key, value]) => (
                  <View key={key} style={styles.resultItem}>
                    <View style={styles.resultHeader}>
                      <Text style={styles.resultName}>
                        {formatNomGenie(key)}
                      </Text>
                      <Text style={styles.resultScore}>
                        {calculatePercentage(Number(value))}%
                      </Text>
                    </View>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressValue, 
                          { width: `${calculatePercentage(Number(value))}%` }
                        ]} 
                      />
                    </View>
                  </View>
                ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    padding: theme.spacing.md,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    ...theme.typography.h2,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
  },
  infoContainer: {
    gap: theme.spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  infoLabel: {
    ...theme.typography.body,
    color: '#666',
  },
  infoValue: {
    ...theme.typography.body,
    fontWeight: 'bold',
  },
  resultsContainer: {
    gap: theme.spacing.md,
  },
  resultItem: {
    gap: theme.spacing.xs,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultName: {
    ...theme.typography.body,
    fontWeight: '500',
  },
  resultScore: {
    ...theme.typography.body,
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 10,
    backgroundColor: '#E5E5E5',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressValue: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  errorText: {
    color: theme.colors.error,
    textAlign: 'center',
    padding: theme.spacing.md,
  },
});

export default ProfileScreen;







