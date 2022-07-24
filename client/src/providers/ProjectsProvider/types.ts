import {IProject} from 'models/ITasks';

export interface IProjectsContext {
  project: IProject | null;
  createIsLoading: boolean;
  createProject: (teamId: number, name: string) => Promise<void>;
}

export interface IProjectsProvider {
  children: ReactNode;
}
