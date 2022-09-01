import React from 'react';
import {Text} from 'react-native';
import {styles} from './styles';
import {DialogChildrenType} from './types';

export const DialogTitle = ({children}: DialogChildrenType) => {
  return <Text style={styles.title}>{children}</Text>;
};
