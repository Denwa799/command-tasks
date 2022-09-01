import {AppNativeButton} from 'components/Btns/AppNativeButton';
import React from 'react';
import {styles} from './styles';
import {DialogButtonType} from './types';

export const DialogButton = ({
  title,
  styleContainer,
  onPress,
  disabled,
}: DialogButtonType) => {
  return (
    <AppNativeButton
      title={title}
      styleContainer={[styles.button, styleContainer]}
      onPress={onPress}
      disabled={disabled}
    />
  );
};
