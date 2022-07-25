import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {THEME} from 'constants/theme';
import {MainScreen} from 'screens/Main';

const Stack = createNativeStackNavigator();

export const TaskNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: THEME.BACK_COLOR,
        },
        headerTintColor: THEME.TEXT_COLOR,
        animation: 'fade_from_bottom',
      }}>
      <Stack.Screen name="Teams" component={MainScreen} />
      <Stack.Screen name="Team" component={MainScreen} />
      <Stack.Screen name="Project" component={MainScreen} />
    </Stack.Navigator>
  );
};
