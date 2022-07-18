import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from 'hooks/useAuth';
import React from 'react';
import {AuthScreen} from 'screens/Auth';
import {BottomNavigation} from './BottomNavigation';

const Stack = createNativeStackNavigator();

export const AuthNavigation = () => {
  const {user} = useAuth();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user && user.access_token ? (
        <Stack.Screen name="Main" component={BottomNavigation} />
      ) : (
        <Stack.Screen name="Auth" component={AuthScreen} />
      )}
    </Stack.Navigator>
  );
};
