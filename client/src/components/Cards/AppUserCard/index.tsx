import {AppText} from 'components/AppText';
import {AppTextButton} from 'components/Btns/AppTextButton';
import {AppContainer} from 'layouts/AppContainer';
import React, {FC, useCallback} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import {IAppUserCard} from './types';

export const AppUserCard: FC<IAppUserCard> = ({
  id,
  name,
  email,
  btnText,
  onPress,
  isActive = true,
  isBtnVisible = false,
  isCreator = false,
  style,
}) => {
  const btnHandler = useCallback(() => {
    onPress(id);
  }, [id]);

  return (
    <View style={[styles.card, style]}>
      <AppContainer style={styles.container}>
        <View style={styles.textContainer}>
          <AppText style={styles.email}>{email}</AppText>
          <AppText style={styles.name}>{name}</AppText>
          {!isActive && <AppText>Приглашение отправлено</AppText>}
        </View>
        {!isActive && isBtnVisible && (
          <AppTextButton
            onPress={btnHandler}
            isTextCenter
            style={styles.sendBtn}>
            Отправить{'\n'}повторно
          </AppTextButton>
        )}
        {isBtnVisible && !isCreator && (
          <AppTextButton onPress={btnHandler}>{btnText}</AppTextButton>
        )}
      </AppContainer>
    </View>
  );
};
