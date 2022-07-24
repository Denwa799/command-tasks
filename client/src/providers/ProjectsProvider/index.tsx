import React, {createContext, FC, useCallback, useMemo, useState} from 'react';
import {variables} from 'constants/variables';
import {IProject} from 'models/ITasks';
import {IProjectsContext, IProjectsProvider} from './types';
import {Alert} from 'react-native';
import {getAccessToken} from 'utils/getAccessToken';
import {PostService} from 'api';

export const ProjectsContext = createContext<IProjectsContext>(
  {} as IProjectsContext,
);

export const ProjectsProvider: FC<IProjectsProvider> = ({children}) => {
  const [project, setProject] = useState<IProject | null>(null);

  const [createIsLoading, setCreateIsLoading] = useState(false);

  const projectsPath = `${variables.API_URL}${variables.PROJECTS}`;

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
      Alert.alert('Ошибка создания команды');
    } finally {
      setCreateIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      project,
      createIsLoading,
      createProject,
    }),
    [project, createIsLoading],
  );

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};
