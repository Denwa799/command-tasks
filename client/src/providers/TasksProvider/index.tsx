import {DeleteService, GetService, PatchService, PostService} from 'api';
import {takeNumber, variables} from 'constants/variables';
import {ITask, TaskStatusType} from 'models/ITasks';
import React, {createContext, FC, useCallback, useMemo, useState} from 'react';
import {ToastAndroid} from 'react-native';
import {getAccessToken} from 'utils/getSession';
import {ITasksContext, ITasksProvider} from './types';

export const TasksContext = createContext<ITasksContext>({} as ITasksContext);

export const TasksProvider: FC<ITasksProvider> = ({children}) => {
  const [tasks, setTasks] = useState<ITask[] | null>(null);
  const [loadedMoreTasks, setLoadedMoreTasks] = useState<ITask[]>([]);
  const [tasksCount, setTasksCount] = useState(0);

  const [tasksIsLoading, setTasksIsLoading] = useState(false);
  const [moreTasksIsLoading, setMoreTasksIsLoading] = useState(false);
  const [createTaskIsLoading, setCreateTaskIsLoading] = useState(false);
  const [deleteTaskIsLoading, setDeleteTaskIsLoading] = useState(false);
  const [updateTaskIsLoading, setUpdateTaskIsLoading] = useState(false);
  const [changeTaskStatusIsLoading, setChangeTaskStatusIsLoading] =
    useState(false);

  const tasksPath = `${variables.API_URL}${variables.TASKS}`;

  const fetchTasks = useCallback(
    async (projectId: number, skip: number = 0, take: number = takeNumber) => {
      setTasksIsLoading(true);
      setTasks(null);
      try {
        const tokenBearer = await getAccessToken();
        if (tokenBearer) {
          const response = await GetService(
            `${tasksPath}/project/${projectId}`,
            tokenBearer,
            {skip, take},
          );
          setTasks(response.data?.tasks);
          setTasksCount(response.data?.count);
        } else {
          throw new Error('Ошибка сессии');
        }
      } catch (error) {
        ToastAndroid.show('Ошибка загрузки списка задач', ToastAndroid.SHORT);
      } finally {
        setTasksIsLoading(false);
      }
    },
    [],
  );

  const fetchMoreTasks = useCallback(
    async (projectId: number, skip: number = 0, take: number = takeNumber) => {
      setMoreTasksIsLoading(true);
      try {
        const tokenBearer = await getAccessToken();
        if (tokenBearer) {
          const response = await GetService(
            `${tasksPath}/project/${projectId}`,
            tokenBearer,
            {skip, take},
          );
          setLoadedMoreTasks(response.data?.tasks);
          setTasksCount(response.data?.count);
        } else {
          throw new Error('Ошибка сессии');
        }
      } catch (error) {
        ToastAndroid.show('Ошибка загрузки списка задач', ToastAndroid.SHORT);
      } finally {
        setMoreTasksIsLoading(false);
      }
    },
    [],
  );

  const cleanMoreTasks = useCallback(() => {
    setLoadedMoreTasks([]);
  }, []);

  const createTask = useCallback(
    async (
      projectId: number,
      text: string,
      responsible: string,
      status: TaskStatusType,
      isUrgently: boolean,
      date: Date,
    ) => {
      setCreateTaskIsLoading(true);
      try {
        const tokenBearer = await getAccessToken();
        if (tokenBearer) {
          await PostService(`${tasksPath}`, tokenBearer, {
            projectId,
            text,
            responsible,
            status,
            isUrgently,
            date,
          });
        } else {
          throw new Error('Ошибка сессии');
        }
      } catch (error) {
        ToastAndroid.show('Ошибка создания задачи', ToastAndroid.SHORT);
      } finally {
        setCreateTaskIsLoading(false);
      }
    },
    [],
  );

  const deleteTask = useCallback(async (id: number) => {
    setDeleteTaskIsLoading(true);
    try {
      const tokenBearer = await getAccessToken();
      if (tokenBearer) {
        await DeleteService(`${tasksPath}/${id}`, tokenBearer);
      } else {
        throw new Error('Ошибка сессии');
      }
    } catch (error) {
      ToastAndroid.show('Ошибка удаления задачи', ToastAndroid.SHORT);
    } finally {
      setDeleteTaskIsLoading(false);
    }
  }, []);

  const updateTask = useCallback(
    async (
      id: number,
      text: string,
      responsible: string,
      status: TaskStatusType,
      isUrgently: boolean,
      date: Date,
    ) => {
      setUpdateTaskIsLoading(true);
      try {
        const tokenBearer = await getAccessToken();
        if (tokenBearer) {
          await PatchService(`${tasksPath}/${id}`, tokenBearer, {
            text,
            responsible,
            status,
            isUrgently,
            date,
          });
        } else {
          throw new Error('Ошибка сессии');
        }
      } catch (error) {
        ToastAndroid.show('Ошибка обновления задачи', ToastAndroid.SHORT);
      } finally {
        setUpdateTaskIsLoading(false);
      }
    },
    [],
  );

  const changeTaskStatus = useCallback(
    async (id: number, status: TaskStatusType) => {
      setChangeTaskStatusIsLoading(true);
      try {
        const tokenBearer = await getAccessToken();
        if (tokenBearer) {
          await PatchService(`${tasksPath}/${id}/status`, tokenBearer, {
            status,
          });
        } else {
          throw new Error('Ошибка сессии');
        }
      } catch (error) {
        ToastAndroid.show('Ошибка смены статуса', ToastAndroid.SHORT);
      } finally {
        setChangeTaskStatusIsLoading(false);
      }
    },
    [],
  );

  const value = useMemo(
    () => ({
      tasks,
      loadedMoreTasks,
      tasksCount,
      tasksIsLoading,
      moreTasksIsLoading,
      createTaskIsLoading,
      deleteTaskIsLoading,
      updateTaskIsLoading,
      changeTaskStatusIsLoading,
      fetchTasks,
      fetchMoreTasks,
      cleanMoreTasks,
      createTask,
      deleteTask,
      updateTask,
      changeTaskStatus,
    }),
    [
      tasks,
      loadedMoreTasks,
      tasksCount,
      tasksIsLoading,
      moreTasksIsLoading,
      createTaskIsLoading,
      deleteTaskIsLoading,
      updateTaskIsLoading,
    ],
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
