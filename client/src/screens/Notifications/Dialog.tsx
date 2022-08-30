import {AppDialog} from 'components/AppDialog';
import React, {useCallback} from 'react';
import {DialogType} from './types';

export const Dialog = ({isOpen, setIsOpen, onAccept, disabled}: DialogType) => {
  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <AppDialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <AppDialog.Title>Принять приглашение?</AppDialog.Title>
      <AppDialog.Actions>
        <AppDialog.Button title="Закрыть" onPress={onClose} />
        <AppDialog.Button
          title="Принять"
          onPress={onAccept}
          disabled={disabled}
        />
      </AppDialog.Actions>
    </AppDialog>
  );
};
