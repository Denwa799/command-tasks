import {IProject} from 'models/ITasks';
import {ReactNode} from 'react';

export interface IProjectsContext {
  projectsCount: number;
  projects: IProject[] | null;
  loadedMoreProjects: IProject[];
  project: IProject | null;
  projectsIsLoading: boolean;
  moreProjectsIsLoading: boolean;
  createProjectIsLoading: boolean;
  deleteProjectIsLoading: boolean;
  updateProjectIsLoading: boolean;
  projectIsLoading: boolean;
  fetchProjects: (
    teamId: number,
    skip?: number,
    take?: number,
  ) => Promise<void>;
  fetchMoreProjects: (
    teamId: number,
    skip?: number,
    take?: number,
  ) => Promise<void>;
  fetchProject: (id: number) => Promise<void>;
  createProject: (teamId: number, name: string) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  updateProject: (id: number, name: string) => Promise<void>;
  cleanMoreProjects: () => void;
}

export interface IProjectsProvider {
  children: ReactNode;
}
