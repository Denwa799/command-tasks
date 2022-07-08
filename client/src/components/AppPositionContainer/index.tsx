import React, {FC} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {IAppHorizontalContainer} from './types';

export const AppPositionContainer: FC<IAppHorizontalContainer> = ({
  children,
  style,
  isHorizontal,
  isCenter,
}) => {
  return (
    <View
      style={[
        isHorizontal && styles.horizontal,
        isCenter && styles.center,
        style,
      ]}>
      {children}
    </View>
  );
};
