import {AppNativeButton} from 'components/Btns/AppNativeButton';
import React from 'react';
import {styles} from './styles';
import {DialogButtonType} from './types';

export const DialogButton = ({
  title,
  disabled,
  styleContainer,
  onPress,
}: DialogButtonType) => {
  return (
    <AppNativeButton
      title={title}
      disabled={disabled}
      styleContainer={[styles.button, styleContainer]}
      onPress={onPress}
    />
  );
};
