import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {ModalChildrenType} from './types';

export const ModalActions = ({children}: ModalChildrenType) => {
  return <View style={styles.actions}>{children}</View>;
};
