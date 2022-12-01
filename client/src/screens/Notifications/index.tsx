import {AppLoader} from 'components/AppLoader';
import {AppMessageCard} from 'components/Cards/AppMessageCard';
import {AppPositionContainer} from 'components/AppPositionContainer';
import {AppTitle} from 'components/AppTitle';
import {useInvitations} from 'hooks/useInvitations';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Dialog} from './Dialog';
import {styles} from './styles';
import {OnViewableItemsChangedType} from './types';
import {takeNumber} from 'constants/variables';
import {IInvitations} from 'models/IInvitations';
import {useTeams} from 'hooks/useTeams';

export const NotificationsScreen = () => {
  const {
    invitations,
    loadedMoreInvitations,
    invitationsCount,
    deleteInvitationIsLoading,
    invitationsIsLoading,
    moreInvitationsIsLoading,
    updateInvitationIsLoading,
    updateInvitationReadIsLoading,
    fetchInvitations,
    fetchMoreInvitations,
    cleanMoreInvitations,
    updateInvitation,
    updateInvitationRead,
    deleteInvitation,
  } = useInvitations();

  const {fetchTeams, onTeamsIsCanUpdate} = useTeams();

  const [fetchSkip, setFetchSkip] = useState(takeNumber);
  const [dataInvitations, setDataInvitations] = useState<IInvitations[]>([]);

  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [notificationId, setNotificationId] = useState(0);
  const [newInvitationsId, setNewInvitationsId] = useState<number[]>([]);
  const [isDelete, setIsDelete] = useState(false);

  const data = useMemo(() => {
    return dataInvitations;
  }, [dataInvitations]);

  useEffect(() => {
    invitations && setDataInvitations(invitations);
  }, [invitations]);

  useEffect(() => {
    if (loadedMoreInvitations.length > 0) {
      setDataInvitations(prev => [...prev, ...loadedMoreInvitations]);
      cleanMoreInvitations();
    }
  }, [loadedMoreInvitations]);

  useEffect(() => {
    !updateInvitationReadIsLoading && updateInvitationRead(newInvitationsId);
  }, [newInvitationsId]);

  const onRefresh = () => {
    fetchInvitations();
    setFetchSkip(takeNumber);
  };

  const onAcceptDialogOpen = (id: number) => {
    setNotificationId(id);
    setIsDelete(false);
    setDialogIsOpen(true);
  };

  const onDeleteDialogOpen = (id: number) => {
    setNotificationId(id);
    setIsDelete(true);
    setDialogIsOpen(true);
  };

  const onViewableItemsChanged = useCallback<OnViewableItemsChangedType>(
    info => {
      const filteredInvitations = info.changed.filter(
        element => element.item.isRead === false,
      );
      const newInvitations = [];
      for (const item of filteredInvitations) {
        newInvitations.push(item.item.id);
      }
      setNewInvitationsId(newInvitations);
    },
    [],
  );

  const onLoadMore = useCallback(async () => {
    if (invitations && invitations.length > 1 && fetchSkip < invitationsCount) {
      setFetchSkip(prev => (prev = prev + takeNumber));
      await fetchMoreInvitations(fetchSkip, takeNumber);
    }
  }, [invitations, fetchSkip, invitationsCount, takeNumber]);

  const onAccept = useCallback(async () => {
    if (isDelete) {
      await deleteInvitation(notificationId);
    } else {
      await updateInvitation(notificationId, true);
    }

    setDialogIsOpen(false);
    fetchInvitations();
    await fetchTeams();
    onTeamsIsCanUpdate(true);
  }, [notificationId, isDelete]);

  return (
    <View style={styles.notifications}>
      {invitationsIsLoading ? (
        <AppPositionContainer isCenter>
          <AppLoader />
        </AppPositionContainer>
      ) : (
        <>
          <FlatList
            onEndReached={onLoadMore}
            onEndReachedThreshold={0.1}
            refreshing={invitationsIsLoading || moreInvitationsIsLoading}
            data={data}
            style={styles.list}
            onRefresh={onRefresh}
            onViewableItemsChanged={onViewableItemsChanged}
            renderItem={({item}) => (
              <AppMessageCard
                key={item.id}
                id={item.id}
                message={item.message}
                secondBtnText={'Удалить'}
                isAccepted={item.isAccepted}
                onPress={onAcceptDialogOpen}
                onSecondPress={onDeleteDialogOpen}
              />
            )}
          />
          {(!invitations || invitations.length === 0) && (
            <AppTitle level="2" style={styles.messageCenter}>
              Уведомлений нет
            </AppTitle>
          )}
          {dialogIsOpen && (
            <Dialog
              isOpen={dialogIsOpen}
              disabled={updateInvitationIsLoading || deleteInvitationIsLoading}
              isDelete={isDelete}
              setIsOpen={setDialogIsOpen}
              onAccept={onAccept}
            />
          )}
        </>
      )}
    </View>
  );
};
