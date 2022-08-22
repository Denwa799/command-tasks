import {AppField} from 'components/AppField';
import {AppLoader} from 'components/AppLoader';
import {THEME} from 'constants/theme';
import React, {FC} from 'react';
import {Text, TouchableNativeFeedback, View} from 'react-native';
import {styles} from './styles';
import {IAppAutocompleteField} from './types';

export const AppAutocompleteField: FC<IAppAutocompleteField> = ({
  onChange,
  onPress,
  placeholder = '',
  data,
  value,
  isDisplay,
  isLoading,
  style,
  isDanger,
  dangerText = 'Пустое поле',
}) => {
  return (
    <View style={style}>
      <AppField
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={[
          isDisplay && !isDanger && styles.input,
          isDanger && styles.dangerInput,
        ]}
      />
      {isDanger && <Text style={styles.dangerText}>{dangerText}</Text>}

      {isDisplay && (
        <View style={[styles.list, isDanger && styles.dangerList]}>
          {isLoading ? (
            <AppLoader />
          ) : (
            <View>
              {data.map(item => (
                <View key={`${Math.random()}${item}`} style={styles.item}>
                  <TouchableNativeFeedback
                    onPress={() => onPress(item)}
                    background={TouchableNativeFeedback.Ripple(
                      THEME.MAIN_COLOR,
                      true,
                    )}>
                    <View>
                      <Text style={styles.text}>{item}</Text>
                    </View>
                  </TouchableNativeFeedback>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
};
