import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppLoader} from 'components/AppLoader';
import {AppPositionContainer} from 'components/AppPositionContainer';
import {AppTitle} from 'components/AppTitle';
import {AppButton} from 'components/Btns/AppButton';
import {AppIconButton} from 'components/Btns/AppIconButton';
import {AppUserCard} from 'components/Cards/AppUserCard';
import {teamsRoute} from 'constants/variables';
import {useAuth} from 'hooks/useAuth';
import {useInvitations} from 'hooks/useInvitations';
import {useTeams} from 'hooks/useTeams';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import {Dialog} from './Dialog';
import {ModalCreate} from './ModalCreate';
import {styles} from './styles';
import {UsersScreenNavigateType} from './types';

export const UsersScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<UsersScreenNavigateType>>();

  const {
    team,
    teamIsLoading,
    selectedTeamId,
    deleteUserInTeamIsLoading,
    fetchTeam,
    fetchTeams,
    deleteUserInTeam,
    onTeamsIsCanUpdate,
  } = useTeams();
  const {user} = useAuth();
  const {
    teamInvitations,
    teamInvitationsIsLoading,
    fetchTeamInvitations,
    createInvitation,
    recreateInvitation,
  } = useInvitations();

  const [teamId, setTeamId] = useState(team?.id);
  const [teamName, setTeamName] = useState(team?.name);
  const [teamCreator, setTeamCreator] = useState(team?.creator.email);
  const [activatedUsers, setActivatedUsers] = useState<Number[]>([]);
  const [creatorId, setCreatorId] = useState(0);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [userId, setUserId] = useState(0);

  const [disabledButtonsId, setDisabledButtonsId] = useState<number[]>([]);

  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [dialogQuitIsOpen, setDialogQuitIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  let data = useMemo(() => {
    let users;
    if (team?.users && teamInvitations) {
      const newUsers = team.users.map(item => {
        const invitation = teamInvitations.find(
          obj => obj?.user?.id === item.id,
        );
        return {
          ...item,
          isInvitation: !!invitation,
        };
      });
      users = [...newUsers];
    }
    return users;
  }, [team, teamInvitations]);

  const listStyles = [
    styles.list,
    user?.id === creatorId ? styles.heightPercent95 : styles.heightPercent92,
  ];

  useEffect(() => {
    fetchTeam(selectedTeamId);
    fetchTeamInvitations(selectedTeamId);
  }, [selectedTeamId]);

  useEffect(() => {
    if (team) {
      setTeamId(team?.id);
      setTeamName(team?.name);
      setTeamCreator(team?.creator.email);
      setActivatedUsers(team.activatedUsers);
      setCreatorId(team.creator.id);
    }
  }, [team]);

  const onRefresh = useCallback(async () => {
    if (teamId) {
      setIsRefreshing(true);
      await fetchTeam(teamId);
      await fetchTeamInvitations(teamId);
      setIsRefreshing(false);
    }
  }, []);

  const onResendInvitation = useCallback(
    async (id: number, email: string) => {
      setDisabledButtonsId(prev => [...prev, id]);
      const invitation = teamInvitations?.find(item => item?.user?.id === id);
      if (invitation) {
        await recreateInvitation(invitation.id);
      } else {
        if (teamId) {
          await createInvitation(
            `Приглашение в команду ${teamName} от ${teamCreator}`,
            teamId,
            email,
          );
        }
      }
      const buttonIndex = disabledButtonsId.indexOf(id);
      const newDisabledButtons = disabledButtonsId.splice(buttonIndex, 1);
      fetchTeam(selectedTeamId);
      setDisabledButtonsId(newDisabledButtons);
      fetchTeamInvitations(selectedTeamId);
    },
    [teamInvitations, disabledButtonsId],
  );

  const onDialogOpen = (id: number) => {
    setUserId(id);
    setDialogIsOpen(true);
  };

  const onModalOpen = () => {
    setModalIsOpen(true);
  };

  const onDelete = useCallback(async () => {
    if (userId && teamId) {
      await deleteUserInTeam(userId, teamId);
      setDialogIsOpen(false);
      fetchTeam(selectedTeamId);
      fetchTeamInvitations(selectedTeamId);
    }
  }, [userId, teamId]);

  const onQuitDialogOpen = () => {
    setDialogQuitIsOpen(true);
  };

  const onQuit = useCallback(async () => {
    if (user && teamId) {
      await deleteUserInTeam(user.id, teamId);
      navigation.navigate(teamsRoute, {});
      await fetchTeams();
      onTeamsIsCanUpdate(true);
    }
  }, [user, teamId]);

  return (
    <View style={styles.users}>
      {teamIsLoading || isRefreshing || teamInvitationsIsLoading ? (
        <AppPositionContainer isCenter>
          <AppLoader />
        </AppPositionContainer>
      ) : (
        <>
          <FlatList
            refreshing={isRefreshing}
            data={data}
            style={listStyles}
            onRefresh={onRefresh}
            renderItem={({item}) => (
              <AppUserCard
                key={item.id}
                id={item.id}
                name={item.name}
                email={item.email}
                btnText={'Удалить'}
                isActive={
                  activatedUsers?.includes(item.id) || item.id === creatorId
                }
                isBtnVisible={user?.id === creatorId}
                isCreator={user?.id === creatorId && user?.id === item.id}
                isInvitation={item.isInvitation}
                isDisabled={disabledButtonsId.includes(item.id)}
                onPress={onResendInvitation}
                onButtonTextPress={onDialogOpen}
              />
            )}
          />

          {team && Object.keys(team).length > 0 && (
            <>
              {user?.id === creatorId && (
                <AppIconButton onPress={onModalOpen} />
              )}
              {user?.id !== creatorId && creatorId !== 0 && (
                <AppPositionContainer isBottom isHorizontalCenter>
                  <AppButton
                    onPress={onQuitDialogOpen}
                    title="Выйти из команды"
                    style={styles.logout}
                  />
                </AppPositionContainer>
              )}

              {(dialogIsOpen || dialogQuitIsOpen) && (
                <Dialog
                  title={
                    dialogQuitIsOpen
                      ? 'Выйти из команды?'
                      : 'Удалить пользователя?'
                  }
                  buttonText={dialogQuitIsOpen ? 'Выйти' : 'Удалить'}
                  isOpen={dialogIsOpen || dialogQuitIsOpen}
                  dialogQuitIsOpen={dialogQuitIsOpen}
                  disabled={deleteUserInTeamIsLoading}
                  setIsOpen={setDialogIsOpen}
                  setQuiteIsOpen={setDialogQuitIsOpen}
                  onDelete={onDelete}
                  onQuit={onQuit}
                />
              )}
              {modalIsOpen && (
                <ModalCreate
                  teamId={team.id}
                  isOpen={modalIsOpen}
                  usersInTeam={team.users}
                  setIsOpen={setModalIsOpen}
                />
              )}
            </>
          )}
          {!team ||
            (Object.keys(team).length === 0 && (
              <AppTitle level="2" style={styles.messageCenter}>
                Список пользователей пуст
              </AppTitle>
            ))}
        </>
      )}
    </View>
  );
};
