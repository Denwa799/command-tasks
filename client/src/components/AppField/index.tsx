import {THEME} from 'constants/theme';
import React, {FC} from 'react';
import {TextInput, Text} from 'react-native';
import {styles} from './styles';
import {IAppField} from './types';

export const AppField: FC<IAppField> = ({
  value,
  placeholder,
  successText = 'Успех',
  warningText = 'Проверка',
  dangerText = 'Пустое поле',
  isSecure,
  isSuccess,
  isWarning,
  isDanger,
  style,
  onChange,
}) => {
  return (
    <>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChange}
        value={value}
        secureTextEntry={isSecure}
        autoCapitalize="none"
        style={[
          styles.input,
          isSuccess && styles.successInput,
          isWarning && styles.warningInput,
          isDanger && styles.dangerInput,
          style,
        ]}
        placeholderTextColor={THEME.SECOND_TEXT_COLOR}
      />
      {isSuccess && !isWarning && !isDanger && (
        <Text style={[styles.text, styles.successText]}>{successText}</Text>
      )}
      {isWarning && !isDanger && (
        <Text style={[styles.text, styles.warningText]}>{warningText}</Text>
      )}
      {isDanger && (
        <Text style={[styles.text, styles.dangerText]}>{dangerText}</Text>
      )}
    </>
  );
};
