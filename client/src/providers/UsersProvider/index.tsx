import React, {createContext, FC, useCallback, useMemo, useState} from 'react';
import {IUsersContext, IUsersProvider} from './types';
import {getAccessToken} from 'utils/getSession';
import {setUserNameSession} from 'utils/setSession';
import {ToastAndroid} from 'react-native';
import {GetService, PatchService} from 'api';
import {variables} from 'constants/variables';
import {IUser} from 'models/IUser';

export const UsersContext = createContext<IUsersContext>({} as IUsersContext);

export const UsersProvider: FC<IUsersProvider> = ({children}) => {
  const [foundUsers, setFoundUsers] = useState([] as IUser[]);
  const [findUsersIsLoading, setFindUsersIsLoading] = useState(false);
  const [updateUserIsLoading, setUpdateUserIsLoading] = useState(false);

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

  const value = useMemo(
    () => ({
      foundUsers,
      findUsersIsLoading,
      updateUserIsLoading,
      searchUsersByEmail,
      updateUser,
    }),
    [foundUsers, findUsersIsLoading, updateUserIsLoading],
  );

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
