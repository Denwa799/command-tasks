import {DeleteService, PostService} from 'api';
import {variables} from 'constants/variables';
import React, {createContext, FC, useCallback, useMemo, useState} from 'react';
import {Alert} from 'react-native';
import {getAccessToken} from 'utils/getAccessToken';
import {ITasksContext, ITasksProvider} from './types';

export const TasksContext = createContext<ITasksContext>({} as ITasksContext);

export const TasksProvider: FC<ITasksProvider> = ({children}) => {
  const [createIsLoading, setCreateIsLoading] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

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
      setCreateIsLoading(true);
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
        setCreateIsLoading(false);
      }
    },
    [],
  );

  const deleteTask = useCallback(async (id: number) => {
    setDeleteIsLoading(true);
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
      setDeleteIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      createIsLoading,
      deleteIsLoading,
      createTask,
      deleteTask,
    }),
    [createIsLoading, deleteIsLoading],
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};