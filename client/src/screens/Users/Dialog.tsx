import {AppDialog} from 'components/AppDialog';
import React, {useCallback} from 'react';
import {DialogType} from './types';

export const Dialog = ({isOpen, setIsOpen, onDelete, disabled}: DialogType) => {
  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <AppDialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <AppDialog.Title>Удалить пользователя?</AppDialog.Title>
      <AppDialog.Actions>
        <AppDialog.Button title="Закрыть" onPress={onClose} />
        <AppDialog.Button
          title={'Удалить'}
          onPress={onDelete}
          disabled={disabled}
        />
      </AppDialog.Actions>
    </AppDialog>
  );
};
