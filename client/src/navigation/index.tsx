import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {AuthNavigation} from './AutnNavigation';

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <AuthNavigation />
    </NavigationContainer>
  );
};
