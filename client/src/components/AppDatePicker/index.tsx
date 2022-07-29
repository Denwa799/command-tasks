import React, {FC, useMemo} from 'react';
import DatePicker from 'react-native-date-picker';
import {IAppDatePicker} from './types';

export const AppDatePicker: FC<IAppDatePicker> = ({
  date,
  isOpen = false,
  onConfirm,
  onCancel,
  title = 'Выберите дату',
}) => {
  const minimumDate = useMemo(() => {
    return new Date();
  }, [isOpen]);

  return (
    <DatePicker
      mode="date"
      date={date}
      modal
      open={isOpen}
      onConfirm={onConfirm}
      onCancel={onCancel}
      title={title}
      confirmText="Подтвердить"
      cancelText="Выйти"
      minimumDate={minimumDate}
    />
  );
};
