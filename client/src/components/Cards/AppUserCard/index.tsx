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
  isInvitation = false,
  isDisabled = false,
  style,
}) => {
  const btnHandler = useCallback(() => {
    onPress(id, email);
  }, [id, email]);

  return (
    <View style={[styles.card, style]}>
      <AppContainer style={styles.container}>
        <View style={styles.textContainer}>
          <AppText style={styles.email}>{email}</AppText>
          <AppText style={styles.name}>{name}</AppText>
          {!isActive && isInvitation && (
            <AppText>Приглашение отправлено</AppText>
          )}
          {!isActive && !isInvitation && (
            <AppText>Приглашение отклонено</AppText>
          )}
        </View>
        {!isActive && isBtnVisible && (
          <AppTextButton
            onPress={btnHandler}
            isTextCenter
            style={styles.sendBtn}
            isDisabled={isDisabled}>
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
