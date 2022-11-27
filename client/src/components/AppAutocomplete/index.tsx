import {AppAutocompleteField} from 'components/AppAutocompleteField';
import {AppIconButton} from 'components/Btns/AppIconButton';
import {THEME} from 'constants/theme';
import React, {FC} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {IAppAutocomplete} from './types';

export const AppAutocomplete: FC<IAppAutocomplete> = ({
  value,
  placeholder,
  dangerText,
  data,
  isDisplay,
  isLoading,
  isDanger,
  onAdd,
  onChange,
  onPress,
}) => {
  return (
    <View style={styles.autocompleteContainer}>
      <AppAutocompleteField
        placeholder={placeholder}
        value={value}
        dangerText={dangerText}
        data={data}
        isDisplay={isDisplay}
        isLoading={isLoading}
        isDanger={isDanger}
        style={styles.autocomplete}
        onChange={onChange}
        onPress={onPress}
      />
      <View style={styles.addBtnContainer}>
        <AppIconButton
          size={25}
          colors={[THEME.BACK_SECOND, THEME.BACK_90_COLOR]}
          style={styles.addBtn}
          textStyle={styles.addBtnText}
          onPress={onAdd}
        />
      </View>
    </View>
  );
};
