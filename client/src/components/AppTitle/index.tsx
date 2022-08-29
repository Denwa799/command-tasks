import React, {FC} from 'react';
import {Text} from 'react-native';
import {styles} from './styles';
import {IAppTitle} from './types';

export const AppTitle: FC<IAppTitle> = ({children, style, level = '1'}) => {
  return (
    <Text
      style={[
        styles.title,
        style,
        level === '1' && styles.level1,
        level === '2' && styles.level2,
        level === '3' && styles.level3,
        level === '4' && styles.level4,
      ]}>
      {children}
    </Text>
  );
};
