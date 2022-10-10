import {AppDialog} from 'components/AppDialog';
import React, {useCallback} from 'react';
import {DialogType} from './types';

export const Dialog = ({
  isOpen,
  setIsOpen,
  onAccept,
  disabled,
  isDelete = false,
}: DialogType) => {
  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <AppDialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <AppDialog.Title>
        {isDelete ? 'Удалить приглашение?' : 'Принять приглашение?'}
      </AppDialog.Title>
      <AppDialog.Actions>
        <AppDialog.Button title="Закрыть" onPress={onClose} />
        <AppDialog.Button
          title={isDelete ? 'Удалить' : 'Принять'}
          onPress={onAccept}
          disabled={disabled}
        />
      </AppDialog.Actions>
    </AppDialog>
  );
};
