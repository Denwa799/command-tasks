import React, {createContext, FC, useCallback, useMemo, useState} from 'react';
import {variables} from 'constants/variables';
import {IProject} from 'models/ITasks';
import {IProjectsContext, IProjectsProvider} from './types';
import {Alert} from 'react-native';
import {getAccessToken} from 'utils/getAccessToken';
import {DeleteService, GetService, PatchService, PostService} from 'api';

export const ProjectsContext = createContext<IProjectsContext>(
  {} as IProjectsContext,
);

export const ProjectsProvider: FC<IProjectsProvider> = ({children}) => {
  const [project, setProject] = useState<IProject | null>(null);

  const [projectIsLoading, setProjectIsLoading] = useState(false);
  const [createIsLoading, setCreateIsLoading] = useState(false);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);
  const [updateIsLoading, setUpdateIsLoading] = useState(false);

  const projectsPath = `${variables.API_URL}${variables.PROJECTS}`;

  const fetchProject = useCallback(async (id: number) => {
    setProjectIsLoading(true);
    try {
      const tokenBearer = await getAccessToken();
      if (tokenBearer) {
        const response = await GetService(`${projectsPath}/${id}`, tokenBearer);
        setProject(response.data);
      } else {
        throw new Error('Ошибка сессии');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Ошибка загрузки проекта');
    } finally {
      setProjectIsLoading(false);
    }
  }, []);

  const createProject = useCallback(async (teamId: number, name: string) => {
    setCreateIsLoading(true);
    try {
      const tokenBearer = await getAccessToken();
      if (tokenBearer) {
        await PostService(`${projectsPath}`, tokenBearer, {
          name,
          teamId,
        });
      } else {
        throw new Error('Ошибка сессии');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Ошибка создания проекта');
    } finally {
      setCreateIsLoading(false);
    }
  }, []);

  const deleteProject = useCallback(async (id: number) => {
    setDeleteIsLoading(true);
    try {
      const tokenBearer = await getAccessToken();
      if (tokenBearer) {
        await DeleteService(`${projectsPath}/${id}`, tokenBearer);
      } else {
        throw new Error('Ошибка сессии');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Ошибка удаления проекта');
    } finally {
      setDeleteIsLoading(false);
    }
  }, []);

  const updateProject = useCallback(async (id: number, name: string) => {
    setUpdateIsLoading(true);
    try {
      const tokenBearer = await getAccessToken();
      if (tokenBearer) {
        await PatchService(`${projectsPath}/${id}`, tokenBearer, {
          name,
        });
      } else {
        throw new Error('Ошибка сессии');
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Ошибка обновления проекта');
    } finally {
      setUpdateIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      project,
      createIsLoading,
      deleteIsLoading,
      updateIsLoading,
      projectIsLoading,
      createProject,
      deleteProject,
      updateProject,
      fetchProject,
    }),
    [
      project,
      createIsLoading,
      deleteIsLoading,
      updateIsLoading,
      projectIsLoading,
    ],
  );

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};
