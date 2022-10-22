import React, {createContext, FC, useCallback, useMemo, useState} from 'react';
import {takeNumber, variables} from 'constants/variables';
import {IProject} from 'models/ITasks';
import {IProjectsContext, IProjectsProvider} from './types';
import {Alert} from 'react-native';
import {getAccessToken} from 'utils/getSession';
import {DeleteService, GetService, PatchService, PostService} from 'api';

export const ProjectsContext = createContext<IProjectsContext>(
  {} as IProjectsContext,
);

export const ProjectsProvider: FC<IProjectsProvider> = ({children}) => {
  const [projects, setProjects] = useState<IProject[] | null>(null);
  const [loadedMoreProjects, setLoadedMoreProjects] = useState<IProject[]>([]);
  const [projectsCount, setProjectsCount] = useState(0);

  const [project, setProject] = useState<IProject | null>(null);

  const [projectsIsLoading, setProjectsIsLoading] = useState(false);
  const [moreProjectsIsLoading, setMoreProjectsIsLoading] = useState(false);
  const [projectIsLoading, setProjectIsLoading] = useState(false);
  const [createProjectIsLoading, setCreateProjectIsLoading] = useState(false);
  const [deleteProjectIsLoading, setDeleteProjectIsLoading] = useState(false);
  const [updateProjectIsLoading, setUpdateProjectIsLoading] = useState(false);

  const projectsPath = `${variables.API_URL}${variables.PROJECTS}`;

  const fetchProjects = useCallback(
    async (teamId: number, skip: number = 0, take: number = takeNumber) => {
      setProjectsIsLoading(true);
      try {
        const tokenBearer = await getAccessToken();
        if (tokenBearer) {
          const response = await GetService(
            `${projectsPath}/team/${teamId}`,
            tokenBearer,
            {skip, take},
          );
          setProjects(response.data?.projects);
          setProjectsCount(response.data?.count);
        } else {
          throw new Error('Ошибка сессии');
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Ошибка загрузки списка проектов');
      } finally {
        setProjectsIsLoading(false);
      }
    },
    [],
  );

  const fetchMoreProjects = useCallback(
    async (teamId: number, skip: number = 0, take: number = takeNumber) => {
      setMoreProjectsIsLoading(true);
      try {
        const tokenBearer = await getAccessToken();
        if (tokenBearer) {
          const response = await GetService(
            `${projectsPath}/team/${teamId}`,
            tokenBearer,
            {
              skip,
              take,
            },
          );
          setLoadedMoreProjects(response.data?.projects);
          setProjectsCount(response.data?.count);
        } else {
          throw new Error('Ошибка сессии');
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Ошибка загрузки списка проектов');
      } finally {
        setMoreProjectsIsLoading(false);
      }
    },
    [],
  );

  const cleanMoreProjects = useCallback(() => {
    setLoadedMoreProjects([]);
  }, []);

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
    setCreateProjectIsLoading(true);
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
      setCreateProjectIsLoading(false);
    }
  }, []);

  const deleteProject = useCallback(async (id: number) => {
    setDeleteProjectIsLoading(true);
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
      setDeleteProjectIsLoading(false);
    }
  }, []);

  const updateProject = useCallback(async (id: number, name: string) => {
    setUpdateProjectIsLoading(true);
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
      setUpdateProjectIsLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({
      projects,
      projectsCount,
      loadedMoreProjects,
      project,
      projectsIsLoading,
      moreProjectsIsLoading,
      createProjectIsLoading,
      deleteProjectIsLoading,
      updateProjectIsLoading,
      projectIsLoading,
      fetchProjects,
      fetchMoreProjects,
      createProject,
      deleteProject,
      updateProject,
      fetchProject,
      cleanMoreProjects,
    }),
    [
      projects,
      projectsCount,
      loadedMoreProjects,
      project,
      projectsIsLoading,
      moreProjectsIsLoading,
      createProjectIsLoading,
      deleteProjectIsLoading,
      updateProjectIsLoading,
      projectIsLoading,
    ],
  );

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
};
