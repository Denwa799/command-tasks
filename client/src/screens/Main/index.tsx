import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppIconButton} from 'components/Btns/AppIconButton';
import {AppLoader} from 'components/AppLoader';
import {AppPositionContainer} from 'components/AppPositionContainer';
import {
  projectRoute,
  takeNumber,
  teamRoute,
  teamsRoute,
} from 'constants/variables';
import {useProjects} from 'hooks/useProjects';
import {useTeams} from 'hooks/useTeams';
import {ITeam, TaskStatusType} from 'models/ITasks';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {Alert, FlatList, View} from 'react-native';
import {Modals} from './Modals';
import {styles} from './styles';
import {IMainScreen, TeamScreenNavigateType} from './types';
import {AppTitle} from 'components/AppTitle';
import {useAuth} from 'hooks/useAuth';
import {AppCard} from 'components/Cards/AppCard';
import {useTasks} from 'hooks/useTasks';
import {useInvitations} from 'hooks/useInvitations';

export const MainScreen: FC<IMainScreen> = ({route: {params}}) => {
  const route = useRoute();
  const {user} = useAuth();
  const {fetchInvitations} = useInvitations();
  const {
    teams,
    teamsCount,
    loadedMoreTeams,
    teamsIsLoading,
    moreTeamsIsLoading,
    teamIsLoading,
    fetchTeams,
    fetchMoreTeams,
    cleanMoreTeams,
    setSelectedTeamId,
    fetchTeam,
    selectedTeamId,
  } = useTeams();
  const {projects, projectsIsLoading, fetchProjects} = useProjects();
  const {tasks, fetchTasks, tasksIsLoading} = useTasks();

  const routeName = useMemo(() => {
    if (route.name === teamRoute) {
      return 'Проекты';
    }
    if (route.name === projectRoute) {
      return 'Задачи';
    }
    return 'Команды';
  }, [route.name]);

  const navigation =
    useNavigation<NativeStackNavigationProp<TeamScreenNavigateType>>();

  const [fetchSkip, setFetchSkip] = useState(takeNumber);
  
  console.log(fetchSkip);

  const [dataTeams, setDataTeams] = useState<ITeam[]>([]);
  const [isFirstFetch, setIsFirstFetch] = useState(true);

  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [changeIsOpen, setChangeIsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [id, setId] = useState(0);
  const [text, setText] = useState('');
  const [responsibleEmail, setResponsibleEmail] = useState('');
  const [status, setStatus] = useState<TaskStatusType>();
  const [isUrgently, setIsUrgently] = useState(false);
  const [date, setDate] = useState<Date>();

  const creatorId = useMemo(() => {
    return params?.creatorId;
  }, [params]);

  const data = useMemo(() => {
    if (route.name === teamRoute) {
      return projects;
    }
    if (route.name === projectRoute) {
      return tasks;
    }
    return dataTeams;
  }, [dataTeams, projects, tasks, route.name]);

  useEffect(() => {
    navigation.setOptions({
      title: routeName,
    });

    if (route.name === teamsRoute) {
      fetchInvitations();
      fetchTeams();
    }
  }, []);

  useEffect(() => {
    !teamIsLoading &&
      selectedTeamId &&
      route.name === teamRoute &&
      fetchTeam(selectedTeamId);
  }, []);

  useEffect(() => {
    if (isFirstFetch && teams) {
      setDataTeams(teams);
      setIsFirstFetch(false);
    }
  }, [teams, isFirstFetch]);

  useEffect(() => {
    if (loadedMoreTeams.length > 0) {
      setDataTeams(prev => [...prev, ...loadedMoreTeams]);
      cleanMoreTeams();
    }
  }, [loadedMoreTeams]);

  const onOpen = useCallback(async (itemId: number, itemCreatorId: number) => {
    if (route.name === teamsRoute) {
      setSelectedTeamId(itemId);
      await fetchProjects(itemId);
      navigation.navigate(teamRoute, {
        teamId: itemId,
        creatorId: itemCreatorId ? itemCreatorId : 0,
      });
    }
    if (route.name === teamRoute) {
      await fetchTasks(itemId);
      navigation.navigate(projectRoute, {
        projectId: itemId,
        creatorId: itemCreatorId ? itemCreatorId : 0,
        teamId: params.teamId,
      });
    }
  }, []);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      if (route.name === teamsRoute) {
        await fetchTeams();
        teams && setDataTeams(teams);
        setFetchSkip(takeNumber);
      }
      route.name === teamRoute && fetchProjects(params.teamId);
      route.name === projectRoute && fetchTasks(params.projectId);
    } catch {
      Alert.alert('Ошибка обновления');
    } finally {
      setIsRefreshing(false);
    }
  }, [params, teams]);

  const onAdd = useCallback(() => {
    setCreateIsOpen(true);
  }, []);

  const onDelete = useCallback((itemId: number) => {
    setId(itemId);
    setDeleteIsOpen(true);
  }, []);

  const onChange = useCallback(
    (
      itemId: number,
      itemText: string,
      itemResponsibleEmail: string | undefined,
      itemStatus: TaskStatusType | undefined,
      itemIsUrgently: boolean | undefined,
      itemDate: Date | undefined,
    ) => {
      setId(itemId);
      setChangeIsOpen(true);
      setText(itemText);
      itemResponsibleEmail && setResponsibleEmail(itemResponsibleEmail);
      itemStatus && setStatus(itemStatus);
      itemIsUrgently !== undefined && setIsUrgently(itemIsUrgently);
      itemDate !== undefined && setDate(itemDate);
    },
    [],
  );

  const onLoadMore = useCallback(async () => {
    if (route.name === teamsRoute) {
      if (teams && teams.length > 1 && fetchSkip < teamsCount) {
        setFetchSkip(prev => (prev = prev + takeNumber));
        await fetchMoreTeams(fetchSkip, takeNumber);
      }
    }
  }, [teams, teamsCount, fetchSkip, route.name]);

  const isLoading = useMemo(() => {
    if (route.name === teamsRoute) {
      return teamsIsLoading;
    }
    if (route.name === teamRoute) {
      return projectsIsLoading;
    }
    if (route.name === projectRoute) {
      return tasksIsLoading;
    }
  }, [teamsIsLoading, projectsIsLoading, tasksIsLoading, route.name]);

  return (
    <View style={styles.main}>
      {isLoading || (route.name === teamRoute && teamIsLoading) ? (
        <AppPositionContainer isCenter>
          <AppLoader />
        </AppPositionContainer>
      ) : (
        <>
          <View style={styles.content}>
            <FlatList
              data={data}
              style={styles.list}
              refreshing={isRefreshing || moreTeamsIsLoading}
              onRefresh={onRefresh}
              renderItem={({item}) => (
                <AppCard
                  id={item?.id}
                  text={item.name ? item.name : item.text}
                  item={item}
                  onOpen={onOpen}
                  onDelete={onDelete}
                  onChange={onChange}
                  isColors={route.name === projectRoute}
                  responsible={item?.responsible}
                  status={item?.status}
                  isUrgently={item?.isUrgently}
                  date={item?.date}
                  creatorId={creatorId}
                />
              )}
              onEndReached={onLoadMore}
              onEndReachedThreshold={0.1}
            />
            {(!data || data.length === 0) && (
              <AppTitle level="2" style={styles.messageCenter}>
                Список пуст
              </AppTitle>
            )}
            {(creatorId === user?.id || route.name === teamsRoute) && (
              <AppIconButton onPress={onAdd} />
            )}
            <Modals
              createIsOpen={createIsOpen}
              setCreateIsOpen={setCreateIsOpen}
              id={id}
              deleteIsOpen={deleteIsOpen}
              setDeleteIsOpen={setDeleteIsOpen}
              changeIsOpen={changeIsOpen}
              setChangeIsOpen={setChangeIsOpen}
              text={text}
              teamId={route.name === teamRoute && params.teamId}
              projectId={route.name === projectRoute && params.projectId}
              responsibleEmail={responsibleEmail}
              status={status}
              isUrgently={isUrgently}
              date={date}
            />
          </View>
        </>
      )}
    </View>
  );
};
