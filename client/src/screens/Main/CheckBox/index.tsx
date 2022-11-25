import {AppCheckBoxBtn} from 'components/Btns/AppCheckBoxBtn';
import React, {FC, useCallback} from 'react';
import {styles} from './styles';
import {ICheckBox} from './types';

export const CheckBox: FC<ICheckBox> = ({text, value, setStatus}) => {
  const isUrgentlyHandler = useCallback(() => {
    setStatus(prev => !prev);
  }, [value]);

  return (
    <AppCheckBoxBtn
      value={value}
      text={text}
      styles={styles.checkbox}
      onPress={isUrgentlyHandler}
    />
  );
};
