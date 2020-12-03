import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppLoading } from 'expo';
import { useFonts } from 'expo-font';

import { Login, Register, Home } from './src/components';

const Stack = createStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./src/assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./src/assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen component={Login} name="Login" />
          <Stack.Screen component={Register} name="Register" />
          <Stack.Screen component={Home} name="Home" />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
