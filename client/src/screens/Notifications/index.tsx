import {AppLoader} from 'components/AppLoader';
import {AppMessageCard} from 'components/Cards/AppMessageCard';
import {AppPositionContainer} from 'components/AppPositionContainer';
import {AppTitle} from 'components/AppTitle';
import {useInvitations} from 'hooks/useInvitations';
import {useTeams} from 'hooks/useTeams';
import React, {useCallback, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Dialog} from './Dialog';
import {styles} from './styles';

export const NotificationsScreen = () => {
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
      {invitationsIsLoading ? (
        <AppPositionContainer isCenter>
          <AppLoader />
        </AppPositionContainer>
      ) : (
        <>
          <FlatList
            data={invitations}
            style={styles.list}
            refreshing={invitationsIsLoading}
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
