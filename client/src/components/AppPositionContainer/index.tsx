import React, {FC} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {IAppHorizontalContainer} from './types';

export const AppPositionContainer: FC<IAppHorizontalContainer> = ({
  children,
  isHorizontal,
  isHorizontalCenter,
  isCenter,
  isBottom,
  style,
}) => {
  return (
    <View
      style={[
        isHorizontal && styles.horizontal,
        isHorizontalCenter && styles.horizontalCenter,
        isCenter && styles.center,
        isBottom && styles.bottom,
        style,
      ]}>
      {children}
    </View>
  );
};
