import {GetService, PostService} from 'api';
import {variables} from 'constants/variables';
import {ITeam} from 'models/ITasks';
import React, {createContext, FC, useCallback, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import {ITeamsContext, ITeamsProvider} from './types';

export const TeamsContext = createContext<ITeamsContext>({} as ITeamsContext);

export const TeamsProvider: FC<ITeamsProvider> = ({children}) => {
  const [teams, setTeams] = useState<ITeam[] | null>(null);
  const [teamsIsLoading, setTeamsIsLoading] = useState(false);
  const [createIsLoading, setCreateIsLoading] = useState(false);

  const teamsPath = `${variables.API_URL}${variables.TEAMS}`;

  const fetchTeams = useCallback(async () => {
    setTeamsIsLoading(true);
    try {
      const session = await EncryptedStorage.getItem('user_session');
      if (session) {
        const parseSession = JSON.parse(session);
        const tokenBearer = parseSession.access_token;
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
      const session = await EncryptedStorage.getItem('user_session');
      if (session) {
        const parseSession = JSON.parse(session);
        const tokenBearer = parseSession.access_token;
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

  const value = useMemo(
    () => ({
      teams,
      teamsIsLoading,
      createIsLoading,
      fetchTeams,
      createTeam,
    }),
    [teams, teamsIsLoading, createIsLoading],
  );

  return (
    <TeamsContext.Provider value={value}>{children}</TeamsContext.Provider>
  );
};
