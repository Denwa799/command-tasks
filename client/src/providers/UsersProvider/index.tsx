import React, {createContext, FC, useCallback, useMemo, useState} from 'react';
import {IUsersContext, IUsersProvider} from './types';
import {getAccessToken} from 'utils/getSession';
import {setUserNameSession} from 'utils/setSession';
import {ToastAndroid} from 'react-native';
import {GetService, PatchService, PostService} from 'api';
import {variables} from 'constants/variables';
import {IUser} from 'models/IUser';

export const UsersContext = createContext<IUsersContext>({} as IUsersContext);

export const UsersProvider: FC<IUsersProvider> = ({children}) => {
  const [foundUsers, setFoundUsers] = useState([] as IUser[]);
  const [passwordIsEquals, setPasswordIsEquals] = useState(false);

  const [findUsersIsLoading, setFindUsersIsLoading] = useState(false);
  const [updateUserIsLoading, setUpdateUserIsLoading] = useState(false);
  const [passwordEqualsIsLoading, setPasswordEqualsIsLoading] = useState(false);
  const [changePasswordIsLoading, setChangePasswordIsLoading] = useState(false);

  const usersPath = `${variables.API_URL}${variables.USERS}`;

  const updateUser = useCallback(async (id: number, name: string) => {
    setUpdateUserIsLoading(true);
    try {
      const tokenBearer = await getAccessToken();
      if (tokenBearer) {
        const response = await PatchService(`${usersPath}/${id}`, tokenBearer, {
          name,
        });
        await setUserNameSession(response.data?.name);
      } else {
        throw new Error('Ошибка сессии');
      }
    } catch (error) {
      ToastAndroid.show('Ошибка обновления пользователя', ToastAndroid.SHORT);
    } finally {
      setUpdateUserIsLoading(false);
    }
  }, []);

  const searchUsersByEmail = useCallback(async (email: string) => {
    setFindUsersIsLoading(true);
    try {
      const tokenBearer = await getAccessToken();
      if (tokenBearer) {
        const response = await GetService(`${usersPath}/email`, tokenBearer, {
          email,
          take: 5,
        });
        setFoundUsers(response.data?.users);
      } else {
        throw new Error('Ошибка сессии');
      }
    } catch (error) {
      ToastAndroid.show('Ошибка поиска пользователя', ToastAndroid.SHORT);
    } finally {
      setFindUsersIsLoading(false);
    }
  }, []);

  const checkPasswordEquals = useCallback(async (password: string) => {
    setPasswordEqualsIsLoading(true);
    try {
      const tokenBearer = await getAccessToken();
      if (tokenBearer) {
        const response = await PostService(
          `${usersPath}/check-password-equals`,
          tokenBearer,
          {
            password,
          },
        );
        setPasswordIsEquals(response.data);
      } else {
        throw new Error('Ошибка сессии');
      }
    } catch (error) {
      ToastAndroid.show('Ошибка проверки пароля', ToastAndroid.SHORT);
    } finally {
      setPasswordEqualsIsLoading(false);
    }
  }, []);

  const changePassword = useCallback(async (id: number, password: string) => {
    setChangePasswordIsLoading(true);
    try {
      console.log('id = ', id);
      console.log('password = ', password);
      console.log(`${usersPath}/change-password/${id}`);
      const tokenBearer = await getAccessToken();
      if (tokenBearer) {
        await PatchService(`${usersPath}/change-password/${id}`, tokenBearer, {
          password,
        });
        ToastAndroid.show('Пароль успешно сменен', ToastAndroid.SHORT);
      } else {
        throw new Error('Ошибка сессии');
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Ошибка смены пароля', ToastAndroid.SHORT);
    } finally {
      setChangePasswordIsLoading(false);
    }
  }, []);

  const cleanPasswordEquals = useCallback(() => {
    setPasswordIsEquals(false);
  }, []);

  const value = useMemo(
    () => ({
      foundUsers,
      passwordIsEquals,
      findUsersIsLoading,
      updateUserIsLoading,
      passwordEqualsIsLoading,
      changePasswordIsLoading,
      searchUsersByEmail,
      updateUser,
      checkPasswordEquals,
      cleanPasswordEquals,
      changePassword,
    }),
    [
      foundUsers,
      passwordIsEquals,
      findUsersIsLoading,
      updateUserIsLoading,
      passwordEqualsIsLoading,
      changePasswordIsLoading,
    ],
  );

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
