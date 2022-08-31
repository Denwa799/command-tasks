import {AppUserCard} from 'components/Cards/AppUserCard';
import { useAuth } from 'hooks/useAuth';
import {useTeams} from 'hooks/useTeams';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import {styles} from './styles';

export const UsersScreen = () => {
  const {team, teamIsLoading, fetchTeam} = useTeams();
  const {user} = useAuth();

  const [teamId, setTeamId] = useState(team?.id);
  const [activatedUsers, setActivatedUsers] = useState<Number[]>([]);
  const [creatorId, setCreatorId] = useState(0);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [userId, setUserId] = useState(0);

  const data = useMemo(() => {
    let users;
    if (team?.users) {
      users = [...team?.users];
      users.push({
        id: team.creator?.id,
        email: team.creator?.email,
        name: team.creator?.name,
      });
    }
    return users;
  }, [team]);

  useEffect(() => {
    if (team) {
      setActivatedUsers(team.activatedUsers);
      setCreatorId(team.creator.id);
    }
  }, [team]);

  console.log(activatedUsers);

  const onRefresh = useCallback(() => {
    teamId && fetchTeam(teamId);
  }, []);

  const dialogOpen = useCallback((id: number) => {
    setUserId(id);
  }, []);

  return (
    <View style={styles.users}>
      <FlatList
        data={data}
        style={styles.list}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        renderItem={({item}) => (
          <AppUserCard
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
          />
        )}
      />
    </View>
  );
};
