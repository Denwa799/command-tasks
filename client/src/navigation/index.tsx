import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthNavigation} from './AutnNavigation';

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
  );
};
