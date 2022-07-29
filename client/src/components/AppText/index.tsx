import React, {FC} from 'react';
import {Text} from 'react-native';
import {styles} from './styles';
import {IAppText} from './types';

export const AppText: FC<IAppText> = ({children, style}) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};
