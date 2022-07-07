import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {THEME} from 'constants/theme';
import React from 'react';
import {MainScreen} from 'screens/Main';
import {ProfileScreen} from 'screens/Profile';
import {styles} from './styles';

const Tab = createBottomTabNavigator();

export const BottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: styles.bottom,
        tabBarActiveTintColor: THEME.MAIN_COLOR,
        tabBarInactiveTintColor: THEME.TEXT_COLOR,
      }}>
      <Tab.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          tabBarLabel: 'Задачи',
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Профиль',
        }}
      />
    </Tab.Navigator>
  );
};
