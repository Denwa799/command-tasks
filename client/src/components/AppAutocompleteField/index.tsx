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
  const preparedData = data.map(item => {
    return {
      id: `${Math.random()}${item}`,
      text: item,
    };
  });

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
              {preparedData.map(item => (
                <AppNativeFeedbackBtn
                  key={item.id}
                  onPress={() => onPress(item.text)}
                  text={item.text}
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
