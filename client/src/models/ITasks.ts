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
  status: 'overdue' | 'inProgress' | 'done';
  responsible: string;
}
