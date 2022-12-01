import {AppDialog} from 'components/AppDialog';
import React from 'react';
import {DialogType} from './types';

export const Dialog = ({
  title = 'Удалить пользователя?',
  buttonText = 'Удалить',
  isOpen,
  dialogQuitIsOpen,
  disabled,
  setIsOpen,
  setQuiteIsOpen,
  onDelete,
  onQuit,
}: DialogType) => {
  const onClose = () => {
    setIsOpen(false);
    setQuiteIsOpen(false);
  };

  const onClick = () => {
    if (dialogQuitIsOpen) {
      onQuit();
    } else {
      onDelete();
    }
  };

  return (
    <AppDialog isOpen={isOpen} setIsOpen={onClose}>
      <AppDialog.Title>{title}</AppDialog.Title>
      <AppDialog.Actions>
        <AppDialog.Button title="Закрыть" onPress={onClose} />
        <AppDialog.Button
          title={buttonText}
          disabled={disabled}
          onPress={onClick}
        />
      </AppDialog.Actions>
    </AppDialog>
  );
};
