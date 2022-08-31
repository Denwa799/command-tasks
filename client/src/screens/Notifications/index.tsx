import {AppLoader} from 'components/AppLoader';
import {AppMessageCard} from 'components/Cards/AppMessageCard';
import {AppPositionContainer} from 'components/AppPositionContainer';
import {AppTitle} from 'components/AppTitle';
import {useInvitations} from 'hooks/useInvitations';
import {useTeams} from 'hooks/useTeams';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, FlatList, View} from 'react-native';
import {Dialog} from './Dialog';
import {styles} from './styles';

export const NotificationsScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [notificationId, setNotificationId] = useState(0);

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

  const dialogOpen = useCallback((id: number) => {
    setNotificationId(id);
    setDialogIsOpen(true);
  }, []);

  const onAccept = useCallback(async () => {
    await updateInvitation(notificationId, true);
    setDialogIsOpen(false);
    fetchInvitations();
    fetchTeams();
  }, [notificationId]);

  return (
    <View style={styles.notifications}>
      {invitationsIsLoading || isRefreshing ? (
        <AppPositionContainer isCenter>
          <AppLoader />
        </AppPositionContainer>
      ) : (
        <>
          <FlatList
            data={invitations}
            style={styles.list}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            renderItem={({item}) => (
              <AppMessageCard
                id={item.id}
                message={item.message}
                isAccepted={item.isAccepted}
                onPress={dialogOpen}
              />
            )}
          />
          {(!invitations || invitations.length === 0) && (
            <AppTitle level="2" style={styles.messageCenter}>
              Уведомлений нет
            </AppTitle>
          )}
          <Dialog
            isOpen={dialogIsOpen}
            setIsOpen={setDialogIsOpen}
            onAccept={onAccept}
            disabled={updateInvitationIsLoading}
          />
        </>
      )}
    </View>
  );
};
