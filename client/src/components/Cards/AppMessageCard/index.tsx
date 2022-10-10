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
  onSecondPress,
  disabled,
}) => {
  const buttonHandler = useCallback(() => {
    if (onPress) {
      onPress(id);
    }
  }, []);

  const secondButtonHandler = useCallback(() => {
    if (onSecondPress) {
      onSecondPress(id);
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
              onPress={buttonHandler}
              style={styles.btn}
              isCenter
              isMainColor
              disabled={disabled}
            />
            <AppNativeFeedbackBtn
              text={secondBtnText}
              onPress={secondButtonHandler}
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
