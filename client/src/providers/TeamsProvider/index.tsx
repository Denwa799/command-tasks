import {DeleteService, GetService, PatchService, PostService} from 'api';
import {variables} from 'constants/variables';
import {ITeam} from 'models/ITasks';
import React, {createContext, FC, useCallback, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import {getAccessToken} from 'utils/getSession';
import {ITeamsContext, ITeamsProvider} from './types';

export const TeamsContext = createContext<ITeamsContext>({} as ITeamsContext);

export const TeamsProvider: FC<ITeamsProvider> = ({children}) => {
  const [teams, setTeams] = useState<ITeam[] | null>(null);
  const [team, setTeam] = useState<ITeam | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState(0);

  const [teamsIsLoading, setTeamsIsLoading] = useState(false);
  const [teamIsLoading, setTeamIsLoading] = useState(false);
  const [createTeamIsLoading, setCreateTeamIsLoading] = useState(false);
  const [deleteTeamIsLoading, setDeleteTeamIsLoading] = useState(false);
  const [updateTeamIsLoading, setUpdateTeamIsLoading] = useState(false);

  const teamsPath = `${variables.API_URL}${variables.TEAMS}`;

  const fetchTeams = useCallback(async () => {
    setTeamsIsLoading(true);
    try {
      const tokenBearer = await getAccessToken();
      if (tokenBearer) {
        const response = await GetService(`${teamsPath}`, tokenBearer);
        setTeams(response.data?.teams);
      } else {
        throw new Error('Ошибка сессии');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Ошибка загрузки списка команд');
    } finally {
      setTeamsIsLoading(false);
    }
  }, []);

  const fetchTeam = useCallback(async (id: number) => {
    setTeamIsLoading(true);
    try {
      const tokenBearer = await getAccessToken();
      if (tokenBearer) {
        const response = await GetService(`${teamsPath}/${id}`, tokenBearer);
        setTeam(response.data);
      } else {
        throw new Error('Ошибка сессии');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Ошибка загрузки команды');
    } finally {
      setTeamIsLoading(false);
    }
  }, []);

  const createTeam = useCallback(
    async (name: string, creator: number, users: string[]) => {
      setCreateTeamIsLoading(true);
      try {
        const tokenBearer = await getAccessToken();
        if (tokenBearer) {
          await PostService(`${teamsPath}`, tokenBearer, {
            name,
            creator,
            users,
          });
        } else {
          throw new Error('Ошибка сессии');
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Ошибка создания команды');
      } finally {
        setCreateTeamIsLoading(false);
      }
    },
    [],
  );

  const deleteTeam = useCallback(async (id: number) => {
    setDeleteTeamIsLoading(true);
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
      setDeleteTeamIsLoading(false);
    }
  }, []);

  const updateTeam = useCallback(async (id: number, name: string) => {
    setUpdateTeamIsLoading(true);
    try {
      const tokenBearer = await getAccessToken();
      if (tokenBearer) {
        await PatchService(`${teamsPath}/${id}`, tokenBearer, {
          name,
        });
      } else {
        throw new Error('Ошибка сессии');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Ошибка обновления команды');
    } finally {
      setUpdateTeamIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      teams,
      team,
      selectedTeamId,
      teamsIsLoading,
      teamIsLoading,
      createTeamIsLoading,
      deleteTeamIsLoading,
      updateTeamIsLoading,
      fetchTeams,
      fetchTeam,
      createTeam,
      deleteTeam,
      updateTeam,
      setSelectedTeamId,
    }),
    [
      teams,
      teamsIsLoading,
      team,
      selectedTeamId,
      teamIsLoading,
      createTeamIsLoading,
      deleteTeamIsLoading,
      updateTeamIsLoading,
    ],
  );

  return (
    <TeamsContext.Provider value={value}>{children}</TeamsContext.Provider>
  );
};
