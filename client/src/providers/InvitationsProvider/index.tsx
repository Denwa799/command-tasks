import {
  DeleteService,
  GetService,
  PatchService,
  PostService,
  PutService,
} from 'api';
import {takeNumber, variables} from 'constants/variables';
import {IInvitations} from 'models/IInvitations';
import React, {createContext, FC, useCallback, useMemo, useState} from 'react';
import {ToastAndroid} from 'react-native';
import {getAccessToken} from 'utils/getSession';
import {IInvitationsContext, IInvitationsProvider} from './types';

export const InvitationsContext = createContext<IInvitationsContext>(
  {} as IInvitationsContext,
);

export const InvitationsProvider: FC<IInvitationsProvider> = ({children}) => {
  const [invitations, setInvitations] = useState<IInvitations[] | null>(null);
  const [loadedMoreInvitations, setLoadedMoreInvitations] = useState<
    IInvitations[]
  >([]);
  const [invitationsCount, setInvitationsCount] = useState(0);

  const [teamInvitations, setTeamInvitations] = useState<IInvitations[] | null>(
    null,
  );

  const [invitationsIsLoading, setInvitationsIsLoading] = useState(false);
  const [moreInvitationsIsLoading, setMoreInvitationsIsLoading] =
    useState(false);
  const [teamInvitationsIsLoading, setTeamInvitationsIsLoading] =
    useState(false);

  const [createInvitationIsLoading, setCreateInvitationIsLoading] =
    useState(false);

  const [deleteInvitationIsLoading, setDeleteInvitationIsLoading] =
    useState(false);

  const [updateInvitationIsLoading, setUpdateInvitationIsLoading] =
    useState(false);

  const [recreateInvitationIsLoading, setRecreateInvitationIsLoading] =
    useState(false);

  const [checkedInvitationsId, setCheckedInvitationsId] = useState<number[]>(
    [],
  );
  const [updateInvitationReadIsLoading, setUpdateInvitationReadIsLoading] =
    useState(false);

  const invitationsPath = `${variables.API_URL}${variables.INVITATIONS}`;

  const fetchInvitations = useCallback(
    async (skip: number = 0, take: number = takeNumber) => {
      setInvitationsIsLoading(true);
      try {
        const tokenBearer = await getAccessToken();
        if (tokenBearer) {
          const response = await GetService(`${invitationsPath}`, tokenBearer, {
            skip,
            take,
          });
          setInvitations(response.data?.invitations);
          setInvitationsCount(response.data?.count);
        } else {
          throw new Error('Ошибка сессии');
        }
      } catch (error) {
        ToastAndroid.show(
          'Ошибка загрузки списка приглашений',
          ToastAndroid.SHORT,
        );
      } finally {
        setInvitationsIsLoading(false);
      }
    },
    [],
  );

  const fetchMoreInvitations = useCallback(
    async (skip: number = 0, take: number = takeNumber) => {
      setMoreInvitationsIsLoading(true);
      try {
        const tokenBearer = await getAccessToken();
        if (tokenBearer) {
          const response = await GetService(`${invitationsPath}`, tokenBearer, {
            skip,
            take,
          });
          setLoadedMoreInvitations(response.data?.invitations);
          setInvitationsCount(response.data?.count);
        } else {
          throw new Error('Ошибка сессии');
        }
      } catch (error) {
        ToastAndroid.show(
          'Ошибка загрузки списка приглашений',
          ToastAndroid.SHORT,
        );
      } finally {
        setMoreInvitationsIsLoading(false);
      }
    },
    [],
  );

  const fetchTeamInvitations = useCallback(async (teamId: number) => {
    setTeamInvitationsIsLoading(true);
    try {
      const tokenBearer = await getAccessToken();
      if (tokenBearer) {
        const response = await GetService(
          `${invitationsPath}/team/${teamId}`,
          tokenBearer,
        );
        setTeamInvitations(response.data?.invitations);
      } else {
        throw new Error('Ошибка сессии');
      }
    } catch (error) {
      ToastAndroid.show('Ошибка загрузки уведомлений', ToastAndroid.SHORT);
    } finally {
      setTeamInvitationsIsLoading(false);
    }
  }, []);

  const cleanMoreInvitations = useCallback(() => {
    setLoadedMoreInvitations([]);
  }, []);

  const createInvitation = useCallback(
    async (message: string, teamId: number, userEmail: string) => {
      setCreateInvitationIsLoading(true);
      try {
        const tokenBearer = await getAccessToken();
        if (tokenBearer) {
          await PostService(`${invitationsPath}`, tokenBearer, {
            message,
            teamId,
            userEmail,
          });
        } else {
          throw new Error('Ошибка сессии');
        }
      } catch (error) {
      } finally {
        setCreateInvitationIsLoading(false);
      }
    },
    [],
  );

  const deleteInvitation = useCallback(async (id: number) => {
    setDeleteInvitationIsLoading(true);
    try {
      const tokenBearer = await getAccessToken();
      if (tokenBearer) {
        await DeleteService(`${invitationsPath}/${id}`, tokenBearer);
      } else {
        throw new Error('Ошибка сессии');
      }
    } catch (error) {
      ToastAndroid.show('Ошибка удаления приглашения', ToastAndroid.SHORT);
    } finally {
      setDeleteInvitationIsLoading(false);
    }
  }, []);

  const updateInvitation = useCallback(
    async (id: number, isAccepted: boolean) => {
      setUpdateInvitationIsLoading(true);
      try {
        const tokenBearer = await getAccessToken();
        if (tokenBearer) {
          await PatchService(`${invitationsPath}/${id}`, tokenBearer, {
            isAccepted,
          });
        } else {
          throw new Error('Ошибка сессии');
        }
      } catch (error) {
        ToastAndroid.show('Ошибка обновления приглашения', ToastAndroid.SHORT);
      } finally {
        setUpdateInvitationIsLoading(false);
      }
    },
    [],
  );

  const updateInvitationRead = useCallback(async (id: number[]) => {
    setUpdateInvitationReadIsLoading(true);
    try {
      const tokenBearer = await getAccessToken();
      if (tokenBearer) {
        await PatchService(`${invitationsPath}/read`, tokenBearer, {
          id,
        });
        setCheckedInvitationsId(prev => [...prev, ...id]);
      } else {
        throw new Error('Ошибка сессии');
      }
    } catch (error) {
    } finally {
      setUpdateInvitationReadIsLoading(false);
    }
  }, []);

  const recreateInvitation = useCallback(async (id: number) => {
    setRecreateInvitationIsLoading(true);
    try {
      const tokenBearer = await getAccessToken();
      if (tokenBearer) {
        await PutService(`${invitationsPath}/${id}`, tokenBearer);
      } else {
        throw new Error('Ошибка сессии');
      }
    } catch (error) {
      ToastAndroid.show('Ошибка отправки приглашения', ToastAndroid.SHORT);
    } finally {
      setRecreateInvitationIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      invitations,
      invitationsCount,
      loadedMoreInvitations,
      teamInvitations,
      checkedInvitationsId,
      invitationsIsLoading,
      moreInvitationsIsLoading,
      createInvitationIsLoading,
      teamInvitationsIsLoading,
      deleteInvitationIsLoading,
      updateInvitationIsLoading,
      updateInvitationReadIsLoading,
      recreateInvitationIsLoading,
      createInvitation,
      deleteInvitation,
      fetchInvitations,
      fetchMoreInvitations,
      fetchTeamInvitations,
      updateInvitation,
      updateInvitationRead,
      recreateInvitation,
      cleanMoreInvitations,
    }),
    [
      invitations,
      invitationsCount,
      loadedMoreInvitations,
      teamInvitations,
      checkedInvitationsId,
      invitationsIsLoading,
      moreInvitationsIsLoading,
      createInvitationIsLoading,
      teamInvitationsIsLoading,
      deleteInvitationIsLoading,
      updateInvitationIsLoading,
      updateInvitationReadIsLoading,
      recreateInvitationIsLoading,
    ],
  );

  return (
    <InvitationsContext.Provider value={value}>
      {children}
    </InvitationsContext.Provider>
  );
};
