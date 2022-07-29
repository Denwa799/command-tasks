import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AppIconButton} from 'components/AppIconButton';
import {AppList} from 'components/AppList';
import {AppLoader} from 'components/AppLoader';
import {AppPositionContainer} from 'components/AppPositionContainer';
import {projectRoute, teamRoute, teamsRoute} from 'constants/variables';
import {useProjects} from 'hooks/useProjects';
import {useTeams} from 'hooks/useTeams';
import {IProject, ITeam, TaskStatusType} from 'models/ITasks';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {Alert, View} from 'react-native';
import {Modals} from './Modals';
import {styles} from './styles';
import {IMainScreen, TeamScreenNavigateType} from './types';

export const MainScreen: FC<IMainScreen> = ({route: {params}}) => {
  const route = useRoute();

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

  const {teams, teamsIsLoading, team, teamIsLoading, fetchTeams, fetchTeam} =
    useTeams();
  const {project, fetchProject} = useProjects();

  const [createIsOpen, setCreateIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteIsOpen] = useState(false);
  const [changeIsOpen, setChangeIsOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [id, setId] = useState(0);
  const [text, setText] = useState('');
  const [responsible, setResponsible] = useState('');
  const [status, setStatus] = useState<TaskStatusType>();
  const [isUrgently, setIsUrgently] = useState(false);
  const [date, setDate] = useState<Date>();

  const data = useMemo(() => {
    if (route.name === teamRoute) {
      return team?.projects;
    }
    if (route.name === projectRoute) {
      return project?.tasks;
    }
    return teams;
  }, [teams, team, project, route.name]);

  useEffect(() => {
    navigation.setOptions({
      title: routeName,
    });

    route.name === teamsRoute && fetchTeams();
  }, []);

  const onOpen = useCallback(async (item: ITeam | IProject) => {
    if (route.name === teamsRoute) {
      await fetchTeam(item.id);
      navigation.navigate(teamRoute, {
        teamId: item.id,
      });
    }
    if (route.name === teamRoute) {
      await fetchProject(item.id);
      navigation.navigate(projectRoute, {
        projectId: item.id,
      });
    }
  }, []);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    try {
      route.name === teamsRoute && fetchTeams();
      route.name === teamRoute && fetchTeam(params.teamId);
      route.name === projectRoute && fetchProject(params.projectId);
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
      itemResponsible: string | undefined,
      itemStatus: TaskStatusType | undefined,
      itemIsUrgently: boolean | undefined,
      itemDate: Date | undefined,
    ) => {
      setId(itemId);
      setChangeIsOpen(true);
      setText(itemText);
      itemResponsible && setResponsible(itemResponsible);
      itemStatus && setStatus(itemStatus);
      itemIsUrgently !== undefined && setIsUrgently(itemIsUrgently);
      itemDate !== undefined && setDate(itemDate);
    },
    [],
  );

  return (
    <View style={styles.main}>
      {teamsIsLoading || (route.name === teamRoute && teamIsLoading) ? (
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
            isColors={route.name === projectRoute}
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
            teamId={route.name === teamRoute && params.teamId}
            projectId={route.name === projectRoute && params.projectId}
            responsible={responsible}
            status={status}
            isUrgently={isUrgently}
            date={date}
          />
        </View>
      )}
    </View>
  );
};
