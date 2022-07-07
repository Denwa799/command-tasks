import {LoginService} from 'api';
import {variables} from 'constants/variables';
import React, {createContext, FC, useCallback, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import {IAuthContext, IAuthProvider} from './types';

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const AuthProvider: FC<IAuthProvider> = ({children}) => {
  const [token, setToken] = useState('');
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const authPath = `${variables.API_URL}${variables.AUTH}`;

  const loginHandler = useCallback(async (email: string, password: string) => {
    try {
      const response = await LoginService(`${authPath}login`, email, password);
      setToken(response.data.token);
      setIsLoadingInitial(false);
    } catch (error: any) {
      Alert.alert('Ошибка авторизации');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      token,
      isLoading,
      login: loginHandler,
    }),
    [token, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
