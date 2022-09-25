import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppIconButton} from 'components/Btns/AppIconButton';
import {AppLoader} from 'components/AppLoader';
import {AppPositionContainer} from 'components/AppPositionContainer';
import {projectRoute, teamRoute, teamsRoute} from 'constants/variables';
import {useProjects} from 'hooks/useProjects';
import {useTeams} from 'hooks/useTeams';
import {TaskStatusType} from 'models/ITasks';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {Alert, FlatList, View} from 'react-native';
import {Modals} from './Modals';
import {styles} from './styles';
import {IMainScreen, TeamScreenNavigateType} from './types';
import {AppTitle} from 'components/AppTitle';
import {useAuth} from 'hooks/useAuth';
import {AppCard} from 'components/Cards/AppCard';
import {useTasks} from 'hooks/useTasks';

export const MainScreen: FC<IMainScreen> = ({route: {params}}) => {
  const route = useRoute();
  const {user} = useAuth();

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

  const {
    teams,
    teamsIsLoading,
    teamIsLoading,
    fetchTeams,
    setSelectedTeamId,
    fetchTeam,
    selectedTeamId,
  } = useTeams();
  const {projects, projectsIsLoading, fetchProjects} = useProjects();
  const {tasks, fetchTasks, tasksIsLoading} = useTasks();

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
    return teams;
  }, [teams, projects, tasks, route.name]);

  useEffect(() => {
    navigation.setOptions({
      title: routeName,
    });

    route.name === teamsRoute && fetchTeams();
  }, []);

  useEffect(() => {
    !teamIsLoading && selectedTeamId && fetchTeam(selectedTeamId);
  }, []);

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

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    try {
      route.name === teamsRoute && fetchTeams();
      route.name === teamRoute && fetchProjects(params.teamId);
      route.name === projectRoute && fetchTasks(params.projectId);
    } catch {
      Alert.alert('Ошибка обновления');
    } finally {
      setIsRefreshing(false);
    }
  }, [params]);

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
  }, [teamsIsLoading, projectsIsLoading, tasksIsLoading]);

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
              refreshing={isRefreshing}
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
