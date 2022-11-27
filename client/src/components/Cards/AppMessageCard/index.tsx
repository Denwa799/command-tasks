import {AppNativeFeedbackBtn} from 'components/Btns/AppNativeFeedbackBtn';
import {AppContainer} from 'layouts/AppContainer';
import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {IAppMessageCard} from './type';

export const AppMessageCard: FC<IAppMessageCard> = ({
  id,
  message,
  btnText = 'Принять',
  secondBtnText = 'Скрыть',
  isAccepted,
  disabled,
  onPress,
  onSecondPress,
}) => {
  const buttonHandler = () => {
    if (onPress) {
      onPress(id);
    }
  };

  const secondButtonHandler = () => {
    if (onSecondPress) {
      onSecondPress(id);
    }
  };

  return (
    <View style={styles.card}>
      <AppContainer>
        <Text style={styles.text}>{message}</Text>
        {!isAccepted && (
          <View style={styles.btnsContainer}>
            <AppNativeFeedbackBtn
              text={btnText}
              isCenter
              isMainColor
              disabled={disabled}
              style={styles.btn}
              onPress={buttonHandler}
            />
            <AppNativeFeedbackBtn
              text={secondBtnText}
              isCenter
              isMainColor
              disabled={disabled}
              style={styles.btn}
              onPress={secondButtonHandler}
            />
          </View>
        )}
      </AppContainer>
    </View>
  );
};
