import React, {FC} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {IAppHorizontalContainer} from './types';

export const AppPositionContainer: FC<IAppHorizontalContainer> = ({
  children,
  style,
  isHorizontal,
  isHorizontalCenter,
  isCenter,
}) => {
  return (
    <View
      style={[
        isHorizontal && styles.horizontal,
        isHorizontalCenter && styles.horizontalCenter,
        isCenter && styles.center,
        style,
      ]}>
      {children}
    </View>
  );
};
