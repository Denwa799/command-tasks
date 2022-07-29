export interface ITeam {
  id: number;
  name: string;
  projects: IProject[];
}

export interface IProject {
  id: number;
  name: string;
  tasks: ITask[];
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
