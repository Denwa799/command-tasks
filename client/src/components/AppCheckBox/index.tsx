import CheckBox from '@react-native-community/checkbox';
import {THEME} from 'constants/theme';
import React, {FC} from 'react';
import {IAppCheckBox} from './types';

export const AppCheckBox: FC<IAppCheckBox> = ({value, onValueChange}) => {
  return (
    <CheckBox
      value={value}
      onValueChange={onValueChange}
      tintColors={{true: THEME.MAIN_COLOR, false: THEME.SECOND_TEXT_COLOR}}
    />
  );
};
