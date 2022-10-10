import {AppLoader} from 'components/AppLoader';
import {AppPositionContainer} from 'components/AppPositionContainer';
import {AppTitle} from 'components/AppTitle';
import {AppUserCard} from 'components/Cards/AppUserCard';
import {useAuth} from 'hooks/useAuth';
import {useInvitations} from 'hooks/useInvitations';
import {useTeams} from 'hooks/useTeams';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import {styles} from './styles';

export const UsersScreen = () => {
  const {team, teamIsLoading, selectedTeamId, fetchTeam} = useTeams();
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

  const data = useMemo(() => {
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
      users.push({
        id: team.creator?.id,
        email: team.creator?.email,
        name: team.creator?.name,
        isInvitation: false,
      });
    }
    return users;
  }, [team, teamInvitations]);

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

  const dialogOpen = useCallback(
    async (id: number, email: string) => {
      setUserId(id);
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

  return (
    <View style={styles.users}>
      {teamIsLoading || isRefreshing || teamInvitationsIsLoading ? (
        <AppPositionContainer isCenter>
          <AppLoader />
        </AppPositionContainer>
      ) : (
        <>
          <FlatList
            data={data}
            style={styles.list}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            renderItem={({item}) => (
              <AppUserCard
                key={item.id}
                id={item.id}
                name={item.name}
                email={item.email}
                onPress={dialogOpen}
                btnText={'Удалить'}
                isActive={
                  activatedUsers?.includes(item.id) || item.id === creatorId
                }
                isBtnVisible={user?.id === creatorId}
                isCreator={user?.id === creatorId && user?.id === item.id}
                isInvitation={item.isInvitation}
                isDisabled={disabledButtonsId.includes(item.id)}
              />
            )}
          />
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
