import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {DialogChildrenType} from './types';

export const DialogActions = ({children}: DialogChildrenType) => {
  return <View style={styles.actions}>{children}</View>;
};
