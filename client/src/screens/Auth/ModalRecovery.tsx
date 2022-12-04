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
import {useAuth} from 'hooks/useAuth';
import {ToastAndroid} from 'react-native';

export const ModalRecovery: FC<IModal> = ({
  userEmail,
  isOpen,
  isReg,
  setIsOpen,
  setIsReg,
}) => {
  const {
    checkEmailIsLoading,
    passwordRecoveryIsLoading,
    passwordRecovery,
    checkEmail,
  } = useUsers();
  const {emailActivationIsLoading, emailActivation} = useAuth();

  const [data, setData] = useState<IRecoveryData>({} as IRecoveryData);
  const {email, code} = data;

  const [emailErrorText, setEmailErrorText] = useState(
    'Слишком короткий email',
  );
  const [codeErrorText, setCodeErrorText] = useState('Слишком короткий код');
  const [isEmailError, setIsEmailError] = useState(false);
  const [isCodeError, setIsCodeError] = useState(false);

  const [codeTimerSeconds, setCodeTimerSeconds] = useState(0);

  const sendCodeIsDisabled = checkEmailIsLoading || codeTimerSeconds > 0;

  const isDisabled =
    isEmailError ||
    isCodeError ||
    !email ||
    !code ||
    checkEmailIsLoading ||
    (isReg && emailActivationIsLoading) ||
    (!isReg && passwordRecoveryIsLoading);

  useEffect(() => {
    if (!codeTimerSeconds) {
      return;
    }
    const timer = setTimeout(() => setCodeTimerSeconds(prev => prev - 1), 1000);

    return () => clearTimeout(timer);
  }, [codeTimerSeconds]);

  useEffect(() => {
    if (userEmail) {
      setData({...data, email: userEmail});
    }
  }, []);

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
    setCodeTimerSeconds(60);
    await checkEmail(email.toLocaleLowerCase());
  };

  const onClose = () => setIsOpen(false);

  const onDone = async () => {
    if (!emailValidationReg.test(email)) {
      setEmailErrorText('Некорректный email');
      return setIsEmailError(true);
    }
    if (code.length > 6) {
      setCodeErrorText('Не может быть длинее 6 символов');
      return setIsCodeError(true);
    }
    if (!Number.isInteger(Number(code))) {
      setCodeErrorText('Должно быть числом');
      return setIsCodeError(true);
    }
    if (isReg) {
      const response = await emailActivation(email, Number(code));
      if (response) {
        ToastAndroid.show('Email подтвержден', ToastAndroid.SHORT);
        setIsReg(false);
        setIsOpen(false);
      }
    } else {
      const response = await passwordRecovery(email, Number(code));
      if (response) {
        ToastAndroid.show(
          'Новый пароль отправлен на email',
          ToastAndroid.SHORT,
        );
        setIsOpen(false);
      }
    }
  };

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
        text={
          codeTimerSeconds > 0
            ? `Повторная отправка через ${codeTimerSeconds} секунд`
            : 'Отправить код'
        }
        style={styles.modalItems}
        isBorderRadius
        isCenter
        isMainColor
        disabled={sendCodeIsDisabled}
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
