import React, {FC} from 'react';
import {Text, TouchableWithoutFeedback} from 'react-native';
import {styles} from './styles';
import {IAppTextButton} from './types';

export const AppTextButton: FC<IAppTextButton> = ({
  text,
  style,
  onPress,
  containerStyle,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress} style={containerStyle}>
      <Text style={[styles.text, style]}>{text}</Text>
    </TouchableWithoutFeedback>
  );
};
