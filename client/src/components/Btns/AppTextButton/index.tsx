import React, {FC, useCallback} from 'react';
import {Text, TouchableWithoutFeedback} from 'react-native';
import {styles} from './styles';
import {IAppTextButton} from './types';

export const AppTextButton: FC<IAppTextButton> = ({
  numberOfLines,
  children,
  isTextCenter = false,
  isDisabled = false,
  style,
  containerStyle,
  onPress,
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
