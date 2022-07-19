import {LoginService, RefreshService, RegistrationService} from 'api';
import {variables} from 'constants/variables';
import React, {
  createContext,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Alert} from 'react-native';
import {IAuthContext, IAuthProvider, IUser} from './types';
import EncryptedStorage from 'react-native-encrypted-storage';
import {AppPositionContainer} from 'components/AppPositionContainer';
import {AppLoader} from 'components/AppLoader';

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: FC<IAuthProvider> = ({children}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isCheck, setIsCheck] = useState(false);
  const [isAuthLoad, setIsAuthLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstRefresh, setIsFirstRefresh] = useState(true);

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
        console.log('Установка пользователя в стейт', error);
        setIsAuthLoad(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [isCheck, isFirstRefresh]);

  const registerHandler = useCallback(
    async (email: string, password: string, name: string = 'Нет имени') => {
      setIsLoading(true);
      try {
        const response = await RegistrationService(
          `${authPath}registration`,
          email,
          password,
          name,
        );
        await EncryptedStorage.setItem(
          'user_session',
          JSON.stringify({
            email: response.data.email,
            name: response.data.name,
            access_token: response.data.tokens.access_token,
            refresh_token: response.data.tokens.refresh_token,
          }),
        );
      } catch (error) {
        Alert.alert('Ошибка регистрации');
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const loginHandler = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await LoginService(`${authPath}login`, email, password);
      await EncryptedStorage.setItem(
        'user_session',
        JSON.stringify({
          email: response.data.email,
          name: response.data.name,
          access_token: response.data.tokens.access_token,
          refresh_token: response.data.tokens.refresh_token,
        }),
      );
      setIsCheck(prev => !prev);
    } catch (error) {
      Alert.alert('Ошибка авторизации');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logoutHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      await EncryptedStorage.removeItem('user_session');
      setIsCheck(prev => !prev);
    } catch (error) {
      Alert.alert('Ошибка выхода');
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
        console.log('session', userSession);
        await EncryptedStorage.setItem(
          'user_session',
          JSON.stringify({
            email: response.data.email,
            name: response.data.name,
            access_token: response.data.tokens.access_token,
            refresh_token: response.data.tokens.refresh_token,
          }),
        );
        setIsFirstRefresh(false);
        setIsCheck(prev => !prev);
      }
    } catch (error) {
      console.log('Ошибка обновления токена', error);
    } finally {
      setIsFirstRefresh(false);
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
      login: loginHandler,
      register: registerHandler,
      logout: logoutHandler,
    }),
    [user, isLoading],
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
