import React, {FC, useCallback, useEffect, useState} from 'react';
import {AppModal} from 'components/AppModal';
import {AppField} from 'components/AppField';
import {IModal, IRecoveryData} from './types';
import {AppText} from 'components/AppText';
import {AppNativeFeedbackBtn} from 'components/Btns/AppNativeFeedbackBtn';
import {styles} from './styles';
import {AppTitle} from 'components/AppTitle';
import {AppPositionContainer} from 'components/AppPositionContainer';
import {useUsers} from 'hooks/useUsers';
import {emailValidationReg} from 'utils/regularExpressions';

export const ModalRecovery: FC<IModal> = ({isOpen, isReg, setIsOpen}) => {
  const {checkEmailIsLoading, checkEmail} = useUsers();

  const [data, setData] = useState<IRecoveryData>({} as IRecoveryData);
  const {email, code} = data;

  const [emailErrorText, setEmailErrorText] = useState(
    'Слишком короткий email',
  );
  const [codeErrorText, setCodeErrorText] = useState('Слишком короткий код');
  const [isEmailError, setIsEmailError] = useState(false);
  const [isCodeError, setIsCodeError] = useState(false);

  const isDisabled = isEmailError || isCodeError || !email || !code;

  const emailHandler = useCallback(
    (value: string) => {
      setData({...data, email: value});
      setIsEmailError(false);
    },
    [data],
  );

  const codeHandler = useCallback(
    (value: string) => {
      setData({...data, code: value});
      setIsCodeError(false);
    },
    [data],
  );

  const sendCode = async () => {
    if (!emailValidationReg.test(email)) {
      setEmailErrorText('Некорректный email');
      return setIsEmailError(true);
    }
    await checkEmail(email);
  };

  const onClose = () => setIsOpen(false);

  const onDone = () => setIsOpen(false);

  return (
    <AppModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <AppPositionContainer isHorizontalCenter>
        <AppTitle level="2">
          {isReg ? 'Подтвердить email' : 'Сбросить пароль'}
        </AppTitle>
      </AppPositionContainer>
      <AppText>1) Введите email</AppText>
      <AppText>2) Нажмите кнопку "отправить код"</AppText>
      <AppText>3) Введите полученный на email код</AppText>
      <AppText>4) После ввода email и кода, нажмите кнопку "готово"</AppText>
      <AppField
        value={email}
        style={styles.modalItems}
        placeholder={'Введите email'}
        keyboardType={'email-address'}
        dangerText={emailErrorText}
        isDanger={isEmailError}
        onChange={emailHandler}
      />
      <AppNativeFeedbackBtn
        text={'Отправить код'}
        style={styles.modalItems}
        isBorderRadius
        isCenter
        isMainColor
        onPress={sendCode}
      />
      <AppField
        value={code}
        style={styles.modalItems}
        placeholder={'Введите код подтверждения'}
        keyboardType={'number-pad'}
        dangerText={codeErrorText}
        isDanger={isCodeError}
        onChange={codeHandler}
      />
      <AppModal.Actions>
        <AppModal.Button title="Закрыть" onPress={onClose} />
        <AppModal.Button
          title="Готово"
          onPress={onDone}
          disabled={isDisabled}
        />
      </AppModal.Actions>
    </AppModal>
  );
};
