import React, {FC} from 'react';
import {Text, TouchableWithoutFeedback} from 'react-native';
import {styles} from './styles';
import {IAppTextButton} from './types';

export const AppTextButton: FC<IAppTextButton> = ({
  children,
  style,
  onPress,
  containerStyle,
  isTextCenter = false,
  numberOfLines,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} style={containerStyle}>
      <Text
        style={[styles.text, isTextCenter && styles.center, style]}
        numberOfLines={numberOfLines}>
        {children}
      </Text>
    </TouchableWithoutFeedback>
  );
};
