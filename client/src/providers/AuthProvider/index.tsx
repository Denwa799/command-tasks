import {LoginService, RegistrationService} from 'api';
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
  const [user, setUser] = useState<IUser | null>({} as IUser);
  const [isCheck, setIsCheck] = useState(false);
  const [isAuthLoad, setIsAuthLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const authPath = `${variables.API_URL}${variables.AUTH}`;

  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true);
      try {
        const session = await EncryptedStorage.getItem('user_session');
        if (session) {
          setUser(JSON.parse(session));
        } else {
          setUser(null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsAuthLoad(false);
        setIsLoading(false);
      }
    };

    checkSession();
  }, [isCheck]);

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
            token: response.data.token,
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
          token: response.data.token,
        }),
      );
      setIsCheck(isCheck => !isCheck);
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
      setIsCheck(isCheck => !isCheck);
    } catch (error) {
      Alert.alert('Ошибка выхода');
    } finally {
      setIsLoading(false);
    }
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
      {isAuthLoad && (
        <AppPositionContainer isCenter>
          <AppLoader />
        </AppPositionContainer>
      )}
      {!isAuthLoad && children}
    </AuthContext.Provider>
  );
};
