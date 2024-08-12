import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import LandingScreen from './Screens/LandingScreen';
import StoryScreen from './Screens/StoryScreen';
import SearchScreen from './Screens/SearchScreen';
import ReelScreen from './Screens/ReelScreen';
import UserScreen from './Screens/UserScreen';
import { RootStackParamList } from "./Navigation/types"; 

import { Provider } from 'react-redux';
import { store } from './Redux/Store/store';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Reels"
            component={ReelScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Story"
            component={StoryScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="User"
            component={UserScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
