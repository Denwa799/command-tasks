import {AppField} from 'components/AppField';
import {AppModal} from 'components/AppModal';
import {useDebounce} from 'hooks/useDebounce';
import {useUsers} from 'hooks/useUsers';
import React, {FC, useEffect, useState} from 'react';
import {getUserId} from 'utils/getSession';
import {IModalChangePassword} from './types';

export const ModalChangePassword: FC<IModalChangePassword> = ({
  isOpen,
  setIsOpen,
}) => {
  const {
    passwordIsEquals,
    passwordEqualsIsLoading,
    changePasswordIsLoading,
    checkPasswordEquals,
    cleanPasswordEquals,
    changePassword,
  } = useUsers();

  const [passwordValue, setPasswordValue] = useState('');
  const [passwordRepeatValue, setPasswordRepeatValue] = useState('');
  const [oldPasswordValue, setOldPasswordValue] = useState('');
  const debouncedOldPasswordValue = useDebounce<string>(oldPasswordValue, 500);

  const [dangerPasswordText, setDangerPasswordText] = useState('Пустое поле');
  const [dangerPasswordRepeatText, setDangerPasswordRepeatText] =
    useState('Пустое поле');
  const [dangerOldPasswordText, setDangerOldPasswordText] =
    useState('Пустое поле');

  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isPasswordRepeatError, setIsPasswordRepeatError] = useState(false);
  const [isOldPasswordError, setIsOldPasswordError] = useState(false);
  const [isWarningOldPasswordError, setIsWarningOldPasswordError] =
    useState(false);
  const [isSuccessOldPassword, setIsSuccessOldPassword] = useState(false);

  const buttonIsDisabled =
    passwordEqualsIsLoading ||
    !passwordIsEquals ||
    isPasswordError ||
    passwordValue.length < 5 ||
    passwordRepeatValue.length < 5 ||
    changePasswordIsLoading;

  useEffect(() => {
    return () => {
      cleanPasswordEquals();
    };
  }, []);

  useEffect(() => {
    if (
      debouncedOldPasswordValue.length >= 5 &&
      debouncedOldPasswordValue.length <= 20
    ) {
      checkPasswordEquals(debouncedOldPasswordValue);
    }
  }, [debouncedOldPasswordValue]);

  useEffect(() => {
    if (
      !passwordIsEquals &&
      !passwordEqualsIsLoading &&
      oldPasswordValue.length > 0
    ) {
      setIsWarningOldPasswordError(false);
      setIsSuccessOldPassword(false);
      setIsOldPasswordError(true);
      if (oldPasswordValue.length > 20) {
        setDangerOldPasswordText('Больше 20 символов');
      } else if (oldPasswordValue.length < 5) {
        setDangerOldPasswordText('Меньше 5 символов');
      } else {
        setDangerOldPasswordText('Пароль не совпадает');
      }
    }

    if (passwordEqualsIsLoading) {
      setIsOldPasswordError(false);
      setIsWarningOldPasswordError(true);
      setIsSuccessOldPassword(false);
    }

    if (passwordIsEquals) {
      setIsWarningOldPasswordError(false);
      setIsOldPasswordError(false);
      setIsSuccessOldPassword(true);
    }
  }, [passwordIsEquals, oldPasswordValue, passwordEqualsIsLoading]);

  const passwordHandler = (value: string) => {
    setPasswordValue(value);
    setIsPasswordError(false);
  };

  const passwordRepeatHandler = (value: string) => {
    setPasswordRepeatValue(value);
    setIsPasswordRepeatError(false);
  };

  const oldPasswordHandler = (value: string) => {
    setOldPasswordValue(value);
    cleanPasswordEquals();
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const onSave = async () => {
    if (oldPasswordValue.length < 5 || oldPasswordValue.length > 20) {
      if (oldPasswordValue.length < 5) {
        setDangerOldPasswordText('Меньше 5 символов');
      }
      if (oldPasswordValue.length > 20) {
        setDangerOldPasswordText('Больше 20 символов');
      }
      return setIsOldPasswordError(true);
    }

    if (passwordValue.length < 5 || passwordValue.length > 20) {
      if (passwordValue.length < 5) {
        setDangerPasswordText('Меньше 5 символов');
      }
      if (passwordValue.length > 20) {
        setDangerPasswordText('Больше 20 символов');
      }
      return setIsPasswordError(true);
    }

    if (passwordValue === oldPasswordValue) {
      setDangerPasswordText('Пароль должен отличаться от старого');
      return setIsPasswordError(true);
    }

    if (passwordValue !== passwordRepeatValue) {
      setDangerPasswordRepeatText('Пароль должен совпадать');
      return setIsPasswordRepeatError(true);
    }

    const userId = await getUserId();
    await changePassword(userId, passwordValue);
    return setIsOpen(false);
  };

  return (
    <AppModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <AppField
        value={oldPasswordValue}
        placeholder={'Введите старый пароль'}
        dangerText={dangerOldPasswordText}
        warningText={'Проверка пароля'}
        successText={'Пароль совпадает'}
        isSuccess={isSuccessOldPassword}
        isWarning={isWarningOldPasswordError}
        isDanger={isOldPasswordError}
        isSecure
        onChange={oldPasswordHandler}
      />
      <AppField
        value={passwordValue}
        placeholder={'Введите новый пароль'}
        dangerText={dangerPasswordText}
        isDanger={isPasswordError}
        isSecure
        onChange={passwordHandler}
      />
      <AppField
        value={passwordRepeatValue}
        placeholder={'Повторите новый пароль'}
        dangerText={dangerPasswordRepeatText}
        isDanger={isPasswordRepeatError}
        isSecure
        onChange={passwordRepeatHandler}
      />
      <AppModal.Actions>
        <AppModal.Button title="Закрыть" onPress={onClose} />
        <AppModal.Button
          title="Сохранить"
          onPress={onSave}
          disabled={buttonIsDisabled}
        />
      </AppModal.Actions>
    </AppModal>
  );
};
