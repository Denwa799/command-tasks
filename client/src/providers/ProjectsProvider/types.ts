import {IProject} from 'models/ITasks';
import {ReactNode} from 'react';

export interface IProjectsContext {
  project: IProject | null;
  createIsLoading: boolean;
  deleteIsLoading: boolean;
  updateIsLoading: boolean;
  projectIsLoading: boolean;
  fetchProject: (id: number) => Promise<void>;
  createProject: (teamId: number, name: string) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
  updateProject: (id: number, name: string) => Promise<void>;
}

export interface IProjectsProvider {
  children: ReactNode;
}
