import {AppField} from 'components/AppField';
import {AppModal} from 'components/AppModal';
import {useUsers} from 'hooks/useUsers';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {getUserId} from 'utils/getSession';
import {IModalEdit} from './types';

export const ModalEdit: FC<IModalEdit> = ({isOpen, setIsOpen, name}) => {
  const [nameValue, setNameValue] = useState(name);
  const [isNameError, setIsNameError] = useState(false);
  const [dangerNameText, setDangerNameText] = useState('Пустое поле');

  const {updateUser, updateUserIsLoading} = useUsers();

  useEffect(() => {
    setNameValue(name);
    setIsNameError(false);
  }, [isOpen]);

  const nameHandler = useCallback(
    (value: string) => {
      setNameValue(value);
      setIsNameError(false);
    },
    [nameValue],
  );

  const onClose = useCallback(async () => {
    setIsOpen(false);
  }, []);

  const onEdit = useCallback(async () => {
    if (!nameValue || nameValue.length < 3 || nameValue.length > 50) {
      if (nameValue.length < 3) {
        setDangerNameText('Меньше 3 символов');
      }
      if (nameValue.length > 50) {
        setDangerNameText('Больше 50 символов');
      }
      if (!nameValue) {
        setDangerNameText('Пустое поле');
      }
      return setIsNameError(true);
    }

    const id = await getUserId();
    await updateUser(id, nameValue);
    setIsOpen(false);
  }, [nameValue]);

  return (
    <AppModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <AppField
        value={nameValue}
        placeholder={'Введите ФИО'}
        onChange={nameHandler}
        isDanger={isNameError}
        dangerText={dangerNameText}
      />
      <AppModal.Actions>
        <AppModal.Button title="Закрыть" onPress={onClose} />
        <AppModal.Button
          title="Сохранить"
          onPress={onEdit}
          disabled={updateUserIsLoading}
        />
      </AppModal.Actions>
    </AppModal>
  );
};
