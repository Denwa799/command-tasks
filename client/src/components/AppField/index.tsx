import {THEME} from 'constants/theme';
import React, {FC} from 'react';
import {TextInput, Text} from 'react-native';
import {styles} from './styles';
import {IAppField} from './types';

export const AppField: FC<IAppField> = ({
  onChange,
  value,
  placeholder,
  isSecure,
  isDanger,
  dangerText = 'Пустое поле',
  style,
}) => {
  return (
    <>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChange}
        value={value}
        secureTextEntry={isSecure}
        autoCapitalize="none"
        style={[styles.input, isDanger && styles.dangerInput, style]}
        placeholderTextColor={THEME.SECOND_TEXT_COLOR}
      />
      {isDanger && <Text style={styles.dangerText}>{dangerText}</Text>}
    </>
  );
};
