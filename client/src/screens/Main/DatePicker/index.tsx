import {AppDatePicker} from 'components/AppDatePicker';
import {AppText} from 'components/AppText';
import {AppTextButton} from 'components/Btns/AppTextButton';
import React, {FC, useCallback} from 'react';
import {styles} from './styles';
import {IDatePicker} from './types';

export const DatePicker: FC<IDatePicker> = ({
  selectedDate,
  isPickerOpen,
  date,
  setIsPickerOpen,
  setDate,
}) => {
  const onConfirm = useCallback(
    (newDate: Date) => {
      setIsPickerOpen(false);
      setDate(newDate);
    },
    [isPickerOpen],
  );

  const onCancel = useCallback(() => {
    setIsPickerOpen(false);
  }, [isPickerOpen]);

  const onOpen = useCallback(() => {
    setIsPickerOpen(true);
  }, [isPickerOpen]);

  return (
    <>
      <AppText style={styles.date}>{selectedDate}</AppText>
      <AppTextButton onPress={onOpen}>Выбрать дату</AppTextButton>
      <AppDatePicker
        date={date}
        isOpen={isPickerOpen}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    </>
  );
};
