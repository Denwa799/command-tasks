import {DeleteService, GetService, PatchService, PostService} from 'api';
import {takeNumber, variables} from 'constants/variables';
import {ITeam} from 'models/ITasks';
import React, {createContext, FC, useCallback, useMemo, useState} from 'react';
import {ToastAndroid} from 'react-native';
import {getAccessToken} from 'utils/getSession';
import {ITeamsContext, ITeamsProvider} from './types';

export const TeamsContext = createContext<ITeamsContext>({} as ITeamsContext);

export const TeamsProvider: FC<ITeamsProvider> = ({children}) => {
  const [teams, setTeams] = useState<ITeam[] | null>(null);
  const [loadedMoreTeams, setLoadedMoreTeams] = useState<ITeam[]>([]);
  const [teamsCount, setTeamsCount] = useState(0);

  const [team, setTeam] = useState<ITeam | null>(null);
  const [selectedTeamId, setSelectedTeamId] = useState(0);

  const [teamsIsCanUpdate, setTeamsIsCanUpdate] = useState(false);

  const [teamsIsLoading, setTeamsIsLoading] = useState(false);
  const [moreTeamsIsLoading, setMoreTeamsIsLoading] = useState(false);
  const [teamIsLoading, setTeamIsLoading] = useState(false);
  const [createTeamIsLoading, setCreateTeamIsLoading] = useState(false);
  const [deleteTeamIsLoading, setDeleteTeamIsLoading] = useState(false);
  const [deleteUserInTeamIsLoading, setDeleteUserInTeamIsLoading] =
    useState(false);
  const [updateTeamIsLoading, setUpdateTeamIsLoading] = useState(false);
  const [addUserInTeamIsLoading, setAddUserInTeamIsLoading] = useState(false);

  const teamsPath = `${variables.API_URL}${variables.TEAMS}`;

  const fetchTeams = useCallback(
    async (skip: number = 0, take: number = takeNumber) => {
      setTeamsIsLoading(true);
      try {
        const tokenBearer = await getAccessToken();
        if (tokenBearer) {
          const response = await GetService(`${teamsPath}`, tokenBearer, {
            skip,
            take,
          });
          setTeams(response.data?.teams);
          setTeamsCount(response.data?.count);
        } else {
          throw new Error('Ошибка сессии');
        }
      } catch (error) {
        ToastAndroid.show('Ошибка загрузки списка команд', ToastAndroid.SHORT);
      } finally {
        setTeamsIsLoading(false);
      }
    },
    [],
  );

  const fetchMoreTeams = useCallback(
    async (skip: number = 0, take: number = takeNumber) => {
      setMoreTeamsIsLoading(true);
      try {
        const tokenBearer = await getAccessToken();
        if (tokenBearer) {
          const response = await GetService(`${teamsPath}`, tokenBearer, {
            skip,
            take,
          });
          setLoadedMoreTeams(response.data?.teams);
          setTeamsCount(response.data?.count);
        } else {
          throw new Error('Ошибка сессии');
        }
      } catch (error) {
        ToastAndroid.show('Ошибка загрузки списка команд', ToastAndroid.SHORT);
      } finally {
        setMoreTeamsIsLoading(false);
      }
    },
    [],
  );

  const cleanTeams = useCallback(() => {
    setTeams([]);
  }, []);

  const cleanMoreTeams = useCallback(() => {
    setLoadedMoreTeams([]);
  }, []);

  const onTeamsIsCanUpdate = useCallback((value: boolean) => {
    setTeamsIsCanUpdate(value);
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
      ToastAndroid.show('Ошибка загрузки команды', ToastAndroid.SHORT);
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
        ToastAndroid.show('Ошибка создания команды', ToastAndroid.SHORT);
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
      ToastAndroid.show('Ошибка удаления команды', ToastAndroid.SHORT);
    } finally {
      setDeleteTeamIsLoading(false);
    }
  }, []);

  const deleteUserInTeam = useCallback(
    async (userId: number, teamId: number) => {
      setDeleteUserInTeamIsLoading(true);
      try {
        const tokenBearer = await getAccessToken();
        if (tokenBearer) {
          await DeleteService(
            `${teamsPath}/${teamId}/users/${userId}`,
            tokenBearer,
          );
        } else {
          throw new Error('Ошибка сессии');
        }
      } catch (error) {
        ToastAndroid.show('Ошибка удаления пользователя', ToastAndroid.SHORT);
      } finally {
        setDeleteUserInTeamIsLoading(false);
      }
    },
    [],
  );

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
      ToastAndroid.show('Ошибка обновления команды', ToastAndroid.SHORT);
    } finally {
      setUpdateTeamIsLoading(false);
    }
  }, []);

  const addUserInTeam = useCallback(async (userId: number, teamId: number) => {
    setAddUserInTeamIsLoading(true);
    try {
      const tokenBearer = await getAccessToken();
      if (tokenBearer) {
        await PatchService(
          `${teamsPath}/${teamId}/user/${userId}`,
          tokenBearer,
          {},
        );
      } else {
        throw new Error('Ошибка сессии');
      }
    } catch (error) {
      ToastAndroid.show('Ошибка добавления пользователя', ToastAndroid.SHORT);
    } finally {
      setAddUserInTeamIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      teams,
      teamsCount,
      loadedMoreTeams,
      team,
      selectedTeamId,
      teamsIsCanUpdate,
      teamsIsLoading,
      moreTeamsIsLoading,
      teamIsLoading,
      createTeamIsLoading,
      deleteTeamIsLoading,
      updateTeamIsLoading,
      addUserInTeamIsLoading,
      deleteUserInTeamIsLoading,
      fetchTeams,
      fetchMoreTeams,
      cleanTeams,
      cleanMoreTeams,
      fetchTeam,
      createTeam,
      deleteTeam,
      updateTeam,
      setSelectedTeamId,
      deleteUserInTeam,
      addUserInTeam,
      onTeamsIsCanUpdate,
    }),
    [
      teams,
      teamsCount,
      loadedMoreTeams,
      teamsIsLoading,
      moreTeamsIsLoading,
      teamsIsCanUpdate,
      team,
      selectedTeamId,
      teamIsLoading,
      createTeamIsLoading,
      deleteTeamIsLoading,
      updateTeamIsLoading,
      addUserInTeamIsLoading,
      deleteUserInTeamIsLoading,
    ],
  );

  return (
    <TeamsContext.Provider value={value}>{children}</TeamsContext.Provider>
  );
};
