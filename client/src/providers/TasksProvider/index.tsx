import {DeleteService, PatchService, PostService} from 'api';
import {variables} from 'constants/variables';
import React, {createContext, FC, useCallback, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import {getAccessToken} from 'utils/getAccessToken';
import {ITasksContext, ITasksProvider} from './types';

export const TasksContext = createContext<ITasksContext>({} as ITasksContext);

export const TasksProvider: FC<ITasksProvider> = ({children}) => {
  const [createTaskIsLoading, setCreateTaskIsLoading] = useState(false);
  const [deleteTaskIsLoading, setDeleteTaskIsLoading] = useState(false);
  const [updateTaskIsLoading, setUpdateTaskIsLoading] = useState(false);

  const tasksPath = `${variables.API_URL}${variables.TASKS}`;

  const createTask = useCallback(
    async (
      projectId: number,
      text: string,
      responsible: string,
      status: 'overdue' | 'inProgress' | 'done',
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
        console.log(error);
        Alert.alert('Ошибка создания задачи');
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
      console.log(error);
      Alert.alert('Ошибка удаления задачи');
    } finally {
      setDeleteTaskIsLoading(false);
    }
  }, []);

  const updateTask = useCallback(
    async (
      id: number,
      text: string,
      responsible: string,
      status: 'overdue' | 'inProgress' | 'done',
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
        console.log(error);
        Alert.alert('Ошибка обновления задачи');
      } finally {
        setUpdateTaskIsLoading(false);
      }
    },
    [],
  );

  const value = useMemo(
    () => ({
      createTaskIsLoading,
      deleteTaskIsLoading,
      updateTaskIsLoading,
      createTask,
      deleteTask,
      updateTask,
    }),
    [createTaskIsLoading, deleteTaskIsLoading, updateTaskIsLoading],
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};
