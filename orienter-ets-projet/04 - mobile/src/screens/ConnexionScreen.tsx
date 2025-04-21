
import { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '../components/Button';
import { theme } from '../theme/theme';
import { apiService } from '../services/api';
import { AuthContext } from '../context/AuthContext';

type RootStackParamList = {
  Accueil: undefined;
  Connexion: undefined;
  Inscription: undefined;
};

type ConnexionScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Connexion'
>;

interface Styles {
  container: ViewStyle;
  content: ViewStyle;
  title: TextStyle;
  form: ViewStyle;
  inputGroup: ViewStyle;
  label: TextStyle;
  input: TextStyle;
  errorText: TextStyle;
}

const ConnexionScreen = () => {
  const navigation = useNavigation<ConnexionScreenNavigationProp>();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await apiService.login(email, password);
      login(email); // Update auth context
      navigation.navigate('Accueil');
    } catch (err) {
      setError('Email ou mot de passe incorrect');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} testID="connexion-screen">
      <View style={styles.content} accessible={true} accessibilityLabel="Formulaire de connexion">
        <Text style={styles.title}>Connexion</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="Votre email"
              testID="email-input"
              autoCorrect={false}
              textContentType="emailAddress"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Votre mot de passe"
              testID="password-input"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
            />
          </View>

          {isLoading ? (
            <ActivityIndicator
              size="large"
              color={theme.colors.primary}
              testID="loading-indicator"
            />
          ) : (
            <Button
              title="Se connecter"
              onPress={handleLogin}
              disabled={isLoading}
            />
          )}

          <Button
            title="Créer un compte"
            onPress={() => navigation.navigate('Inscription')}
            variant="secondary"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create<Styles>({
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
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  form: {
    gap: theme.spacing.lg,
  },
  inputGroup: {
    gap: theme.spacing.xs,
  },
  label: {
    ...theme.typography.body,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    padding: theme.spacing.md,
    fontSize: 16,
  },
  errorText: {
    color: theme.colors.error,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
  },
});

export default ConnexionScreen;
















