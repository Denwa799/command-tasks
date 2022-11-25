import {AppNativeButton} from 'components/Btns/AppNativeButton';
import React from 'react';
import {styles} from './styles';
import {ModalButtonType} from './types';

export const ModalButton = ({
  title,
  disabled,
  styleContainer,
  onPress,
}: ModalButtonType) => {
  return (
    <AppNativeButton
      title={title}
      styleContainer={[styles.button, styleContainer]}
      onPress={onPress}
      disabled={disabled}
    />
  );
};
