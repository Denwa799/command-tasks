import {AppField} from 'components/AppField';
import {AppModal} from 'components/AppModal';
import {AppNativeButton} from 'components/AppNativeButton';
import React, {FC, useCallback, useState} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {IModalEdit} from './types';

export const ModalEdit: FC<IModalEdit> = ({isOpen, setIsOpen, name}) => {
  const [nameVale, setNameVale] = useState(name);
  const [isNameError, setIsNameError] = useState(false);
  const [dangerNameText, setDangerNameText] = useState('Пустое поле');

  const nameHandler = useCallback(
    (value: string) => {
      setNameVale(value);
      setIsNameError(false);
    },
    [nameVale],
  );

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onEdit = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <AppModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <AppField
        value={nameVale}
        placeholder={'Введите ФИО'}
        onChange={nameHandler}
        isDanger={isNameError}
        dangerText={dangerNameText}
      />
      <View style={styles.modalBtns}>
        <AppNativeButton
          title="Закрыть"
          styleContainer={styles.modalBtn}
          onPress={onClose}
        />
        <AppNativeButton
          title="Сохранить"
          styleContainer={styles.modalBtn}
          onPress={onEdit}
        />
      </View>
    </AppModal>
  );
};
