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
  keyboardType = 'default',
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
        autoCapitalize="none"
        value={value}
        keyboardType={keyboardType}
        placeholderTextColor={THEME.SECOND_TEXT_COLOR}
        secureTextEntry={isSecure}
        style={[
          styles.input,
          isSuccess && styles.successInput,
          isWarning && styles.warningInput,
          isDanger && styles.dangerInput,
          style,
        ]}
        onChangeText={onChange}
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
