export interface ITeam {
  id: number;
  name: string;
  projects: IProject[];
  creator: {
    id: number;
  };
  users: {
    id: number;
    email: string;
  }[];
  activatedUsers: number[];
}

export interface IProject {
  id: number;
  name: string;
  tasks: ITask[];
  team: ITeam;
}

export interface ITask {
  id: number;
  text: string;
  status: TaskStatusType;
  responsible: string;
  date: Date;
  isUrgently: boolean;
}

export type TaskStatusType = 'overdue' | 'inProgress' | 'done';
