import {IUser} from './IUser';

export interface ITeam {
  id: number;
  name: string;
  projects?: IProject[];
  creator: {
    id: number;
    email: string;
    name: string;
  };
  users: {
    id: number;
    email: string;
    name: string;
  }[];
  activatedUsers: number[];
}

export interface IProject {
  id: number;
  name: string;
  tasks?: ITask[];
  team: ITeam;
}

export interface ITask {
  id: number;
  text: string;
  status: TaskStatusType;
  date: Date;
  isUrgently: boolean;
  responsible: IUser;
  project: IProject;
}

export type TaskStatusType = 'overdue' | 'inProgress' | 'done';
