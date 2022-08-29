import {THEME} from 'constants/theme';
import React, {FC, useCallback} from 'react';
import {Text, TouchableNativeFeedback, View} from 'react-native';
import {styles} from './styles';
import {IAppNativeFeedbackBtn} from './types';

export const AppNativeFeedbackBtn: FC<IAppNativeFeedbackBtn> = ({
  text,
  onPress,
  color = THEME.MAIN_COLOR,
  style,
  textStyle,
  isBorderRadius = false,
  isCenter = false,
  isMainColor = false,
  disabled = false,
}) => {
  const handler = useCallback(() => {
    console.log(disabled);
    !disabled && onPress();
  }, [disabled]);

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
            ]}>
            {text}
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};
