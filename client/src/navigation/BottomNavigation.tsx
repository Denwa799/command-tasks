import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {THEME} from 'constants/theme';
import React from 'react';
import {MainScreen} from 'screens/Main';
import {ProfileScreen} from 'screens/Profile';
import {styles} from './styles';
import {ITabBarIcon} from './types';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Anticon from 'react-native-vector-icons/AntDesign';

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
        tabBarLabelStyle: styles.label,
      }}>
      <Tab.Screen
        name="MainScreen"
        component={MainScreen}
        options={{
          tabBarLabel: 'Задачи',
          tabBarIcon: (options: ITabBarIcon) => (
            <Ionicon name="ios-list" size={24} color={options.color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Профиль',
          tabBarIcon: (options: ITabBarIcon) => (
            <Anticon name="user" size={24} color={options.color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
