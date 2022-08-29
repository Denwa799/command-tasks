import React, {FC, useCallback, useState} from 'react';
import {AppField} from 'components/AppField';
import {AppLoader} from 'components/AppLoader';
import {useAuth} from 'hooks/useAuth';
import {Pressable, Text, View} from 'react-native';
import {styles} from './styles';
import {IAuthData} from './types';
import {AppButton} from 'components/Btns/AppButton';

export const AuthScreen: FC = () => {
  const {isLoading, login, register} = useAuth();
  const [data, setData] = useState<IAuthData>({} as IAuthData);
  const [isReg, setIsReg] = useState(false);
  const {email, password, name} = data;

  const [isEmailError, setIsEmailError] = useState(false);
  const [isNameError, setIsNameError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

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

  const onReg = useCallback(() => {
    setIsReg(prev => !prev);
  }, []);

  const authHandler = useCallback(async () => {
    if (!email || email.length < 8) {
      return setIsEmailError(true);
    }
    if (!name && isReg) {
      return setIsNameError(true);
    }
    if (!password || password.length < 5) {
      return setIsPasswordError(true);
    }

    if (isReg) {
      await register(email, password, name);
    }
    await login(email, password);

    setData({} as IAuthData);
  }, [email, name, isReg, password]);

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
                placeholder={'Введите почту'}
                onChange={emailHandler}
                isDanger={isEmailError}
                dangerText="Слишком короткий email"
              />
              {isReg && (
                <AppField
                  value={data.name}
                  placeholder={'Введите ФИО'}
                  onChange={nameHandler}
                  isDanger={isNameError}
                  dangerText="ФИО слишком короткий"
                />
              )}
              <AppField
                value={data.password}
                placeholder={'Введите пароль'}
                onChange={passwordHandler}
                isSecure={true}
                isDanger={isPasswordError}
                dangerText="Пароль меньше 5 символов"
              />
              <AppButton
                onPress={authHandler}
                title={isReg ? 'Зарегистрироваться' : 'Авторизоваться'}
              />
              <Pressable onPress={onReg} style={styles.regBtn}>
                <Text style={styles.text}>
                  {isReg ? 'Авторизация' : 'Регистрация'}
                </Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </View>
  );
};
