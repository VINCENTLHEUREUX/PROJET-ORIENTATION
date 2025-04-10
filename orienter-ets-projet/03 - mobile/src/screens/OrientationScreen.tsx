import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Accueil: undefined;
  Connexion: undefined;
  Inscription: undefined;
  Orientation: undefined;
  Formations: { results?: Record<string, number> };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Orientation'>;

import { Button } from '../components/Button';
import { theme } from '../theme/theme';
import { apiService } from '../services/api';

const genies = {
  genie_construction: [
    "J'aime les chantiers et voir concrètement ce que je bâtis.",
    "J'aime les structures, les ponts, les bâtiments.",
    "Je m'intéresse aux matériaux comme le béton, l'acier ou le bois.",
    "Je veux contribuer à rendre les infrastructures durables et sécuritaires.",
    "Je suis à l'aise avec les normes, les plans et les devis techniques.",
  ],
  genie_electrique: [
    "J'aime comprendre comment fonctionnent les circuits électriques.",
    "L'électronique et les systèmes embarqués m'attirent.",
    "J'aimerais travailler dans les énergies renouvelables ou les télécommunications.",
    "J'aime les mathématiques appliquées aux signaux ou aux champs électromagnétiques.",
    "Je suis curieux de savoir comment fonctionnent les capteurs, les moteurs et les réseaux électriques.",
  ],
  genie_logiciel: [
    "J'aime coder et créer des logiciels utiles.",
    "Je m'intéresse au développement d'applications Web, mobiles ou de jeux.",
    "Je suis rigoureux et j'aime résoudre des bugs.",
    "J'aimerais travailler dans le domaine de la cybersécurité ou de l'intelligence artificielle.",
    "J'aime travailler en équipe sur des projets de programmation.",
  ],
  genie_mecanique: [
    "Je suis fasciné par les machines, les moteurs et les systèmes mécaniques.",
    "J'aime dessiner, concevoir ou modéliser des objets.",
    "Je veux comprendre comment les choses bougent, roulent ou volent.",
    "J'aime les matières comme la dynamique, la thermodynamique et la résistance des matériaux.",
    "J'aimerais participer à la fabrication de prototypes ou de robots.",
  ],
  genie_production_automatisee: [
    "Je suis attiré par l'automatisation et les robots industriels.",
    "J'aime optimiser les processus pour les rendre plus efficaces.",
    "Je veux apprendre à programmer des systèmes automatisés.",
    "J'aime l'électronique, la mécanique et l'informatique combinées.",
    "Je veux travailler dans l'industrie manufacturière ou la haute technologie.",
  ],
  genie_technologies_information: [
    "J'aime l'informatique, mais avec une approche plus orientée systèmes.",
    "Je m'intéresse aux réseaux, bases de données et à la cybersécurité.",
    "J'aime comprendre comment les systèmes communiquent entre eux.",
    "Je veux travailler en TI, mais pas nécessairement comme programmeur pur.",
    "Je veux pouvoir toucher à plein de domaines en entreprise : infra, web, support, etc.",
  ],
  genie_operations_logistique: [
    "J'aime planifier, organiser et optimiser les ressources.",
    "Je suis intéressé par les chaînes d'approvisionnement et la gestion des stocks.",
    "J'aime les systèmes complexes et le défi de les améliorer.",
    "Je veux apprendre à utiliser des logiciels de gestion et de planification.",
    "J'ai un bon sens de l'organisation et de l'analyse.",
  ],
  genie_aerospatial: [
    "L'aéronautique me passionne : avions, drones, satellites.",
    "J'aime les sciences appliquées au vol, comme l'aérodynamique.",
    "Je suis rigoureux et méticuleux dans les détails techniques.",
    "J'aimerais travailler pour des entreprises comme Airbus, Bombardier ou l'Agence spatiale.",
    "Je veux contribuer à l'innovation dans l'espace ou l'aviation.",
  ],
};

const OrientationScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fields = Object.keys(genies);
  const currentField = fields[currentStep];
  const questions = genies[currentField as keyof typeof genies];

  const handleAnswer = (questionIndex: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentField]: {
        ...((prev[currentField as keyof typeof prev] || {}) as Record<number, number>),
        [questionIndex]: value,
      }
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');

    try {
      const results = calculateResults();
      await apiService.submitOrientation(results);
      navigation.navigate('Formations', { results });
    } catch (err) {
      setError('Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateResults = () => {
    // Implement your results calculation logic here
    return {};
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Questionnaire d'orientation</Text>
        <Text style={styles.subtitle}>
          Étape {currentStep + 1} sur {fields.length}
        </Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.questionsContainer}>
          {questions.map((question, index) => (
            <View key={index} style={styles.questionBox}>
              <Text style={styles.questionText}>{question}</Text>
              <View style={styles.answersContainer}>
                {[1, 2, 3, 4, 5].map((value) => (
                  <TouchableOpacity
                    key={value}
                    style={[
                      styles.answerButton,
                      (answers as Record<string, Record<number, number>>)[currentField]?.[index] === value && styles.selectedAnswer,
                    ]}
                    onPress={() => handleAnswer(index, value)}
                  >
                    <Text style={styles.answerText}>{value}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
        </View>

        <View style={styles.navigationButtons}>
          {currentStep > 0 && (
            <Button
              title="Précédent"
              onPress={() => setCurrentStep(prev => prev - 1)}
              variant="secondary"
            />
          )}
          {currentStep < fields.length - 1 ? (
            <Button
              title="Suivant"
              onPress={() => setCurrentStep(prev => prev + 1)}
            />
          ) : (
            <Button
              title={isLoading ? 'Envoi en cours...' : 'Terminer'}
              onPress={handleSubmit}
              disabled={isLoading}
            />
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
  content: {
    padding: theme.spacing.lg,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
  subtitle: {
    ...theme.typography.h2,
    color: '#666',
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  questionsContainer: {
    gap: theme.spacing.xl,
  },
  questionBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: theme.spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionText: {
    ...theme.typography.body,
    marginBottom: theme.spacing.md,
  },
  answersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  answerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedAnswer: {
    backgroundColor: theme.colors.primary,
  },
  answerText: {
    color: theme.colors.primary,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
});

export default OrientationScreen;







