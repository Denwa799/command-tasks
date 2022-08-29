import {AppList} from 'components/AppList';
import {AppLoader} from 'components/AppLoader';
import {AppPositionContainer} from 'components/AppPositionContainer';
import {AppTitle} from 'components/AppTitle';
import {useInvitations} from 'hooks/useInvitations';
import {useTeams} from 'hooks/useTeams';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, View} from 'react-native';
import {styles} from './styles';

export const NotificationsScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const {
    fetchInvitations,
    updateInvitation,
    invitations,
    invitationsIsLoading,
    updateInvitationIsLoading,
  } = useInvitations();

  const {fetchTeams} = useTeams();

  useEffect(() => {
    setIsRefreshing(true);
    try {
      fetchInvitations();
    } catch {
      Alert.alert('Ошибка обновления');
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const onRefresh = useCallback(() => {
    fetchInvitations();
  }, []);

  const onAccept = useCallback(async (id: number) => {
    await updateInvitation(id, true);
    fetchInvitations();
    fetchTeams();
  }, []);

  return (
    <View style={styles.notifications}>
      {invitationsIsLoading || isRefreshing ? (
        <AppPositionContainer isCenter>
          <AppLoader />
        </AppPositionContainer>
      ) : (
        <>
          <AppList
            data={invitations}
            style={styles.list}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            type="appMessageCard"
            onPressMessageBtn={onAccept}
            disabledMessagePressBtn={updateInvitationIsLoading}
          />
          {(!invitations || invitations.length === 0) && (
            <AppTitle level="2" style={styles.messageCenter}>
              Уведомлений нет
            </AppTitle>
          )}
        </>
      )}
    </View>
  );
};
