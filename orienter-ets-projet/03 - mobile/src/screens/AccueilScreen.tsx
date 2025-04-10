import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Button } from '../components/Button';
import { theme } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';

const AccueilScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.welcomeBox}>
          <View style={styles.welcomeHeader}>
            <Text style={styles.welcomeTitle}>Bienvenue à l'ÉTS</Text>
            <Text style={styles.welcomeSubtitle}>Présentation de l'outil</Text>
          </View>
          
          <View style={styles.welcomeText}>
            <Text style={styles.paragraph}>
              Bienvenue sur notre application d'orientation pour les étudiants de l'École de technologie supérieure de Montréal !
            </Text>
            <Text style={styles.paragraph}>
              Notre application est conçue pour aider les étudiants à naviguer facilement à travers les différents programmes offerts par l'université.
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title="Commencer l'orientation"
              onPress={() => navigation.navigate('Orientation')}
            />
            <Button
              title="Se connecter"
              onPress={() => navigation.navigate('Connexion')}
              variant="secondary"
            />
          </View>
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
    flexGrow: 1,
    padding: theme.spacing.md,
  },
  welcomeBox: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: theme.spacing.lg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeHeader: {
    marginBottom: theme.spacing.lg,
  },
  welcomeTitle: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  welcomeSubtitle: {
    ...theme.typography.h2,
    color: '#666',
  },
  welcomeText: {
    marginBottom: theme.spacing.xl,
  },
  paragraph: {
    ...theme.typography.body,
    marginBottom: theme.spacing.md,
    lineHeight: 24,
  },
  buttonContainer: {
    gap: theme.spacing.md,
  },
});

export default AccueilScreen;