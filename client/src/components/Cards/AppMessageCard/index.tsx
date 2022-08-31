import {AppNativeFeedbackBtn} from 'components/Btns/AppNativeFeedbackBtn';
import {AppContainer} from 'layouts/AppContainer';
import React, {FC, useCallback} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {IAppMessageCard} from './type';

export const AppMessageCard: FC<IAppMessageCard> = ({
  id,
  message,
  isAccepted,
  btnText = 'Принять',
  secondBtnText = 'Скрыть',
  onPress,
  disabled,
}) => {
  const btnHandler = useCallback(() => {
    if (onPress) {
      onPress(id);
    }
  }, []);

  return (
    <View style={styles.card}>
      <AppContainer>
        <Text style={styles.text}>{message}</Text>
        {!isAccepted && (
          <View style={styles.btnsContainer}>
            <AppNativeFeedbackBtn
              text={btnText}
              onPress={btnHandler}
              style={styles.btn}
              isCenter
              isMainColor
              disabled={disabled}
            />
            <AppNativeFeedbackBtn
              text={secondBtnText}
              onPress={btnHandler}
              style={styles.btn}
              isCenter
              isMainColor
              disabled={disabled}
            />
          </View>
        )}
      </AppContainer>
    </View>
  );
};