import React, {FC} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {IAppContainer} from './types';

export const AppContainer: FC<IAppContainer> = ({children, style}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};
