import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppIconButton} from 'components/Btns/AppIconButton';
import {AppLoader} from 'components/AppLoader';
import {AppPositionContainer} from 'components/AppPositionContainer';
import {
  doneStatus,
  inProgressStatus,
  projectRoute,
  takeNumber,
  teamRoute,
  teamsRoute,
} from 'constants/variables';
import {useProjects} from 'hooks/useProjects';
import {useTeams} from 'hooks/useTeams';
import {IProject, ITask, ITeam, TaskStatusType} from 'models/ITasks';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, ToastAndroid, View} from 'react-native';
import {Modals} from './Modals';
import {styles} from './styles';
import {IMainScreen, TeamScreenNavigateType} from './types';
import {AppTitle} from 'components/AppTitle';
import {useAuth} from 'hooks/useAuth';
import {useTasks} from 'hooks/useTasks';
import {useInvitations} from 'hooks/useInvitations';
import {AppMainCard} from 'components/Cards/AppMainCard';

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
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [changeIsOpen, setChangeIsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [id, setId] = useState(0);
  const [text, setText] = useState('');
  const [responsibleEmail, setResponsibleEmail] = useState('');
  const [status, setStatus] = useState<TaskStatusType>();
  const [isUrgently, setIsUrgently] = useState(false);
  const [statusAction, setStatusAction] = useState<TaskStatusType | ''>('');
  const [date, setDate] = useState<Date>();

  const dialogTitle = useMemo(() => {
    if (statusAction === doneStatus) {
      return 'Выполнили?';
    }
    if (statusAction === inProgressStatus) {
      return 'Отменить выполнение?';
    }
    return 'Удалить?';
  }, [statusAction]);

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

    const initialFetch = async () => {
      if (route.name === teamsRoute) {
        fetchInvitations();
        await fetchTeams();
        setIsCanUpdateData(true);
      }
    };

    if (!teamIsLoading && selectedTeamId && route.name === teamRoute) {
      fetchTeam(selectedTeamId);
    }

    initialFetch();
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

  const onOpen = async (itemId: number, itemCreatorId: number) => {
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
  };

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
      ToastAndroid.show('Ошибка обновления', ToastAndroid.SHORT);
    } finally {
      setIsRefreshing(false);
    }
  }, [params, teams, projects, tasks]);

  const onAdd = () => setCreateIsOpen(true);

  const onDialog = (itemId: number, actualStatus: TaskStatusType | '') => {
    setId(itemId);
    setDialogIsOpen(true);
    setStatusAction(actualStatus);
  };

  const onChange = (
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
  };

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
                <AppMainCard
                  key={item.id}
                  id={item?.id}
                  creatorId={creatorId}
                  text={item.name ? item.name : item.text}
                  isColors={route.name === projectRoute}
                  isUrgently={item?.isUrgently}
                  isAdditionalButtons={route.name === projectRoute}
                  date={item?.date}
                  responsible={item?.responsible}
                  status={item?.status}
                  item={item}
                  style={styles.card}
                  onOpen={onOpen}
                  onDialog={onDialog}
                  onChange={onChange}
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
              id={id}
              teamId={route.name === teamRoute && params.teamId}
              projectId={route.name === projectRoute && params.projectId}
              text={text}
              responsibleEmail={responsibleEmail}
              dialogTitle={dialogTitle}
              statusAction={statusAction}
              createIsOpen={createIsOpen}
              dialogIsOpen={dialogIsOpen}
              changeIsOpen={changeIsOpen}
              isUrgently={isUrgently}
              date={date}
              status={status}
              onUpdateData={onUpdateData}
              setCreateIsOpen={setCreateIsOpen}
              setChangeIsOpen={setChangeIsOpen}
              setDialogIsOpen={setDialogIsOpen}
            />
          </View>
        </>
      )}
    </View>
  );
};
