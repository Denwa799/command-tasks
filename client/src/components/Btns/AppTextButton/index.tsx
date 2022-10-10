import React, {FC, useCallback} from 'react';
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
  isDisabled = false,
}) => {
  const handler = useCallback(() => {
    !isDisabled && onPress();
  }, [isDisabled]);

  return (
    <TouchableWithoutFeedback onPress={handler} style={containerStyle}>
      <Text
        style={[
          styles.text,
          isTextCenter && styles.center,
          isDisabled && styles.disabled,
          style,
        ]}
        numberOfLines={numberOfLines}>
        {children}
      </Text>
    </TouchableWithoutFeedback>
  );
};
