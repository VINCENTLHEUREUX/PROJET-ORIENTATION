import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './src/context/ThemeContext';
import { AuthProvider } from './src/context/AuthContext';

type RootStackParamList = {
  Accueil: undefined;
  Connexion: undefined;
  Inscription: undefined;
  Orientation: undefined;
  Formations: { results?: Record<string, number> };
};

import AccueilScreen from './src/screens/AccueilScreen';
import ConnexionScreen from './src/screens/ConnexionScreen';
import InscriptionScreen from './src/screens/InscriptionScreen';
import OrientationScreen from './src/screens/OrientationScreen';
import FormationsScreen from './src/screens/FormationsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Accueil"
            screenOptions={{
              headerStyle: {
                backgroundColor: '#CF1F38', // ETS red
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
          >
            <Stack.Screen name="Accueil" component={AccueilScreen} />
            <Stack.Screen name="Connexion" component={ConnexionScreen} />
            <Stack.Screen name="Inscription" component={InscriptionScreen} />
            <Stack.Screen name="Orientation" component={OrientationScreen} />
            <Stack.Screen name="Formations" component={FormationsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;



