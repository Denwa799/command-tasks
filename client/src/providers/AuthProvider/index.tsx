import {
  LoginService,
  PostService,
  RefreshService,
  RegistrationService,
} from 'api';
import {variables} from 'constants/variables';
import React, {
  createContext,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Alert, ToastAndroid} from 'react-native';
import {IAuthContext, IAuthProvider} from './types';
import EncryptedStorage from 'react-native-encrypted-storage';
import {AppPositionContainer} from 'components/AppPositionContainer';
import {AppLoader} from 'components/AppLoader';
import {IUser} from 'models/IUser';
import {useTeams} from 'hooks/useTeams';
import axios from 'axios';

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: FC<IAuthProvider> = ({children}) => {
  const {cleanTeams} = useTeams();

  const [user, setUser] = useState<IUser | null>(null);
  const [isCheck, setIsCheck] = useState(false);
  const [isAuthLoad, setIsAuthLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstRefresh, setIsFirstRefresh] = useState(true);
  const [emailActivationIsLoading, setEmailActivationIsLoading] =
    useState(false);

  const authPath = `${variables.API_URL}${variables.AUTH}`;

  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true);
      try {
        if (!isFirstRefresh) {
          const session = await EncryptedStorage.getItem('user_session');
          if (session) {
            setUser(JSON.parse(session));
          } else {
            setUser(null);
          }
          setIsAuthLoad(false);
        }
      } catch (error) {
        setIsAuthLoad(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [isCheck, isFirstRefresh]);

  const register = useCallback(
    async (email: string, password: string, name: string = 'Нет имени') => {
      setIsLoading(true);
      try {
        const response = await RegistrationService(
          `${authPath}registration`,
          email,
          password,
          name,
        );
        return response.data.email;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 405) {
            ToastAndroid.show(
              'Пользователь с таким email уже существует',
              ToastAndroid.SHORT,
            );
          } else {
            ToastAndroid.show('Ошибка регистрации', ToastAndroid.SHORT);
          }
        } else {
          ToastAndroid.show('Ошибка регистрации', ToastAndroid.SHORT);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await LoginService(`${authPath}login`, email, password);
      await EncryptedStorage.setItem(
        'user_session',
        JSON.stringify({
          id: response.data.id,
          email: response.data.email,
          name: response.data.name,
          access_token: response.data.tokens.access_token,
          refresh_token: response.data.tokens.refresh_token,
        }),
      );
      setIsCheck(prev => !prev);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          ToastAndroid.show('Email не подтвержден', ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(
            'Неправильный email или пароль',
            ToastAndroid.SHORT,
          );
        }
      } else {
        ToastAndroid.show('Ошибка авторизации', ToastAndroid.SHORT);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await EncryptedStorage.removeItem('user_session');
      setIsCheck(prev => !prev);
      cleanTeams();
    } catch (error) {
      ToastAndroid.show('Ошибка во время выхода', ToastAndroid.SHORT);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshHandler = useCallback(async () => {
    try {
      const session = await EncryptedStorage.getItem('user_session');
      if (session) {
        const userSession = await JSON.parse(session);
        const response = await RefreshService(
          `${authPath}refresh`,
          userSession?.refresh_token,
        );
        await EncryptedStorage.setItem(
          'user_session',
          JSON.stringify({
            id: response.data.id,
            email: response.data.email,
            name: response.data.name,
            access_token: response.data.tokens.access_token,
            refresh_token: response.data.tokens.refresh_token,
          }),
        );
        setIsFirstRefresh(false);
        setIsCheck(prev => !prev);
      }
    } catch (error: any) {
      if (error.response.data.statusCode === (400 || 401)) {
        logout();
        Alert.alert('Авторизуйтесь заново');
      }
    } finally {
      setIsFirstRefresh(false);
    }
  }, []);

  const emailActivation = useCallback(async (email: string, code: number) => {
    setEmailActivationIsLoading(true);
    try {
      const response = await PostService(`${authPath}activation`, '', {
        email,
        code,
      });
      return response.data;
    } catch (error) {
      ToastAndroid.show('Ошибка активации аккаунта', ToastAndroid.SHORT);
    } finally {
      setEmailActivationIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const fourteenMinutes = 840000;
    refreshHandler();
    setInterval(() => refreshHandler(), fourteenMinutes);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      emailActivationIsLoading,
      login,
      register,
      logout,
      emailActivation,
    }),
    [user, isLoading, emailActivationIsLoading],
  );

  return (
    <AuthContext.Provider value={value}>
      {isAuthLoad || isFirstRefresh ? (
        <AppPositionContainer isCenter>
          <AppLoader />
        </AppPositionContainer>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
