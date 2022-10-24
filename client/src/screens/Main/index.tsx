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
import {IProject, ITask, ITeam, TaskStatusType} from 'models/ITasks';
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
    selectedTeamId,
    fetchTeams,
    fetchMoreTeams,
    cleanMoreTeams,
    setSelectedTeamId,
    fetchTeam,
  } = useTeams();
  const {
    projects,
    loadedMoreProjects,
    moreProjectsIsLoading,
    projectsCount,
    projectsIsLoading,
    fetchProjects,
    fetchMoreProjects,
    cleanMoreProjects,
  } = useProjects();
  const {
    tasks,
    loadedMoreTasks,
    tasksCount,
    tasksIsLoading,
    moreTasksIsLoading,
    fetchTasks,
    fetchMoreTasks,
    cleanMoreTasks,
  } = useTasks();

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

  const [dataTeams, setDataTeams] = useState<ITeam[]>([]);
  const [dataProjects, setDataProjects] = useState<IProject[]>([]);
  const [dataTasks, setDataTasks] = useState<ITask[]>([]);
  const [isCanUpdateData, setIsCanUpdateData] = useState(true);

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

  const isFlatListRefreshing = useMemo(() => {
    if (route.name === teamsRoute && moreTeamsIsLoading) {
      return moreTeamsIsLoading;
    }
    if (route.name === teamRoute && moreProjectsIsLoading) {
      return moreProjectsIsLoading;
    }
    if (route.name === projectRoute && moreTasksIsLoading) {
      return moreTasksIsLoading;
    }
    return isRefreshing;
  }, [
    isRefreshing,
    moreTeamsIsLoading,
    moreProjectsIsLoading,
    moreTasksIsLoading,
    route.name,
  ]);

  const creatorId = useMemo(() => {
    return params?.creatorId;
  }, [params]);

  const data = useMemo(() => {
    if (route.name === teamRoute) {
      return dataProjects;
    }
    if (route.name === projectRoute) {
      return dataTasks;
    }
    return dataTeams;
  }, [dataTeams, dataProjects, dataTasks, route.name]);

  useEffect(() => {
    navigation.setOptions({
      title: routeName,
    });

    if (route.name === teamsRoute) {
      fetchInvitations();
      fetchTeams();
    }

    if (!teamIsLoading && selectedTeamId && route.name === teamRoute) {
      fetchTeam(selectedTeamId);
    }
  }, []);

  useEffect(() => {
    if (isCanUpdateData) {
      if (route.name === teamsRoute && teams) {
        setDataTeams(teams);
        setIsCanUpdateData(false);
      }
      if (route.name === teamRoute && projects) {
        setDataProjects(projects);
        setIsCanUpdateData(false);
      }
      if (route.name === projectRoute && tasks) {
        setDataTasks(tasks);
        setIsCanUpdateData(false);
      }
    }
  }, [teams, projects, tasks, isCanUpdateData]);

  useEffect(() => {
    if (loadedMoreTeams.length > 0) {
      setDataTeams(prev => [...prev, ...loadedMoreTeams]);
      cleanMoreTeams();
    }
    if (loadedMoreProjects.length > 0) {
      setDataProjects(prev => [...prev, ...loadedMoreProjects]);
      cleanMoreProjects();
    }
    if (loadedMoreTasks.length > 0) {
      setDataTasks(prev => [...prev, ...loadedMoreTasks]);
      cleanMoreTasks();
    }
  }, [loadedMoreTeams, loadedMoreProjects, loadedMoreTasks]);

  const onUpdateData = () => {
    setFetchSkip(takeNumber);
    setIsCanUpdateData(true);
  };

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
      }
      if (route.name === teamRoute) {
        await fetchProjects(params.teamId);
        projects && setDataProjects(projects);
      }
      if (route.name === projectRoute) {
        await fetchTasks(params.projectId);
        tasks && setDataTasks(tasks);
      }
      setFetchSkip(takeNumber);
    } catch {
      Alert.alert('Ошибка обновления');
    } finally {
      setIsRefreshing(false);
    }
  }, [params, teams, projects, tasks]);

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
    if (route.name === teamRoute) {
      if (projects && projects.length > 1 && fetchSkip < projectsCount) {
        setFetchSkip(prev => (prev = prev + takeNumber));
        await fetchMoreProjects(params.teamId, fetchSkip, takeNumber);
      }
    }
    if (route.name === projectRoute) {
      if (tasks && tasks.length > 1 && fetchSkip < tasksCount) {
        setFetchSkip(prev => (prev = prev + takeNumber));
        await fetchMoreTasks(params.projectId, fetchSkip, takeNumber);
      }
    }
  }, [
    teams,
    teamsCount,
    projects,
    projectsCount,
    tasks,
    tasksCount,
    fetchSkip,
    route.name,
    params,
  ]);

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
              refreshing={isFlatListRefreshing}
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
              onUpdateData={onUpdateData}
            />
          </View>
        </>
      )}
    </View>
  );
};
