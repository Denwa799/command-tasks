import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthNavigation} from './AutnNavigation';
import {THEME} from 'constants/theme';

export const AppNavigation = () => {
  return (
    <NavigationContainer
      theme={{
        colors: {background: THEME.BACK_COLOR, border: THEME.BACK_COLOR},
      }}>
      <AuthNavigation />
    </NavigationContainer>
  );
};
