import {AppField} from 'components/AppField';
import {AppLoader} from 'components/AppLoader';
import {AppNativeFeedbackBtn} from 'components/Btns/AppNativeFeedbackBtn';
import React, {FC} from 'react';
import {Text, View} from 'react-native';
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
                <AppNativeFeedbackBtn
                  key={`${Math.random()}${item}`}
                  onPress={() => onPress(item)}
                  text={item}
                  isBorderRadius
                  style={styles.item}
                />
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
};
