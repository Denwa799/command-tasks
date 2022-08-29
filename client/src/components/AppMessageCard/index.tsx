import {AppTextButton} from 'components/AppTextButton';
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
}) => {
  const btnHandler = useCallback(() => {
    console.log('Нажатие на кнопку');
  }, []);

  return (
    <View style={styles.card}>
      <AppContainer>
        <Text style={styles.text}>{message}</Text>
        {!isAccepted && (
          <View style={styles.btnsContainer}>
            <AppTextButton
              text={btnText}
              onPress={onPress ? onPress : btnHandler}
              containerStyle={styles.btn}
            />
            <AppTextButton
              text={secondBtnText}
              onPress={onPress ? onPress : btnHandler}
              containerStyle={styles.btn}
            />
          </View>
        )}
      </AppContainer>
    </View>
  );
};
