import {AppField} from 'components/AppField';
import {AppLoader} from 'components/AppLoader';
import {THEME} from 'constants/theme';
import React, {FC} from 'react';
import {Text, TouchableNativeFeedback, View} from 'react-native';
import {styles} from './styles';
import {IAppAutocomplete} from './types';

export const AppAutocomplete: FC<IAppAutocomplete> = ({
  onChange,
  onPress,
  placeholder = '',
  data,
  value,
  isDisplay,
  isLoading,
}) => {
  return (
    <>
      <AppField
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={isDisplay && styles.input}
      />

      {isDisplay && (
        <View style={styles.list}>
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
    </>
  );
};
