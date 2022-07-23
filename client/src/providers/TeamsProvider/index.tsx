import {DeleteService, GetService, PostService} from 'api';
import {variables} from 'constants/variables';
import {ITeam} from 'models/ITasks';
import React, {createContext, FC, useCallback, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import {getAccessToken} from 'utils/getAccessToken';
import {ITeamsContext, ITeamsProvider} from './types';

export const TeamsContext = createContext<ITeamsContext>({} as ITeamsContext);

export const TeamsProvider: FC<ITeamsProvider> = ({children}) => {
  const [teams, setTeams] = useState<ITeam[] | null>(null);
  const [teamsIsLoading, setTeamsIsLoading] = useState(false);
  const [createIsLoading, setCreateIsLoading] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  const teamsPath = `${variables.API_URL}${variables.TEAMS}`;

  const fetchTeams = useCallback(async () => {
    setTeamsIsLoading(true);
    try {
      const tokenBearer = await getAccessToken();
      if (tokenBearer) {
        const response = await GetService(`${teamsPath}`, tokenBearer);
        setTeams(response.data);
      } else {
        throw new Error('Ошибка сессии');
      }
    } catch (error) {
      Alert.alert('Ошибка загрузки списка команд');
    } finally {
      setTeamsIsLoading(false);
    }
  }, []);

  const createTeam = useCallback(async (name: string) => {
    setCreateIsLoading(true);
    try {
      const tokenBearer = await getAccessToken();
      if (tokenBearer) {
        await PostService(`${teamsPath}`, tokenBearer, {
          name: name,
        });
      } else {
        throw new Error('Ошибка сессии');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Ошибка создания команды');
    } finally {
      setCreateIsLoading(false);
    }
  }, []);

  const deleteTeam = useCallback(async (id: number) => {
    setDeleteIsLoading(true);
    try {
      const tokenBearer = await getAccessToken();
      if (tokenBearer) {
        await DeleteService(`${teamsPath}/${id}`, tokenBearer);
      } else {
        throw new Error('Ошибка сессии');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Ошибка удаления команды');
    } finally {
      setDeleteIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      teams,
      teamsIsLoading,
      createIsLoading,
      deleteIsLoading,
      fetchTeams,
      createTeam,
      deleteTeam,
    }),
    [teams, teamsIsLoading, createIsLoading, deleteIsLoading],
  );

  return (
    <TeamsContext.Provider value={value}>{children}</TeamsContext.Provider>
  );
};
