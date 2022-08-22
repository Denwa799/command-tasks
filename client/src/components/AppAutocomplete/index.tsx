import {AppAutocompleteField} from 'components/AppAutocompleteField';
import {AppIconButton} from 'components/AppIconButton';
import {THEME} from 'constants/theme';
import React, {FC} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {IAppAutocomplete} from './types';

export const AppAutocomplete: FC<IAppAutocomplete> = ({
  value,
  data,
  onChange,
  onPress,
  isDisplay,
  isLoading,
  onAdd,
  placeholder,
  isDanger,
  dangerText,
}) => {
  return (
    <View style={styles.autocompleteContainer}>
      <AppAutocompleteField
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        data={data}
        onPress={onPress}
        isDisplay={isDisplay}
        isLoading={isLoading}
        style={styles.autocomplete}
        isDanger={isDanger}
        dangerText={dangerText}
      />
      <View style={styles.addBtnContainer}>
        <AppIconButton
          onPress={onAdd}
          style={styles.addBtn}
          size={25}
          colors={[THEME.BACK_SECOND, THEME.BACK_90_COLOR]}
          textStyle={styles.addBtnText}
        />
      </View>
    </View>
  );
};
