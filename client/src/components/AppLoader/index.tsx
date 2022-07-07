import React, {FC} from 'react';
import {THEME} from 'constants/theme';
import {ActivityIndicator} from 'react-native';

export const AppLoader: FC = () => (
  <ActivityIndicator size={50} color={THEME.MAIN_COLOR} />
);
