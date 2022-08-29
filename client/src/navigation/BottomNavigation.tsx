import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {THEME} from 'constants/theme';
import React, {useCallback} from 'react';
import {ProfileScreen} from 'screens/Profile';
import {styles} from './styles';
import {ITabBarIcon} from './types';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Anticon from 'react-native-vector-icons/AntDesign';
import {TaskNavigation} from './TaskNavigation';

const Tab = createBottomTabNavigator();

export const BottomNavigation = () => {
  const mainScreenButton = useCallback((color: string) => {
    return <Ionicon name="ios-list" size={24} color={color} />;
  }, []);

  const profileScreenButton = useCallback((color: string) => {
    return <Anticon name="user" size={24} color={color} />;
  }, []);

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
        component={TaskNavigation}
        options={{
          tabBarLabel: 'Задачи',
          tabBarIcon: (options: ITabBarIcon) => mainScreenButton(options.color),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Профиль',
          tabBarIcon: (options: ITabBarIcon) =>
            profileScreenButton(options.color),
        }}
      />
    </Tab.Navigator>
  );
};
