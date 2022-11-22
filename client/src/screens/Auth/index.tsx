import React, {FC, useCallback, useState} from 'react';
import {AppField} from 'components/AppField';
import {AppLoader} from 'components/AppLoader';
import {useAuth} from 'hooks/useAuth';
import {Pressable, Text, View} from 'react-native';
import {styles} from './styles';
import {IAuthData} from './types';
import {AppButton} from 'components/Btns/AppButton';
import {emailValidationReg} from 'utils/regularExpressions';
import {AppTextButton} from 'components/Btns/AppTextButton';

export const AuthScreen: FC = () => {
  const {isLoading, login, register} = useAuth();
  const [data, setData] = useState<IAuthData>({} as IAuthData);
  const [isReg, setIsReg] = useState(false);
  const {email, password, name} = data;
  const [secondPassword, setSecondPassword] = useState('');

  const [isEmailError, setIsEmailError] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isSecondPasswordError, setIsSecondPasswordError] = useState(false);
  const [emailErrorText, setEmailErrorText] = useState(
    'Слишком короткий email',
  );
  const [passwordErrorText, setPasswordErrorText] = useState(
    'Пароль меньше 5 символов',
  );
  const [secondPasswordErrorText, setSecondPasswordErrorText] = useState(
    'Пароль меньше 5 символов',
  );

  const emailHandler = useCallback(
    (value: string) => {
      setData({...data, email: value});
      setIsEmailError(false);
    },
    [data],
  );

  const nameHandler = useCallback(
    (value: string) => {
      setData({...data, name: value});
      setIsNameError(false);
    },
    [data],
  );

  const passwordHandler = useCallback(
    (value: string) => {
      setData({...data, password: value});
      setIsPasswordError(false);
    },
    [data],
  );

  const secondPasswordHandler = useCallback(
    (value: string) => {
      setSecondPassword(value);
      setIsSecondPasswordError(false);
    },
    [secondPassword],
  );

  const onReg = useCallback(() => {
    setIsReg(prev => !prev);
  }, []);

  const authHandler = useCallback(async () => {
    if (!email || email.length < 8) {
      setEmailErrorText('Слишком короткий email');
      return setIsEmailError(true);
    }
    if (!emailValidationReg.test(email)) {
      setEmailErrorText('Некорректный email');
      return setIsEmailError(true);
    }
    if (!password || password.length < 5) {
      setPasswordErrorText('Пароль меньше 5 символов');
      return setIsPasswordError(true);
    }

    if (isReg && (!secondPassword || secondPassword.length < 5)) {
      setSecondPasswordErrorText('Пароль меньше 5 символов');
      return setIsSecondPasswordError(true);
    }

    if (!name && isReg) {
      return setIsNameError(true);
    }

    if (isReg) {
      if (password !== secondPassword) {
        setSecondPasswordErrorText('Пароли не совпадают');
        return setIsSecondPasswordError(true);
      }
      await register(email.toLocaleLowerCase(), password, name);
    }
    await login(email.toLocaleLowerCase(), password);

    setData({} as IAuthData);
  }, [email, name, isReg, password, secondPassword]);

  return (
    <View style={styles.auth}>
      <View style={styles.block}>
        <View style={styles.container}>
          <Text style={styles.title}>
            {isReg ? 'Регистрация' : 'Авторизация'}
          </Text>
          {isLoading ? (
            <AppLoader />
          ) : (
            <>
              <AppField
                value={data.email}
                placeholder={'Введите email'}
                onChange={emailHandler}
                isDanger={isEmailError}
                dangerText={emailErrorText}
              />
              <AppField
                value={data.password}
                placeholder={'Введите пароль'}
                onChange={passwordHandler}
                isSecure={true}
                isDanger={isPasswordError}
                dangerText={passwordErrorText}
              />
              {isReg && (
                <>
                  <AppField
                    value={secondPassword}
                    placeholder={'Повторите пароль'}
                    onChange={secondPasswordHandler}
                    isSecure={true}
                    isDanger={isSecondPasswordError}
                    dangerText={secondPasswordErrorText}
                  />
                  <AppField
                    value={data.name}
                    placeholder={'Введите ФИО'}
                    onChange={nameHandler}
                    isDanger={isNameError}
                    dangerText="ФИО слишком короткий"
                  />
                </>
              )}
              <AppButton
                onPress={authHandler}
                title={isReg ? 'Зарегистрироваться' : 'Авторизоваться'}
              />
              <View style={styles.row}>
                <AppTextButton onPress={onReg} style={styles.text}>
                  Сбросить пароль
                </AppTextButton>
                <AppTextButton onPress={onReg} style={styles.text}>
                  {isReg ? 'Авторизация' : 'Регистрация'}
                </AppTextButton>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};
