import {THEME} from 'constants/theme';
import React, {FC} from 'react';
import {Text, TouchableNativeFeedback, View} from 'react-native';
import {styles} from './styles';
import {IAppNativeFeedbackBtn} from './types';

export const AppNativeFeedbackBtn: FC<IAppNativeFeedbackBtn> = ({
  text,
  color = THEME.MAIN_COLOR,
  isBorderRadius = false,
  isCenter = false,
  isMainColor = false,
  disabled = false,
  style,
  textStyle,
  onPress,
}) => {
  const handler = () => !disabled && onPress();

  return (
    <View style={[styles.btn, isBorderRadius && styles.borderRadius, style]}>
      <TouchableNativeFeedback
        onPress={handler}
        background={
          !disabled
            ? TouchableNativeFeedback.Ripple(color, isBorderRadius)
            : undefined
        }>
        <View style={!isBorderRadius && styles.container}>
          <Text
            style={[
              styles.text,
              isCenter && styles.center,
              isMainColor && styles.mainColor,
              textStyle,
              disabled && styles.disabled,
            ]}>
            {text}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};
