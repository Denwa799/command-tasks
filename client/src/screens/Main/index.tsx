import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppIconButton} from 'components/AppIconButton';
import {AppList} from 'components/AppList';
import {AppLoader} from 'components/AppLoader';
import {AppPositionContainer} from 'components/AppPositionContainer';
import {useTeams} from 'hooks/useTeams';
import {ITeam} from 'models/ITasks';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {Alert, View} from 'react-native';
import {Modals} from './Modals';
import {styles} from './styles';
import {IMainScreen, TeamScreenNavigateType} from './types';

export const MainScreen: FC<IMainScreen> = ({route: {params}}) => {
  const route = useRoute();
  const routeName = useMemo(() => {
    if (route.name === 'Team') {
      return 'Проекты';
    }
    return 'Команды';
  }, [route.name]);

  const navigation =
    useNavigation<NativeStackNavigationProp<TeamScreenNavigateType>>();

  const {teams, teamsIsLoading, fetchTeams} = useTeams();

  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [changeIsOpen, setChangeIsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [id, setId] = useState(0);
  const [text, setText] = useState('');

  const data = useMemo(() => {
    if (route.name === 'Team') {
      return params.projects;
    }
    return teams;
  }, [teams, params, route.name]);

  useEffect(() => {
    navigation.setOptions({
      title: routeName,
    });

    route.name === 'Teams' && fetchTeams();
  }, []);

  const onOpen = useCallback((team: ITeam) => {
    navigation.navigate('Team', {
      teamId: team.id,
      projects: team.projects,
    });
  }, []);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    try {
      fetchTeams();
    } catch {
      Alert.alert('Ошибка обновления');
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const onAdd = useCallback(() => {
    setCreateIsOpen(true);
  }, []);

  const onDelete = useCallback((itemId: number) => {
    setId(itemId);
    setDeleteIsOpen(true);
  }, []);

  const onChange = useCallback((itemId: number, itemText: string) => {
    setId(itemId);
    setChangeIsOpen(true);
    setText(itemText);
  }, []);

  return (
    <View style={styles.main}>
      {teamsIsLoading ? (
        <AppPositionContainer isCenter>
          <AppLoader />
        </AppPositionContainer>
      ) : (
        <View style={styles.content}>
          <AppList
            data={data}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            style={styles.list}
            onOpen={onOpen}
            onDelete={onDelete}
            onChange={onChange}
          />
          <AppIconButton onPress={onAdd} />
          <Modals
            createIsOpen={createIsOpen}
            setCreateIsOpen={setCreateIsOpen}
            id={id}
            deleteIsOpen={deleteIsOpen}
            setDeleteIsOpen={setDeleteIsOpen}
            changeIsOpen={changeIsOpen}
            setChangeIsOpen={setChangeIsOpen}
            text={text}
          />
        </View>
      )}
    </View>
  );
};
