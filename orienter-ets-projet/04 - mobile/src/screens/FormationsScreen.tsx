import type { FC } from 'react';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Button } from '../components/Button';
import { theme } from '../theme/theme';
import { apiService } from '../services/api';
import { Formation } from '../types/formation';


type RouteParams = {
  Formations: {
    results?: Record<string, number>;
  };
};

const FormationsScreen: FC = () => {
  const route = useRoute<RouteProp<RouteParams, 'Formations'>>();
  const [formations, setFormations] = useState<Formation[]>([]);
  const [filteredFormations, setFilteredFormations] = useState<Formation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [orientationResults, setOrientationResults] = useState<Record<string, number> | null>(null);

  // Get results from navigation if coming from orientation test
  const resultsFromTest = route.params?.results;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [programsData, savedResults] = await Promise.all([
        apiService.getPrograms(),
        !resultsFromTest ? apiService.getOrientationResults() : null
      ]);

      // Use results from test or from backend
      const finalResults = resultsFromTest || savedResults;
      setOrientationResults(finalResults);

      // Sort formations based on results if available
      let sortedFormations = [...programsData];
      if (finalResults) {
        sortedFormations.sort((a, b) => {
          const scoreA = finalResults[`resultat${a.code.toLowerCase()}`] || 0;
          const scoreB = finalResults[`resultat${b.code.toLowerCase()}`] || 0;
          return scoreB - scoreA;
        });
      }

      setFormations(sortedFormations);
      setFilteredFormations(sortedFormations);
    } catch (err) {
      setError('Erreur lors du chargement des données');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const filtered = formations.filter(formation =>
      formation.titre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFormations(filtered);
  }, [searchTerm, formations]);

  const getCompatibilityScore = (formation: Formation) => {
    if (!orientationResults) return 0;
    const key = `resultat${formation.code.toLowerCase()}`;
    return orientationResults[key] || 0;
  };

  const getCompatibilityClass = (score: number) => {
    if (score >= 80 && score <= 100) return styles.highCompatibility;
    if (score >= 60) return styles.mediumCompatibility;
    return styles.lowCompatibility;
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text>Chargement des formations...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Nos programmes de formation</Text>

        <TextInput
          style={styles.searchInput}
          value={searchTerm}
          onChangeText={setSearchTerm}
          placeholder="Rechercher une formation..."
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {orientationResults && (
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>Résultats de votre orientation</Text>
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, styles.highCompatibility]} />
                <Text>Compatibilité élevée (80-100%)</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, styles.mediumCompatibility]} />
                <Text>Compatibilité moyenne (60-79%)</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, styles.lowCompatibility]} />
                <Text>Compatibilité faible (0-59%)</Text>
              </View>
            </View>
          </View>
        )}

        <View style={styles.formationsList}>
          {filteredFormations.map((formation) => (
            <View 
              key={formation.id} 
              style={[
                styles.formationCard,
                orientationResults && getCompatibilityClass(getCompatibilityScore(formation))
              ]}
            >
              <Text style={styles.formationTitle}>{formation.titre}</Text>
              <Text style={styles.formationCode}>{formation.code}</Text>
              <Text style={styles.formationDescription}>{formation.description}</Text>
              
              {orientationResults && (
                <Text style={styles.compatibilityScore}>
                  Compatibilité: {getCompatibilityScore(formation)}%
                </Text>
              )}

              <View style={styles.formationActions}>
                <Button
                  title="En savoir plus"
                  onPress={() => Linking.openURL(formation.url)}
                  variant="secondary"
                />
                <Button
                  title="Postuler"
                  onPress={() => Linking.openURL(formation.applicationUrl)}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FormationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  resultsHeader: {
    marginBottom: theme.spacing.lg,
  },
  resultsTitle: {
    ...theme.typography.h2,
    marginBottom: theme.spacing.md,
  },
  legendContainer: {
    marginBottom: theme.spacing.lg,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  legendDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: theme.spacing.sm,
  },
  formationsList: {
    marginTop: theme.spacing.lg,
  },
  formationCard: {
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  formationTitle: {
    ...theme.typography.h2,
    marginBottom: theme.spacing.sm,
  },
  formationCode: {
    ...theme.typography.small,
    color: theme.colors.primary,
    marginBottom: theme.spacing.sm,
  },
  formationDescription: {
    ...theme.typography.body,
    marginBottom: theme.spacing.lg,
  },
  formationActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  highCompatibility: {
    backgroundColor: theme.colors.compatibility.high,
    borderColor: theme.colors.compatibility.high,
  },
  mediumCompatibility: {
    backgroundColor: theme.colors.compatibility.medium,
    borderColor: theme.colors.compatibility.medium,
  },
  lowCompatibility: {
    backgroundColor: theme.colors.compatibility.low,
    borderColor: theme.colors.compatibility.low,
  },
  compatibilityScore: {
    ...theme.typography.small,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
    fontWeight: 'bold',
  },
});















