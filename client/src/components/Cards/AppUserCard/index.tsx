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
  isActive = true,
  isBtnVisible = false,
  isCreator = false,
  isInvitation = false,
  isDisabled = false,
  style,
  onPress,
  onButtonTextPress,
}) => {
  const onPressHandler = useCallback(() => {
    onPress(id, email);
  }, [id, email]);

  const onButtonTextPressHandler = useCallback(() => {
    onButtonTextPress(id);
  }, [id]);

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
            onPress={onPressHandler}
            isTextCenter
            style={styles.sendBtn}
            isDisabled={isDisabled}>
            Отправить{'\n'}повторно
          </AppTextButton>
        )}
        {isBtnVisible && !isCreator && (
          <AppTextButton onPress={onButtonTextPressHandler}>
            {btnText}
          </AppTextButton>
        )}
      </AppContainer>
    </View>
  );
};
