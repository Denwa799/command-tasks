import React, {createContext, FC, useCallback, useMemo, useState} from 'react';
import {IUsersContext, IUsersProvider} from './types';
import {getAccessToken} from 'utils/getSession';
import {setUserNameSession} from 'utils/setSession';
import {Alert} from 'react-native';
import {PatchService} from 'api';
import {variables} from 'constants/variables';

export const UsersContext = createContext<IUsersContext>({} as IUsersContext);

export const UsersProvider: FC<IUsersProvider> = ({children}) => {
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
      console.log(error);
      Alert.alert('Ошибка обновления пользователя');
    } finally {
      setUpdateUserIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      updateUserIsLoading,
      updateUser,
    }),
    [updateUserIsLoading],
  );

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};
