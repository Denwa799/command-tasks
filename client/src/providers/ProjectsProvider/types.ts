import {IProject} from 'models/ITasks';
import {ReactNode} from 'react';

export interface IProjectsContext {
  projects: IProject[] | null;
  project: IProject | null;
  projectsIsLoading: boolean;
  createProjectIsLoading: boolean;
  deleteProjectIsLoading: boolean;
  updateProjectIsLoading: boolean;
  projectIsLoading: boolean;
  fetchProjects: (teamId: number) => Promise<void>;
  fetchProject: (id: number) => Promise<void>;
  createProject: (teamId: number, name: string) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  updateProject: (id: number, name: string) => Promise<void>;
}

export interface IProjectsProvider {
  children: ReactNode;
}
