import {IProject} from 'models/ITasks';

export interface IProjectsContext {
  project: IProject | null;
  createIsLoading: boolean;
  deleteIsLoading: boolean;
  createProject: (teamId: number, name: string) => Promise<void>;
  deleteProject: (id: number) => Promise<void>;
}

export interface IProjectsProvider {
  children: ReactNode;
}
