import {GetService, PatchService} from 'api';
import {variables} from 'constants/variables';
import {IInvitations} from 'models/IInvitations';
import React, {createContext, FC, useCallback, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import {getAccessToken} from 'utils/getSession';
import {IInvitationsContext, IInvitationsProvider} from './types';

export const InvitationsContext = createContext<IInvitationsContext>(
  {} as IInvitationsContext,
);

export const InvitationsProvider: FC<IInvitationsProvider> = ({children}) => {
  const [invitations, setInvitations] = useState<IInvitations[] | null>(null);
  const [invitationsIsLoading, setInvitationsIsLoading] = useState(false);

  const [updateInvitationIsLoading, setUpdateInvitationIsLoading] =
    useState(false);

  const invitationsPath = `${variables.API_URL}${variables.INVITATIONS}`;

  const fetchInvitations = useCallback(async () => {
    setInvitationsIsLoading(true);
    try {
      const tokenBearer = await getAccessToken();
      if (tokenBearer) {
        const response = await GetService(`${invitationsPath}`, tokenBearer);
        setInvitations(response.data);
      } else {
        throw new Error('Ошибка сессии');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Ошибка загрузки списка приглашений');
    } finally {
      setInvitationsIsLoading(false);
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
        console.log(error);
        Alert.alert('Ошибка обновления приглашения');
      } finally {
        setUpdateInvitationIsLoading(false);
      }
    },
    [],
  );

  const value = useMemo(
    () => ({
      invitations,
      invitationsIsLoading,
      updateInvitationIsLoading,
      fetchInvitations,
      updateInvitation,
    }),
    [invitations, invitationsIsLoading, updateInvitationIsLoading],
  );

  return (
    <InvitationsContext.Provider value={value}>
      {children}
    </InvitationsContext.Provider>
  );
};