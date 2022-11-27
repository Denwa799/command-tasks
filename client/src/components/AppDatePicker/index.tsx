import React, {FC, useMemo} from 'react';
import DatePicker from 'react-native-date-picker';
import {IAppDatePicker} from './types';

export const AppDatePicker: FC<IAppDatePicker> = ({
  title = 'Выберите дату',
  isOpen = false,
  date,
  onCancel,
  onConfirm,
}) => {
  const minimumDate = useMemo(() => {
    return new Date();
  }, [isOpen]);

  return (
    <DatePicker
      title={title}
      cancelText="Выйти"
      confirmText="Подтвердить"
      mode="date"
      modal
      open={isOpen}
      date={date}
      minimumDate={minimumDate}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
};
