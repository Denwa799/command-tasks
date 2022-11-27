import {AppText} from 'components/AppText';
import React, {FC} from 'react';
import {TouchableOpacity} from 'react-native';
import {AppCheckBox} from '../AppCheckBox';
import {IAppCheckBoxBtn} from './types';

export const AppCheckBoxBtn: FC<IAppCheckBoxBtn> = ({
  text,
  value,
  styles,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles} activeOpacity={1} onPress={onPress}>
      <AppCheckBox value={value} onValueChange={onPress} />
      <AppText>{text}</AppText>
    </TouchableOpacity>
  );
};
